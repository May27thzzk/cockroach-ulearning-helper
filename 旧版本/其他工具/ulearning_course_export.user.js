// ==UserScript==
// @name         优学院课件题目收集器 (东莞理工)
// @namespace    https://github.com/twj0/ulearning-course-export
// @version      1.1.0
// @description  一键导出优学院课件章节练习题
// @match        https://ua.ulearning.cn/learnCourse/learnCourse.html?*
// @match        https://ua.ulearning.cn/learnCourseNew/learnCourse.html?*
// @match        https://ua.ulearning.cn/learnCourse/learnCourseNew.html?*
// @match        https://ua.dgut.edu.cn/learnCourse/learnCourse.html?*
// @match        https://ua.dgut.edu.cn/learnCourseNew/learnCourse.html?*
// @match        https://ua.dgut.edu.cn/learnCourse/learnCourseNew.html?*
// @match        https://lms.dgut.edu.cn/*
// @grant        GM_notification
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  var HOSTNAME = window.location.hostname;
  var API_BASE = window.location.origin;
  var IS_DGUT = HOSTNAME.includes('dgut.edu.cn');
  var DEBUG = true;

  var QUESTION_TYPE = {
    1: '单选题', 2: '多选题', 3: '不定项选择题', 4: '判断题',
    5: '填空题', 6: '简答题', 7: '文件题', 11: '阅读理解',
    12: '排序题', 17: '选词填空', 24: '综合题'
  };

  function log(msg, data) {
    if (!DEBUG) return;
    if (data !== undefined) console.log('[课件收集器]', msg, data);
    else console.log('[课件收集器]', msg);
  }

  function htmlToText(html) {
    if (!html) return '';
    var div = document.createElement('div');
    div.innerHTML = html;
    return (div.textContent || div.innerText || '').replace(/\u00A0/g, ' ').trim();
  }

  function sanitize(name) {
    return (name || 'untitled').replace(/[<>:"/\\|?*]/g, '_').replace(/\s+/g, '_').replace(/_+/g, '_').slice(0, 120);
  }

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function notify(text) {
    try { GM_notification({ text: text, title: '课件题目收集器', timeout: 4000 }); } catch (e) { alert(text); }
  }

  // ==================== 认证头抓取 ====================

  // 拦截页面的真实 fetch 请求，抓取认证头
  var capturedHeaders = {};
  var origFetch = window.fetch;
  window.fetch = function () {
    var url = arguments[0];
    var opts = arguments[1] || {};
    if (typeof url === 'string' && url.indexOf('/uaapi/') !== -1 && opts.headers) {
      var h = opts.headers;
      if (h instanceof Headers) {
        h.forEach(function (val, key) {
          if (key.toLowerCase() === 'authorization' || key.toLowerCase() === 'ua-authorization') {
            capturedHeaders[key] = val;
          }
        });
      } else if (typeof h === 'object') {
        for (var k in h) {
          if (k.toLowerCase() === 'authorization' || k.toLowerCase() === 'ua-authorization') {
            capturedHeaders[k] = h[k];
          }
        }
      }
      log('抓取到认证头', capturedHeaders);
    }
    return origFetch.apply(this, arguments);
  };

  // 从 cookie 中读取
  function getCookie(name) {
    for (var i = 0; i < document.cookie.split(';').length; i++) {
      var p = document.cookie.split(';')[i].trim();
      if (p.indexOf(name + '=') === 0) return decodeURIComponent(p.slice(name.length + 1));
    }
    return '';
  }

  // 组装请求头
  function getAuthHeaders() {
    var headers = { 'Content-Type': 'application/json' };

    // 优先用抓取到的页面真实请求头
    if (capturedHeaders['Authorization']) headers['Authorization'] = capturedHeaders['Authorization'];
    if (capturedHeaders['ua-authorization']) headers['ua-authorization'] = capturedHeaders['ua-authorization'];

    // 补充：从 cookie 读取
    var auth = getCookie('AUTHORIZATION') || getCookie('token') || '';
    if (auth && !headers['Authorization']) {
      headers['Authorization'] = auth.includes('.') ? 'Bearer ' + auth : auth;
    }
    var uaAuth = getCookie('UA_AUTHORIZATION') || getCookie('ua-authorization') || '';
    if (uaAuth && !headers['ua-authorization']) {
      headers['ua-authorization'] = uaAuth;
    }

    log('使用的请求头', Object.keys(headers));
    return headers;
  }

  // ==================== API ====================

  async function tryFetch(url, opts) {
    var res = await fetch(url, opts);
    var data = await res.json();
    log('API响应:', { url: url, status: res.status, code: data.code, success: data.success, message: data.message });
    return data;
  }

  async function apiPost(path, body) {
    var url = API_BASE + path;
    var opts = {
      method: 'POST',
      credentials: 'include',
      headers: getAuthHeaders(),
      body: JSON.stringify(body || {})
    };
    return tryFetch(url, opts);
  }

  async function apiGet(path) {
    var url = API_BASE + path;
    var opts = {
      method: 'GET',
      credentials: 'include',
      headers: getAuthHeaders()
    };
    return tryFetch(url, opts);
  }

  async function fetchDirectory(courseId, classId) {
    log('获取课程目录', { courseId: courseId, classId: classId, isDgut: IS_DGUT });

    if (IS_DGUT) {
      var resp = await apiGet('/uaapi/course/stu/' + encodeURIComponent(courseId) + '/directory?classId=' + encodeURIComponent(classId));
      log('DGUT目录响应:', resp);
      return resp;
    }

    // 官方站：试两种路径
    var resp = await apiPost('/api/v2/learnCourse/courseDirectory', { courseId: courseId, classId: classId });
    log('官方目录响应 v2:', resp);
    if (resp && (resp.success || resp.data)) return resp;

    resp = await apiPost('/learnCourse/courseDirectory', { courseId: courseId, classId: classId });
    log('官方目录响应 v1:', resp);
    return resp;
  }

  async function fetchChapterContent(nodeId) {
    log('获取章节内容', { nodeId: nodeId });

    if (IS_DGUT) {
      return apiGet('/uaapi/wholepage/chapter/stu/' + encodeURIComponent(nodeId));
    }

    var resp = await apiPost('/api/v2/learnCourse/getWholeChapterPageContent', { nodeId: nodeId });
    if (resp && resp.data) return resp;
    return apiPost('/learnCourse/getWholeChapterPageContent', { nodeId: nodeId });
  }

  async function fetchAnswer(questionId, parentId) {
    if (IS_DGUT) {
      return apiGet('/uaapi/questionAnswer/' + encodeURIComponent(questionId) + '?parentId=' + encodeURIComponent(parentId));
    }

    var resp = await apiPost('/api/v2/learnQuestion/getQuestionAnswer', { questionId: questionId, parentId: parentId });
    if (resp && resp.data) return resp;
    return apiPost('/learnQuestion/getQuestionAnswer', { questionId: questionId, parentId: parentId });
  }

  // ==================== 数据解析 ====================

  function normalizeDir(raw) {
    log('解析目录数据', raw);
    if (!raw) return { name: '', chapters: [] };

    var d = raw.data || raw;

    // DGUT 格式
    if (d && Array.isArray(d.items) && d.items.length > 0 && d.items[0].nodeId !== undefined) {
      return {
        name: d.coursename || d.courseName || d.course_name || '',
        chapters: d.items.map(function (it) {
          return { title: it.title, nodeId: it.nodeId || it.nodeid || it.id };
        })
      };
    }

    // 官方格式
    if (d && Array.isArray(d.items)) {
      return {
        name: d.coursename || d.courseName || '',
        chapters: d.items.map(function (it) {
          return { title: it.title, nodeId: it.nodeId || it.nodeid || it.id };
        })
      };
    }

    if (d && Array.isArray(d.chapters)) {
      return { name: d.coursename || d.courseName || '', chapters: d.chapters };
    }

    log('无法解析目录数据', d);
    return { name: '', chapters: [] };
  }

  function normalizeChapter(raw) {
    if (!raw) return [];
    var d = raw.data || raw;
    if (!d) return [];

    if (Array.isArray(d.wholepageItemDTOList)) return d.wholepageItemDTOList;
    if (Array.isArray(d.items)) {
      return d.items.map(function (it) {
        return {
          wholepageDTOList: (it.coursepages || []).map(function (p) {
            return { contentType: p.contentType, id: p.relationid || p.id, content: p.title, coursepageDTOList: p.children || p.coursepages || [] };
          })
        };
      });
    }
    if (Array.isArray(d.coursepages)) {
      return d.coursepages.map(function (p) {
        return { wholepageDTOList: [{ contentType: p.contentType, id: p.relationid || p.id, content: p.title, coursepageDTOList: p.children || p.coursepages || [] }] };
      });
    }

    log('无法解析章节数据', d);
    return [];
  }

  function getQuestions(cp) {
    if (!cp) return [];
    if (Array.isArray(cp.questionDTOList)) return cp.questionDTOList;
    if (Array.isArray(cp.questions)) return cp.questions;
    if (Array.isArray(cp.children)) return cp.children.flatMap(getQuestions);
    return [];
  }

  function extractAnswer(resp) {
    if (!resp) { return { text: '', values: [], typeCode: null }; }
    // DGUT API 返回直接对象，官方站返回 {data: {...}}，兼容两种
    var d = resp.data || resp;
    // 如果既没有 data 也没有 correctAnswerList，才算空
    if (!d || (!d.correctAnswerList && !d.correctAnswer && !d.answer && !d.answers)) {
      log('答案响应为空', resp);
      return { text: '', values: [], typeCode: null };
    }
    log('答案原始数据', JSON.stringify(d).slice(0, 500));
    var values = [];
    var typeCode = null;

    // 优先检查 correctAnswerList（DGUT 主要用这个字段）
    if (Array.isArray(d.correctAnswerList) && d.correctAnswerList.length) {
      d.correctAnswerList.forEach(function (a) {
        var s = String(a).trim();
        if (s === 'true') values.push('正确');
        else if (s === 'false') values.push('错误');
        else { var t = htmlToText(s); if (t) values.push(t); }
      });
    }

    // correctAnswer 字段
    if (!values.length && typeof d.correctAnswer !== 'undefined' && d.correctAnswer !== null) {
      if (typeof d.correctAnswer === 'boolean') {
        values.push(d.correctAnswer ? '正确' : '错误');
      } else if (Array.isArray(d.correctAnswer)) {
        d.correctAnswer.forEach(function (a) { var t = htmlToText(String(a)); if (t) values.push(t); });
      } else {
        var t = htmlToText(String(d.correctAnswer));
        if (t) values.push(t);
      }
    }

    // 备选字段
    if (!values.length && Array.isArray(d.correctAnswerList) && d.correctAnswerList.length) {
      d.correctAnswerList.forEach(function (a) { var t = htmlToText(String(a)); if (t) values.push(t); });
    }
    if (!values.length && typeof d.answer !== 'undefined' && d.answer !== null) {
      if (typeof d.answer === 'boolean') {
        values.push(d.answer ? '正确' : '错误');
      } else {
        var t = htmlToText(String(d.answer));
        if (t) values.push(t);
      }
    }
    if (!values.length && Array.isArray(d.answers) && d.answers.length) {
      d.answers.forEach(function (a) { var t = htmlToText(String(a)); if (t) values.push(t); });
    }

    // 子题答案
    if (Array.isArray(d.subQuestionAnswerDTOList) && d.subQuestionAnswerDTOList.length) {
      d.subQuestionAnswerDTOList.forEach(function (sub, i) {
        var ans = Array.isArray(sub.correctAnswerList)
          ? sub.correctAnswerList.map(function (x) { return htmlToText(String(x)); }).filter(Boolean).join(' | ')
          : htmlToText(String(sub.correctAnswer || sub.correctAnswerList || ''));
        if (ans) values.push('子题' + (i + 1) + ': ' + ans);
      });
    }

    // 题型
    var candidates = [d.questionType, d.questiontype, d.type, d.questionTypeCode,
      d.questionDto && d.questionDto.questionType, d.question && d.question.questionType];
    for (var i = 0; i < candidates.length; i++) {
      var n = Number(candidates[i]);
      if (isFinite(n) && n > 0) { typeCode = n; break; }
    }

    log('解析后的答案', { text: values.join(' | '), values: values, typeCode: typeCode });
    return { text: values.join(' | '), values: values, typeCode: typeCode };
  }

  // ==================== 题型判断 ====================

  function detectType(q, ansInfo) {
    var type = q.type || 0;
    var choices = q.choiceitemModels || [];

    if (ansInfo.typeCode && ansInfo.typeCode > 0) type = ansInfo.typeCode;

    if (choices.length >= 2) {
      if (type === 1 || type === 2 || type === 3) return type;
      return 2;
    }

    if (type !== 4 && type !== 6) return 5;
    return type;
  }

  // ==================== 格式化 ====================

  var LABELS = 'ABCDEFGHIJ'.split('');

  function formatQuestion(q, ansInfo) {
    var type = detectType(q, ansInfo);
    var typeName = QUESTION_TYPE[type] || '未知题型';
    var title = htmlToText(q.title || '');
    var choices = q.choiceitemModels || [];
    var answerText = ansInfo.text || '';

    var result = { question_id: q.questionid, type: type, type_name: typeName, title: title, options: [], answer: answerText };

    if (type === 1 || type === 2 || type === 3) {
      choices.forEach(function (c, i) {
        var label = c.option || LABELS[i] || String(i);
        var text = htmlToText(c.title || '');
        result.options.push(label + '. ' + (text || '(无内容)'));
      });
    }

    return result;
  }

  function toQuestionBank(questions) {
    return questions.map(function (q) {
      var entry = { '题型': q.type_name, '题干': q.title, '选项': [], '答案': q.answer, '解析': '' };
      if (q.type === 1 || q.type === 2 || q.type === 3) {
        entry['选项'] = q.options;
        var ans = q.answer.replace(/\s*\|\s*/g, '').replace(/[^A-Za-z]/g, '').toUpperCase();
        entry['答案'] = ans || q.answer;
      } else if (q.type === 4) {
        if (/^(T|对|正确|true)/i.test(q.answer)) entry['答案'] = '正确';
        else if (/^(F|错|错误|false)/i.test(q.answer)) entry['答案'] = '错误';
      }
      return entry;
    });
  }

  // ==================== 下载 ====================

  function downloadFile(filename, content, mime) {
    var blob = new Blob([content], { type: mime });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
  }

  // ==================== UI ====================

  function createPanel() {
    var panel = document.createElement('div');
    panel.id = 'cw-panel';
    panel.innerHTML = [
      '<style>',
      '#cw-panel{position:fixed;right:16px;bottom:16px;z-index:999999;background:#fff;border-radius:12px;padding:16px;',
      'box-shadow:0 8px 24px rgba(0,0,0,.15);font-family:-apple-system,system-ui,sans-serif;min-width:280px;border:1px solid #e0e0e0;}',
      '#cw-panel h3{margin:0 0 12px;font-size:15px;color:#333;}',
      '#cw-panel label{display:block;margin:6px 0;font-size:13px;color:#555;cursor:pointer;}',
      '#cw-panel select{width:100%;margin:6px 0;padding:6px;border:1px solid #ddd;border-radius:6px;font-size:13px;}',
      '#cw-panel .btn{width:100%;margin-top:10px;padding:10px;border:none;border-radius:8px;font-size:14px;cursor:pointer;font-weight:600;background:#1677ff;color:#fff;}',
      '#cw-panel .btn:hover{background:#0958d9;}',
      '#cw-panel .btn:disabled{background:#aaa;cursor:not-allowed;}',
      '#cw-panel .close{position:absolute;top:8px;right:12px;background:none;border:none;font-size:18px;color:#999;cursor:pointer;}',
      '#cw-panel .st{margin-top:8px;font-size:12px;color:#888;min-height:18px;word-break:break-all;max-height:80px;overflow-y:auto;}',
      '#cw-panel .dbg{margin-top:6px;font-size:11px;color:#999;max-height:120px;overflow-y:auto;background:#f5f5f5;padding:6px;border-radius:4px;display:none;}',
      '#cw-panel .dbg.show{display:block;}',
      '</style>',
      '<button class="close" id="cw-close">&times;</button>',
      '<h3>\uD83D\uDCDD 课件题目收集器</h3>',
      '<label>导出格式:</label>',
      '<select id="cw-fmt"><option value="json">题库 JSON</option><option value="full">完整 JSON</option><option value="md">Markdown</option></select>',
      '<label><input type="checkbox" id="cw-dbg"> 显示调试日志</label>',
      '<button class="btn" id="cw-btn">开始导出</button>',
      '<div class="st" id="cw-st"></div>',
      '<div class="dbg" id="cw-dbg-box"></div>'
    ].join('');
    document.body.appendChild(panel);

    var toggle = document.createElement('button');
    toggle.id = 'cw-toggle';
    toggle.textContent = '\uD83D\uDCDD';
    toggle.title = '课件题目收集器';
    toggle.style.cssText = 'position:fixed;right:16px;bottom:16px;z-index:999998;width:48px;height:48px;border-radius:50%;border:none;background:#1677ff;color:#fff;font-size:20px;cursor:pointer;box-shadow:0 4px 12px rgba(22,119,255,.4);display:none;';
    document.body.appendChild(toggle);

    document.getElementById('cw-close').onclick = function () { panel.style.display = 'none'; toggle.style.display = ''; };
    toggle.onclick = function () { panel.style.display = ''; toggle.style.display = 'none'; };
    document.getElementById('cw-dbg').onchange = function () {
      document.getElementById('cw-dbg-box').classList.toggle('show', this.checked);
    };

    return {
      setStatus: function (t) { document.getElementById('cw-st').textContent = t; },
      addLog: function (t) {
        var box = document.getElementById('cw-dbg-box');
        box.textContent += t + '\n';
        box.scrollTop = box.scrollHeight;
      },
      getFormat: function () { return document.getElementById('cw-fmt').value; },
      btn: document.getElementById('cw-btn')
    };
  }

  // ==================== 主流程 ====================

  async function runExport(ui) {
    var btn = ui.btn;
    var setStatus = ui.setStatus;
    var format = ui.getFormat();

    // 覆盖 log 函数，同时输出到面板
    var origLog = log;
    log = function (msg, data) {
      origLog(msg, data);
      var text = typeof data !== 'undefined' ? msg + ' ' + JSON.stringify(data).slice(0, 200) : msg;
      ui.addLog(text);
    };

    try {
      btn.disabled = true;
      btn.textContent = '准备中...';

      // 等待页面发起 API 请求，以便抓取认证头
      if (Object.keys(capturedHeaders).length === 0) {
        setStatus('等待页面加载认证信息...');
        log('等待抓取认证头...');
        // 触发页面的一些操作来产生 API 请求
        await delay(2000);
      }
      log('已抓取的认证头', capturedHeaders);

      btn.textContent = '导出中...';

      var url = new URL(window.location.href);
      var courseId = url.searchParams.get('courseId') || url.searchParams.get('courseid');
      var classId = url.searchParams.get('classId') || url.searchParams.get('classid');

      log('当前URL', window.location.href);
      log('解析参数', { courseId: courseId, classId: classId, hostname: HOSTNAME, isDgut: IS_DGUT });

      if (Object.keys(capturedHeaders).length === 0) {
        log('警告: 未抓取到认证头，可能需要先在页面上操作一下（点击章节等）');
      }

      if (!courseId || !classId) {
        throw new Error('URL 中缺少 courseId 或 classId。请确保在课件页面运行此脚本。');
      }

      setStatus('获取课程目录...');
      var dirResp = await fetchDirectory(courseId, classId);

      // 检查响应
      if (!dirResp) throw new Error('API 无响应，请检查网络');
      if (dirResp.code && dirResp.code !== 200 && dirResp.code !== 1) {
        throw new Error('API 返回错误: code=' + dirResp.code + ' message=' + (dirResp.message || ''));
      }
      if (dirResp.success === false) {
        throw new Error('API 返回失败: ' + (dirResp.message || JSON.stringify(dirResp)));
      }

      var dir = normalizeDir(dirResp);
      log('解析后的目录', { name: dir.name, chaptersCount: dir.chapters.length });

      if (!dir.chapters.length) {
        log('原始响应数据', dirResp);
        throw new Error('课程目录为空。API 返回: ' + JSON.stringify(dirResp).slice(0, 300));
      }

      var courseName = dir.name || 'course_' + courseId;
      var allQuestions = [];
      var mdParts = ['# ' + courseName + ' - 课件题目\n\n'];
      var total = 0;

      for (var ci = 0; ci < dir.chapters.length; ci++) {
        var ch = dir.chapters[ci];
        var chTitle = ch.title || ch.nodetitle || '未命名章节';
        var chNodeId = ch.nodeId || ch.nodeid || ch.id;
        setStatus('章节 ' + (ci + 1) + '/' + dir.chapters.length + ': ' + chTitle);
        btn.textContent = '导出中 ' + (ci + 1) + '/' + dir.chapters.length;
        mdParts.push('## ' + chTitle + '\n\n');

        if (!chNodeId) { log('跳过章节（无ID）', chTitle); mdParts.push('> 跳过：无章节ID\n\n'); continue; }

        var chResp;
        try { chResp = await fetchChapterContent(chNodeId); } catch (e) {
          log('章节获取失败', e.message);
          mdParts.push('> 获取失败: ' + e.message + '\n\n'); continue;
        }

        var items = normalizeChapter(chResp);
        log('章节内容', { itemsCount: items.length });

        for (var ii = 0; ii < items.length; ii++) {
          var wpList = items[ii].wholepageDTOList || [];
          for (var wi = 0; wi < wpList.length; wi++) {
            var wp = wpList[wi];
            if (wp.contentType !== 7) continue;

            var unitTitle = wp.content || '未命名单元';
            var parentId = wp.id;
            mdParts.push('### ' + unitTitle + '\n\n');

            var cpList = wp.coursepageDTOList || [];

            for (var pi = 0; pi < cpList.length; pi++) {
              var questions = getQuestions(cpList[pi]);
              if (!questions.length) continue;

              for (var qi = 0; qi < questions.length; qi++) {
                total++;
                var q = questions[qi];
                var qid = q.questionid;
                var ansInfo = { text: '', values: [], typeCode: null };

                if (qid && parentId) {
                  try {
                    var aResp = await fetchAnswer(qid, parentId);
                    ansInfo = extractAnswer(aResp);
                  } catch (e) {
                    log('获取答案失败', { qid: qid, error: e.message });
                  }
                }

                var formatted = formatQuestion(q, ansInfo);
                allQuestions.push(formatted);

                mdParts.push('#### ' + total + '. (' + formatted.type_name + ') QID: ' + (qid || '-') + '\n');
                mdParts.push('**题干:**\n' + (formatted.title || '(缺失)') + '\n\n');
                if (formatted.options.length) {
                  mdParts.push('**选项:**\n');
                  formatted.options.forEach(function (opt) { mdParts.push('- ' + opt + '\n'); });
                  mdParts.push('\n');
                }
                mdParts.push('**正确答案:**\n' + (formatted.answer || '未获取到') + '\n---\n\n');

                if (total % 10 === 0) setStatus('已收集 ' + total + ' 题...');
              }
            }
          }
        }

        await delay(200);
      }

      if (total === 0) mdParts.push('未找到题目\n\n');

      setStatus('生成文件中...');

      if (format === 'json') {
        var bank = toQuestionBank(allQuestions);
        downloadFile(sanitize(courseName) + '_题库.json', JSON.stringify(bank, null, 2), 'application/json;charset=utf-8');
      } else if (format === 'full') {
        var full = { course_id: courseId, course_name: courseName, export_time: new Date().toISOString(), total_questions: total, questions: allQuestions };
        downloadFile(sanitize(courseName) + '_完整.json', JSON.stringify(full, null, 2), 'application/json;charset=utf-8');
      } else {
        downloadFile(sanitize(courseName) + '_课件题目.md', mdParts.join(''), 'text/markdown;charset=utf-8');
      }

      setStatus('完成！共 ' + total + ' 题');
      notify('导出完成！共 ' + total + ' 题');

    } catch (e) {
      setStatus('错误: ' + e.message);
      log('导出失败', e.message);
      notify('导出失败: ' + e.message);
    } finally {
      btn.disabled = false;
      btn.textContent = '开始导出';
      log = origLog;
    }
  }

  // ==================== 初始化 ====================

  function init() {
    try {
      if (document.getElementById('cw-panel')) return;
      var ui = createPanel();
      ui.btn.addEventListener('click', function () { runExport(ui); });
      console.log('[课件题目收集器] 已加载，平台:', IS_DGUT ? 'DGUT' : '官方');
    } catch (e) {
      console.error('[课件题目收集器] 初始化失败:', e);
    }
  }

  if (document.readyState === 'complete') init();
  else window.addEventListener('load', init);

  setInterval(function () { if (!document.getElementById('cw-panel')) init(); }, 2000);

})();
