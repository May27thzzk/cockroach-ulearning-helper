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
window.__acceptance = { requests: [], downloadName: '', downloadText: '', authSeen: false, logs: [], errors: [], submitCount: 0, navigationClickAt: 0, navigationDurations: [], abortCount: 0, storageWrites: 0 };
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
const acceptanceConfig = window.__mockLocation.acceptance || {};
window.__acceptance.mode = acceptanceConfig.mode || 'export';
if (acceptanceConfig.darkMode) window.__acceptance.storage = { xz_dark: '1' };

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
const isNavigationMode = acceptanceConfig.mode === 'navigation' || acceptanceConfig.mode === 'navigation-noop';
if ((acceptanceConfig.mode && acceptanceConfig.mode.indexOf('auto-') === 0) || isNavigationMode || ['video-sequence', 'video-stall'].indexOf(acceptanceConfig.mode) >= 0) {
  window.__acceptance.storage = window.__acceptance.storage || {};
  window.__acceptance.storage.xz_autocfg = JSON.stringify({
    rate: 1.5, stayTime: (isNavigationMode || acceptanceConfig.mode === 'video-sequence') ? 0 : 5,
    autoMute: false, autoPlay: isNavigationMode || ['video-sequence', 'video-stall'].indexOf(acceptanceConfig.mode) >= 0,
    autoAnswer: !(isNavigationMode || ['video-sequence', 'video-stall'].indexOf(acceptanceConfig.mode) >= 0), autoSubmit: !isNavigationMode,
    autoNext: isNavigationMode || ['video-sequence', 'video-stall'].indexOf(acceptanceConfig.mode) >= 0, maxRetry: 1,
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
    response = { data: { coursename: 'Acceptance Course', chapters: [
      { nodeid: 'chapter-A', items: [{ title: 'Chapter 1', itemid: 'item-A' }] }
    ] } };
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

  const delayedAnswer = acceptanceConfig.mode === 'cancel-export' && /\/questionAnswer\//i.test(url.pathname);
  const requestTimer = window.setTimeout(function () {
    options.onload({ status: 200, responseText: JSON.stringify(response) });
  }, delayedAnswer ? 5000 : 0);
  return { abort: function () {
    window.clearTimeout(requestTimer);
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
  if (state.mode === 'ui-only') {
    const panel = document.getElementById('xz-panel');
    const primary = panel && panel.querySelector('.xz-home-action');
    state.pageName = panel && panel.querySelector('.xz-context-title').textContent.trim();
    state.primaryAction = primary && primary.querySelector('.xz-home-action-name').textContent.trim();
    state.tabs = Array.from(panel.querySelectorAll('.tab')).map(function (tab) { return tab.textContent.trim(); });
    state.layoutWidth = panel && panel.getBoundingClientRect().width;
    if (primary) {
      primary.click();
      state.targetView = panel.querySelector('.sec.show').id;
      panel.querySelector('.sec.show .back').click();
      state.backView = panel.querySelector('.sec.show').id;
    }
    if (window.__mockLocation.acceptance.previewTab) {
      panel.querySelector('.tab[data-tab="' + window.__mockLocation.acceptance.previewTab + '"]').click();
      state.previewView = panel.querySelector('.sec.show').id;
    }
    state.activeTab = panel.querySelector('.tab.active').dataset.tab;
    state.darkMode = panel.classList.contains('xz-dark');
    result.textContent = JSON.stringify(state);
    return;
  }
  if (state.mode === 'video-sequence') {
    let page = 1;
    state.sequenceClicks = 0;
    state.prematureClicks = 0;
    state.stalePlayCalls = 0;
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
      page += 1;
      window.setTimeout(function () { renderPage(page); }, 20);
    }, true);
    document.querySelector('.tab[data-tab="auto"]').click();
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
    document.querySelector('.tab[data-tab="auto"]').click();
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
  if (state.mode === 'reading-sequence' || state.mode === 'reading-noop') {
    let page = 1;
    state.readingClicks = 0;
    if (state.mode === 'reading-noop') {
      const clockStart = Date.now(), perfStart = performance.now();
      Date.now = function () { return clockStart + (performance.now() - perfStart) * 13; };
    }
    document.addEventListener('click', function (event) {
      if (!event.target.matches('.next-page-btn')) return;
      state.readingClicks += 1;
      if (state.mode === 'reading-noop') return;
      page += 1;
      window.setTimeout(function () {
        const item = document.querySelector('.course-container .page-item');
        item.id = 'page-' + page;
        item.querySelector('.page-name').textContent = '第' + page + '页';
      }, 20);
    }, true);
    document.querySelector('.tab[data-tab="reading"]').click();
    document.getElementById('xz-rd-h').value = '0';
    document.getElementById('xz-rd-m').value = '0';
    document.getElementById('xz-rd-s').value = '1';
    document.getElementById('xz-btn-reading').click();
    let ticks = 0;
    const poll = window.setInterval(function () {
      ticks += 1;
      const pages = Number(document.getElementById('xz-rd-pages').textContent);
      const stopped = document.getElementById('xz-btn-reading').textContent === '开始挂机';
      if ((state.mode === 'reading-sequence' && pages >= 5) || (state.mode === 'reading-noop' && stopped) || ticks > 900) {
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
  if (['navigation', 'navigation-noop', 'auto-samples', 'auto-failure', 'auto-page-switch'].indexOf(state.mode) >= 0) {
    const nextButton = document.querySelector('.next-page-btn');
    if (state.mode.indexOf('navigation') === 0 && nextButton) {
      const pages = Array.from(document.querySelectorAll('.page-item'));
      let activeIndex = 0;
      nextButton.addEventListener('click', function () {
        state.navigationClickAt = performance.now();
        state.navigationClickCount = (state.navigationClickCount || 0) + 1;
        if (state.mode === 'navigation-noop') return;
        pages[activeIndex].querySelector('.page-name').classList.remove('active');
        activeIndex += 1;
        pages[activeIndex].querySelector('.page-name').classList.add('active');
        state.activePage = activeIndex;
      });
    }
    const submitButton = document.querySelector('.btn-submit');
    if (submitButton) submitButton.addEventListener('click', function () { state.submitCount += 1; });
    const autoTab = document.querySelector('.tab[data-tab="auto"]');
    if (autoTab) autoTab.click();
    const start = document.getElementById('xz-btn-auto');
    if (start) start.click();
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
      if (state.mode === 'navigation' && state.navigationDurations.length >= 20) {
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
        state.timedOut = false;
        window.clearInterval(pollAuto);
        result.textContent = JSON.stringify(state);
        return;
      }
      const failed = state.logs.some(function (line) { return line.indexOf('处理失败 [阶段:') >= 0; });
      const navigationFailed = state.mode === 'navigation-noop' && state.logs.some(function (line) { return line.indexOf('翻页失败 [阶段: 翻页确认]') >= 0; });
      const pageSwitchReset = state.mode === 'auto-page-switch' && state.logs.some(function (line) { return line.indexOf('检测到页面切换，重置状态') >= 0; });
      const timeoutTicks = state.mode.indexOf('navigation') === 0 ? 1800 : 600;
      if ((state.mode === 'auto-samples' && state.submitCount > 0) || (state.mode === 'auto-failure' && failed) || pageSwitchReset || navigationFailed || ticks > timeoutTicks) {
        state.timedOut = ticks > timeoutTicks;
        state.navigationCount = state.navigationDurations.length;
        state.navigationWithin15Seconds = state.navigationDurations.filter(function (ms) { return ms <= 15000; }).length;
        state.activePageText = document.querySelector('.page-name.active') && document.querySelector('.page-name.active').textContent.trim();
        state.navigationFailureLogs = state.logs.filter(function (line) { return line.indexOf('翻页失败 [阶段: 翻页确认]') >= 0; });
        state.failureLogs = state.logs.filter(function (line) { return line.indexOf('处理失败 [阶段:') >= 0; });
        state.answerValues = Array.from(document.querySelectorAll('.answer-field')).map(function (field) { return field.value; });
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
    else if (!question.missingField) controls = Array.from({ length: question.blankCount || 1 }, () => '<input type="text" class="blank-input answer-field">').join('');
  } else if (question.kind === 'essay') {
    controls = question.missingField ? '' : '<textarea class="form-control answer-field"></textarea>';
  }
  return `<section class="question-wrapper" ${id}><div class="question-type-tag">${escapeHtml(question.typeTag || '')}</div><div class="question-title">${escapeHtml(question.title || 'Test question')}</div>${controls}</section>`;
}

function renderAutoBody(config) {
  if (config.mode === 'reading-sequence' || config.mode === 'reading-noop') {
    return '<div class="course-container"><div class="page-item" id="page-1"><div class="page-name active">第1页</div></div><button type="button" class="next-page-btn">下一页</button></div>';
  }
  if (config.mode === 'video-sequence' || config.mode === 'video-stall') {
    return '<div class="course-container"><div class="page-item" id="page-1"><div class="page-name active">第1页</div></div><video style="display:none"></video><video data-active="true"></video><button type="button" class="next-page-btn">下一页</button></div>';
  }
  if (config.mode === 'navigation' || config.mode === 'navigation-noop') {
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
  const autoMode = mockLocation.acceptance && ['navigation', 'navigation-noop', 'auto-samples', 'auto-failure', 'auto-page-switch', 'video-sequence', 'video-stall', 'reading-sequence', 'reading-noop'].indexOf(mockLocation.acceptance.mode) >= 0;
  const bodyMarkup = autoMode ? renderAutoBody(mockLocation.acceptance) : '';
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
    const output = execFileSync(chromePath, args, { encoding: 'utf8', timeout: options.timeout || 30000, maxBuffer: 8 * 1024 * 1024, windowsHide: true });
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
  assert.match(source, /^\/\/ @version\s+4\.1$/m);
  assert.match(source, /^\/\/ @connect\s+self$/m);
  assert.match(source, /^\/\/ @connect\s+api\.dgut\.edu\.cn$/m);
  assert.match(source, /^\/\/ @connect\s+api\.ulearning\.cn$/m);
});

test('all active v4.1 userscript copies are byte-identical', () => {
  const crypto = require('node:crypto');
  const activeCopies = [
    sourcePath,
    path.join(root, '莞工小蟑螂-优学院全能助手 v4.1.user.js'),
    path.join(root, 'xz-ulearning-helper', '莞工小蟑螂-优学院全能助手.user.js'),
    path.join(root, 'xz-ulearning-helper', '莞工小蟑螂-优学院全能助手 v4.1.user.js')
  ];
  const hashes = activeCopies.map(file => {
    const copy = fs.readFileSync(file, 'utf8');
    assert.match(copy, /^\/\/ @version\s+4\.1$/m, file);
    return crypto.createHash('sha256').update(copy, 'utf8').digest('hex');
  });
  assert.ok(hashes.every(hash => hash === hashes[0]), `v4.1 copy hashes differ: ${hashes.join(', ')}`);
});

test('home recommends the current page action and returns cleanly to the start', () => {
  const cases = [
    ['ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=course-A', '课件学习页', '设置自动刷课', 'xz-sec-auto'],
    ['lms.dgut.edu.cn', '/ulearning/index.html#/course/textbook?courseId=course-A', '课件目录页', '导出课件题库', 'xz-sec-export'],
    ['lms.dgut.edu.cn', '/ulearning/index.html#/questionTrain/practice/111/222/1', '题库训练页', '导出训练题库', 'xz-sec-export']
  ];
  cases.forEach(function (entry, index) {
    const result = runChrome(entry[0], entry[1], {
      acceptance: { mode: 'ui-only' },
      screenshotPath: index === 0 ? path.join(root, 'screenshots', 'v4.1-panel-learning.png') : undefined
    });
    assert.equal(result.pageName, entry[2]);
    assert.equal(result.primaryAction, entry[3]);
    assert.equal(result.targetView, entry[4]);
    assert.equal(result.backView, 'xz-sec-home');
    assert.ok(result.layoutWidth >= 300 && result.layoutWidth <= 400);
    assert.deepEqual(result.errors, []);
  });
  const unknown = runChrome('lms.dgut.edu.cn', '/ulearning/index.html#/home', { acceptance: { mode: 'ui-only' } });
  assert.equal(unknown.pageName, '其他页面');
  assert.equal(unknown.primaryAction, null);
  assert.deepEqual(unknown.tabs, ['首页', '关于']);
  const autoPreview = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=course-A', {
    acceptance: { mode: 'ui-only', previewTab: 'auto' },
    screenshotPath: path.join(root, 'screenshots', 'v4.1-panel-auto.png')
  });
  const exportPreview = runChrome('lms.dgut.edu.cn', '/ulearning/index.html#/course/textbook?courseId=course-A', {
    acceptance: { mode: 'ui-only', previewTab: 'export' },
    screenshotPath: path.join(root, 'screenshots', 'v4.1-panel-export.png')
  });
  assert.equal(autoPreview.previewView, 'xz-sec-auto');
  assert.equal(exportPreview.previewView, 'xz-sec-export');
  assert.equal(autoPreview.activeTab, 'auto');
  assert.equal(exportPreview.activeTab, 'export');
  const darkPreview = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=course-A', {
    acceptance: { mode: 'ui-only', previewTab: 'auto', darkMode: true },
    screenshotPath: path.join(root, 'screenshots', 'v4.1-panel-auto-dark.png')
  });
  assert.equal(darkPreview.darkMode, true);
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
  const result = runChrome('lms.dgut.edu.cn', '/ulearning/index.html#/course/textbook?courseId=hash-course&classId=hash-class');
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

test('invalid JSON is visible and is not retried', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=course-A', { acceptance: { mode: 'invalid-json' } });
  assert.equal(result.downloadText, '');
  assert.equal(result.requests.length, 1);
  assert.match(result.answerStatus, /JSON解析失败/);
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

test('10 injected answer and submit failures never submit and log question plus stage', () => {
  const scenarios = [
    { name: 'request failure', question: { id: 'Q1', kind: 'choice', typeTag: '单选题' }, failQuestionIds: ['Q1'], stage: '答案请求' },
    { name: 'empty answer', question: { id: 'Q1', kind: 'choice', typeTag: '单选题' }, answerResponses: { Q1: { correctAnswerList: [] } }, stage: '答案解析' },
    { name: 'unknown type', question: { id: 'Q1', kind: 'unknown', typeTag: '排序题' }, stage: '答案写入' },
    { name: 'missing answer field', question: { id: 'Q1', kind: 'blank', typeTag: '填空题', missingField: true }, stage: '答案写入' },
    { name: 'field write failure', question: { id: 'Q1', kind: 'blank', typeTag: '填空题', writeFailure: true }, stage: '答案写入' },
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

test('auto flow observer resets state after a simulated SPA page change', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=mock-course', {
    acceptance: { mode: 'auto-page-switch' },
    virtualTimeBudget: 5000
  });
  assert.equal(result.timedOut, false, JSON.stringify(result.logs && result.logs.slice(-8)));
  assert.ok(result.logs.some(line => line.includes('检测到页面切换，重置状态')));
  assert.equal(result.errors.length, 0);
});

test('confirms 20 consecutive DOM page changes within the 15 second limit', () => {
  const result = runChrome('ua.dgut.edu.cn', '/learnCourse/learnCourse.html?courseId=mock-course', {
    acceptance: { mode: 'navigation' },
    virtualTimeBudget: 45000,
    timeout: 60000
  });
  assert.equal(result.timedOut, false, JSON.stringify(result.logs && result.logs.slice(-12)));
  assert.equal(result.navigationCount, 20);
  assert.equal(result.navigationClickCount, 20);
  assert.ok(result.navigationWithin15Seconds >= 19, JSON.stringify(result));
  assert.equal(result.activePage, 20);
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
