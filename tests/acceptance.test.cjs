const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { test } = require('node:test');

const root = path.resolve(__dirname, '..');
const sourcePath = path.join(root, '莞工小蟑螂-优学院全能助手.user.js');
const source = fs.readFileSync(sourcePath, 'utf8');
const chromePath = process.env.CHROME_BIN || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const fixtureScript = String.raw`
window.__acceptance = { requests: [], downloadName: '', downloadText: '', authSeen: false, logs: [], errors: [], submitCount: 0, navigationClickAt: 0, navigationDurations: [], abortCount: 0, storageWrites: 0, chapterRequestsCompleted: 0, activeChapterRequests: 0, maxConcurrentChapterRequests: 0, firstNextAt: 0, lastChapterResponseAt: 0 };
const originalConsoleLog = console.log.bind(console);
console.log = function () {
  const message = Array.from(arguments).map(String).join(' ');
  window.__acceptance.logs.push(message);
  if (message.indexOf('翻页已确认') >= 0 && window.__acceptance.navigationClickAt) {
    window.__acceptance.navigationDurations.push(performance.now() - window.__acceptance.navigationClickAt);
  }
  originalConsoleLog.apply(console, arguments);
};
window.addEventListener('error', function (event) { window.__acceptance.errors.push(event.message || 'window error'); });
window.addEventListener('unhandledrejection', function (event) { window.__acceptance.errors.push(String(event.reason)); });
window.unsafeWindow = window;
window.GM_notification = function () {};
window.fetch = function () { return Promise.resolve({}); };
Object.defineProperty(navigator, 'clipboard', { configurable: true, value: {
  writeText: function (value) { window.__acceptance.copiedLog = value; return Promise.resolve(); }
} });
const acceptanceConfig = window.__mockLocation.acceptance || {};
window.__acceptance.mode = acceptanceConfig.mode || 'export';
if (acceptanceConfig.darkMode) window.__acceptance.storage = { xz_dark: '1' };
if (acceptanceConfig.storage) window.__acceptance.storage = Object.assign(window.__acceptance.storage || {}, acceptanceConfig.storage);
if (acceptanceConfig.lmsTextbookId) window.requirejs = function (name) {
  if (name !== 'knockout') throw new Error('Unexpected AMD module');
  return { contextFor: function () { return { $component: { currentTextbook: function () { return { id: function () { return acceptanceConfig.lmsTextbookId; } }; } } }; } };
};

const cookieJar = acceptanceConfig.authMode === 'none' || acceptanceConfig.authMode === 'lowercase-header' ? {}
  : acceptanceConfig.authMode === 'ua-only' ? { UA_AUTHORIZATION: 'mock-ua-auth' }
  : { AUTHORIZATION: 'mock-auth' };
Object.defineProperty(document, 'cookie', {
  configurable: true,
  get: function () { return Object.keys(cookieJar).map(function (key) { return key + '=' + cookieJar[key]; }).join('; '); },
  set: function (value) {
    const pair = String(value).split(';')[0];
    const separator = pair.indexOf('=');
    if (separator > 0) cookieJar[pair.slice(0, separator)] = pair.slice(separator + 1);
  }
});
if (window.__mockLocation.hash.indexOf('/questionTrain/practice/') >= 0) {
  document.cookie = 'USERINFO=%7B%22userId%22%3A%22mock-user%22%7D; path=/';
}
if (acceptanceConfig.urlStyle2) document.cookie = 'urlStyle=2; path=/';
Object.defineProperty(window, 'localStorage', {
  configurable: true,
  value: {
    getItem: function (key) { return window.__acceptance.storage && window.__acceptance.storage[key] || null; },
    setItem: function (key, value) {
      window.__acceptance.storageWrites += 1;
      window.__acceptance.storage = window.__acceptance.storage || {};
      window.__acceptance.storage[key] = String(value);
    },
    removeItem: function (key) { if (window.__acceptance.storage) delete window.__acceptance.storage[key]; }
  }
});
const isNavigationMode = ['navigation', 'navigation-noop', 'navigation-transient', 'navigation-delayed-scan', 'navigation-preload-error', 'navigation-slow-transition', 'auto-alert-modal'].indexOf(acceptanceConfig.mode) >= 0;
if ((acceptanceConfig.mode && acceptanceConfig.mode.indexOf('auto-') === 0) || isNavigationMode || ['video-sequence', 'video-summary', 'video-stall'].indexOf(acceptanceConfig.mode) >= 0) {
  window.__acceptance.storage = window.__acceptance.storage || {};
  window.__acceptance.storage.xz_autocfg = JSON.stringify({
    rate: 1.5, stayTime: (isNavigationMode || acceptanceConfig.mode === 'auto-completed' || ['video-sequence', 'video-summary'].indexOf(acceptanceConfig.mode) >= 0) ? 0 : 5,
    autoMute: false, autoPlay: isNavigationMode || ['video-sequence', 'video-summary', 'video-stall'].indexOf(acceptanceConfig.mode) >= 0,
    autoAnswer: !(isNavigationMode || ['video-sequence', 'video-summary', 'video-stall'].indexOf(acceptanceConfig.mode) >= 0), autoSubmit: !isNavigationMode,
    autoNext: isNavigationMode || acceptanceConfig.mode === 'auto-completed' || ['video-sequence', 'video-summary', 'video-stall'].indexOf(acceptanceConfig.mode) >= 0, maxRetry: 1,
    accuracyMin: 100, accuracyMax: 100, answerDelay: 100
  });
}

window.GM_xmlhttpRequest = function (options) {
  const url = new URL(options.url);
  const headers = options.headers || {};
  window.__acceptance.requests.push({ method: options.method, url: url.href });
  window.__acceptance.authSeen = window.__acceptance.authSeen || Object.keys(headers).some(function (key) {
    return key.toLowerCase() === 'authorization' && ['mock-auth', 'mock-ua-auth', 'mock-cased'].indexOf(headers[key]) >= 0;
  });

  const isDirectoryRequest = (url.pathname.indexOf('/uaapi/course/stu/') >= 0 && url.pathname.endsWith('/directory'))
    || /\/learnCourse\/courseDirectory$/i.test(url.pathname);
  const directoryAttempt = window.__acceptance.requests.filter(function (request) {
    const requestPath = new URL(request.url).pathname;
    return requestPath.endsWith('/directory') || /\/courseDirectory$/i.test(requestPath);
  }).length;
  if (isDirectoryRequest && (acceptanceConfig.mode === 'forbidden' || acceptanceConfig.mode === 'unauthorized')) {
    const status = acceptanceConfig.mode === 'unauthorized' ? 401 : 403;
    window.setTimeout(function () { options.onload({ status, responseText: '{"error":"Mock forbidden"}' }); }, 0);
    return { abort: function () {} };
  }
  if (isDirectoryRequest && acceptanceConfig.mode === 'timeout') {
    window.setTimeout(function () { options.ontimeout(); }, 0);
    return { abort: function () {} };
  }
  if (isDirectoryRequest && acceptanceConfig.mode === 'invalid-json') {
    window.setTimeout(function () { options.onload({ status: 200, responseText: '{invalid json' }); }, 0);
    return { abort: function () {} };
  }
  if (isDirectoryRequest && acceptanceConfig.mode === 'html-fallback' && url.hostname === 'api.dgut.edu.cn') {
    window.setTimeout(function () { options.onload({ status: 200, responseText: '<!doctype html><html><body>not api</body></html>' }); }, 0);
    return { abort: function () {} };
  }
  if (isDirectoryRequest && acceptanceConfig.mode === 'retry-server' && directoryAttempt === 1) {
    window.setTimeout(function () { options.onload({ status: 503, responseText: '{"error":"Mock unavailable"}' }); }, 0);
    return { abort: function () {} };
  }
  if (isDirectoryRequest && acceptanceConfig.mode === 'empty-directory') {
    window.setTimeout(function () { options.onload({ status: 200, responseText: JSON.stringify({ data: { coursename: 'Empty course', chapters: [] } }) }); }, 0);
    return { abort: function () {} };
  }

  let response;
  if (isDirectoryRequest) {
    const chapterCount = Math.max(1, Math.min(40, Number(acceptanceConfig.scanChapterCount) || 1));
    response = { data: { coursename: 'Acceptance Course', chapters: Array.from({ length: chapterCount }, (_, index) => (
      { nodeid: 'chapter-' + String.fromCharCode(65 + index), items: [{ title: 'Chapter ' + (index + 1), itemid: 'item-A' }] }
    )) } };
  } else if (url.pathname.indexOf('/uaapi/wholepage/chapter/stu/') >= 0 || /\/learnCourse\/getWholeChapterPageContent$/i.test(url.pathname)) {
    response = acceptanceConfig.mode === 'empty-chapter' ? { data: { wholepageItemDTOList: [] } } : { data: { wholepageItemDTOList: [
      { itemid: 'item-A', wholepageDTOList: [
        { content: 'Mock quiz', contentType: 7, id: 'page-A', coursepageDTOList: [
          { questionDTOList: [
            { questionid: 'question-A', type: 1, title: 'Mock question', choiceitemModels: [
              { option: 'A', title: 'Option A' }, { option: 'B', title: 'Option B' }
            ] }
          ] }
        ] }
      ] }
    ] } };
    if (acceptanceConfig.progressTwoPages || acceptanceConfig.progressThreePages) response.data.wholepageItemDTOList[0].wholepageDTOList.push({ id: 'page-B', contentType: 0, coursepageDTOList: [] });
    if (acceptanceConfig.progressThreePages) response.data.wholepageItemDTOList[0].wholepageDTOList.push({ id: 'page-C', contentType: 0, coursepageDTOList: [] });
  } else if (url.pathname.indexOf('/uaapi/questionAnswer/') >= 0 || /\/questionAnswer\//i.test(url.pathname)) {
    const questionId = decodeURIComponent(url.pathname.split('/').pop());
    if ((acceptanceConfig.failQuestionIds || []).indexOf(questionId) >= 0) {
      window.setTimeout(function () { options.onerror({ error: 'injected network failure' }); }, 0);
      return { abort: function () {} };
    }
    response = acceptanceConfig.answerResponses && Object.prototype.hasOwnProperty.call(acceptanceConfig.answerResponses, questionId)
      ? acceptanceConfig.answerResponses[questionId]
      : { correctAnswerList: ['A'] };
  } else if (url.pathname.indexOf('/utestapi/questionTraining/student/answerSheet') >= 0) {
    response = { code: 1, result: { list: [{ id: 'training-Q1' }], total: 1 } };
  } else if (url.pathname.indexOf('/utestapi/questionTraining/student/questionList') >= 0) {
    response = { result: { trainingQuestions: [
      { id: 'training-Q1', type: 1, title: 'Mock training question', item: [
        { title: 'Training option A' }, { title: 'Training option B' }
      ], userAnswer: [] }
    ] } };
  } else if (url.pathname.indexOf('/utestapi/questionTraining/student/answer') >= 0) {
    response = { result: { correctAnswer: ['A'] } };
  } else {
    window.setTimeout(function () {
      options.onload({ status: 404, responseText: JSON.stringify({ error: 'Unexpected mock URL' }) });
    }, 0);
    return { abort: function () {} };
  }

  const isChapterRequest = url.pathname.indexOf('/uaapi/wholepage/chapter/stu/') >= 0 || /\/learnCourse\/getWholeChapterPageContent$/i.test(url.pathname);
  if (isChapterRequest) {
    window.__acceptance.activeChapterRequests += 1;
    window.__acceptance.maxConcurrentChapterRequests = Math.max(window.__acceptance.maxConcurrentChapterRequests, window.__acceptance.activeChapterRequests);
  }
  let chapterRequestReleased = false;
  function releaseChapterRequest() {
    if (!isChapterRequest || chapterRequestReleased) return;
    chapterRequestReleased = true;
    window.__acceptance.activeChapterRequests = Math.max(0, window.__acceptance.activeChapterRequests - 1);
  }
  if (isChapterRequest && acceptanceConfig.mode === 'navigation-preload-error') {
    const failedTimer = window.setTimeout(function () {
      releaseChapterRequest();
      options.onload({ status: 503, responseText: '{"error":"Mock chapter unavailable"}' });
    }, 0);
    return { abort: function () { window.clearTimeout(failedTimer); releaseChapterRequest(); } };
  }
  const delayedAnswer = ['cancel-export', 'auto-pause-pending'].indexOf(acceptanceConfig.mode) >= 0 && /\/questionAnswer\//i.test(url.pathname);
  const requestTimer = window.setTimeout(function () {
    releaseChapterRequest();
    if (isChapterRequest) {
      window.__acceptance.chapterRequestsCompleted += 1;
      window.__acceptance.lastChapterResponseAt = performance.now();
    }
    options.onload({ status: 200, responseText: JSON.stringify(response) });
  }, isChapterRequest ? Math.max(0, Number(acceptanceConfig.chapterDelayMs) || 0) : delayedAnswer ? (acceptanceConfig.mode === 'auto-pause-pending' ? 800 : 5000) : 0);
  return { abort: function () {
    window.clearTimeout(requestTimer);
    releaseChapterRequest();
    if (delayedAnswer) {
      window.__acceptance.abortCount += 1;
      if (options.onabort) options.onabort();
    }
  } };
};

const createObjectURL = URL.createObjectURL.bind(URL);
URL.createObjectURL = function (blob) {
  blob.text().then(function (text) { window.__acceptance.downloadText = text; });
  return createObjectURL(blob);
};
HTMLAnchorElement.prototype.click = function () {
  if (this.download) window.__acceptance.downloadName = this.download;
};
`;

const runnerScript = String.raw`
window.addEventListener('load', function () {
  const state = window.__acceptance;
  const result = document.getElementById('acceptance-result');
  if(state.mode==='auto-slow-duplicate-submit')document.addEventListener('input',function(event){
    const group=event.target.closest&&event.target.closest('.exercise-group');
    if(group&&group.dataset.step==='2'&&!state.secondGroupFirstAnswerAt)state.secondGroupFirstAnswerAt=performance.now();
  },true);
  if (state.mode === 'easter') {
    const panel = document.getElementById('xz-panel');
    panel.querySelector('.xz-header-about').click();
    const trigger = panel.querySelector('#xz-easter-trigger');
    for (let i = 0; i < 6; i += 1) trigger.click();
    state.hiddenBeforeSeventh = panel.querySelector('#xz-easter').hidden;
    trigger.click();
    state.openAfterSeventh = !panel.querySelector('#xz-easter').hidden;
    panel.querySelector('#xz-easter-mascot').click();
    state.messageChanged = panel.querySelector('#xz-easter-message').textContent !== '点点我，看看今天的学习运气。';
    panel.querySelector('#xz-easter-close').click();
    state.closed = panel.querySelector('#xz-easter').hidden;
    state.iconStable = panel.querySelector('.brand .logo').getAttribute('src') === panel.querySelector('#xz-easter-mascot img').getAttribute('src');
    state.nativeCursors = ['.xz-head','.xz-capsule-nav button','#xz-panel-resize','#xz-easter-trigger'].every(selector => getComputedStyle(panel.querySelector(selector)).cursor === 'default');
    result.textContent = JSON.stringify(state);
    return;
  }
  if (state.mode === 'locate-pending' || state.mode === 'locate-unknown' || state.mode === 'locate-replaced') {
    const names = [...document.querySelectorAll('.page-item .page-name')];
    names.forEach(name => name.addEventListener('click', function () {
      names.forEach(item => item.classList.remove('active'));
      name.classList.add('active');
      if (state.mode === 'locate-replaced' && name.textContent.trim() === '第3页') {
        window.setTimeout(function () {
          document.querySelector('.course-container').innerHTML = '<div class="page-item" id="page-1"><div class="page-name active complete">第1页</div></div><div class="page-item is-hide" id="page-2"><div class="page-name">第2页</div></div><div class="page-item" id="page-3"><div class="page-name active">第3页</div></div>';
        }, 80);
      }
    }));
    document.querySelector('#xz-advanced').open = true;
    document.querySelector('#xz-locate-pending').click();
    window.setTimeout(function () {
      state.activeIndex = names.findIndex(name => name.classList.contains('active'));
      state.locateStatus = document.querySelector('#xz-locate-status').textContent;
      state.autoStarted = (document.querySelector('#xz-btn-auto')?.textContent || '').includes('暂停');
      result.textContent = JSON.stringify(state);
    }, state.mode === 'locate-replaced' ? 900 : 700);
    return;
  }
  if (state.mode === 'ui-only') {
    const panel = document.getElementById('xz-panel');
    state.pageName = panel && panel.querySelector('.brand .ver').textContent.trim().split(' · ')[0];
    state.initialView = panel.dataset.view;
    state.availableViews = Array.from(panel.querySelectorAll('.xz-capsule-nav [data-goto]')).map(function (control) { return control.dataset.goto; });
    state.selectedView = panel.querySelector('.xz-capsule-nav button.active')?.dataset.goto || null;
    state.layoutWidth = panel && panel.getBoundingClientRect().width;
    state.visibleCards = panel.querySelectorAll('.sec.show .xz-card').length;
    panel.querySelector('.xz-header-about').click();
    state.aboutView = panel.dataset.view;
    panel.querySelector('#xz-sec-about [data-goto="previous"]').click();
    state.returnView = panel.dataset.view;
    if (window.__mockLocation.acceptance.previewTab) {
      panel.querySelector('.xz-capsule-nav [data-goto="' + window.__mockLocation.acceptance.previewTab + '"]').click();
      state.previewView = panel.querySelector('.sec.show').id;
    }
    state.activeView = panel.dataset.view;
    state.darkMode = panel.classList.contains('xz-dark');
    result.textContent = JSON.stringify(state);
    return;
  }
  if (state.mode === 'layout-recovery') {
    const panel = document.getElementById('xz-panel');
    const toggle = document.getElementById('xz-toggle');
    const inside = function (rect) { return rect.left >= 0 && rect.top >= 0 && rect.right <= innerWidth && rect.bottom <= innerHeight; };
    state.restoredPanelInside = inside(panel.getBoundingClientRect());
    document.getElementById('xz-close').click();
    state.restoredToggleInside = inside(toggle.getBoundingClientRect());
    toggle.click();
    state.restoredWidth = Math.round(panel.getBoundingClientRect().width);
    state.restoredHeight = Math.round(panel.getBoundingClientRect().height);
    const grip = document.getElementById('xz-panel-resize');
    const beforeResize = panel.getBoundingClientRect();
    grip.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerId: 1, clientX: beforeResize.left + 5, clientY: beforeResize.bottom - 5 }));
    grip.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, pointerId: 1, clientX: beforeResize.left - 45, clientY: beforeResize.bottom + 45 }));
    grip.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 1 }));
    state.resizedWidth = Math.round(panel.getBoundingClientRect().width);
    state.resizedHeight = Math.round(panel.getBoundingClientRect().height);
    state.resizedStyle = {width:panel.style.width,height:panel.style.height,display:getComputedStyle(grip).display,viewport:[innerWidth,innerHeight],before:[beforeResize.left,beforeResize.top,beforeResize.right,beforeResize.bottom]};
    state.resizedStored = !!localStorage.getItem('xz_panel_size');
    const head = panel.querySelector('.xz-head');
    head.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerId: 7, isPrimary: true, button: 0, clientX: 800, clientY: 100 }));
    head.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, pointerId: 7, isPrimary: true, buttons: 1, clientX: -5000, clientY: -5000 }));
    const edgeRect = panel.getBoundingClientRect();
    state.draggedPanelInside = inside(edgeRect);
    head.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, pointerId: 7, isPrimary: true, buttons: 1, clientX: 900, clientY: 300 }));
    head.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 7, isPrimary: true, button: 0, clientX: 900, clientY: 300 }));
    const recoveredRect = panel.getBoundingClientRect();
    state.draggedPanelRecovered = inside(recoveredRect) && (recoveredRect.left > edgeRect.left || recoveredRect.top > edgeRect.top);
    panel.querySelector('.xz-header-about').click();
    document.getElementById('xz-close').click();
    const toggleRect = toggle.getBoundingClientRect();
    const toggleStartX = toggleRect.left + 6;
    const toggleStartY = toggleRect.top + 6;
    toggle.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerId: 8, isPrimary: true, button: 0, clientX: toggleStartX, clientY: toggleStartY }));
    toggle.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, pointerId: 8, isPrimary: true, buttons: 1, clientX: -5000, clientY: -5000 }));
    const toggleEdgeRect = toggle.getBoundingClientRect();
    state.toggleDraggedToEdgeInside = inside(toggleEdgeRect);
    toggle.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, pointerId: 8, isPrimary: true, buttons: 1, clientX: toggleStartX + 100, clientY: toggleStartY + 100 }));
    toggle.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 8, isPrimary: true, button: 0, clientX: toggleStartX + 100, clientY: toggleStartY + 100 }));
    const toggleRecoveredRect = toggle.getBoundingClientRect();
    state.toggleDragRecovered = inside(toggleRecoveredRect) && (toggleRecoveredRect.left > toggleEdgeRect.left || toggleRecoveredRect.top > toggleEdgeRect.top);
    document.getElementById('xz-layout-reset').click();
    state.resetWidth = Math.round(panel.getBoundingClientRect().width);
    state.resetStorage = ['xz_panel_pos', 'xz_panel_size', 'xz_btn_pos'].every(function (key) { return !localStorage.getItem(key); });
    result.textContent = JSON.stringify(state);
    return;
  }
  if (state.mode === 'auto-progress' || state.mode === 'auto-progress-late-dom') {
    document.getElementById('xz-btn-auto').click();
    window.setTimeout(function () {
      if (state.mode === 'auto-progress-late-dom') {
        document.querySelector('.course-container').innerHTML = '<div class="page-item"><div class="page-name">第1页</div></div><div class="page-item"></div><div class="page-item"><div class="page-name active">\uE83D 专题三</div></div>';
        document.getElementById('xz-btn-auto').click();
      } else if (window.__mockLocation.acceptance.progressTwoPages) {
        document.querySelectorAll('.page-item .page-name')[0].classList.remove('active');
        document.querySelectorAll('.page-item .page-name')[1].classList.add('active');
        document.getElementById('xz-btn-auto').click();
      }
      const track = document.getElementById('xz-auto-bar').parentElement;
      state.progressText = document.getElementById('xz-auto-progress-text').textContent;
      state.progressWidth = document.getElementById('xz-auto-bar').style.width;
      state.progressNow = track.getAttribute('aria-valuenow');
      state.progressMax = track.getAttribute('aria-valuemax');
      state.chapterRequests = state.requests.filter(function (r) { return r.url.includes('/uaapi/wholepage/chapter/stu/'); }).length;
      state.pageItems = document.querySelectorAll('.page-item').length;
      state.activeItems = document.querySelectorAll('.page-item .page-name.active').length;
      state.route = window.__mockLocation.search;
      result.textContent = JSON.stringify(state);
    }, 500);
    return;
  }
  if (state.mode === 'pill-interaction') {
    const panel = document.getElementById('xz-panel');
    const auto = panel.querySelector('.xz-capsule-nav [data-goto="auto"]');
    const reading = panel.querySelector('.xz-capsule-nav [data-goto="reading"]');
    const advanced = panel.querySelector('#xz-advanced');
    state.initialView = panel.dataset.view;
    state.advancedClosed = !advanced.open;
    advanced.querySelector('summary').click();
    state.advancedOpened = advanced.open;
    document.getElementById('xz-btn-auto').click();
    state.autoIndicator = auto.classList.contains('is-running');
    reading.click();
    state.readingSelected = reading.getAttribute('aria-pressed') === 'true' && panel.dataset.view === 'reading';
    state.readingDockVisible = getComputedStyle(document.getElementById('xz-reading-dock')).display !== 'none';
    document.getElementById('xz-btn-reading').click();
    state.autoPausedOnReading = document.getElementById('xz-btn-auto').textContent === '开始自动刷课';
    state.readingStarted = document.getElementById('xz-btn-reading').textContent === '暂停计时';
    auto.click();
    document.getElementById('xz-btn-auto').click();
    state.readingPausedOnAuto = document.getElementById('xz-btn-reading').textContent === '开始计时';
    state.autoRestarted = auto.classList.contains('is-running');
    result.textContent = JSON.stringify(state);
    return;
  }
  if (state.mode === 'log-copy') {
    document.querySelector('.xz-capsule-nav [data-goto="auto"]').click();
    document.getElementById('xz-btn-auto').click();
    window.setTimeout(function () {
      state.logCollapsed = document.getElementById('xz-log-body').style.display === 'none';
      document.getElementById('xz-log-copy').click();
      state.copyButtonText = document.getElementById('xz-log-copy').textContent;
      result.textContent = JSON.stringify(state);
    }, 300);
    return;
  }
  if (state.mode === 'video-sequence' || state.mode === 'video-summary') {
    let page = 1;
    state.sequenceClicks = 0;
    state.prematureClicks = 0;
    state.stalePlayCalls = 0;
    state.summaryForwardClicks = 0;
    function setupVideo(video) {
      let time = 0, paused = true, ended = false;
      Object.defineProperty(video, 'currentTime', { configurable: true, get: function () { return time; }, set: function (value) { time = value; } });
      Object.defineProperty(video, 'paused', { configurable: true, get: function () { return paused; } });
      Object.defineProperty(video, 'ended', { configurable: true, get: function () { return ended; } });
      video.play = function () {
        if (!video.isConnected) state.stalePlayCalls += 1;
        paused = false;
        window.setTimeout(function () { time = 1; ended = true; video.dispatchEvent(new Event('ended')); }, 260);
        return Promise.resolve();
      };
    }
    function replaceVideo(container) {
      const oldVideo = container.querySelector('video[data-active]');
      const newVideo = document.createElement('video');
      newVideo.dataset.active = 'true';
      setupVideo(newVideo);
      oldVideo.replaceWith(newVideo);
    }
    function renderPage(number) {
      const container = document.createElement('div');
      container.className = 'course-container';
      container.innerHTML = '<div class="page-item" id="page-' + number + '"><div class="page-name active">第' + number + '页</div></div><video style="display:none"></video><video data-active="true"></video><button type="button" class="next-page-btn">下一页</button>';
      setupVideo(container.querySelector('video[data-active]'));
      document.querySelector('.course-container').replaceWith(container);
      window.setTimeout(function () { if (container.isConnected) replaceVideo(container); }, 70);
    }
    setupVideo(document.querySelector('.course-container video[data-active]'));
    document.addEventListener('click', function (event) {
      if (!event.target.matches('.next-page-btn')) return;
      state.sequenceClicks += 1;
      if (!event.target.closest('.course-container').querySelector('video[data-active]').ended) state.prematureClicks += 1;
      if (page >= 6) {
        state.completed = true;
        const stop = document.getElementById('xz-btn-auto');
        if (stop && stop.textContent.indexOf('暂停') === 0) stop.click();
        window.setTimeout(function () { result.textContent = JSON.stringify(state); }, 100);
        return;
      }
      if (state.mode === 'video-summary' && page === 3) {
        state.summaryShown = true;
        const modal = document.createElement('div');
        modal.id = 'statModal';
        modal.className = 'modal fade in';
        modal.style.cssText = 'position:fixed;display:block;width:220px;height:120px;top:20px;left:20px;background:white;z-index:100';
        modal.innerHTML = '<button type="button" data-bind="click: reviewChapter">返回</button><button type="button" data-bind="click: goNextPage">下一专题</button>';
        document.body.appendChild(modal);
        state.summaryOffsetParentNull = modal.offsetParent === null;
        modal.querySelector('button[data-bind*="goNextPage"]').addEventListener('click', function () {
          state.summaryForwardClicks += 1;
          modal.remove();
          page += 1;
          window.setTimeout(function () { renderPage(page); }, 20);
        });
        return;
      }
      page += 1;
      window.setTimeout(function () { renderPage(page); }, 20);
    }, true);
    document.querySelector('.xz-capsule-nav [data-goto="auto"]').click();
    document.getElementById('xz-btn-auto').click();
    window.setTimeout(function () {
      if (!state.completed) { state.timedOut = true; result.textContent = JSON.stringify(state); }
    }, 13000);
    return;
  }
  if (state.mode === 'video-stall') {
    const video = document.querySelector('.course-container video[data-active]');
    Object.defineProperty(video, 'currentTime', { configurable: true, get: function () { return 0; }, set: function () {} });
    Object.defineProperty(video, 'paused', { configurable: true, get: function () { return true; } });
    video.play = function () { return Promise.reject(new Error('mock playback blocked')); };
    const clockStart = Date.now();
    const perfStart = performance.now();
    Date.now = function () { return clockStart + (performance.now() - perfStart) * 13; };
    document.querySelector('.xz-capsule-nav [data-goto="auto"]').click();
    document.getElementById('xz-btn-auto').click();
    let ticks = 0;
    const poll = window.setInterval(function () {
      ticks += 1;
      const progress = document.getElementById('xz-auto-progress-text');
      if ((progress && progress.textContent.indexOf('自动流程已暂停') >= 0) || ticks > 500) {
        window.clearInterval(poll);
        state.timedOut = ticks > 500;
        state.progressText = progress && progress.textContent;
        state.startButton = document.getElementById('xz-btn-auto').textContent;
        result.textContent = JSON.stringify(state);
      }
    }, 20);
    return;
  }
  if (state.mode === 'reading-sequence' || state.mode === 'reading-noop' || state.mode === 'reading-summary') {
    let page = 1;
    state.readingClicks = 0;
    state.summaryForwardClicks = 0;
    const quizSubmit=document.querySelector('.course-container .btn-submit');
    if(quizSubmit)quizSubmit.addEventListener('click',function(){state.unwantedSubmitClicks=(state.unwantedSubmitClicks||0)+1;});
    if (state.mode === 'reading-noop') {
      const clockStart = Date.now(), perfStart = performance.now();
      Date.now = function () { return clockStart + (performance.now() - perfStart) * 13; };
    }
    document.addEventListener('click', function (event) {
      if (!event.target.matches('.next-page-btn')) return;
      state.readingClicks += 1;
      if (state.mode === 'reading-noop') return;
      if(state.mode==='reading-summary'&&page===2){
        state.summaryShown=true;
        const modal=document.createElement('div');
        modal.id='statModal';
        modal.className='modal fade in';
        modal.style.cssText='position:fixed;display:block;width:220px;height:120px;top:20px;left:20px;background:white;z-index:100';
        modal.innerHTML='<button type="button" data-bind="click: reviewSection">返回</button><button type="button" data-bind="click: goNextPage">下一专题</button>';
        document.body.appendChild(modal);
        state.summaryOffsetParentNull=modal.offsetParent===null;
        modal.querySelector('button[data-bind*="goNextPage"]').addEventListener('click',function(){
          state.summaryForwardClicks+=1;
          modal.remove();
          page+=1;
          window.setTimeout(function(){
            const item=document.querySelector('.course-container .page-item');
            item.id='page-'+page;
            item.querySelector('.page-name').textContent='第'+page+'页';
          },20);
        });
        return;
      }
      page += 1;
      window.setTimeout(function () {
        const item = document.querySelector('.course-container .page-item');
        item.id = 'page-' + page;
        item.querySelector('.page-name').textContent = '第' + page + '页';
      }, 20);
    }, true);
    document.querySelector('.xz-capsule-nav [data-goto="reading"]').click();
    document.getElementById('xz-rd-h').value = '0';
    document.getElementById('xz-rd-m').value = '0';
    document.getElementById('xz-rd-s').value = '1';
    document.getElementById('xz-btn-reading').click();
    let ticks = 0;
    const poll = window.setInterval(function () {
      ticks += 1;
      const pages = Number(document.getElementById('xz-rd-pages').textContent);
      const stopped = document.getElementById('xz-btn-reading').textContent === '开始计时';
      if ((['reading-sequence','reading-summary'].indexOf(state.mode)>=0 && pages >= 5) || (state.mode === 'reading-noop' && stopped) || ticks > 900) {
        window.clearInterval(poll);
        state.timedOut = ticks > 900;
        state.readingPages = pages;
        state.readingStopped = stopped;
        result.textContent = JSON.stringify(state);
      }
    }, 20);
    return;
  }
  if (state.mode === 'panel-recovery') {
    const originalPanel = document.getElementById('xz-panel');
    if (originalPanel) originalPanel.remove();
    let recoveryTicks = 0;
    const recoveryPoll = window.setInterval(function () {
      recoveryTicks += 1;
      const recoveredPanel = document.getElementById('xz-panel');
      if (recoveredPanel || recoveryTicks > 100) {
        window.clearInterval(recoveryPoll);
        state.timedOut = !recoveredPanel;
        state.panelCount = document.querySelectorAll('#xz-panel').length;
        state.floatCount = document.querySelectorAll('#xz-float-log').length;
        result.textContent = JSON.stringify(state);
      }
    }, 20);
    return;
  }
  if (['navigation', 'navigation-noop', 'navigation-transient', 'navigation-delayed-scan', 'navigation-preload-error', 'navigation-slow-transition', 'auto-samples', 'auto-double', 'auto-staged', 'auto-duplicate-ids', 'auto-staged-duplicate-ids', 'auto-delayed-duplicate-ids', 'auto-slow-duplicate-submit', 'auto-completed-hidden-duplicate', 'auto-failure', 'auto-page-switch', 'auto-completed', 'auto-pause-pending', 'auto-alert-modal'].indexOf(state.mode) >= 0) {
    const nextButton = document.querySelector('.next-page-btn');
    if(state.mode==='auto-completed'&&nextButton)nextButton.addEventListener('click',function(){
      state.completedPageClicks=(state.completedPageClicks||0)+1;
      const item=document.querySelector('.page-item');
      item.id='page-2';
      item.querySelector('.page-name').textContent='第2页';
    });
    if (state.mode.indexOf('navigation') === 0 && nextButton) {
      const pages = Array.from(document.querySelectorAll('.page-item'));
      let activeIndex = 0;
      nextButton.addEventListener('click', function () {
        state.navigationClickAt = performance.now();
        if (!state.firstNextAt) state.firstNextAt = performance.now();
        state.navigationClickCount = (state.navigationClickCount || 0) + 1;
        if (state.mode === 'navigation-noop') return;
        if (state.mode === 'navigation-transient') {
          pages[0].querySelector('.page-name').classList.remove('active');
          pages[1].querySelector('.page-name').classList.add('active');
          window.setTimeout(function () {
            pages[1].querySelector('.page-name').classList.remove('active');
            pages[0].querySelector('.page-name').classList.add('active');
          }, 700);
          return;
        }
        if (state.mode === 'navigation-slow-transition') {
          window.setTimeout(function () {
            pages[0].querySelector('.page-name').classList.remove('active');
            pages[1].querySelector('.page-name').classList.add('active');
            state.activePage = 1;
          }, 16000);
          return;
        }
        pages[activeIndex].querySelector('.page-name').classList.remove('active');
        activeIndex += 1;
        pages[activeIndex].querySelector('.page-name').classList.add('active');
        state.activePage = activeIndex;
      });
    }
    document.querySelectorAll('.btn-submit').forEach(function (submitButton, index) {
      submitButton.addEventListener('click', function () {
        if (state.mode === 'auto-alert-modal' && submitButton.closest('#alertModal')) {
          if ((submitButton.textContent || '').trim() === '留在本页') state.alertStayCount = (state.alertStayCount || 0) + 1;
          if ((submitButton.textContent || '').trim() === '确定离开') state.alertLeaveCount = (state.alertLeaveCount || 0) + 1;
          document.getElementById('alertModal').classList.remove('in');
          return;
      }
      state.submitCount += 1;
      state.submitOrder = state.submitOrder || [];
      state.submitOrder.push(index + 1);
      state.submitTimes = state.submitTimes || [];
      state.submitTimes.push(performance.now());
      const group = submitButton.closest('.exercise-group');
      if (state.mode === 'auto-slow-duplicate-submit' && index === 0) {
        state.firstGroupSubmitAt = performance.now();
        window.setTimeout(function () {
          (group || document).querySelectorAll('.question-wrapper').forEach(function (question) { question.classList.add('finished'); });
          state.firstGroupCompletedAt = performance.now();
        }, 1500);
        window.setTimeout(function () {
          const second = document.querySelector('.exercise-group[data-step="2"]');
          if (second) {
            second.style.display = 'block';
            state.secondExerciseShownAt = performance.now();
          }
        }, 500);
        return;
      }
      (group || document).querySelectorAll('.question-wrapper').forEach(function (question) { question.classList.add('finished'); });
      if (state.mode === 'auto-delayed-duplicate-ids' && index === 0) {
        state.firstGroupCompletedAt = performance.now();
        window.setTimeout(function () {
          const second = document.querySelector('.exercise-group[data-step="2"]');
          if (second) {
            second.style.display = 'block';
            state.secondExerciseShownAt = performance.now();
          }
        }, 1800);
        return;
      }
      if (['auto-staged','auto-staged-duplicate-ids'].indexOf(state.mode)>=0 && index === 0) document.querySelector('.exercise-group[data-step="2"]').style.display = 'block';
      });
    });
    if(state.mode==='auto-completed-hidden-duplicate'){
      window.setTimeout(function(){
        const second=document.querySelector('.exercise-group[data-step="2"]');
        if(second){second.style.display='block';state.secondExerciseShownAt=performance.now();}
      },1200);
    }
    const autoTab = document.querySelector('.xz-capsule-nav [data-goto="auto"]');
    if (autoTab) autoTab.click();
    const start = document.getElementById('xz-btn-auto');
    if (start) start.click();
    if(state.mode==='navigation-delayed-scan'){
      const scanSample=window.setInterval(function(){
        const track=document.querySelector('#xz-auto-bar').parentElement;
        if(track.getAttribute('aria-label')==='课程内容预读进度'&&Number(track.getAttribute('aria-valuemax'))>0){
          state.preloadText=document.querySelector('#xz-auto-progress-text').textContent;
          state.preloadNow=track.getAttribute('aria-valuenow');
          state.preloadMax=track.getAttribute('aria-valuemax');
          state.preloadLabel=track.getAttribute('aria-label');
          window.clearInterval(scanSample);
        }
      },25);
    }
    if (state.mode === 'auto-page-switch') {
      window.setTimeout(function () {
        window.__mockLocation.href += '&page-switch=2';
        const marker = document.createElement('div');
        marker.textContent = 'simulated page change';
        document.querySelector('.course-container').appendChild(marker);
      }, 100);
    }
    let ticks = 0;
    const pollAuto = window.setInterval(function () {
      ticks += 1;
      if(state.mode==='auto-pause-pending'&&state.requests.length&&!state.pauseRequestedAt){
        const stop=document.getElementById('xz-btn-auto');
        if(stop)stop.click();
        state.pauseRequestedAt=performance.now();
      }
      if (state.mode.indexOf('navigation') === 0 && state.navigationDurations.length >= 20) {
        if (!state.pauseRequestedAt) {
          const stop = document.getElementById('xz-btn-auto');
          if (stop && stop.textContent.indexOf('暂停') === 0) stop.click();
          state.pauseRequestedAt = performance.now();
        }
        if (performance.now() - state.pauseRequestedAt < 2500) return;
        state.navigationCount = state.navigationDurations.length;
        state.navigationClickCount = state.navigationClickCount || 0;
        state.navigationWithin15Seconds = state.navigationDurations.filter(function (ms) { return ms <= 15000; }).length;
        state.activePageText = document.querySelector('.page-name.active') && document.querySelector('.page-name.active').textContent.trim();
        state.progressText = document.getElementById('xz-auto-progress-text') && document.getElementById('xz-auto-progress-text').textContent;
        state.progressNow = document.getElementById('xz-auto-bar').parentElement.getAttribute('aria-valuenow');
        state.progressMax = document.getElementById('xz-auto-bar').parentElement.getAttribute('aria-valuemax');
        state.timedOut = false;
        window.clearInterval(pollAuto);
        result.textContent = JSON.stringify(state);
        return;
      }
      const failed = state.logs.some(function (line) { return line.indexOf('处理失败 [阶段:') >= 0; });
      const navigationFailed = ['navigation-noop', 'navigation-transient'].indexOf(state.mode) >= 0 && state.logs.some(function (line) { return line.indexOf('翻页失败 [阶段: 翻页确认]') >= 0; });
      const slowNavigationConfirmed=state.mode==='navigation-slow-transition'&&state.navigationDurations.length>=1;
      const pageSwitchReset = state.mode === 'auto-page-switch' && state.logs.some(function (line) { return line.indexOf('检测到页面切换，重置状态') >= 0; });
      const completedPageMoved=state.mode==='auto-completed'&&state.logs.some(function(line){return line.indexOf('翻页已确认')>=0;});
      const pendingPaused=state.mode==='auto-pause-pending'&&state.pauseRequestedAt&&performance.now()-state.pauseRequestedAt>1100;
      const preloadFailed=state.mode==='navigation-preload-error'&&state.logs.some(function(line){return line.indexOf('全课预读失败，自动学习已暂停')>=0;});
      const alertHandled=state.mode==='auto-alert-modal'&&state.alertStayCount>0&&state.logs.some(function(line){return line.indexOf('当前页仍有')>=0;});
      const timeoutTicks = state.mode.indexOf('navigation') === 0 ? 1800 : 600;
      if ((['auto-samples','auto-double','auto-staged','auto-duplicate-ids','auto-staged-duplicate-ids','auto-delayed-duplicate-ids','auto-slow-duplicate-submit','auto-completed-hidden-duplicate'].indexOf(state.mode)>=0 && state.submitCount >= (state.mode==='auto-samples'||state.mode==='auto-completed-hidden-duplicate'?1:2)) || (state.mode === 'auto-failure' && failed) || pageSwitchReset || completedPageMoved || pendingPaused || alertHandled || navigationFailed || slowNavigationConfirmed || preloadFailed || ticks > timeoutTicks) {
        state.timedOut = ticks > timeoutTicks;
        state.navigationCount = state.navigationDurations.length;
        state.navigationWithin15Seconds = state.navigationDurations.filter(function (ms) { return ms <= 15000; }).length;
        state.activePageText = document.querySelector('.page-name.active') && document.querySelector('.page-name.active').textContent.trim();
        state.navigationFailureLogs = state.logs.filter(function (line) { return line.indexOf('翻页失败 [阶段: 翻页确认]') >= 0; });
        state.failureLogs = state.logs.filter(function (line) { return line.indexOf('处理失败 [阶段:') >= 0; });
        if(state.mode==='auto-alert-modal'){
          state.alertLeaveCount=state.alertLeaveCount||0;
          state.alertOpen=!!document.querySelector('#alertModal.in');
          state.questionSubmitCount=state.submitCount;
          state.pendingQuestionCount=document.querySelectorAll('.question-wrapper:not(.finished)').length;
        }
        state.answerValues = Array.from(document.querySelectorAll('.answer-field')).map(function (field) { return field.isContentEditable ? field.textContent : field.value; });
        if (['auto-duplicate-ids','auto-staged-duplicate-ids','auto-delayed-duplicate-ids','auto-slow-duplicate-submit','auto-completed-hidden-duplicate'].indexOf(state.mode)>=0) {
          state.exerciseGroupPendingCounts = Array.from(document.querySelectorAll('.exercise-group')).map(function (group) {
            return group.querySelectorAll('.question-wrapper:not(.finished)').length;
          });
        }
        state.selectedChoices = Array.from(document.querySelectorAll('.choice-item input:checked')).length;
        state.selectedJudgeButtons = document.querySelectorAll('.right-btn.selected, .wrong-btn.selected').length;
        window.clearInterval(pollAuto);
        result.textContent = JSON.stringify(state);
      }
    }, 20);
    return;
  }
  const isTraining = window.__mockLocation.hash.indexOf('/questionTrain/practice/') >= 0;
  if (window.__mockLocation.acceptance && window.__mockLocation.acceptance.authMode === 'lowercase-header') {
    window.fetch('https://api.dgut.edu.cn/uaapi/test', { headers: { aUtHoRiZaTiOn: 'mock-cased' } });
  }
  let started = false;
  let selected = false;
  let cancellationRequested = false;
  let ticks = 0;
  const poll = window.setInterval(function () {
    ticks += 1;
    const exportButton = document.getElementById('xz-btn-export');
    if (!started && exportButton) {
      state.buttonText = exportButton.textContent.trim();
      started = true;
      exportButton.click();
      if (state.mode === 'double-export') exportButton.click();
    }
    if (!isTraining && !selected) {
      const selectAll = document.getElementById('xz-sel-all');
      const confirm = document.getElementById('xz-sel-ok');
      if (selectAll && confirm) {
        selectAll.click();
        confirm.click();
        selected = true;
      }
    }
    const cancelButton = document.getElementById('xz-btn-cancel');
    if (!cancellationRequested && state.mode === 'cancel-export' && cancelButton && state.requests.some(function (request) { return /\/questionAnswer\//i.test(request.url); })) {
      cancellationRequested = true;
      cancelButton.click();
    }
    const exportHint = document.getElementById('xz-export-hint');
    const failureFinished = ['forbidden', 'unauthorized', 'timeout', 'invalid-json', 'empty-directory', 'empty-chapter', 'missing-course'].indexOf(state.mode) >= 0
      && exportButton && !exportButton.disabled && exportHint && exportHint.textContent.trim();
    if (state.downloadText || (state.abortCount > 0 && ticks > 10) || failureFinished || ticks > 300 || (!started && ticks > 100)) {
      window.clearInterval(poll);
      state.mockHash = window.__mockLocation.hash;
      state.cookieKeys = document.cookie.split(';').map(function (item) { return item.trim().split('=')[0]; });
      state.timedOut = !state.downloadText;
      state.downloadQuestions = [];
      try { state.downloadQuestions = JSON.parse(state.downloadText || '[]'); } catch (error) {}
      state.answerStatus = document.getElementById('xz-export-hint')
        ? document.getElementById('xz-export-hint').textContent.trim()
        : '';
      result.textContent = JSON.stringify(state);
    }
  }, 20);
});
`;

function escapeHtml(value) {
  return String(value == null ? '' : value).replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function renderQuestion(question) {
  const id = question.noId ? '' : `id="question${escapeHtml(question.id)}"`;
  let controls = '';
  if (question.kind === 'choice') {
    const choices = question.options || [{ letter: 'A', text: 'Option A' }, { letter: 'B', text: 'Option B' }];
    controls = choices.map(choice => `<div class="choice-item"><input type="${question.multiple ? 'checkbox' : 'radio'}" name="choice-${escapeHtml(question.id)}"><span class="option">${escapeHtml(choice.letter)}</span><span>${escapeHtml(choice.text)}</span></div>`).join('');
  } else if (question.kind === 'judge') {
    controls = '<button type="button" class="right-btn" onclick="this.classList.add(\'selected\')">正确</button><button type="button" class="wrong-btn" onclick="this.classList.add(\'selected\')">错误</button>';
  } else if (question.kind === 'blank') {
    if (question.writeFailure) controls = '<div class="blank-input"></div>';
    else if (!question.missingField) controls = Array.from({ length: question.blankCount || 1 }, () => question.nestedField ? '<div class="blank-input"><input type="text" class="answer-field"></div>' : '<input type="text" class="blank-input answer-field">').join('');
  } else if (question.kind === 'essay') {
    controls = question.missingField ? '' : Array.from({ length: question.fieldCount || 1 }, () => question.richField ? '<div contenteditable="true" class="answer-field"></div>' : '<textarea class="form-control answer-field"></textarea>').join('');
  }
  return `<section class="question-wrapper${question.finished ? ' finished' : ''}" ${id}><div class="question-type-tag">${escapeHtml(question.typeTag || '')}</div><div class="question-title">${escapeHtml(question.title || 'Test question')}</div>${controls}</section>`;
}

function renderAutoBody(config) {
  if(config.mode==='locate-pending'||config.mode==='locate-replaced')return '<div class="course-container"><div class="page-item" id="page-1"><div class="page-name active complete">第1页</div></div><div class="page-item is-hide" id="page-2"><div class="page-name">第2页</div></div><div class="page-item" id="page-3"><div class="page-name">第3页</div></div></div>';
  if(config.mode==='locate-unknown')return '<div class="course-container"><div class="page-item"><div class="page-name active">第1页</div></div><div class="page-item"><div class="page-name">第2页</div></div></div>';
  if(config.mode==='auto-alert-modal')return '<div class="course-container"><div class="page-item"><div class="page-name active">第20页</div></div><section class="question-wrapper show-answer wrong"><div class="question-type-tag">单选题</div></section><div class="question-operation-area"><button type="button" class="btn-submit">提交</button></div><button type="button" class="next-page-btn">下一页</button><div id="alertModal" class="modal in"><div class="modal-operation"><button type="button" class="btn-submit">留在本页</button><button type="button" class="btn-hollow">确定离开</button></div></div></div>';
  if(config.mode==='auto-progress-late-dom')return '<div class="course-container"><div class="page-item"><div class="page-name active">第1页</div></div></div>';
  if(config.progressTwoPages)return '<div class="course-container"><div class="page-item"><div class="page-name active">\uE83D 专题一</div></div><div class="page-item"><div class="page-name">\uE83D 专题二</div></div></div>';
  if(config.mode==='auto-completed')return '<div class="course-container"><div class="page-item" id="page-1"><div class="page-name active">第1页</div></div><section class="question-wrapper finished show-answer right" id="questiondone"><div class="question-title">已完成题目</div><button type="button" class="btn-redo">重做</button></section><button type="button" class="next-page-btn">下一页</button></div>';
  if(config.mode==='auto-double'||config.mode==='auto-staged'){
    const secondStyle=config.mode==='auto-staged'?' style="display:none"':'';
    return '<div class="course-container"><div class="page-item" id="page-731"><div class="page-name active">第1页</div></div>'+
      '<div class="exercise-group" data-step="1">'+renderQuestion({id:'group-one',kind:'blank',typeTag:'填空题'})+'<button type="button" class="btn-submit">提交第一组</button></div>'+
      '<div class="exercise-group" data-step="2"'+secondStyle+'>'+renderQuestion({id:'group-two',kind:'essay',typeTag:'简答题'})+'<button type="button" class="btn-submit">提交第二组</button></div>'+
      '<button type="button" class="next-page-btn">下一页</button></div>';
  }
  if(config.mode==='auto-completed-hidden-duplicate'){
    const questions=Array.from({length:20},(_,index)=>renderQuestion({id:String(16841366+index),kind:'essay',typeTag:'简答题',title:`已完成组题目 ${index+1}`,finished:true})).join('');
    const pending=Array.from({length:20},(_,index)=>renderQuestion({id:String(16841366+index),kind:'essay',typeTag:'简答题',title:`待显示组题目 ${index+1}`})).join('');
    return '<div class="course-container"><div class="page-item" id="page-731"><div class="page-name active">第1页</div></div>'+
      '<div class="page-element exercise-group" data-step="1">'+questions+'<div class="question-operation-area"><button type="button" class="btn-submit" style="display:none">已提交第一组</button></div></div>'+
      '<div class="page-element exercise-group" data-step="2" style="display:none">'+pending+'<div class="question-operation-area"><button type="button" class="btn-submit">提交第二组</button></div></div>'+
      '<button type="button" class="next-page-btn">下一页</button></div>';
  }
  if(config.mode==='auto-duplicate-ids'||config.mode==='auto-staged-duplicate-ids'||config.mode==='auto-delayed-duplicate-ids'||config.mode==='auto-slow-duplicate-submit'){
    const questions=Array.from({length:20},(_,index)=>renderQuestion({id:String(16841366+index),kind:'essay',typeTag:'简答题',title:`练习题 ${index+1}`})).join('');
    const secondStyle=['auto-staged-duplicate-ids','auto-delayed-duplicate-ids','auto-slow-duplicate-submit'].indexOf(config.mode)>=0?' style="display:none"':'';
    return '<div class="course-container"><div class="page-item" id="page-731"><div class="page-name active">第1页</div></div>'+
      '<div class="page-element exercise-group" data-step="1">'+questions+'<div class="question-operation-area"><button type="button" class="btn-submit">提交第一组</button></div></div>'+
      '<div class="page-element exercise-group" data-step="2"'+secondStyle+'>'+questions+'<div class="question-operation-area"><button type="button" class="btn-submit">提交第二组</button></div></div>'+
      '<button type="button" class="next-page-btn">下一页</button></div>';
  }
  if (['reading-sequence','reading-noop','reading-summary'].indexOf(config.mode)>=0) {
    return '<div class="course-container"><div class="page-item" id="page-1"><div class="page-name active">第1页</div></div><button type="button" class="next-page-btn">下一页</button>'+(config.mode==='reading-summary'?'<button type="button" class="btn-submit">提交题目</button>':'')+'</div>';
  }
  if (['video-sequence', 'video-summary', 'video-stall'].indexOf(config.mode) >= 0) {
    return '<div class="course-container"><div class="page-item" id="page-1"><div class="page-name active">第1页</div></div><video style="display:none"></video><video data-active="true"></video><button type="button" class="next-page-btn">下一页</button></div>';
  }
  if (['navigation', 'navigation-noop', 'navigation-transient', 'navigation-delayed-scan', 'navigation-preload-error', 'navigation-slow-transition'].indexOf(config.mode) >= 0) {
    const pages = Array.from({ length: 21 }, (_, index) => `<div class="page-item" id="page-${index + 1}"><div class="page-name${index === 0 ? ' active' : ''}">第${index + 1}页</div></div>`).join('');
    return `<div class="course-container">${pages}<button type="button" class="next-page-btn">下一页</button></div>`;
  }
  const questions = config.questions || (config.question ? [config.question] : []);
  const questionHtml = questions.map(renderQuestion).join('');
  const activePage = config.missingParent ? '' : ' active';
  const page = `<div class="page-item" id="page-731"><div class="page-name${activePage}">第1页</div></div>`;
  let submit = '<button type="button" class="btn-submit">提交</button>';
  if (config.submitButton === 'missing') submit = '';
  else if (config.submitButton === 'disabled') submit = '<button type="button" class="btn-submit" disabled>提交</button>';
  else if (config.submitButton === 'hidden') submit = '<button type="button" class="btn-submit" style="display:none">提交</button>';
  return `<div class="course-container">${page}${questionHtml}${submit}</div>`;
}

function runChrome(host, pagePath, options = {}) {
  assert.ok(fs.existsSync(chromePath), `Chrome not found at ${chromePath}; set CHROME_BIN to run browser acceptance tests`);
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'ulearning-helper-acceptance-'));
  const routeUrl = new URL(pagePath, `https://${host}`);
  const mockLocation = {
    hostname: host,
    origin: `https://${host}`,
    pathname: routeUrl.pathname,
    search: routeUrl.search,
    hash: routeUrl.hash,
    href: routeUrl.href,
    acceptance: options.acceptance || { mode: 'export' }
  };
  const wrappedSource = '(function(location){\n' + source + '\n})(window.__mockLocation);';
  const autoMode = mockLocation.acceptance && ['navigation', 'navigation-noop', 'navigation-transient', 'navigation-delayed-scan', 'navigation-preload-error', 'navigation-slow-transition', 'auto-samples', 'auto-double', 'auto-staged', 'auto-duplicate-ids', 'auto-staged-duplicate-ids', 'auto-delayed-duplicate-ids', 'auto-slow-duplicate-submit', 'auto-completed-hidden-duplicate', 'auto-failure', 'auto-page-switch', 'auto-completed', 'auto-pause-pending', 'auto-alert-modal', 'auto-progress', 'auto-progress-late-dom', 'video-sequence', 'video-summary', 'video-stall', 'reading-sequence', 'reading-summary', 'reading-noop', 'log-copy', 'locate-pending', 'locate-unknown', 'locate-replaced'].indexOf(mockLocation.acceptance.mode) >= 0;
  const bodyMarkup = autoMode ? renderAutoBody(mockLocation.acceptance) : mockLocation.acceptance.lmsTextbookId ? '<button data-bind="click: $component.learnChapter">继续学习</button>' : '';
  const duplicateScriptTag = options.duplicateScript ? '<script src="userscript-duplicate.js"></script>' : '';
  const html = `<!doctype html><html><head><meta charset="utf-8">
<script>window.__mockLocation=${JSON.stringify(mockLocation)};</script>
<script>${fixtureScript}</script>
<script src="userscript.js"></script>
${duplicateScriptTag}
<script>${runnerScript}</script>
</head><body>${bodyMarkup}<pre id="acceptance-result">pending</pre></body></html>`;
  fs.writeFileSync(path.join(profile, 'userscript.js'), wrappedSource, 'utf8');
  if (options.duplicateScript) fs.writeFileSync(path.join(profile, 'userscript-duplicate.js'), wrappedSource, 'utf8');
  const htmlPath = path.join(profile, 'fixture.html');
  fs.writeFileSync(htmlPath, html, 'utf8');

  const args = [
    '--headless=new', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage', '--no-proxy-server',
    '--disable-background-networking', '--disable-component-update', '--disable-default-apps',
    '--disable-extensions', '--disable-sync', '--no-first-run', '--no-default-browser-check',
    '--disable-features=HttpsUpgrades,HttpsFirstBalancedModeAutoEnable,MediaRouter',
    `--user-data-dir=${profile}`, `--virtual-time-budget=${options.virtualTimeBudget || 8000}`, '--dump-dom',
    pathToFileURL(htmlPath).href
  ];
  if (options.screenshotPath) {
    args.splice(args.length - 1, 0, '--window-size=1280,800', `--screenshot=${path.resolve(options.screenshotPath)}`);
  }
  try {
    const output = execFileSync(chromePath, args, { encoding: 'utf8', timeout: options.timeout || 30000, maxBuffer: 32 * 1024 * 1024, windowsHide: true });
    const match = output.match(/<pre id="acceptance-result">([\s\S]*?)<\/pre>/);
    assert.ok(match, `Acceptance result missing from Chrome output:\n${output.slice(-1000)}`);
    return JSON.parse(match[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
  } finally {
    const tempRoot = path.resolve(os.tmpdir()) + path.sep;
    const resolvedProfile = path.resolve(profile);
    assert.ok(resolvedProfile.startsWith(tempRoot) && path.basename(resolvedProfile).startsWith('ulearning-helper-acceptance-'), 'Refusing to remove a non-test Chrome profile');
    fs.rmSync(resolvedProfile, { recursive: true, force: true });
  }
}

test('userscript syntax and network permissions are declared', () => {
  execFileSync(process.execPath, ['--check', sourcePath], { encoding: 'utf8' });
  assert.match(source, /^\/\/ @version\s+4\.4\.11$/m);
  const metadataIcon = source.match(/^\/\/ @icon\s+(data:image\/(?:png|svg\+xml);base64,[^\r\n]+)$/m);
  const panelIcon = source.match(/var LOGO_URI = '(data:image\/(?:png|svg\+xml);base64,[^']+)';/);
  assert.ok(metadataIcon && panelIcon, 'custom script and panel icons should be embedded');
  assert.match(metadataIcon[1], /^data:image\/svg\+xml;base64,/);
  assert.equal(panelIcon[1], metadataIcon[1], 'panel should reuse the existing embedded SVG icon');
  assert.match(source, /^\/\/ @connect\s+self$/m);
  assert.match(source, /^\/\/ @connect\s+api\.dgut\.edu\.cn$/m);
  assert.match(source, /^\/\/ @connect\s+api\.ulearning\.cn$/m);
});

test('all active v4.4.11 userscript copies are byte-identical', () => {
  const crypto = require('node:crypto');
  const activeCopies = [
    sourcePath,
    path.join(root, '莞工小蟑螂-优学院全能助手 v4.4.11.user.js'),
    path.join(root, 'xz-ulearning-helper', '莞工小蟑螂-优学院全能助手.user.js'),
    path.join(root, 'xz-ulearning-helper', '莞工小蟑螂-优学院全能助手 v4.4.11.user.js')
  ];
  const hashes = activeCopies.map(file => {
    const copy = fs.readFileSync(file, 'utf8');
    assert.match(copy, /^\/\/ @version\s+4\.4\.11$/m, file);
    return crypto.createHash('sha256').update(copy, 'utf8').digest('hex');
  });
  assert.ok(hashes.every(hash => hash === hashes[0]), `v4.4.11 copy hashes differ: ${hashes.join(', ')}`);
});

test('page locator skips locked pages, confirms native navigation, and never starts learning', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=course-A', { acceptance: { mode: 'locate-pending' } });
  assert.equal(result.activeIndex, 2);
  assert.match(result.locateStatus, /已到第 3 页/);
  assert.equal(result.autoStarted, false);
  assert.deepEqual(result.errors, []);
});

test('page locator rebinds to a replaced page list and waits for stable active state', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=course-A', { acceptance: { mode: 'locate-replaced' } });
  assert.equal(result.activeIndex, 2);
  assert.match(result.locateStatus, /已到第 3 页/);
  assert.equal(result.autoStarted, false);
  assert.deepEqual(result.errors, []);
});

test('page locator refuses to guess when the platform has no completion markers', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=course-A', { acceptance: { mode: 'locate-unknown' } });
  assert.equal(result.activeIndex, 0);
  assert.match(result.locateStatus, /没有提供完成标记/);
  assert.equal(result.autoStarted, false);
  assert.deepEqual(result.errors, []);
});

test('seven taps reveal a reversible mascot easter egg without changing the icon', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=course-A', { acceptance: { mode: 'easter' } });
  assert.equal(result.hiddenBeforeSeventh, true);
  assert.equal(result.openAfterSeventh, true);
  assert.equal(result.messageChanged, true);
  assert.equal(result.closed, true);
  assert.equal(result.iconStable, true);
  assert.equal(result.nativeCursors, true);
  assert.deepEqual(result.errors, []);
});

test('capsule navigation opens the relevant function and returns from About', () => {
  const cases = [
    ['ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=course-A', '课件学习页', 'auto', ['auto','export','reading']],
    ['lms.dgut.edu.cn', '/ulearning/index.html#/course/textbook?courseId=course-A', '课件目录页', 'export', ['export']],
    ['lms.dgut.edu.cn', '/ulearning/index.html#/questionTrain/practice/111/222/1', '题库训练页', 'export', ['export']]
  ];
  cases.forEach(function (entry, index) {
    const result = runChrome(entry[0], entry[1], {
      acceptance: { mode: 'ui-only' },
      screenshotPath: index === 0 ? path.join(root, 'screenshots', 'v4.4.11-acceptance-auto.png') : undefined
    });
    assert.equal(result.pageName, entry[2]);
    assert.equal(result.initialView, entry[3]);
    assert.equal(result.selectedView, entry[3]);
    assert.deepEqual(result.availableViews, entry[4]);
    assert.equal(result.aboutView, 'about');
    assert.equal(result.returnView, entry[3]);
    assert.ok(result.layoutWidth >= 300 && result.layoutWidth <= 430);
    assert.ok(result.visibleCards >= 2);
    assert.deepEqual(result.errors, []);
  });
  const unknown = runChrome('lms.dgut.edu.cn', '/ulearning/index.html#/home', { acceptance: { mode: 'ui-only' } });
  assert.equal(unknown.pageName, '其他页面');
  assert.equal(unknown.initialView, 'home');
  assert.deepEqual(unknown.availableViews, []);
  const autoPreview = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=course-A', {
    acceptance: { mode: 'ui-only', previewTab: 'reading' },
    screenshotPath: path.join(root, 'screenshots', 'v4.4.11-acceptance-reading.png')
  });
  const exportPreview = runChrome('lms.dgut.edu.cn', '/ulearning/index.html#/course/textbook?courseId=course-A', {
    acceptance: { mode: 'ui-only', previewTab: 'export' },
    screenshotPath: path.join(root, 'screenshots', 'v4.4.11-acceptance-export.png')
  });
  assert.equal(autoPreview.previewView, 'xz-sec-reading');
  assert.equal(exportPreview.previewView, 'xz-sec-export');
  assert.equal(autoPreview.activeView, 'reading');
  assert.equal(exportPreview.activeView, 'export');
  const darkPreview = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=course-A', {
    acceptance: { mode: 'ui-only', previewTab: 'auto', darkMode: true },
    screenshotPath: path.join(root, 'screenshots', 'v4.4.11-acceptance-dark.png')
  });
  assert.equal(darkPreview.darkMode, true);
});

test('capsule controls and fixed actions keep auto learning and reading mutually exclusive', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=course-A', {
    acceptance: { mode: 'pill-interaction' }
  });
  assert.equal(result.initialView, 'auto');
  assert.equal(result.advancedClosed, true);
  assert.equal(result.advancedOpened, true);
  assert.equal(result.autoIndicator, true);
  assert.equal(result.readingSelected, true);
  assert.equal(result.readingDockVisible, true);
  assert.equal(result.autoPausedOnReading, true);
  assert.equal(result.readingStarted, true);
  assert.equal(result.readingPausedOnAuto, true, JSON.stringify(result));
  assert.equal(result.autoRestarted, true);
  assert.deepEqual(result.errors, []);
});

test('six video pages continue when the page replaces videos and chapter containers', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=mock-course', {
    acceptance: { mode: 'video-sequence' }, virtualTimeBudget: 16000, timeout: 40000
  });
  assert.equal(result.completed, true, JSON.stringify(result));
  assert.equal(result.sequenceClicks, 6);
  assert.equal(result.prematureClicks, 0);
  assert.equal(result.stalePlayCalls, 0);
  assert.deepEqual(result.errors, []);
});

test('video flow crosses a fixed-position chapter summary and continues', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=mock-course', {
    acceptance: { mode: 'video-summary' }, virtualTimeBudget: 16000, timeout: 40000
  });
  assert.equal(result.completed, true, JSON.stringify(result));
  assert.equal(result.summaryShown, true);
  assert.equal(result.summaryOffsetParentNull, true);
  assert.equal(result.summaryForwardClicks, 1);
  assert.equal(result.sequenceClicks, 6);
  assert.equal(result.prematureClicks, 0);
  assert.deepEqual(result.errors, []);
});

test('reading flow crosses chapter summary without submitting quiz controls', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=mock-course', {
    acceptance: { mode: 'reading-summary' }, virtualTimeBudget: 16000, timeout: 40000
  });
  assert.equal(result.timedOut, false, JSON.stringify(result));
  assert.equal(result.readingPages, 5);
  assert.equal(result.summaryShown, true);
  assert.equal(result.summaryOffsetParentNull, true);
  assert.equal(result.summaryForwardClicks, 1);
  assert.equal(result.unwantedSubmitClicks || 0, 0);
  assert.deepEqual(result.errors, []);
});

test('stalled video pauses with a visible reason instead of silently remaining active', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=mock-course', {
    acceptance: { mode: 'video-stall' }, virtualTimeBudget: 12000, timeout: 30000
  });
  assert.equal(result.timedOut, false, JSON.stringify(result));
  assert.match(result.progressText, /视频连续 4 次未播放或进度未变化，自动流程已暂停/);
  assert.equal(result.startButton, '开始自动刷课');
  assert.deepEqual(result.errors, []);
});

test('reading timer confirms five page changes before counting them', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=mock-course', {
    acceptance: { mode: 'reading-sequence' }, virtualTimeBudget: 13000, timeout: 30000
  });
  assert.equal(result.timedOut, false, JSON.stringify(result));
  assert.equal(result.readingPages, 5);
  assert.equal(result.readingClicks, 5);
  assert.deepEqual(result.errors, []);
});

test('reading flow stops after three no-op page clicks without false progress', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=mock-course', {
    acceptance: { mode: 'reading-noop' }, virtualTimeBudget: 16000, timeout: 30000
  });
  assert.equal(result.timedOut, false, JSON.stringify(result));
  assert.equal(result.readingPages, 0);
  assert.equal(result.readingClicks, 3);
  assert.equal(result.readingStopped, true);
  assert.ok(result.logs.some(function (line) { return line.indexOf('翻页未确认') >= 0; }));
  assert.deepEqual(result.errors, []);
});

test('DGUT learnCourse route exports with the configured API host and query parameters', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=course-A&classId=class-A&chapterId=chapter-A');
  assert.equal(result.timedOut, false, JSON.stringify(result));
  assert.equal(result.buttonText, '开始导出课件题库');
  assert.equal(result.authSeen, true);
  assert.ok(result.requests.length >= 3);
  assert.equal(new URL(result.requests[0].url).origin, 'https://api.dgut.edu.cn');
  assert.match(result.requests[0].url, /\/uaapi\/course\/stu\/course-A\/directory\?classId=class-A$/);
  assert.ok(result.requests.some(request => request.url.includes('/uaapi/wholepage/chapter/stu/chapter-A')));
  assert.ok(result.requests.some(request => request.url.includes('/uaapi/questionAnswer/question-A?parentId=page-A')));
  assert.equal(result.downloadQuestions.length, 1);
  assert.equal(result.downloadQuestions[0]['题干'], 'Mock question');
  assert.equal(result.downloadQuestions[0]['答案'], 'A');
  assert.deepEqual(result.errors, []);
});

test('DGUT urlStyle=2 uses the same-origin UA API proxy for directory and answers', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=course-A&classId=class-A', {
    acceptance: { mode: 'export', urlStyle2: true }
  });
  assert.equal(result.timedOut, false, JSON.stringify(result));
  assert.ok(result.requests.length >= 3);
  assert.ok(result.requests.every(request => new URL(request.url).origin === 'https://ua.dgut.edu.cn'));
  assert.ok(result.requests.some(request => request.url.includes('/uaapi/questionAnswer/question-A')));
  assert.equal(result.downloadQuestions.length, 1);
  assert.deepEqual(result.errors, []);
});

test('DGUT LMS textbook view resolves the textbook ID before exporting', () => {
  const result = runChrome('lms.dgut.edu.cn', '/ulearning/index.html#/course/textbook?courseId=lms-course-A', {
    acceptance: { mode: 'export', lmsTextbookId: 'course-A', urlStyle2: true }
  });
  assert.equal(result.timedOut, false, JSON.stringify(result));
  assert.ok(result.requests.some(request => request.url.includes('/uaapi/course/stu/course-A/directory')));
  assert.ok(result.requests.every(request => !request.url.includes('/uaapi/course/stu/lms-course-A/directory')));
  assert.equal(result.downloadQuestions.length, 1);
  assert.deepEqual(result.errors, []);
});

test('a completed real-style question page advances without requesting or resubmitting an answer', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=course-A', {
    acceptance: { mode: 'auto-completed' }, virtualTimeBudget: 6000
  });
  assert.equal(result.timedOut, false, JSON.stringify(result));
  assert.equal(result.completedPageClicks, 1);
  assert.equal(result.submitCount, 0);
  assert.equal(result.requests.filter(request => /\/questionAnswer\//.test(request.url)).length, 0);
  assert.ok(result.logs.some(line => line.includes('当前页题目已完成，跳过重复提交')));
  assert.deepEqual(result.errors, []);
});

test('double-clicking export starts only one export and writes one history entry', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=course-A', {
    acceptance: { mode: 'double-export' }
  });
  assert.equal(result.timedOut, false, JSON.stringify(result));
  assert.equal(result.requests.filter(request => new URL(request.url).pathname.endsWith('/directory')).length, 1);
  assert.equal(result.downloadQuestions.length, 1);
  const history = JSON.parse(result.storage.xz_export_history);
  assert.equal(history.length, 1);
  assert.equal(result.errors.length, 0);
});

test('standard ULearning course route uses api.ulearning.cn', () => {
  const result = runChrome('ua.ulearning.cn', '/learnCourse/learnCourse.html?courseId=course-A&classId=class-A');
  assert.equal(result.timedOut, false, JSON.stringify(result));
  assert.equal(new URL(result.requests[0].url).origin, 'https://api.ulearning.cn');
  assert.ok(result.requests.some(request => request.url.includes('/api/v2/learnCourse/courseDirectory')));
  assert.equal(result.downloadQuestions.length, 1);
  assert.deepEqual(result.errors, []);
});

test('LMS textbook hash route is treated as a course route and reads hash parameters', () => {
  const result = runChrome('lms.dgut.edu.cn', '/ulearning/index.html#/course/textbook?courseId=lms-hash-course&textbookId2=hash-course&classId=hash-class');
  assert.equal(result.timedOut, false, JSON.stringify(result));
  assert.equal(result.buttonText, '开始导出课件题库');
  assert.equal(new URL(result.requests[0].url).origin, 'https://api.dgut.edu.cn');
  assert.match(result.requests[0].url, /\/course\/stu\/hash-course\/directory\?classId=hash-class$/);
  assert.equal(result.downloadQuestions.length, 1);
  assert.deepEqual(result.errors, []);
});

test('LMS questionTrain practice route remains a training export route', () => {
  const result = runChrome('lms.dgut.edu.cn', '/ulearning/index.html#/questionTrain/practice/111/222/1');
  assert.equal(result.timedOut, false, JSON.stringify(result));
  assert.equal(result.buttonText, '开始导出训练题库');
  assert.ok(result.requests.some(request => request.url.includes('/utestapi/questionTraining/student/answerSheet')));
  assert.equal(new URL(result.requests[0].url).origin, 'https://api.dgut.edu.cn');
  assert.equal(result.downloadQuestions.length, 1);
  assert.equal(result.downloadQuestions[0]['题干'], 'Mock training question');
  assert.deepEqual(result.errors, []);
});

test('chapterId query parameter is used as the answer request parent fallback', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=course-A&chapterId=chapter-A', {
    acceptance: {
      mode: 'auto-samples',
      missingParent: true,
      question: { id: 'parent-fallback', kind: 'choice', typeTag: '单选题' },
      answerResponses: { 'parent-fallback': { correctAnswerList: ['A'] } }
    }
  });
  assert.equal(result.timedOut, false, JSON.stringify(result));
  assert.ok(result.requests.some(request => request.url.includes('/uaapi/questionAnswer/parent-fallback?parentId=chapter-A')));
  assert.equal(result.submitCount, 1);
});

test('UA-Authorization cookie is forwarded and missing auth stays empty', () => {
  const uaOnly = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=course-A', { acceptance: { mode: 'export', authMode: 'ua-only' } });
  assert.equal(uaOnly.timedOut, false, JSON.stringify(uaOnly));
  assert.equal(uaOnly.authSeen, true);

  const noAuth = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=course-A', { acceptance: { mode: 'export', authMode: 'none' } });
  assert.equal(noAuth.timedOut, false, JSON.stringify(noAuth));
  assert.equal(noAuth.authSeen, false);

  const lowerCaseHeader = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=course-A', { acceptance: { mode: 'export', authMode: 'lowercase-header' } });
  assert.equal(lowerCaseHeader.timedOut, false, JSON.stringify(lowerCaseHeader));
  assert.equal(lowerCaseHeader.authSeen, true);
});

test('403 stops after one request and shows the status', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=course-A', { acceptance: { mode: 'forbidden' } });
  assert.equal(result.downloadText, '');
  assert.equal(result.requests.length, 1);
  assert.match(result.answerStatus, /HTTP 403/);
  assert.deepEqual(result.errors, []);

  const unauthorized = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=course-A', { acceptance: { mode: 'unauthorized' } });
  assert.equal(unauthorized.requests.length, 1);
  assert.match(unauthorized.answerStatus, /HTTP 401/);
});

test('request timeout retries within the configured limit and shows its stage', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=course-A', {
    acceptance: { mode: 'timeout' },
    virtualTimeBudget: 12000
  });
  assert.equal(result.downloadText, '');
  assert.equal(result.requests.length, 3);
  assert.match(result.answerStatus, /获取课程目录失败: 请求超时/);
});

test('invalid JSON is visible after one same-origin fallback', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=course-A', { acceptance: { mode: 'invalid-json' } });
  assert.equal(result.downloadText, '');
  assert.equal(result.requests.length, 2);
  assert.match(result.answerStatus, /JSON解析失败/);
  assert.deepEqual(result.errors, []);
});

test('HTTP 200 HTML from the old DGUT API falls back to the current same-origin proxy', () => {
  const result = runChrome('lms.dgut.edu.cn', '/ulearning/index.html#/course/textbook?courseId=lms-course-A&textbookId2=course-A&classId=class-A', {
    acceptance: { mode: 'html-fallback' }
  });
  const directoryHosts = result.requests.filter(request => request.url.includes('/directory')).map(request => new URL(request.url).hostname);
  assert.deepEqual(directoryHosts, ['api.dgut.edu.cn', 'lms.dgut.edu.cn']);
  assert.match(result.answerStatus, /完成|成功/);
  assert.deepEqual(result.errors, []);
});

test('retryable server error retries once then completes export', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=course-A', { acceptance: { mode: 'retry-server' } });
  assert.equal(result.timedOut, false, JSON.stringify(result));
  assert.equal(result.requests.filter(request => new URL(request.url).pathname.endsWith('/directory')).length, 2);
  assert.equal(result.downloadQuestions.length, 1);
});

test('cancel aborts the active request and prevents download and history writes', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=course-A', { acceptance: { mode: 'cancel-export' } });
  assert.ok(result.abortCount > 0, JSON.stringify(result));
  assert.equal(result.downloadText, '');
  assert.equal(result.storage && result.storage.xz_export_history, undefined);
  assert.deepEqual(result.errors, []);
});

test('failed answer lookup is reported as a partial result', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=course-A', {
    acceptance: { mode: 'export', failQuestionIds: ['question-A'] }
  });
  assert.equal(result.timedOut, false, JSON.stringify(result));
  assert.equal(result.downloadQuestions.length, 1);
  assert.match(result.answerStatus, /部分答案未取回/);
  assert.match(result.answerStatus, /1.*题答案未取回/);
});

test('empty course directory produces a visible error without a download', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=course-A', { acceptance: { mode: 'empty-directory' } });
  assert.equal(result.downloadText, '');
  assert.match(result.answerStatus, /课程目录为空/);
});

test('chapter with no quiz pages produces a visible error without a download', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=course-A', { acceptance: { mode: 'empty-chapter' } });
  assert.equal(result.downloadText, '');
  assert.match(result.answerStatus, /没有找到练习页面/);
});

test('missing courseId reports a visible route error without a request', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html', { acceptance: { mode: 'missing-course' } });
  assert.equal(result.requests.length, 0);
  assert.equal(result.downloadText, '');
  assert.match(result.answerStatus, /缺少 courseId/);
});

test('auto-answer sample set fills 20 mixed questions without corrupting or truncating text', () => {
  const expectedLong = '说明：A & B < C；请完整保留这一段文字。'.repeat(12);
  assert.ok(expectedLong.length > 200);
  const encodedLong = expectedLong.replace(/&/g, '&amp;amp;').replace(/</g, '&lt;');
  const questions = [];
  const answerResponses = {};
  const expectedFields = [];

  for (let index = 0; index < 20; index += 1) {
    const id = `sample-${String(index + 1).padStart(2, '0')}`;
    const kindIndex = index % 5;
    if (kindIndex === 0) {
      questions.push({ id, kind: 'choice', typeTag: '单选题', title: `单选样本 ${id}` });
      answerResponses[id] = { correctAnswerList: ['A'] };
    } else if (kindIndex === 1) {
      questions.push({ id, kind: 'choice', multiple: true, typeTag: '多选题', title: `多选样本 ${id}` });
      answerResponses[id] = { correctAnswerList: ['A', 'B'] };
    } else if (kindIndex === 2) {
      questions.push({ id, kind: 'judge', typeTag: '判断题', title: `判断样本 ${id}` });
      answerResponses[id] = { correctAnswerList: ['true'] };
    } else if (kindIndex === 3) {
      questions.push({ id, kind: 'blank', blankCount: 2, typeTag: '填空题', title: `填空样本 ${id}` });
      answerResponses[id] = { correctAnswerList: ['第一空', '第二空'] };
      expectedFields.push('第一空', '第二空');
    } else {
      questions.push({ id, kind: 'essay', typeTag: '简答题', title: `长文本样本 ${id}` });
      answerResponses[id] = { correctAnswerList: [encodedLong] };
      expectedFields.push(expectedLong);
    }
  }

  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=mock-course', {
    acceptance: { mode: 'auto-samples', questions, answerResponses },
    virtualTimeBudget: 30000,
    timeout: 45000
  });
  assert.equal(result.timedOut, false, JSON.stringify(result));
  assert.equal(result.submitCount, 1);
  assert.equal(result.failureLogs.length, 0, JSON.stringify(result.failureLogs));
  assert.equal(result.answerValues.length, expectedFields.length);
  assert.deepEqual(result.answerValues, expectedFields);
  assert.ok(result.answerValues.every(value => !value.includes('&amp;')));
  assert.ok(result.answerValues.filter(value => value === expectedLong).length === 4);
  assert.equal(result.selectedChoices, 12);
  assert.equal(result.selectedJudgeButtons, 4);
  assert.deepEqual(result.errors, []);
});

for (const mode of ['auto-double', 'auto-staged']) {
  test(`${mode} answers and submits both exercise groups before advancing`, () => {
    const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=mock-course', {
      acceptance: {
        mode,
        answerResponses: {
          'group-one': { correctAnswerList: ['第一组答案'] },
          'group-two': { correctAnswerList: ['第二组完整简答'] }
        }
      },
      virtualTimeBudget: 30000,
      timeout: 45000
    });
    assert.equal(result.timedOut, false, JSON.stringify(result.logs && result.logs.slice(-15)));
    assert.equal(result.submitCount, 2, JSON.stringify(result.logs && result.logs.slice(-15)));
    assert.deepEqual(result.submitOrder, [1, 2]);
    assert.deepEqual(result.answerValues, ['第一组答案', '第二组完整简答']);
    assert.equal(result.failureLogs.length, 0, JSON.stringify(result.failureLogs));
    assert.deepEqual(result.errors, []);
  });
}

test('same question IDs in two page-element exercise groups fill both copies before each submit', () => {
  const answerResponses = {};
  const expectedAnswers = [];
  for (let index = 0; index < 20; index += 1) {
    const id = String(16841366 + index);
    const answer = `简答答案${index + 1}`;
    answerResponses[id] = { correctAnswerList: [answer] };
    expectedAnswers.push(answer);
  }
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=mock-course', {
    acceptance: { mode: 'auto-duplicate-ids', answerResponses },
    virtualTimeBudget: 30000,
    timeout: 45000
  });
  assert.equal(result.timedOut, false, JSON.stringify(result.logs && result.logs.slice(-15)));
  assert.equal(result.requests.filter(request => /\/questionAnswer\//.test(request.url)).length, 20);
  assert.equal(result.submitCount, 2, JSON.stringify(result.logs && result.logs.slice(-15)));
  assert.deepEqual(result.submitOrder, [1, 2]);
  assert.deepEqual(result.exerciseGroupPendingCounts, [0, 0]);
  assert.deepEqual(result.answerValues, expectedAnswers.concat(expectedAnswers));
  assert.equal(result.failureLogs.length, 0, JSON.stringify(result.failureLogs));
  assert.deepEqual(result.errors, []);
});

test('a staged second exercise with reused IDs is detected and answered before it can be submitted', () => {
  const answerResponses = {};
  const expectedAnswers = [];
  for (let index = 0; index < 20; index += 1) {
    const id = String(16841366 + index);
    const answer = `分阶段简答答案${index + 1}`;
    answerResponses[id] = { correctAnswerList: [answer] };
    expectedAnswers.push(answer);
  }
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=mock-course', {
    acceptance: { mode: 'auto-staged-duplicate-ids', answerResponses },
    virtualTimeBudget: 30000,
    timeout: 45000
  });
  assert.equal(result.timedOut, false, JSON.stringify(result.logs && result.logs.slice(-15)));
  assert.equal(result.requests.filter(request => /\/questionAnswer\//.test(request.url)).length, 40);
  assert.equal(result.submitCount, 2, JSON.stringify(result.logs && result.logs.slice(-15)));
  assert.deepEqual(result.submitOrder, [1, 2]);
  assert.deepEqual(result.exerciseGroupPendingCounts, [0, 0]);
  assert.deepEqual(result.answerValues, expectedAnswers.concat(expectedAnswers));
  assert.equal(result.failureLogs.length, 0, JSON.stringify(result.failureLogs));
  assert.deepEqual(result.errors, []);
});

test('a second exercise delayed after the first submit is answered before navigation resumes', () => {
  const answerResponses = {};
  const expectedAnswers = [];
  for (let index = 0; index < 20; index += 1) {
    const id = String(16841366 + index);
    const answer = `延迟题组答案${index + 1}`;
    answerResponses[id] = { correctAnswerList: [answer] };
    expectedAnswers.push(answer);
  }
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=mock-course', {
    acceptance: { mode: 'auto-delayed-duplicate-ids', answerResponses },
    virtualTimeBudget: 30000,
    timeout: 45000
  });
  assert.equal(result.timedOut, false, JSON.stringify(result.logs && result.logs.slice(-18)));
  assert.equal(result.requests.filter(request => /\/questionAnswer\//.test(request.url)).length, 40);
  assert.equal(result.submitCount, 2, JSON.stringify(result.logs && result.logs.slice(-18)));
  assert.deepEqual(result.submitOrder, [1, 2]);
  assert.ok(result.secondExerciseShownAt - result.firstGroupCompletedAt >= 1700);
  assert.ok(result.submitTimes[1] >= result.secondExerciseShownAt);
  assert.deepEqual(result.exerciseGroupPendingCounts, [0, 0]);
  assert.deepEqual(result.answerValues, expectedAnswers.concat(expectedAnswers));
  assert.equal(result.failureLogs.length, 0, JSON.stringify(result.failureLogs));
  assert.deepEqual(result.errors, []);
});

test('a second submit waits until the first exercise group reports completion', () => {
  const answerResponses = {};
  const expectedAnswers = [];
  for (let index = 0; index < 20; index += 1) {
    const id = String(16841366 + index);
    const answer = `顺序题组答案${index + 1}`;
    answerResponses[id] = { correctAnswerList: [answer] };
    expectedAnswers.push(answer);
  }
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=mock-course', {
    acceptance: { mode: 'auto-slow-duplicate-submit', answerResponses },
    virtualTimeBudget: 30000,
    timeout: 45000
  });
  assert.equal(result.timedOut, false, JSON.stringify(result.logs && result.logs.slice(-18)));
  assert.equal(result.requests.filter(request => /\/questionAnswer\//.test(request.url)).length, 40);
  assert.equal(result.submitCount, 2, JSON.stringify(result.logs && result.logs.slice(-18)));
  assert.deepEqual(result.submitOrder, [1, 2]);
  assert.ok(result.secondExerciseShownAt < result.firstGroupCompletedAt, JSON.stringify(result));
  assert.ok(result.secondGroupFirstAnswerAt >= result.firstGroupCompletedAt, JSON.stringify(result));
  assert.ok(result.submitTimes[1] >= result.firstGroupCompletedAt);
  assert.deepEqual(result.exerciseGroupPendingCounts, [0, 0]);
  assert.deepEqual(result.answerValues, expectedAnswers.concat(expectedAnswers));
  assert.equal(result.failureLogs.length, 0, JSON.stringify(result.failureLogs));
  assert.deepEqual(result.errors, []);
});

test('a completed visible group does not hide a pending duplicate-ID group that appears later', () => {
  const answerResponses = {};
  const expectedAnswers = [];
  for (let index = 0; index < 20; index += 1) {
    const id = String(16841366 + index);
    const answer = `已完成后续组答案${index + 1}`;
    answerResponses[id] = { correctAnswerList: [answer] };
    expectedAnswers.push(answer);
  }
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=mock-course', {
    acceptance: { mode: 'auto-completed-hidden-duplicate', answerResponses },
    virtualTimeBudget: 30000,
    timeout: 45000
  });
  assert.equal(result.timedOut, false, JSON.stringify(result.logs && result.logs.slice(-18)));
  assert.equal(result.requests.filter(request => /\/questionAnswer\//.test(request.url)).length, 20);
  assert.equal(result.submitCount, 1, JSON.stringify(result.logs && result.logs.slice(-18)));
  assert.deepEqual(result.submitOrder, [2]);
  assert.ok(result.secondExerciseShownAt > 0);
  assert.deepEqual(result.exerciseGroupPendingCounts, [0, 0]);
  assert.deepEqual(result.answerValues.slice(20), expectedAnswers);
  assert.equal(result.failureLogs.length, 0, JSON.stringify(result.failureLogs));
  assert.deepEqual(result.errors, []);
});

test('unfinished-question leave prompt keeps the page open without submitting or leaving', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=mock-course', {
    acceptance: { mode: 'auto-alert-modal' },
    virtualTimeBudget: 8000
  });
  assert.equal(result.timedOut, false, JSON.stringify(result.logs && result.logs.slice(-12)));
  assert.equal(result.alertStayCount, 1, JSON.stringify(result.logs && result.logs.slice(-12)));
  assert.equal(result.alertLeaveCount, 0);
  assert.equal(result.questionSubmitCount, 0);
  assert.equal(result.alertOpen, false);
  assert.equal(result.pendingQuestionCount, 1);
  assert.ok(result.logs.some(line => line.includes('检测到未完成题离页确认，留在当前页')));
  assert.ok(result.logs.some(line => line.includes('当前页仍有 1 道未完成题目')));
  assert.deepEqual(result.errors, []);
});

test('20 answer samples preserve HTML-decoded blanks and full essay text', () => {
  const questions = [];
  const answerResponses = {};
  const expectedValues = [];
  for (let i = 0; i < 5; i += 1) {
    const id = `choice-${i}`;
    questions.push({ id, kind: 'choice', typeTag: '单选题', title: `选择题 ${i + 1}` });
    answerResponses[id] = { correctAnswerList: ['A'] };
  }
  for (let i = 0; i < 5; i += 1) {
    const id = `judge-${i}`;
    const answer = i % 2 === 0 ? 'true' : 'false';
    questions.push({ id, kind: 'judge', typeTag: '判断题', title: `判断题 ${i + 1}` });
    answerResponses[id] = { correctAnswerList: [answer] };
  }
  for (let i = 0; i < 5; i += 1) {
    const id = `blank-${i}`;
    const values = [`第${i + 1}题甲 &amp; 乙`, `第${i + 1}题丙 &amp;amp; 丁`];
    questions.push({ id, kind: 'blank', typeTag: '填空题', title: `多空填空 ${i + 1}`, blankCount: 2 });
    answerResponses[id] = { correctAnswerList: values };
    expectedValues.push(...values.map(value => value.replace(/&amp;amp;/g, '&').replace(/&amp;/g, '&')));
  }
  for (let i = 0; i < 5; i += 1) {
    const id = `essay-${i}`;
    const answer = `<p>第${i + 1}题开头 &amp; 过程 <strong>结论</strong></p>${'答'.repeat(230)}&amp;amp;尾`;
    questions.push({ id, kind: 'essay', typeTag: '简答题', title: `简答题 ${i + 1}` });
    answerResponses[id] = { correctAnswerList: [answer] };
    expectedValues.push(`第${i + 1}题开头 & 过程 结论${'答'.repeat(230)}&尾`);
  }

  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html', {
    acceptance: { mode: 'auto-samples', questions, answerResponses },
    virtualTimeBudget: 15000,
    timeout: 60000
  });
  assert.equal(result.timedOut, false, JSON.stringify(result.logs && result.logs.slice(-12)));
  assert.equal(result.submitCount, 1, JSON.stringify(result.failureLogs));
  assert.equal(result.requests.filter(request => request.url.includes('/uaapi/questionAnswer/')).length, 20);
  assert.equal(result.selectedChoices, 5);
  assert.equal(result.selectedJudgeButtons, 5);
  assert.deepEqual(result.answerValues, expectedValues);
  assert.equal(result.errors.length, 0, JSON.stringify(result.errors));
});

test('nested multi-blank fields count only editable controls and preserve answer order', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html', {
    acceptance: { mode: 'auto-samples', questions: [
      { id: 'multi-blank', kind: 'blank', typeTag: '填空题', blankCount: 3, nestedField: true }
    ], answerResponses: { 'multi-blank': { correctAnswerList: ['甲', '乙', '丙'] } } },
    virtualTimeBudget: 6000
  });
  assert.equal(result.timedOut, false, JSON.stringify(result.logs && result.logs.slice(-8)));
  assert.deepEqual(result.answerValues, ['甲', '乙', '丙']);
  assert.equal(result.submitCount, 1);
  assert.deepEqual(result.failureLogs, []);
});

test('essay keeps every answer part and supports editable rich-text controls', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html', {
    acceptance: { mode: 'auto-samples', questions: [
      { id: 'essay-parts', kind: 'essay', typeTag: '简答题', richField: true }
    ], answerResponses: { 'essay-parts': { correctAnswerList: ['第一段', '第二段'] } } },
    virtualTimeBudget: 6000
  });
  assert.equal(result.timedOut, false, JSON.stringify(result.logs && result.logs.slice(-8)));
  assert.deepEqual(result.answerValues, ['第一段\n第二段']);
  assert.equal(result.submitCount, 1);
  assert.deepEqual(result.failureLogs, []);
});

test('mixed completed and pending questions request only the pending answer', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html', {
    acceptance: { mode: 'auto-samples', questions: [
      { id: 'done', kind: 'choice', typeTag: '单选题', finished: true },
      { id: 'pending', kind: 'blank', typeTag: '填空题', blankCount: 2 }
    ], answerResponses: { pending: { correctAnswerList: ['前', '后'] } } },
    virtualTimeBudget: 6000
  });
  assert.equal(result.timedOut, false, JSON.stringify(result.logs && result.logs.slice(-8)));
  assert.deepEqual(result.answerValues, ['前', '后']);
  assert.equal(result.submitCount, 1);
  assert.equal(result.requests.filter(request => request.url.includes('/questionAnswer/')).length, 1);
  assert.ok(result.requests.some(request => request.url.includes('/questionAnswer/pending')));
});

test('pausing during an answer request leaves the page unchanged after the response arrives', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html', {
    acceptance: { mode: 'auto-pause-pending', questions: [
      { id: 'late-answer', kind: 'blank', typeTag: '填空题', blankCount: 2 }
    ], answerResponses: { 'late-answer': { correctAnswerList: ['甲', '乙'] } } },
    virtualTimeBudget: 6000
  });
  assert.equal(result.timedOut, false, JSON.stringify(result.logs && result.logs.slice(-8)));
  assert.deepEqual(result.answerValues, ['', '']);
  assert.equal(result.submitCount, 0);
  assert.ok(result.pauseRequestedAt > 0);
});

test('12 injected answer and submit failures never submit and log question plus stage', () => {
  const scenarios = [
    { name: 'request failure', question: { id: 'Q1', kind: 'choice', typeTag: '单选题' }, failQuestionIds: ['Q1'], stage: '答案请求' },
    { name: 'empty answer', question: { id: 'Q1', kind: 'choice', typeTag: '单选题' }, answerResponses: { Q1: { correctAnswerList: [] } }, stage: '答案解析' },
    { name: 'unknown type', question: { id: 'Q1', kind: 'unknown', typeTag: '排序题' }, stage: '答案写入' },
    { name: 'missing answer field', question: { id: 'Q1', kind: 'blank', typeTag: '填空题', missingField: true }, stage: '答案写入' },
    { name: 'field write failure', question: { id: 'Q1', kind: 'blank', typeTag: '填空题', writeFailure: true }, stage: '答案写入' },
    { name: 'multi-blank answer count mismatch', question: { id: 'Q1', kind: 'blank', typeTag: '填空题', blankCount: 2 }, answerResponses: { Q1: { correctAnswerList: ['只有一个'] } }, stage: '答案写入' },
    { name: 'essay field count mismatch', question: { id: 'Q1', kind: 'essay', typeTag: '简答题', fieldCount: 2 }, answerResponses: { Q1: { correctAnswerList: ['只有一段'] } }, stage: '答案写入' },
    { name: 'unmatched choice', question: { id: 'Q1', kind: 'choice', typeTag: '单选题' }, answerResponses: { Q1: { correctAnswerList: ['Z'] } }, stage: '答案写入' },
    { name: 'missing submit button', question: { id: 'Q1', kind: 'choice', typeTag: '单选题' }, submitButton: 'missing', stage: '提交按钮' },
    { name: 'disabled submit button', question: { id: 'Q1', kind: 'choice', typeTag: '单选题' }, submitButton: 'disabled', stage: '提交按钮' },
    { name: 'hidden submit button', question: { id: 'Q1', kind: 'choice', typeTag: '单选题' }, submitButton: 'hidden', stage: '提交按钮' },
    { name: 'missing parent page id', question: { id: 'Q1', kind: 'choice', typeTag: '单选题' }, missingParent: true, stage: '页面编号' }
  ];
  for (const scenario of scenarios) {
    const acceptance = Object.assign({ mode: 'auto-failure' }, scenario, {
      answerResponses: scenario.answerResponses || { Q1: { correctAnswerList: ['A'] } }
    });
    const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html', {
      acceptance,
      virtualTimeBudget: 6000,
      timeout: 30000
    });
    assert.equal(result.timedOut, false, `${scenario.name}: ${JSON.stringify(result.logs && result.logs.slice(-10))}`);
    assert.equal(result.submitCount, 0, `${scenario.name} submitted: ${JSON.stringify(result.logs && result.logs.slice(-10))}`);
    assert.ok(result.failureLogs.some(line => line.includes('Q1') && line.includes(`[阶段: ${scenario.stage}]`)), `${scenario.name}: missing question/stage log ${JSON.stringify(result.failureLogs)}`);
    assert.equal(result.errors.length, 0, `${scenario.name}: ${JSON.stringify(result.errors)}`);
  }
});

test('repeated initialization keeps one panel and MutationObserver restores a removed panel', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html', {
    acceptance: { mode: 'panel-recovery' },
    duplicateScript: true,
    virtualTimeBudget: 5000
  });
  assert.equal(result.timedOut, false, JSON.stringify(result.errors));
  assert.equal(result.panelCount, 1);
  assert.equal(result.floatCount, 1);
  assert.equal(result.errors.length, 0);
});

test('saved offscreen layout recovers, dragging stays visible, and reset clears layout', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html', {
    acceptance: { mode: 'layout-recovery', storage: {
      xz_panel_pos: JSON.stringify({ left: -6000, top: 9000 }),
      xz_panel_size: JSON.stringify({ width: 500, height: 500 }),
      xz_btn_pos: JSON.stringify({ left: 9000, top: -6000 })
    } }
  });
  assert.equal(result.restoredPanelInside, true);
  assert.equal(result.restoredToggleInside, true);
  assert.equal(result.restoredWidth, 500);
  assert.ok(result.resizedWidth > result.restoredWidth, JSON.stringify({before:result.restoredWidth,after:result.resizedWidth,height:result.resizedHeight,style:result.resizedStyle,errors:result.errors}));
  assert.ok(result.resizedHeight > result.restoredHeight, JSON.stringify(result));
  assert.equal(result.resizedStored, true);
  assert.equal(result.draggedPanelInside, true);
  assert.equal(result.draggedPanelRecovered, true, JSON.stringify(result));
  assert.equal(result.toggleDraggedToEdgeInside, true, JSON.stringify(result));
  assert.equal(result.toggleDragRecovered, true, JSON.stringify(result));
  assert.equal(result.resetWidth, 412);
  assert.equal(result.resetStorage, true);
  assert.equal(result.errors.length, 0, JSON.stringify(result.errors));
});

test('auto progress reads course structure and shows a calibrated course position', () => {
  for (const chapterId of ['item-A', 'unmatched-section']) {
    const result = runChrome('ua.dgut.edu.cn', `/learnCourse/learnCourse.html?courseId=course-A&chapterId=${chapterId}&classId=class-A`, {
      acceptance: { mode: 'auto-progress' }, virtualTimeBudget: 3000
    });
    assert.match(result.progressText, /课程位置 1\/1 页/, JSON.stringify({pageItems:result.pageItems,activeItems:result.activeItems,route:result.route}));
    assert.match(result.progressText, /当前页「第1页」/);
    assert.equal(result.progressWidth, '100%');
    assert.equal(result.progressNow, '1');
    assert.equal(result.progressMax, '1');
    assert.equal(result.chapterRequests, 1);
    assert.equal(result.errors.length, 0, JSON.stringify(result.errors));
  }
});

test('whole-course progress follows the live active page after an asynchronous directory read', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=course-A&classId=class-A', {
    acceptance: { mode: 'auto-progress', progressTwoPages: true }, virtualTimeBudget: 3000
  });
  assert.match(result.progressText, /课程位置 2\/2 页/);
  assert.match(result.progressText, /当前页「专题二」/);
  assert.doesNotMatch(result.progressText, /\uE83D/);
  assert.equal(result.progressNow, '2');
  assert.equal(result.progressMax, '2');
  assert.equal(result.progressWidth, '100%');
  assert.equal(result.errors.length, 0, JSON.stringify(result.errors));
});

test('whole-course progress recalibrates when the full page list appears after pre-read', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=course-A&classId=class-A', {
    acceptance: { mode: 'auto-progress-late-dom', progressThreePages: true }, virtualTimeBudget: 3000
  });
  assert.match(result.progressText, /课程位置 3\/3 页/);
  assert.match(result.progressText, /当前页「专题三」/);
  assert.doesNotMatch(result.progressText, /\uE83D/);
  assert.equal(result.progressNow, '3');
  assert.equal(result.progressMax, '3');
  assert.equal(result.errors.length, 0, JSON.stringify(result.errors));
});

test('auto flow observer resets state after a simulated SPA page change', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=mock-course', {
    acceptance: { mode: 'auto-page-switch' },
    virtualTimeBudget: 5000
  });
  assert.equal(result.timedOut, false, JSON.stringify(result.logs && result.logs.slice(-8)));
  assert.ok(result.logs.some(line => line.includes('检测到页面切换，重置状态')));
  assert.equal(result.errors.length, 0);
});

test('preloads every course chapter with bounded concurrency before first navigation', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=mock-course', {
    acceptance: { mode: 'navigation-delayed-scan', scanChapterCount: 4, chapterDelayMs: 1000 },
    virtualTimeBudget: 45000,
    timeout: 60000
  });
  assert.equal(result.timedOut, false, JSON.stringify(result.logs && result.logs.slice(-8)));
  assert.equal(result.chapterRequestsCompleted, 4);
  assert.equal(result.maxConcurrentChapterRequests, 3);
  assert.ok(result.firstNextAt >= result.lastChapterResponseAt, JSON.stringify({firstNextAt:result.firstNextAt,lastChapterResponseAt:result.lastChapterResponseAt,completed:result.chapterRequestsCompleted}));
  assert.match(result.preloadText, /读取课程内容中.*全课内容预读 [0-4]\/4 专题/);
  assert.equal(result.preloadMax, '4');
  assert.equal(result.preloadLabel, '课程内容预读进度');
  assert.ok(result.logs.some(line => line.includes('全课预读完成，开始学习')));
  assert.deepEqual(result.errors, []);
});

test('pauses automation without navigating when a full-course chapter pre-read fails', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=mock-course', {
    acceptance: { mode: 'navigation-preload-error' },
    virtualTimeBudget: 10000,
    timeout: 30000
  });
  assert.equal(result.timedOut, false, JSON.stringify(result.logs && result.logs.slice(-8)));
  assert.equal(result.navigationClickCount || 0, 0);
  assert.ok(result.logs.some(line => line.includes('课程进度读取失败')));
  assert.ok(result.logs.some(line => line.includes('全课预读失败，自动学习已暂停')));
  assert.deepEqual(result.errors, []);
});

test('slow platform page switch at 16 seconds is confirmed before retrying', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=mock-course', {
    acceptance: { mode: 'navigation-slow-transition' },
    virtualTimeBudget: 25000,
    timeout: 45000
  });
  assert.equal(result.navigationClickCount, 1);
  assert.equal(result.navigationDurations.length, 1);
  assert.ok(result.navigationDurations[0] >= 16000 && result.navigationDurations[0] < 20000, JSON.stringify(result.navigationDurations));
  assert.equal(result.activePage, 1);
  assert.equal(result.navigationFailureLogs.length, 0);
  assert.deepEqual(result.errors, []);
});

test('confirms 20 consecutive DOM page changes within the navigation confirmation window', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=mock-course', {
    acceptance: { mode: 'navigation', scanChapterCount: 21 },
    virtualTimeBudget: 45000,
    timeout: 60000
  });
  assert.equal(result.timedOut, false, JSON.stringify(result.logs && result.logs.slice(-12)));
  assert.equal(result.navigationCount, 20);
  assert.equal(result.navigationClickCount, 20);
  assert.equal(result.progressNow, '21');
  assert.equal(result.progressMax, '21');
  assert.match(result.progressText, /课程位置 21\/21 页 · 当前页「第21页」/);
  assert.ok(result.navigationWithin15Seconds >= 19, JSON.stringify(result));
  assert.equal(result.activePage, 20);
  assert.ok(result.logs.filter(line => line.includes('翻页已确认')).every(line => /当前页「第\d+页」/.test(line)), JSON.stringify(result.logs.filter(line => line.includes('翻页已确认')).slice(0, 3)));
  assert.deepEqual(result.errors, []);
});

test('a next-button click without a page change is never counted as success', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=mock-course', {
    acceptance: { mode: 'navigation-noop' },
    virtualTimeBudget: 25000,
    timeout: 45000
  });
  assert.equal(result.timedOut, false, JSON.stringify(result.logs && result.logs.slice(-12)));
  assert.equal(result.navigationClickCount, 1, JSON.stringify({ logs: result.logs && result.logs.slice(-20), errors: result.errors }));
  assert.equal(result.navigationCount, 0);
  assert.equal(result.navigationDurations.length, 0);
  assert.equal(result.activePageText, '第1页');
  assert.ok(result.navigationFailureLogs.some(line => line.includes('[阶段: 翻页确认]')));
  assert.equal(result.logs.filter(line => line.includes('翻页已确认')).length, 0);
  assert.deepEqual(result.errors, []);
});

test('a transient page marker is not counted as navigation', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=mock-course', {
    acceptance: { mode: 'navigation-transient' },
    virtualTimeBudget: 25000,
    timeout: 45000
  });
  assert.equal(result.timedOut, false, JSON.stringify(result.logs && result.logs.slice(-12)));
  assert.equal(result.navigationClickCount, 1);
  assert.equal(result.navigationCount, 0);
  assert.equal(result.activePageText, '第1页');
  assert.ok(result.navigationFailureLogs.length > 0);
  assert.deepEqual(result.errors, []);
});

test('collapsed run log still copies its recent entries', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=mock-course', {
    acceptance: { mode: 'log-copy' },
    virtualTimeBudget: 2000
  });
  assert.equal(result.logCollapsed, true);
  assert.match(result.copiedLog || '', /启动参数/);
  assert.notEqual(result.copyButtonText, '无内容');
  assert.deepEqual(result.errors, []);
});
