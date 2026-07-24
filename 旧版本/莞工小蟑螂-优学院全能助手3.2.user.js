// ==UserScript==
// @name         莞工小蟑螂 - 优学院全能助手
// @namespace    https://greasyfork.org/users/1540778
// @version      3.3.0
// @description  优学院课件题库导出 + 训练题库导出 + 自动静音播放/答题/翻页，莞工小蟑螂出品
// @author       莞工小蟑螂
// @match        https://ua.dgut.edu.cn/*
// @match        https://ua.ulearning.cn/*
// @match        https://lms.dgut.edu.cn/*
// @icon         https://lms.dgut.edu.cn/ulearning/favicon.ico
// @grant        GM_notification
// @grant        GM_xmlhttpRequest
// @license      MIT
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  var HOST = location.hostname;
  var BASE = location.origin;
  var IS_DGUT = HOST.includes('dgut.edu.cn');
  var IS_COURSE = HOST.startsWith('ua.');
  var IS_TRAINING = HOST.startsWith('lms.');
  var TYPE_NAME = {1:'单选题',2:'多选题',3:'不定项选择题',4:'判断题',5:'填空题',6:'简答题',7:'文件题',11:'阅读理解',12:'排序题',17:'选词填空',24:'综合题'};
  var LABELS = 'ABCDEFGHIJ'.split('');
  var LOGO_URI = 'data:image/png;base64,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';

  // ==================== 工具 ====================
  function html2text(h){if(!h)return'';var d=document.createElement('div');d.innerHTML=h;return(d.textContent||'').replace(/\u00A0/g,' ').trim();}
  function clean(s){return(s||'untitled').replace(/[<>:"/\\|?*]/g,'_').replace(/\s+/g,'_').slice(0,120);}
  function wait(ms){return new Promise(function(r){setTimeout(r,ms)})}
  function jitteredDelay(base){var j=base*0.3;return base-j+Math.random()*j*2;}
  function notify(t){try{GM_notification({text:t,title:'莞工小蟑螂',timeout:4000})}catch(e){alert(t)}}
  function getCookie(n){for(var i=0;i<document.cookie.split(';').length;i++){var p=document.cookie.split(';')[i].trim();if(p.indexOf(n+'=')===0)return decodeURIComponent(p.slice(n.length+1));}return'';}

  // ==================== 认证 ====================
  var authHeaders={};
  var origFetch=window.fetch;
  window.fetch=function(){var url=arguments[0],opts=arguments[1]||{};if(typeof url==='string'&&(url.indexOf('/uaapi/')!==-1||url.indexOf('/utestapi/')!==-1)&&opts.headers){var h=opts.headers;if(h instanceof Headers){h.forEach(function(v,k){if(/auth/i.test(k))authHeaders[k]=v;});}else if(typeof h==='object'){for(var k in h){if(/auth/i.test(k))authHeaders[k]=h[k];}}}return origFetch.apply(this,arguments);};
  function getHeaders(){var h={'Content-Type':'application/json'};for(var k in authHeaders)h[k]=authHeaders[k];var a=getCookie('AUTHORIZATION')||getCookie('token')||'';if(a&&!h['Authorization'])h['Authorization']=a.includes('.')?'Bearer '+a:a;var ua=getCookie('UA_AUTHORIZATION')||getCookie('ua-authorization')||'';if(ua&&!h['ua-authorization'])h['ua-authorization']=ua;return h;}
  async function api(method,path,body,retries){
    retries=retries||3;
    var url=BASE+path;
    var opts={method:method,credentials:'include',headers:getHeaders()};
    if(body)opts.body=JSON.stringify(body);
    for(var attempt=1;attempt<=retries;attempt++){
      try{
        var res=await origFetch(url,opts);
        if(res.status===401||res.status===403){
          notify('登录已过期，请刷新页面后重新登录');
          throw new Error('登录已过（HTTP '+res.status+'），请刷新页面');
        }
        if(!res.ok&&attempt<retries){
          await wait(1000*attempt);
          continue;
        }
        return res.json();
      }catch(e){
        if(attempt>=retries)throw e;
        await wait(1000*attempt);
      }
    }
  }
  function getAuth(){return authHeaders['Authorization']||authHeaders['ua-authorization']||getCookie('AUTHORIZATION')||getCookie('token')||'';}

  // ==================== 答案解析 ====================
  function parseAnswer(resp){if(!resp)return{text:'',values:[],typeCode:null};var d=resp.data||resp;if(!d||(!d.correctAnswerList&&!d.correctAnswer&&!d.answer&&!d.answers))return{text:'',values:[],typeCode:null};var values=[],typeCode=null;if(Array.isArray(d.correctAnswerList)&&d.correctAnswerList.length){d.correctAnswerList.forEach(function(a){var s=String(a).trim();if(s==='true')values.push('正确');else if(s==='false')values.push('错误');else{var t=html2text(s);if(t)values.push(t);}});}if(!values.length&&typeof d.correctAnswer!=='undefined'&&d.correctAnswer!==null){if(typeof d.correctAnswer==='boolean')values.push(d.correctAnswer?'正确':'错误');else if(Array.isArray(d.correctAnswer))d.correctAnswer.forEach(function(a){var t=html2text(String(a));if(t)values.push(t)});else{var t=html2text(String(d.correctAnswer));if(t)values.push(t)}}if(!values.length&&typeof d.answer!=='undefined'&&d.answer!==null){if(typeof d.answer==='boolean')values.push(d.answer?'正确':'错误');else{var t=html2text(String(d.answer));if(t)values.push(t)}}if(!values.length&&Array.isArray(d.answers))d.answers.forEach(function(a){var t=html2text(String(a));if(t)values.push(t)});if(Array.isArray(d.subQuestionAnswerDTOList)&&d.subQuestionAnswerDTOList.length){d.subQuestionAnswerDTOList.forEach(function(sub,i){var ans=Array.isArray(sub.correctAnswerList)?sub.correctAnswerList.map(function(x){return html2text(String(x))}).filter(Boolean).join(' | '):html2text(String(sub.correctAnswer||sub.correctAnswerList||''));if(ans)values.push('子题'+(i+1)+': '+ans);});}var cs=[d.questionType,d.questiontype,d.type,d.questionTypeCode,d.questionDto&&d.questionDto.questionType];for(var i=0;i<cs.length;i++){var n=Number(cs[i]);if(isFinite(n)&&n>0){typeCode=n;break;}}return{text:values.join(' | '),values:values,typeCode:typeCode};}

  // ==================== 格式化 ====================
  function formatChoiceQ(t,o,a){var ans=a.replace(/\s*\|\s*/g,'').replace(/[^A-Za-z]/g,'').toUpperCase();return{'题型':'选择题','题干':t,'选项':o,'答案':ans||a,'解析':''};}
  function formatJudgeQ(t,a){var r='';if(/^(T|对|正确|true)/i.test(a))r='正确';else if(/^(F|错|错误|false)/i.test(a))r='错误';else r=a;return{'题型':'判断题','题干':t,'答案':r,'解析':''};}
  function formatBlankQ(t){return{'题型':'填空题','题干':t,'解析':''};}
  function formatEssayQ(t,a){return{'题型':'问答题','题干':t,'答案':a,'解析':''};}

  function formatCourseQ(q,ansData){var type=q.type||0,title=html2text(q.title||''),choices=q.choiceitemModels||[],ansText=ansData?ansData.text||'':'';if(ansData&&ansData.typeCode&&ansData.typeCode>0)type=ansData.typeCode;if(choices.length>=2){var opts=choices.map(function(c,i){return(c.option||LABELS[i]||String(i))+'. '+html2text(c.title||'');});return formatChoiceQ(title,opts,ansText);}if(type===4)return formatJudgeQ(title,ansText);if(type===6)return formatEssayQ(title,ansText);return formatBlankQ(title);}

  function detectTrainType(q){var items=Array.isArray(q.item)?q.item:[],answer=Array.isArray(q.userAnswer)?q.userAnswer:[];if(items.length===2){var t=items.map(function(it){return html2text(it&&it.title||'')}).join('');if(/正确|错误|对错/.test(t))return 4;}if(answer.length>0&&(typeof answer[0]==='boolean'||/^(true|false)$/i.test(String(answer[0]).trim())))return 4;if(q.type===3)return 4;if(items.length>=2){var c=items.filter(function(it){return it&&it.title&&html2text(it.title).length>0}).length;if(c>=2)return q.type||2;}return q.type||5;}
  function formatTrainQ(q){var type=detectTrainType(q),title=html2text(q.title),items=Array.isArray(q.item)?q.item:[],answer=Array.isArray(q.userAnswer)?q.userAnswer:[];if(type===1||type===2){var opts=items.map(function(it,i){return(LABELS[i]||i)+'. '+html2text(it&&it.title||'');});return formatChoiceQ(title,opts,answer.map(function(a){return String(a).toUpperCase()}).sort().join(''));}if(type===3||type===4){var raw=answer[0]||'';if(['A','正确','True','true','对'].indexOf(raw)!==-1)return formatJudgeQ(title,'正确');if(['B','错误','False','false','错'].indexOf(raw)!==-1)return formatJudgeQ(title,'错误');if(typeof raw==='boolean')return formatJudgeQ(title,raw?'正确':'错误');return formatJudgeQ(title,String(raw));}if(type===5){var t=title;answer.forEach(function(v){for(var pi=0,pats=[/_{2,}/,/\(\s*\)/,/【\s*】/,/\[\s*\]/];pi<pats.length;pi++){if(pats[pi].test(t)){t=t.replace(pats[pi],'{'+v+'}');break;}}});return formatBlankQ(t);}return formatEssayQ(title,answer.join('\n'));}

  // ==================== 课件导出 ====================
  function getQs(cp){if(!cp)return[];if(Array.isArray(cp.questionDTOList))return cp.questionDTOList;if(Array.isArray(cp.questions))return cp.questions;if(Array.isArray(cp.children)){var r=[];cp.children.forEach(function(c){r=r.concat(getQs(c))});return r;}return[];}

  var CONTENT_TYPE_NAME={5:'图文',6:'视频',7:'练习'};

  // ==================== 导出历史 ====================
  var HISTORY_KEY='xz_export_history';
  function getHistory(){try{return JSON.parse(localStorage.getItem(HISTORY_KEY))||[];}catch(e){return[];}}
  function addHistory(name,count,types,source){
    var h=getHistory();
    h.unshift({name:name,count:count,types:types,source:source||'导出',time:new Date().toLocaleString()});
    if(h.length>10)h=h.slice(0,10);
    try{localStorage.setItem(HISTORY_KEY,JSON.stringify(h));}catch(e){}
  }
  function renderHistory(){
    var h=getHistory();
    if(!h.length)return '<div style="text-align:center;padding:20px;color:#bbb;font-size:12px;">暂无导出记录</div>';
    return h.map(function(item,i){
      var src=item.source||'导出';
      return '<div style="padding:8px 0;'+(i>0?'border-top:1px solid rgba(0,0,0,.04);':'')+'">'+
        '<div style="display:flex;align-items:center;gap:6px;">'+
        '<span style="font-size:10px;padding:1px 5px;border-radius:4px;background:'+(src==='课件'?'#e6f4ff':'#f0fff4')+';color:'+(src==='课件'?'#4a90d9':'#52c41a')+';">'+src+'</span>'+
        '<span style="font-size:12px;color:#333;font-weight:500;">'+html2text(item.name)+'</span>'+
        '</div>'+
        '<div style="font-size:11px;color:#aaa;margin-top:2px;">'+item.count+' 题 · '+item.types+' · '+item.time+'</div>'+
        '</div>';
    }).join('');
  }

  function showCoursewareSelector(courseName,chapters){
    return new Promise(function(resolve,reject){
      var overlay=document.createElement('div');
      overlay.id='xz-sel-overlay';
      overlay.innerHTML=[
        '<style>',
        '#xz-sel-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.45);z-index:1000000;display:flex;align-items:center;justify-content:center;font-family:-apple-system,sans-serif;backdrop-filter:blur(4px);}',
        '#xz-sel-box{background:#fff;color:#333;border-radius:16px;width:480px;max-width:92vw;max-height:75vh;display:flex;flex-direction:column;box-shadow:0 16px 48px rgba(0,0,0,.12);border:1px solid #e8e8e8;}',
        '#xz-sel-head{padding:18px 22px 14px;border-bottom:1px solid #f0f0f0;display:flex;align-items:center;gap:12px;}',
        '#xz-sel-head .ico{font-size:28px;line-height:1;}',
        '#xz-sel-head .txt h3{margin:0;font-size:15px;color:#333;font-weight:600;}',
        '#xz-sel-head .txt small{color:#999;font-size:12px;}',
        '#xz-sel-actions{display:flex;gap:8px;padding:10px 22px;border-bottom:1px solid #f0f0f0;}',
        '#xz-sel-actions button{padding:5px 14px;border:1px solid #e0e0e0;background:#fafafa;color:#666;border-radius:8px;cursor:pointer;font-size:12px;transition:all .15s;}',
        '#xz-sel-actions button:hover{background:#f0f0f0;border-color:#d0d0d0;}',
        '#xz-sel-list{flex:1;overflow-y:auto;padding:8px 22px;}',
        '.xz-ch-item{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;cursor:pointer;transition:background .12s;margin-bottom:2px;}',
        '.xz-ch-item:hover{background:#f8f8f8;}',
        '.xz-ch-item input[type=checkbox]{accent-color:#1677ff;width:16px;height:16px;}',
        '.xz-ch-item .ch-name{flex:1;font-size:13px;color:#333;}',
        '.xz-ch-item .ch-count{font-size:11px;color:#bbb;}',
        '#xz-sel-foot{padding:14px 22px;border-top:1px solid #f0f0f0;display:flex;align-items:center;justify-content:space-between;}',
        '#xz-sel-foot .info{font-size:12px;color:#999;}',
        '#xz-sel-foot .btns{display:flex;gap:8px;}',
        '#xz-sel-foot .btn-cancel{padding:7px 18px;border:1px solid #e0e0e0;background:#fff;color:#666;border-radius:8px;cursor:pointer;font-size:13px;transition:all .15s;}',
        '#xz-sel-foot .btn-cancel:hover{background:#f5f5f5;}',
        '#xz-sel-foot .btn-ok{padding:7px 18px;border:none;background:#1677ff;color:#fff;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600;transition:all .15s;}',
        '#xz-sel-foot .btn-ok:hover{background:#0958d9;}',
        '#xz-sel-foot .btn-ok:disabled{background:#ccc;cursor:not-allowed;}',
        /* 选择器暗色模式 */
        '#xz-sel-overlay.xz-sel-dark #xz-sel-box{background:rgba(26,26,46,.95);border-color:rgba(255,255,255,.08);}',
        '#xz-sel-overlay.xz-sel-dark #xz-sel-head{border-color:rgba(255,255,255,.06);}',
        '#xz-sel-overlay.xz-sel-dark #xz-sel-head h3{color:#e0e0f0;}',
        '#xz-sel-overlay.xz-sel-dark #xz-sel-head small{color:#777;}',
        '#xz-sel-overlay.xz-sel-dark #xz-sel-actions{border-color:rgba(255,255,255,.06);}',
        '#xz-sel-overlay.xz-sel-dark #xz-sel-actions button{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.1);color:#aaa;}',
        '#xz-sel-overlay.xz-sel-dark .xz-ch-item{color:#ccc;}',
        '#xz-sel-overlay.xz-sel-dark .xz-ch-item:hover{background:rgba(255,255,255,.04);}',
        '#xz-sel-overlay.xz-sel-dark .xz-ch-item .ch-name{color:#ddd;}',
        '#xz-sel-overlay.xz-sel-dark .xz-ch-item .ch-count{color:#666;}',
        '#xz-sel-overlay.xz-sel-dark #xz-sel-foot{border-color:rgba(255,255,255,.06);}',
        '#xz-sel-overlay.xz-sel-dark #xz-sel-foot .info{color:#777;}',
        '#xz-sel-overlay.xz-sel-dark #xz-sel-foot .btn-cancel{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.1);color:#aaa;}',
        '</style>',
        '<div id="xz-sel-box">',
        '  <div id="xz-sel-head">',
        '    <div class="ico" style="font-size:28px;font-weight:700;color:#1a1a2e;">小蟑螂</div>',
        '    <div class="txt">',
        '      <h3>'+html2text(courseName)+'</h3>',
        '      <small>勾选需要导出的章节，选中的章节内所有题目将被导出</small>',
        '    </div>',
        '  </div>',
        '  <div id="xz-sel-actions">',
        '    <button id="xz-sel-all">全选</button>',
        '    <button id="xz-sel-none">全不选</button>',
        '  </div>',
        '  <div id="xz-sel-list"></div>',
        '  <div id="xz-sel-foot">',
        '    <span class="info" id="xz-sel-info">已选 0 章</span>',
        '    <div class="btns">',
        '      <button class="btn-cancel" id="xz-sel-cancel">取消</button>',
        '      <button class="btn-ok" id="xz-sel-ok">开始导出</button>',
        '    </div>',
        '  </div>',
        '</div>'
      ].join('');
      document.body.appendChild(overlay);
      try{if(localStorage.getItem('xz_dark')==='1')overlay.classList.add('xz-sel-dark');}catch(e){}

      var listEl=overlay.querySelector('#xz-sel-list');
      var infoEl=overlay.querySelector('#xz-sel-info');

      chapters.forEach(function(ch,ci){
        var pages=ch.pages||[];
        var quizCount=pages.filter(function(p){return p.contentType===7}).length;
        var item=document.createElement('label');
        item.className='xz-ch-item';
        item.innerHTML='<input type="checkbox" class="xz-ch-cb" data-ch="'+ci+'" checked> <span class="ch-name">'+html2text(ch.title||'章节'+(ci+1))+'</span> <span class="ch-count">'+(quizCount?quizCount+' 个练习':'')+'</span>';
        listEl.appendChild(item);
        item.querySelector('input').onchange=function(){updateInfo();};
      });

      function updateInfo(){
        var cbs=listEl.querySelectorAll('.xz-ch-cb:checked');
        infoEl.textContent='已选 '+cbs.length+' / '+chapters.length+' 章';
        overlay.querySelector('#xz-sel-ok').disabled=cbs.length===0;
      }
      updateInfo();

      overlay.querySelector('#xz-sel-all').onclick=function(){
        listEl.querySelectorAll('.xz-ch-cb').forEach(function(cb){cb.checked=true;});updateInfo();
      };
      overlay.querySelector('#xz-sel-none').onclick=function(){
        listEl.querySelectorAll('.xz-ch-cb').forEach(function(cb){cb.checked=false;});updateInfo();
      };

      overlay.querySelector('#xz-sel-cancel').onclick=function(){overlay.remove();reject(new Error('用户取消'));};
      overlay.querySelector('#xz-sel-ok').onclick=function(){
        var selected=[];
        listEl.querySelectorAll('.xz-ch-cb:checked').forEach(function(cb){
          selected.push({chIndex:parseInt(cb.dataset.ch),pageIndices:null});
        });
        overlay.remove();
        resolve(selected);
      };
    });
  }

  async function exportCourseware(){
    var url=new URL(location.href);
    var courseId=url.searchParams.get('courseId')||url.searchParams.get('courseid');
    var classId=url.searchParams.get('classId')||url.searchParams.get('classid');
    if(!courseId||!classId)throw new Error('URL 缺少 courseId/classId');

    setStatus('正在获取课程目录...');
    var dirResp;
    if(IS_DGUT)dirResp=await api('GET','/uaapi/course/stu/'+encodeURIComponent(courseId)+'/directory?classId='+encodeURIComponent(classId));
    else{dirResp=await api('POST','/api/v2/learnCourse/courseDirectory',{courseId:courseId,classId:classId});if(!dirResp||(!dirResp.success&&!dirResp.data))dirResp=await api('POST','/learnCourse/courseDirectory',{courseId:courseId,classId:classId});}
    var dirData=dirResp.data||dirResp;
    var courseName=dirData.coursename||dirData.courseName||'course_'+courseId;
    var chapters=[];

    if(Array.isArray(dirData.chapters)){
      dirData.chapters.forEach(function(ch){
        var chNodeId=ch.nodeid||ch.id||ch.nodeId;
        if(Array.isArray(ch.items)&&ch.items.length){
          ch.items.forEach(function(item){
            chapters.push({title:item.title||item.name||'未命名',nodeId:chNodeId,itemId:item.itemid||item.id,pages:[]});
          });
        }else{
          chapters.push({title:ch.nodetitle||ch.title||ch.name||'未命名',nodeId:chNodeId,itemId:null,pages:[]});
        }
      });
    }else if(Array.isArray(dirData.items)){
      dirData.items.forEach(function(item){
        chapters.push({title:item.title||item.name||'未命名',nodeId:null,itemId:item.itemid||item.id,pages:[]});
      });
    }
    if(!chapters.length)throw new Error('课程目录为空');

    setStatus('正在获取页面列表...');
    var fetchedNodeIds={};
    for(var ci=0;ci<chapters.length;ci++){
      if(exportCancelled)throw new Error('用户取消导出');
      var ch=chapters[ci];
      var chId=ch.nodeId;
      if(!chId||fetchedNodeIds[chId])continue;
      fetchedNodeIds[chId]=true;
      setProgress(Math.round(ci/chapters.length*30),'获取章节数据 '+(ci+1)+'/'+chapters.length+'...');
      var chResp;
      if(IS_DGUT)chResp=await api('GET','/uaapi/wholepage/chapter/stu/'+encodeURIComponent(chId));
      else{chResp=await api('POST','/api/v2/learnCourse/getWholeChapterPageContent',{nodeId:chId});if(!chResp||!chResp.data)chResp=await api('POST','/learnCourse/getWholeChapterPageContent',{nodeId:chId});}
      var cd=chResp.data||chResp;
      var items=cd.wholepageItemDTOList||cd.items||[];
      for(var ii=0;ii<items.length;ii++){
        var item=items[ii];
        var wpList=item.wholepageDTOList||item.coursepages||[];
        var sectionPages=[];
        for(var wi=0;wi<wpList.length;wi++){
          var wp=wpList[wi];
          sectionPages.push({title:wp.content||wp.title||wp.name||'页面',contentType:wp.contentType||wp.type||0,id:wp.id||wp.relationid||wp.pageId,coursepageDTOList:wp.coursepageDTOList||wp.children||[]});
        }
        for(var ci2=0;ci2<chapters.length;ci2++){
          if(chapters[ci2].nodeId===chId&&(chapters[ci2].itemId===item.itemid||chapters[ci2].itemId===item.id)){
            chapters[ci2].pages=sectionPages;
            break;
          }
        }
      }
      await wait(100);
    }

    var totalQuizPages=0;
    chapters.forEach(function(ch){
      var qPages=ch.pages.filter(function(p){return p.contentType===7});
      totalQuizPages+=qPages.length;
      if(qPages.length){
        var qCount=0;qPages.forEach(function(p){(p.coursepageDTOList||[]).forEach(function(cp){qCount+=getQs(cp).length;});});
        console.log('[小蟑螂] '+ch.title+': '+qPages.length+' 个练习页, '+qCount+' 道题');
      }
    });
    if(!totalQuizPages)throw new Error('课程中没有找到练习页面');

    setStatus('请选择要导出的课件...');
    var selected;
    try{selected=await showCoursewareSelector(courseName,chapters);}
    catch(e){throw new Error('用户取消导出');}

    var result=[],total=0;
    var totalQ=0;
    selected.forEach(function(sel){
      var ch=chapters[sel.chIndex];
      var pgs=sel.pageIndices?sel.pageIndices.map(function(i){return ch.pages[i]}):ch.pages;
      pgs.forEach(function(pg){
        if(pg&&pg.contentType===7){
          (pg.coursepageDTOList||[]).forEach(function(cp){
            var qs=getQs(cp);
            totalQ+=qs.length;
          });
        }
      });
    });
    console.log('[小蟑螂] 选中 '+selected.length+' 个章节, 共 '+totalQ+' 道题待提取');
    if(!totalQ)throw new Error('选中的章节中没有找到题目');

    var allTasks=[];
    for(var si=0;si<selected.length;si++){
      var sel=selected[si];
      var ch=chapters[sel.chIndex];
      var pageIndices=sel.pageIndices||ch.pages.map(function(_,i){return i;});
      for(var pi=0;pi<pageIndices.length;pi++){
        var pg=ch.pages[pageIndices[pi]];
        if(!pg||pg.contentType!==7)continue;
        var parentId=pg.id;
        for(var pdi=0;pdi<(pg.coursepageDTOList||[]).length;pdi++){
          var questions=getQs(pg.coursepageDTOList[pdi]);
          for(var qi=0;qi<questions.length;qi++){
            allTasks.push({q:questions[qi],parentId:parentId});
          }
        }
      }
    }
    totalQ=allTasks.length;
    if(!totalQ)throw new Error('选中的章节中没有找到题目');

    var CONCURRENT=4;
    var idx=0,done=0,failCount=0;
    var results=new Array(totalQ);

    async function fetchOne(task,i){
      var q=task.q,qid=q.questionid,ansData=null;
      if(qid&&task.parentId){
        for(var retry=0;retry<2;retry++){
          try{
            var aResp;
            if(IS_DGUT)aResp=await api('GET','/uaapi/questionAnswer/'+encodeURIComponent(qid)+'?parentId='+encodeURIComponent(task.parentId));
            else{aResp=await api('POST','/api/v2/learnQuestion/getQuestionAnswer',{questionId:qid,parentId:task.parentId});if(!aResp||!aResp.data)aResp=await api('POST','/learnQuestion/getQuestionAnswer',{questionId:qid,parentId:task.parentId});}
            ansData=parseAnswer(aResp);
            break;
          }catch(e){
            if(retry===0)await wait(300);
            else failCount++;
          }
        }
      }
      results[i]=formatCourseQ(q,ansData);
      done++;
      if(done%3===0||done===totalQ)setProgress(Math.min(99,Math.round(done/totalQ*100)),'正在提取第 '+done+' / '+totalQ+' 题...');
    }

    while(idx<totalQ){
      if(exportCancelled)throw new Error('用户取消导出');
      var batch=[];
      for(var c=0;c<CONCURRENT&&idx<totalQ;c++,idx++){
        batch.push(fetchOne(allTasks[idx],idx));
      }
      await Promise.all(batch);
      await new Promise(function(r){setTimeout(r,0)});
    }

    result=results.filter(function(r){return r!=null});
    if(failCount)console.log('[小蟑螂] '+failCount+' 道题答案获取失败');
    setProgress(100,'提取完成');
    return{name:courseName,questions:result};
  }

  // ==================== 训练导出 ====================
  async function exportTraining(){
    var hash=location.hash||'';
    var m=hash.match(/#\/questionTrain\/practice\/(\d+)\/(\d+)\/(\d+)/);
    if(!m)throw new Error('请先打开题库训练页面');
    var qtId=m[1],ocId=m[2],qtType=m[3];
    var info=getCookie('USERINFO')||getCookie('USER_INFO')||'';
    var userId='';
    try{userId=String(JSON.parse(decodeURIComponent(info)).userId||'');}catch(e){}
    if(!userId)throw new Error('缺少用户ID');
    var base={qtId:qtId,ocId:ocId,qtType:qtType,traceId:userId};
    setProgress(5,'正在获取答题卡...');
    var sheet=await api('GET','/utestapi/questionTraining/student/answerSheet?'+new URLSearchParams(base));
    if(!sheet||sheet.code!==1)throw new Error('获取答题卡失败');
    var sheetList=(sheet.result&&sheet.result.list)||[];
    var total=Number((sheet.result&&sheet.result.total)||sheetList.length);
    var pages=Math.ceil(total/30)||1;
    var allQ=[];
    for(var p=1;p<=pages;p++){
      if(exportCancelled)throw new Error('用户取消导出');
      setProgress(Math.round(p/pages*60),'获取题目 '+p+'/'+pages+'...');
      var resp=await api('GET','/utestapi/questionTraining/student/questionList?'+new URLSearchParams(Object.assign({},base,{pn:p,ps:30})));
      if(resp&&resp.result&&resp.result.trainingQuestions)allQ=allQ.concat(resp.result.trainingQuestions);
      await wait(300);
    }
    setProgress(60,'正在获取标准答案...');
    var correctMap={};
    var CONCURRENT_T=4;
    var tIdx=0,tDone=0;
    var tTotal=sheetList.length;

    async function fetchTrainAnswer(item,i){
      var qid=item.id;
      var q=allQ.find(function(x){return x.id===qid})||{type:item.questionType};
      var dummy=(q.type===1||q.type===2||q.type===3)?['A']:[''];
      for(var retry=0;retry<2;retry++){
        try{
          var aResp=await api('POST','/utestapi/questionTraining/student/answer?traceId='+userId,{qtId:Number(qtId),qtType:Number(qtType),index:i,relationId:qid,answer:dummy});
          var ca=aResp.result&&aResp.result.correctAnswer;
          correctMap[qid]=Array.isArray(ca)?ca.map(String):[];
          break;
        }catch(e){
          if(retry===0)await wait(300);
        }
      }
      tDone++;
      if(tDone%5===0||tDone===tTotal)setProgress(60+Math.round(tDone/tTotal*35),'已获取答案 '+tDone+'/'+tTotal);
    }

    while(tIdx<tTotal){
      if(exportCancelled)throw new Error('用户取消导出');
      var tBatch=[];
      for(var c=0;c<CONCURRENT_T&&tIdx<tTotal;c++,tIdx++){
        tBatch.push(fetchTrainAnswer(sheetList[tIdx],tIdx));
      }
      await Promise.all(tBatch);
      await new Promise(function(r){setTimeout(r,0)});
    }
    allQ.forEach(function(q){if(correctMap[q.id])q.userAnswer=correctMap[q.id];});
    setProgress(100,'提取完成');
    return{name:'题库训练_'+qtId,questions:allQ.map(formatTrainQ).filter(Boolean)};
  }

  // ==================== 自动刷课 ====================

  // 配置持久化
  var CFG_KEY = 'xz_autocfg';
  function loadCfg(){try{return JSON.parse(localStorage.getItem(CFG_KEY))||{};}catch(e){return{};}}
  function saveCfg(c){localStorage.setItem(CFG_KEY,JSON.stringify(c));}

  var autoState = {
    paused: true,
    navigating: false,
    answerInProgress: false,
    retry: 0,
    startTime: 0,
    pagesDone: 0,
    questionsDone: 0,
    questionsCorrect: 0
  };

  // 默认配置
  var defaultCfg = {
    rate: 1.5,
    stayTime: 5,
    autoMute: true,
    autoPlay: true,
    autoAnswer: true,
    autoNext: true,
    autoSubmit: true,
    maxRetry: 7,
    accuracyMin: 100,
    accuracyMax: 100,
    answerDelay: 500,
    targetChapter: '',
    targetSection: ''
  };

  function getCfg(){var c=loadCfg();for(var k in defaultCfg){if(typeof c[k]==='undefined')c[k]=defaultCfg[k];}return c;}

  function parseAccuracy(str){
    str=String(str||'').trim();
    if(!str)return{min:100,max:100};
    if(str.indexOf('-')!==-1){
      var parts=str.split('-');
      var a=parseInt(parts[0])||0,b=parseInt(parts[1])||100;
      if(a<0)a=0;if(b>100)b=100;if(a>b){var t=a;a=b;b=t;}
      return{min:a,max:b};
    }
    var v=parseInt(str);
    if(isNaN(v))v=100;
    if(v<0)v=0;if(v>100)v=100;
    return{min:v,max:v};
  }

  function getTargetAccuracy(){
    var cfg=getCfg();
    var r=parseAccuracy(cfg.accuracyMin+'-'+cfg.accuracyMax);
    if(r.min===r.max)return r.min/100;
    return(r.min+Math.random()*(r.max-r.min))/100;
  }

  function autoProcessVideos() {
    if (autoState.paused || autoState.navigating || autoState.answerInProgress) return;
    var cfg = getCfg();
    if (!cfg.autoPlay) return;

    var videos = document.querySelectorAll('video');
    var hasVideo = false;
    videos.forEach(function(v) {
      if (!v.src && !v.currentSrc) return;
      hasVideo = true;
      v.playbackRate = cfg.rate;
      if (cfg.autoMute && !v.muted) v.muted = true;
      if (v.paused) v.play().catch(function(){});
      v.onended = function() {
        Logger.log('视频播放完毕，停留 '+cfg.stayTime+' 秒后翻页');
        setTimeout(function(){ autoGoNext(); }, cfg.stayTime * 1000);
      };
    });

    if (!hasVideo) {
      // 没有视频，可能当前页是纯文字/测验
      Logger.log('当前页无视频，'+cfg.stayTime+' 秒后尝试翻页');
      setTimeout(function(){ autoGoNext(); }, cfg.stayTime * 1000);
    }
  }

  function autoCheckModals() {
    if (autoState.paused || autoState.answerInProgress) return;
    var cfg = getCfg();

    var questionPanel = document.querySelector('.question-wrapper');
    if (questionPanel && cfg.autoAnswer) { autoAnswerQuiz(); return; }

    var statModal = document.getElementById('statModal');
    if (statModal) { var btns = statModal.getElementsByTagName('button'); if (btns.length >= 2) btns[1].click(); return; }

    var alertModal = document.getElementById('alertModal');
    if (alertModal && alertModal.className.includes('in')) {
      var ops = document.querySelectorAll('.modal-operation button, .btn-submit');
      ops.forEach(function(btn) { if (btn.textContent.trim() !== '提交') btn.click(); });
    }
  }

  function autoAnswerQuiz() {
    if (autoState.paused || autoState.answerInProgress) return;
    var cfg = getCfg();
    if (!cfg.autoAnswer) return;

    autoState.answerInProgress = true;
    Logger.log('检测到测验，开始自动答题...');

    var panels = document.querySelectorAll('.question-wrapper');
    var pageItems = document.querySelectorAll('.page-item');
    var parentId = '';

    pageItems.forEach(function(item) {
      var pn = item.querySelector('.page-name');
      if (pn && pn.className.includes('active')) {
        var id = item.getAttribute('id') || '';
        parentId = id.replace(/[a-zA-Z]/g, '');
      }
    });

    var qIds = [];
    panels.forEach(function(p) {
      var id = p.getAttribute('id') || '';
      if (id.startsWith('question')) qIds.push(id.replace('question', ''));
    });
    qIds = qIds.filter(function(v, i, a) { return a.indexOf(v) === i; });

    if (!qIds.length) { autoState.answerInProgress = false; autoGoNext(); return; }

    var idx = 0;
    function next() {
      if (idx >= qIds.length) {
        Logger.log(qIds.length + ' 道题处理完毕');
        setTimeout(function() {
          if (cfg.autoSubmit) {
            var inputs = document.querySelectorAll('textarea, .blank-input');
            inputs.forEach(function(el) { $(el).trigger('change'); });
            var submit = document.querySelector('.btn-submit');
            if (submit) { submit.click(); Logger.log('已提交答案'); }
          }
          autoState.answerInProgress = false;
          if (cfg.autoNext) autoGoNext();
        }, 1000);
        return;
      }

      var qId = qIds[idx];
      var auth = getAuth();
      if (!auth) { Logger.log('无认证信息'); autoState.answerInProgress = false; return; }

      var cfg = getCfg();
      GM_xmlhttpRequest({
        method: 'GET',
        url: BASE + '/uaapi/questionAnswer/' + qId + '?parentId=' + parentId,
        headers: { 'Authorization': auth, 'ua-authorization': auth },
        onload: function(res) {
          try {
            var data = JSON.parse(res.responseText);
            var answers = data.correctAnswerList || data.answer || [];
            if (answers.length) autoFillAnswer(qId, answers);
            var acc = Math.round(getTargetAccuracy()*100);
            Logger.log('题目 '+qId+': 已作答 (目标正确率'+acc+'%)');
          } catch (e) { Logger.log('获取答案失败: '+e.message+'，跳过此题'); }
          setTimeout(function(){ idx++; next(); }, jitteredDelay(cfg.answerDelay||500));
        },
        onerror: function() { Logger.log('网络异常，正在重试...'); setTimeout(function(){ idx++; next(); }, jitteredDelay(cfg.answerDelay||800)); }
      });
    }
    next();
  }

  function autoFillAnswer(qId, answers) {
    var el = document.querySelector('#question' + qId);
    if (!el) return;
    var typeTag = el.querySelector('.question-type-tag');
    var typeText = typeTag ? typeTag.textContent : '';

    var accuracy = getTargetAccuracy();
    var shouldAnswerCorrect = Math.random() < accuracy;
    autoState.questionsDone++;
    if(shouldAnswerCorrect) autoState.questionsCorrect++;

    if (typeText.includes('选择')) {
      var opts = el.querySelectorAll('.choice-item, .option-item, .question-option');
      if (shouldAnswerCorrect) {
        opts.forEach(function(opt) {
          var label = opt.querySelector('.option') || opt.querySelector('.option-letter') || opt.querySelector('span:first-child');
          if (label) {
            var letter = label.textContent.trim().replace('.', '');
            if (answers.includes(letter)) {
              var cb = opt.querySelector('.checkbox, .option-checkbox, .radio');
              if (cb && !cb.classList.contains('selected')) { opt.click(); if (!cb.classList.contains('selected')) cb.click(); }
            }
          }
        });
      } else {
        var wrongOpts = [];
        opts.forEach(function(opt) {
          var label = opt.querySelector('.option') || opt.querySelector('.option-letter') || opt.querySelector('span:first-child');
          if (label) {
            var letter = label.textContent.trim().replace('.', '');
            if (!answers.includes(letter)) wrongOpts.push(opt);
          }
        });
        if (wrongOpts.length) {
          var pick = wrongOpts[Math.floor(Math.random() * wrongOpts.length)];
          var cb = pick.querySelector('.checkbox, .option-checkbox, .radio');
          if (cb && !cb.classList.contains('selected')) { pick.click(); if (!cb.classList.contains('selected')) cb.click(); }
        }
      }
    } else if (typeText.includes('判断')) {
      var isCorrect = shouldAnswerCorrect ? (String(answers[0]) === 'true') : (String(answers[0]) !== 'true');
      var btn = el.querySelector(isCorrect ? '.right-btn' : '.wrong-btn');
      if (btn && !btn.classList.contains('selected')) btn.click();
    } else if (typeText.includes('填空')) {
      var inputs = el.querySelectorAll('textarea, .blank-input');
      answers.forEach(function(ans, i) {
        if (inputs[i]) {
          if (shouldAnswerCorrect) {
            inputs[i].value = ans.replace(/(<[^>]+>|\\n|\\r)/g, ' ');
          } else {
            inputs[i].value = '略';
          }
          $(inputs[i]).trigger('change');
        }
      });
    }
  }

  function autoGoNext() {
    if (autoState.paused || autoState.navigating || autoState.answerInProgress) return;
    var cfg = getCfg();
    if (!cfg.autoNext) return;

    autoState.navigating = true;
    var btns = document.querySelectorAll('.mobile-next-page-btn, .next-btn, .btn-next, .nextVideoBtn');

    if (btns.length === 0) {
      autoState.retry++;
      Logger.log('未找到下一页 (' + autoState.retry + '/' + cfg.maxRetry + ')');
      if (autoState.retry >= cfg.maxRetry) {
        autoState.paused = true;
        updateAutoUI();
        updateAutoProgress();
        Logger.log('连续 ' + cfg.maxRetry + ' 次未找到下一页，刷课完成');
        notify('刷课完成！' + getAutoStats());
      }
      autoState.navigating = false;
      return;
    }

    autoState.retry = 0;
    autoState.pagesDone++;
    btns.forEach(function(b) { if (!b.classList.contains('disabled')) b.click(); });
    Logger.log('已翻页 (累计 '+autoState.pagesDone+' 页, '+autoState.questionsDone+' 题)');
    setTimeout(function() { autoState.navigating = false; autoProcessVideos(); autoCheckModals(); }, 3000);
  }

  function getCurrentChapterNum(){
    var items=document.querySelectorAll('.chapter-item, .chapter-name');
    for(var i=0;i<items.length;i++){
      var name=items[i].querySelector('.page-name.active, .chapter-name');
      if(items[i].querySelector('.page-name.active'))return i+1;
    }
    var active=document.querySelector('.chapter-item .page-name.active');
    if(active){
      var ch=active.closest('.chapter-item');
      if(ch){var all=document.querySelectorAll('.chapter-item');for(var j=0;j<all.length;j++){if(all[j]===ch)return j+1;}}
    }
    return 0;
  }

  function isInRange(){
    var cfg=getCfg();
    var start=parseInt(cfg.targetChapter)||0;
    var end=parseInt(cfg.targetSection)||0;
    if(!start&&!end)return true;
    var cur=getCurrentChapterNum();
    if(!cur)return true;
    if(start&&cur<start)return false;
    if(end&&cur>end)return false;
    return true;
  }

  function getAutoStats(){
    if(!autoState.startTime)return '';
    var elapsed=Math.floor((Date.now()-autoState.startTime)/1000);
    var m=Math.floor(elapsed/60),s=elapsed%60;
    var acc=autoState.questionsDone?Math.round(autoState.questionsCorrect/autoState.questionsDone*100):0;
    return '运行'+m+'分'+s+'秒 | '+autoState.pagesDone+'页 | '+autoState.questionsDone+'题 | 正确率'+acc+'%';
  }

  function updateAutoProgress(){
    var wrap=document.getElementById('xz-auto-progress');
    var bar=document.getElementById('xz-auto-bar');
    var txt=document.getElementById('xz-auto-progress-text');
    if(!wrap)return;
    if(autoState.paused&&!autoState.startTime){
      wrap.style.display='none';
      return;
    }
    wrap.style.display='block';
    var elapsed=autoState.startTime?Math.floor((Date.now()-autoState.startTime)/1000):0;
    var m=Math.floor(elapsed/60),s=elapsed%60;
    var acc=autoState.questionsDone?Math.round(autoState.questionsCorrect/autoState.questionsDone*100):0;
    if(bar)bar.style.width=(autoState.paused?'100':'0')+'%';
    if(txt)txt.textContent=(autoState.paused?'已完成 ':'运行中 ')+m+'分'+s+'秒 | '+autoState.pagesDone+'页 | '+autoState.questionsDone+'题 | 正确率'+acc+'%';
  }

  var autoStatsInterval = 0;
  function autoLoop() {
    if (autoState.paused) return;
    if(!isInRange()){
      Logger.log('当前章节不在设定范围内，已暂停');
      autoState.paused=true;
      updateAutoUI();
      updateAutoProgress();
      return;
    }
    autoProcessVideos();
    autoCheckModals();
    updateAutoProgress();
    autoStatsInterval++;
    if(autoStatsInterval>=6){
      autoStatsInterval=0;
      var stats=getAutoStats();
      if(stats)Logger.log('[统计] '+stats);
    }
    setTimeout(autoLoop, 5000);
  }

  // ==================== 下载 ====================
  var exportCancelled = false;

  function setProgress(pct,text){
    var bar=document.getElementById('xz-progress-bar');
    var txt=document.getElementById('xz-progress-text');
    if(bar)bar.style.width=pct+'%';
    if(txt&&text)txt.textContent=text;
    if(pct>0&&pct<100)setStatus('['+pct+'%] '+(text||''));
    else setStatus(text||'');
  }

  function download(name,content,mime){var blob=new Blob([content],{type:mime});var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(a.href)},2000);}

  // ==================== Logger ====================
  var Logger = {
    el: null,
    maxEntries: 200,
    count: 0,
    init: function(el) { this.el = el; this.count = 0; },
    log: function(msg) {
      var t = new Date().toLocaleTimeString();
      console.log('[小蟑螂] ' + msg);
      if (this.el) {
        this.count++;
        if (this.count > this.maxEntries) {
          var lines = this.el.innerHTML.split('<br>');
          this.el.innerHTML = lines.slice(Math.floor(lines.length/2)).join('<br>');
          this.count = Math.floor(lines.length/2);
        }
        this.el.innerHTML += '[' + t + '] ' + msg + '<br>';
        this.el.scrollTop = this.el.scrollHeight;
      }
    }
  };

  // ==================== UI ====================
  var statusEl, logEl, btnExport, btnAuto;

  function createUI() {
    var panel = document.createElement('div');
    panel.id = 'xz-panel';
    var isAutoPage = IS_COURSE && location.href.includes('learnCourse');
    var cfg = getCfg();

    var isRelevantPage = IS_COURSE || IS_TRAINING;
    var showTabs = isAutoPage ? ['首页','题库导出','自动刷课','关于'] : (isRelevantPage ? ['首页','题库导出','关于'] : ['首页','关于']);

    panel.innerHTML = [
      '<style>',
      /* 主面板 - 玻璃拟态 */
      '#xz-panel{',
      '  position:fixed;right:20px;top:80px;z-index:999999;',
      '  width:320px;max-height:calc(100vh - 100px);',
      '  display:flex;flex-direction:column;',
      '  background:rgba(255,255,255,.72);',
      '  backdrop-filter:blur(20px) saturate(1.4);-webkit-backdrop-filter:blur(20px) saturate(1.4);',
      '  border:1px solid rgba(255,255,255,.6);',
      '  border-radius:18px;',
      '  box-shadow:0 8px 32px rgba(0,0,0,.08),inset 0 1px 0 rgba(255,255,255,.8);',
      '  font-family:-apple-system,"PingFang SC","Helvetica Neue",sans-serif;',
      '  font-size:13px;color:#333;',
      '  transition:transform .25s cubic-bezier(.4,0,.2,1),opacity .25s;',
      '}',
      '#xz-panel .xz-head{padding:18px 18px 0;flex-shrink:0;cursor:move;user-select:none;}',
      '#xz-panel .xz-body{flex:1;overflow-y:auto;overflow-x:hidden;padding:0 18px 18px;min-height:0;scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.1) transparent;}',
      '#xz-panel .xz-body::-webkit-scrollbar{width:4px;}',
      '#xz-panel .xz-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.12);border-radius:4px;}',
      '#xz-panel.xz-hide{transform:scale(.96) translateY(8px);opacity:0;pointer-events:none;}',

      /* 品牌 */
      '#xz-panel .brand{text-align:center;margin-bottom:10px;}',
      '#xz-panel .brand .logo{width:40px;height:40px;margin:0 auto 6px;border-radius:10px;object-fit:contain;}',
      '#xz-panel .brand .name{font-size:17px;font-weight:700;color:#1a1a2e;letter-spacing:.8px;}',
      '#xz-panel .brand .ver{font-size:10px;color:#a0a0b0;font-weight:400;margin-top:3px;letter-spacing:.5px;}',

      /* Tab - 新拟态 */
      '#xz-panel .tabs{',
      '  display:flex;gap:3px;margin-bottom:12px;',
      '  background:rgba(0,0,0,.04);',
      '  border-radius:10px;padding:3px;',
      '  box-shadow:inset 0 1px 3px rgba(0,0,0,.06);',
      '}',
      '#xz-panel .tab{',
      '  flex:1;padding:7px 0;text-align:center;border-radius:8px;',
      '  cursor:pointer;font-size:12px;color:#888;transition:all .2s;',
      '}',
      '#xz-panel .tab:hover{color:#555;}',
      '#xz-panel .tab.active{',
      '  background:rgba(255,255,255,.85);color:#1a1a2e;font-weight:600;',
      '  box-shadow:0 2px 8px rgba(0,0,0,.06),inset 0 1px 0 rgba(255,255,255,.9);',
      '}',

      '#xz-panel .sec{display:none;} #xz-panel .sec.show{display:block;}',

      /* 卡片 - 玻璃拟态 */
      '.xz-cards{display:flex;flex-direction:column;gap:8px;margin-top:10px;}',
      '.xz-card{',
      '  background:rgba(255,255,255,.5);',
      '  backdrop-filter:blur(10px);',
      '  border:1px solid rgba(255,255,255,.6);',
      '  border-radius:14px;padding:14px 16px;',
      '  cursor:pointer;transition:all .2s cubic-bezier(.4,0,.2,1);',
      '  box-shadow:0 2px 8px rgba(0,0,0,.04);',
      '}',
      '.xz-card:hover{',
      '  transform:translateY(-1px);',
      '  box-shadow:0 4px 16px rgba(0,0,0,.08);',
      '  border-color:rgba(255,255,255,.8);',
      '}',
      '.xz-card:active{transform:translateY(0);box-shadow:0 1px 4px rgba(0,0,0,.06);}',
      '.xz-card .card-title{font-size:13px;font-weight:600;color:#1a1a2e;margin-bottom:3px;}',
      '.xz-card .card-desc{font-size:11px;color:#888;line-height:1.5;}',
      '.xz-card .card-hint{font-size:10px;color:#4a90d9;margin-top:8px;display:block;}',
      '.xz-card.disabled{opacity:.4;cursor:default;transform:none;}',
      '.xz-card.disabled:hover{transform:none;box-shadow:0 2px 8px rgba(0,0,0,.04);}',
      '.xz-card.disabled .card-hint{color:#bbb;}',

      /* 子页面头部 */
      '.xz-sub-head{display:flex;align-items:center;gap:10px;margin-bottom:14px;}',
      '.xz-sub-head .back{',
      '  width:30px;height:30px;border-radius:10px;',
      '  border:1px solid rgba(0,0,0,.06);',
      '  background:rgba(255,255,255,.6);',
      '  color:#888;font-size:16px;cursor:pointer;',
      '  display:flex;align-items:center;justify-content:center;',
      '  transition:all .15s;font-weight:300;',
      '  box-shadow:0 2px 6px rgba(0,0,0,.04);',
      '}',
      '.xz-sub-head .back:hover{background:rgba(255,255,255,.9);color:#555;}',
      '.xz-sub-head .back:active{box-shadow:inset 0 1px 3px rgba(0,0,0,.08);}',
      '.xz-sub-head .title{font-size:15px;font-weight:600;color:#1a1a2e;}',

      /* 提示框 - 磨砂 */
      '.xz-hint{',
      '  background:rgba(0,0,0,.03);',
      '  border:1px solid rgba(0,0,0,.04);',
      '  border-radius:12px;padding:12px 14px;margin-bottom:12px;',
      '}',
      '.xz-hint .ht{font-size:12px;font-weight:600;color:#555;margin-bottom:4px;}',
      '.xz-hint .hp{font-size:11px;color:#999;line-height:1.6;}',

      /* 按钮 - 新拟态 */
      '.xz-btn{',
      '  width:100%;padding:11px;border:none;border-radius:12px;',
      '  font-size:13px;cursor:pointer;font-weight:600;color:#fff;',
      '  transition:all .2s cubic-bezier(.4,0,.2,1);',
      '  letter-spacing:.3px;',
      '}',
      '.xz-btn:hover{transform:translateY(-1px);}',
      '.xz-btn:active{transform:translateY(1px);}',
      '.xz-btn-primary{background:linear-gradient(135deg,#4a90d9,#357abd);box-shadow:0 4px 14px rgba(74,144,217,.3);}',
      '.xz-btn-primary:hover{box-shadow:0 6px 20px rgba(74,144,217,.4);}',
      '.xz-btn-primary:active{box-shadow:0 2px 8px rgba(74,144,217,.2);}',
      '.xz-btn-success{background:linear-gradient(135deg,#52c41a,#389e0d);box-shadow:0 4px 14px rgba(82,196,26,.25);}',
      '.xz-btn-success:hover{box-shadow:0 6px 20px rgba(82,196,26,.35);}',
      '.xz-btn-danger{background:linear-gradient(135deg,#ff4d4f,#cf1322);box-shadow:0 4px 14px rgba(255,77,79,.25);}',
      '.xz-btn:disabled{background:#e0e0e0;color:#aaa;cursor:not-allowed;box-shadow:none;transform:none;}',

      /* 选项 */
      'label.xz-lbl{font-size:12px;color:#777;cursor:pointer;display:flex;align-items:center;gap:6px;margin:5px 0;}',
      '#xz-panel input[type=number]{',
      '  width:52px;background:rgba(0,0,0,.03);color:#333;',
      '  border:1px solid rgba(0,0,0,.08);border-radius:8px;',
      '  padding:4px 6px;font-size:12px;outline:none;',
      '  transition:border-color .15s;',
      '}',
      '#xz-panel input[type=number]:focus{border-color:#4a90d9;box-shadow:0 0 0 2px rgba(74,144,217,.1);}',
      '#xz-panel input[type=checkbox]{accent-color:#4a90d9;}',
      '.xz-row{display:flex;align-items:center;gap:6px;margin:5px 0;font-size:12px;color:#777;}',
      '.xz-opt-title{font-size:10px;color:#aaa;margin:10px 0 4px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;}',

      '.xz-divider{border-top:1px solid rgba(0,0,0,.05);margin:12px 0;}',

      /* 日志 */
      '.xz-st{margin-top:6px;font-size:11px;color:#aaa;min-height:16px;word-break:break-all;}',
      '.xz-log{',
      '  margin-top:6px;font-size:10px;color:#999;',
      '  max-height:80px;overflow-y:auto;',
      '  background:rgba(0,0,0,.03);padding:6px 8px;',
      '  border-radius:8px;border:1px solid rgba(0,0,0,.04);',
      '  display:none;',
      '}',
      '.xz-log.show{display:block;}',

      /* 更新日志 */
      '.xz-log-list{font-size:11px;color:#888;line-height:1.8;max-height:180px;overflow-y:auto;padding:4px 0;}',
      '.xz-log-list .ver{font-weight:600;color:#444;margin-top:8px;}',
      '.xz-log-list .ver:first-child{margin-top:0;}',
      '.xz-log-list .date{color:#bbb;font-size:10px;margin-left:6px;}',
      '.xz-log-list ul{margin:2px 0;padding-left:16px;}',
      '.xz-log-list li{margin:1px 0;}',

      /* 页脚 */
      '.xz-footer{text-align:center;padding:10px 0 0;margin-top:8px;border-top:1px solid rgba(0,0,0,.04);}',
      '.xz-footer .copy{font-size:10px;color:#ccc;}',
      '.xz-footer .disc{font-size:9px;color:#ddd;margin-top:5px;line-height:1.5;}',

      /* 关闭按钮 */
      '#xz-panel .close{',
      '  position:absolute;top:12px;right:14px;',
      '  background:none;border:none;font-size:16px;color:#ccc;cursor:pointer;line-height:1;',
      '  transition:color .15s;',
      '}',
      '#xz-panel .close:hover{color:#999;}',

      /* 暗色模式 */
      '#xz-panel.xz-dark{background:rgba(26,26,46,.88);color:#ddd;border-color:rgba(255,255,255,.08);}',
      '#xz-panel.xz-dark .brand .name{color:#e0e0f0;}',
      '#xz-panel.xz-dark .brand .ver{color:#666;}',
      '#xz-panel.xz-dark .brand .logo{opacity:.85;}',
      '#xz-panel.xz-dark .tabs{background:rgba(0,0,0,.3);}',
      '#xz-panel.xz-dark .tab{color:#777;}',
      '#xz-panel.xz-dark .tab.active{background:rgba(255,255,255,.08);color:#ccc;}',
      '#xz-panel.xz-dark .xz-card{background:rgba(255,255,255,.04);border-color:rgba(255,255,255,.06);}',
      '#xz-panel.xz-dark .xz-card .card-title{color:#ddd;}',
      '#xz-panel.xz-dark .xz-card .card-desc{color:#777;}',
      '#xz-panel.xz-dark .xz-card .card-hint{color:#6aa0e8;}',
      '#xz-panel.xz-dark .xz-sub-head .title{color:#ddd;}',
      '#xz-panel.xz-dark .xz-sub-head .back{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.08);color:#888;}',
      '#xz-panel.xz-dark .xz-hint{background:rgba(255,255,255,.03);border-color:rgba(255,255,255,.05);}',
      '#xz-panel.xz-dark .xz-hint .ht{color:#aaa;}',
      '#xz-panel.xz-dark .xz-hint .hp{color:#777;}',
      '#xz-panel.xz-dark .xz-opt-title{color:#666;}',
      '#xz-panel.xz-dark label.xz-lbl{color:#888;}',
      '#xz-panel.xz-dark .xz-row{color:#888;}',
      '#xz-panel.xz-dark input[type=number]{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.1);color:#ddd;}',
      '#xz-panel.xz-dark .xz-divider{border-color:rgba(255,255,255,.06);}',
      '#xz-panel.xz-dark .xz-st{color:#777;}',
      '#xz-panel.xz-dark .xz-log{background:rgba(255,255,255,.03);border-color:rgba(255,255,255,.05);color:#777;}',
      '#xz-panel.xz-dark .xz-log-list{color:#888;}',
      '#xz-panel.xz-dark .xz-log-list .ver{color:#bbb;}',
      '#xz-panel.xz-dark .xz-footer{border-color:rgba(255,255,255,.06);}',
      '#xz-panel.xz-dark .xz-footer .copy{color:#555;}',
      '#xz-panel.xz-dark .xz-footer .disc{color:#444;}',
      '#xz-panel.xz-dark .xz-body::-webkit-scrollbar-thumb{background:rgba(255,255,255,.12);}',

      '</style>',

      /* 顶栏 - 可拖动 */
      '<div class="xz-head">',
      '  <button class="close" id="xz-close">&times;</button>',
      '  <div class="brand">',
      '    <img class="logo" src="'+LOGO_URI+'" alt="小蟑螂">',
      '    <div class="name">莞工小蟑螂</div>',
      '    <div class="ver">优学院全能助手 · v3.3</div>',
      '  </div>',
      '  <div class="tabs">',
      showTabs.map(function(t,i){
        var key=t==='首页'?'home':t==='题库导出'?'export':t==='自动刷课'?'auto':'about';
        return '    <div class="tab'+(i===0?' active':'')+'" data-tab="'+key+'">'+t+'</div>';
      }).join(''),
      '  </div>',
      '</div>',

      /* 内容区 - 可滚动 */
      '<div class="xz-body">',

      /* ---- 首页 ---- */
      '<div class="sec show" id="xz-sec-home">',
      '<div style="text-align:center;padding:4px 0 8px;">',
      '  <div style="font-size:20px;font-weight:700;color:#1a1a2e;letter-spacing:1px;">莞工小蟑螂</div>',
      '  <div style="font-size:11px;color:#b0b0c0;margin-top:3px;letter-spacing:.3px;">优学院全能助手 · 请选择功能</div>',
      '</div>',
      '<div class="xz-cards">',
      '  <div class="xz-card'+(IS_COURSE?'':' disabled')+'">',
      '    <div class="card-title">课件题库导出</div>',
      '    <div class="card-desc">从课件章节中提取练习题目和答案，支持按章节选择性导出</div>',
      IS_COURSE
        ? '    <span class="card-hint">当前已在课件页面，切换到「题库导出」即可使用</span>'
        : '    <span class="card-hint">请先打开优学院课件页面（ua.dgut.edu.cn）</span>',
      '  </div>',
      '  <div class="xz-card'+(IS_TRAINING?'':' disabled')+'">',
      '    <div class="card-title">训练题库导出</div>',
      '    <div class="card-desc">从题库训练中导出题目和标准答案</div>',
      IS_TRAINING
        ? '    <span class="card-hint">当前已在训练页面，切换到「题库导出」即可使用</span>'
        : '    <span class="card-hint">请先打开优学院题库训练页面（lms.dgut.edu.cn）</span>',
      '  </div>',
      '  <div class="xz-card'+(isAutoPage?'':' disabled')+'">',
      '    <div class="card-title">自动刷课</div>',
      '    <div class="card-desc">自动播放视频、答题、翻页，解放双手</div>',
      isAutoPage
        ? '    <span class="card-hint">当前已在学习页面，切换到「自动刷课」即可配置</span>'
        : '    <span class="card-hint">请先打开课件学习页面</span>',
      '  </div>',
      '</div>',
      '</div>',

      /* ---- 题库导出 ---- */
      isRelevantPage ? [
        '<div class="sec" id="xz-sec-export">',
        '  <div class="xz-sub-head">',
        '    <button class="back" data-goto="home">&larr;</button>',
        '    <div class="title">'+(IS_COURSE?'课件题库导出':'训练题库导出')+'</div>',
        '  </div>',
        '  <div class="xz-hint">',
        '    <div class="ht">操作步骤</div>',
        '    <div class="hp">',
        IS_COURSE
          ? '    点击下方按钮获取课程目录，勾选要导出的章节，确认后自动提取题目与答案，生成 JSON 文件下载。'
          : '    打开训练答题页面，点击下方按钮自动获取题目，系统将逐题获取标准答案，生成 JSON 文件下载。',
        '    </div>',
        '  </div>',
        IS_COURSE ? '<label class="xz-lbl"><input type="checkbox" id="xz-log"> 显示调试日志</label>' : '',
        IS_COURSE
          ? '<button class="xz-btn xz-btn-primary" id="xz-btn-export">开始导出课件题库</button>'
          : '<button class="xz-btn xz-btn-primary" id="xz-btn-export">开始导出训练题库</button>',
        '  <div id="xz-export-progress" style="display:none;margin-top:10px;">',
        '    <div style="background:rgba(0,0,0,.06);border-radius:6px;height:4px;overflow:hidden;"><div id="xz-progress-bar" style="background:linear-gradient(90deg,#4a90d9,#357abd);height:100%;width:0%;transition:width .3s;border-radius:6px;"></div></div>',
        '    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:5px;"><span id="xz-progress-text" style="font-size:11px;color:#aaa;"></span><button id="xz-btn-cancel" style="background:none;border:1px solid rgba(255,77,79,.2);color:#ff4d4f;font-size:11px;cursor:pointer;padding:3px 10px;border-radius:6px;transition:all .15s;">取消</button></div>',
        '  </div>',
        '  <div class="xz-st" id="xz-st"></div>',
        '  <div class="xz-log" id="xz-log-box"></div>',
        '</div>'
      ].join('') : '',

      // 自动刷课
      isAutoPage ? [
        '<div class="sec" id="xz-sec-auto">',
        '  <div class="xz-sub-head">',
        '    <button class="back" data-goto="home">&larr;</button>',
        '    <div class="title">自动刷课设置</div>',
        '  </div>',
        '  <div class="xz-hint">',
        '    <div class="ht">使用说明</div>',
        '    <div class="hp">自动播放视频并静音，答题时自动填写答案，完成后自动翻页。可自定义倍速、停留时间和答题正确率。</div>',
        '  </div>',

        '  <div class="xz-opt-title">播放设置</div>',
        '  <div class="xz-row">播放倍速: <input type="number" id="xz-rate" value="'+cfg.rate+'" step="0.5" min="1" max="15"> x</div>',
        '  <div class="xz-row">页面停留: <input type="number" id="xz-stay" value="'+cfg.stayTime+'" step="1" min="0" max="120"> 秒后翻页</div>',
        '  <label class="xz-lbl"><input type="checkbox" id="xz-auto-mute" '+(cfg.autoMute?'checked':'')+'> 自动静音</label>',
        '  <label class="xz-lbl"><input type="checkbox" id="xz-auto-play" '+(cfg.autoPlay?'checked':'')+'> 自动播放视频</label>',

        '  <div class="xz-divider"></div>',
        '  <div class="xz-opt-title">答题设置</div>',
        '  <label class="xz-lbl"><input type="checkbox" id="xz-auto-answer" '+(cfg.autoAnswer?'checked':'')+'> 自动答题</label>',
        '  <label class="xz-lbl"><input type="checkbox" id="xz-auto-submit" '+(cfg.autoSubmit?'checked':'')+'> 答完自动提交</label>',
        '  <div class="xz-row" style="margin-top:6px;">答题间隔: <input type="number" id="xz-answer-delay" value="'+(cfg.answerDelay||500)+'" step="100" min="100" max="5000"> 毫秒</div>',

        '  <div class="xz-opt-title" style="margin-top:8px;">正确率控制</div>',
        '  <div class="xz-hint" style="margin:4px 0 6px;padding:10px 12px;">',
        '    <div class="hp" style="line-height:1.7;">',
        '      输入单个数字如 <strong>98</strong> 表示固定 98% 正确率<br>',
        '      输入区间如 <strong>95-98</strong> 表示在 95%~98% 之间随机<br>',
        '      设为 <strong>100</strong> 则全部答对（默认值）',
        '    </div>',
        '  </div>',
        '  <div class="xz-row">最低正确率: <input type="number" id="xz-acc-min" value="'+cfg.accuracyMin+'" step="1" min="0" max="100"> %</div>',
        '  <div class="xz-row">最高正确率: <input type="number" id="xz-acc-max" value="'+cfg.accuracyMax+'" step="1" min="0" max="100"> %</div>',

        '  <div class="xz-divider"></div>',
        '  <div class="xz-opt-title">翻页设置</div>',
        '  <label class="xz-lbl"><input type="checkbox" id="xz-auto-next" '+(cfg.autoNext?'checked':'')+'> 自动翻页</label>',
        '  <div class="xz-row">最大重试: <input type="number" id="xz-max-retry" value="'+cfg.maxRetry+'" step="1" min="1" max="20"> 次</div>',

        '  <div class="xz-divider"></div>',
        '  <div class="xz-opt-title">范围控制（可选）</div>',
        '  <div class="xz-hint" style="margin:4px 0 6px;padding:10px 12px;">',
        '    <div class="hp">留空则刷完整个课程。填写章节编号可限定范围，如从第 3 章刷到第 5 章。</div>',
        '  </div>',
        '  <div class="xz-row">起始章节: <input type="number" id="xz-ch-start" value="'+(cfg.targetChapter||'')+'" step="1" min="1" placeholder="留空"></div>',
        '  <div class="xz-row">结束章节: <input type="number" id="xz-ch-end" value="'+(cfg.targetSection||'')+'" step="1" min="1" placeholder="留空"></div>',

        '  <div class="xz-divider"></div>',
        '  <button class="xz-btn xz-btn-success" id="xz-btn-auto">开始自动刷课</button>',
        '  <div id="xz-auto-progress" style="display:none;margin-top:8px;">',
        '    <div style="background:rgba(0,0,0,.06);border-radius:6px;height:4px;overflow:hidden;"><div id="xz-auto-bar" style="background:linear-gradient(90deg,#52c41a,#389e0d);height:100%;width:0%;transition:width .5s;border-radius:6px;"></div></div>',
        '    <div id="xz-auto-progress-text" style="font-size:11px;color:#aaa;margin-top:4px;"></div>',
        '  </div>',
        '  <div class="xz-log" id="xz-auto-log" style="margin-top:6px;"></div>',
        '</div>'
      ].join('') : '',

      /* ---- 关于页 ---- */
      '<div class="sec" id="xz-sec-about">',
      '  <div class="xz-sub-head">',
      '    <button class="back" data-goto="home">&larr;</button>',
      '    <div class="title">关于</div>',
      '  </div>',
      '  <div class="xz-log-list">',
      '    <div class="ver">v3.3 <span class="date">2026-06-13</span></div>',
      '    <ul>',
      '      <li>品牌 Logo 嵌入面板头部和浮动按钮</li>',
      '      <li>面板支持拖动移动，位置自动记忆</li>',
      '      <li>面板内容区域支持滚动，适配长内容</li>',
      '      <li>导出文件名自动添加日期后缀</li>',
      '      <li>导出并发获取答案，速度提升 4 倍</li>',
      '      <li>导出失败题目自动重试</li>',
      '      <li>导出进度显示百分比</li>',
      '      <li>导出历史记录（区分课件/训练来源）</li>',
      '      <li>暗色模式（含选择器弹窗适配）</li>',
      '      <li>自动刷课进度条和完成通知</li>',
      '      <li>Escape 键关闭面板</li>',
      '      <li>浮动按钮位置记忆</li>',
      '      <li>版本更新提示</li>',
      '    </ul>',
      '    <div class="ver">v3.2 <span class="date">2026-06-13</span></div>',
      '    <ul>',
      '      <li>新增首页引导页面，智能匹配当前页面功能</li>',
      '      <li>课件导出新增选择界面，可按章节勾选导出</li>',
      '      <li>导出新增进度条和取消按钮</li>',
      '      <li>自动刷课新增正确率控制（支持固定值/区间随机）</li>',
      '      <li>自动刷课新增答题间隔随机化（防检测）</li>',
      '      <li>自动刷课新增章节范围控制和运行统计</li>',
      '      <li>API 请求自动重试 + 登录过期检测</li>',
      '      <li>日志条目上限防内存泄漏</li>',
      '      <li>全新玻璃拟态 UI 设计</li>',
      '      <li>新增更新日志与免责声明</li>',
      '    </ul>',
      '    <div class="ver">v3.1 <span class="date">2026-06-01</span></div>',
      '    <ul>',
      '      <li>新增自动刷课功能（自动播放/答题/翻页）</li>',
      '      <li>支持播放倍速与页面停留时间配置</li>',
      '    </ul>',
      '    <div class="ver">v3.0 <span class="date">2026-05-15</span></div>',
      '    <ul>',
      '      <li>支持课件题库导出（含答案解析）</li>',
      '      <li>支持训练题库导出</li>',
      '      <li>适配 DGUT 与优学院双平台</li>',
      '    </ul>',
      '  </div>',
      '  <div class="xz-divider"></div>',

      /* 导出历史 */
      '  <div style="margin-top:4px;">',
      '    <div class="xz-opt-title" style="margin-top:0;display:flex;justify-content:space-between;align-items:center;">',
      '      <span>导出历史</span>',
      '      <span id="xz-history-clear" style="font-size:10px;color:#ccc;cursor:pointer;font-weight:400;letter-spacing:0;">清空</span>',
      '    </div>',
      '    <div id="xz-history-list">'+renderHistory()+'</div>',
      '  </div>',
      '  <div class="xz-divider"></div>',

      /* 暗色模式 */
      '  <label class="xz-lbl" style="justify-content:space-between;">',
      '    <span>暗色模式</span>',
      '    <input type="checkbox" id="xz-dark-toggle">',
      '  </label>',

      '  <div class="xz-divider"></div>',
      '  <div class="xz-footer">',
      '    <div class="copy">莞工小蟑螂 · MIT License</div>',
      '    <div class="disc">本工具开发目的是方便同学在考前复习阶段，将优学院课件中的题库导出，便于导入佛脚等刷题工具进行系统性复习。仅供学习交流使用，请遵守相关法规及学校规定。</div>',
      '  </div>',
      '</div>',

      '</div>', /* xz-body */
    ].join('');

    document.body.appendChild(panel);

    /* 面板拖动 - 通过头部拖动 */
    var panelHead=panel.querySelector('.xz-head');
    var panelDrag={active:false,startX:0,startY:0,origLeft:0,origTop:0};
    if(panelHead){
      panelHead.addEventListener('mousedown',function(e){
        if(e.target.id==='xz-close'||e.target.closest('.tab'))return;
        panelDrag.active=true;
        panelDrag.startX=e.clientX;panelDrag.startY=e.clientY;
        var r=panel.getBoundingClientRect();
        panelDrag.origLeft=r.left;panelDrag.origTop=r.top;
        e.preventDefault();
      });
      document.addEventListener('mousemove',function(e){
        if(!panelDrag.active)return;
        var dx=e.clientX-panelDrag.startX,dy=e.clientY-panelDrag.startY;
        panel.style.left=(panelDrag.origLeft+dx)+'px';
        panel.style.top=(panelDrag.origTop+dy)+'px';
        panel.style.right='auto';
      });
      document.addEventListener('mouseup',function(){
        if(panelDrag.active){
          panelDrag.active=false;
          var r=panel.getBoundingClientRect();
          try{localStorage.setItem('xz_panel_pos',JSON.stringify({left:r.left,top:r.top}));}catch(e){}
        }
      });
      var savedPanelPos=null;
      try{savedPanelPos=JSON.parse(localStorage.getItem('xz_panel_pos'));}catch(e){}
      if(savedPanelPos&&savedPanelPos.left!=null){
        panel.style.left=savedPanelPos.left+'px';
        panel.style.top=savedPanelPos.top+'px';
        panel.style.right='auto';
      }
    }

    /* 浮动按钮 - 玻璃拟态 */
    var toggle = document.createElement('button');
    toggle.id = 'xz-toggle';
    toggle.innerHTML = '<img src="'+LOGO_URI+'" style="width:20px;height:20px;vertical-align:middle;margin-right:4px;border-radius:4px;">小蟑螂';
    toggle.title = '莞工小蟑螂（可拖动）';
    toggle.style.cssText = 'position:fixed;right:20px;top:90px;z-index:999998;'+
      'width:auto;height:auto;padding:8px 14px;border-radius:12px;'+
      'border:1px solid rgba(255,255,255,.6);'+
      'background:rgba(255,255,255,.72);backdrop-filter:blur(16px) saturate(1.4);-webkit-backdrop-filter:blur(16px) saturate(1.4);'+
      'color:#1a1a2e;font-size:12px;font-weight:600;letter-spacing:.3px;'+
      'cursor:grab;box-shadow:0 4px 16px rgba(0,0,0,.08),inset 0 1px 0 rgba(255,255,255,.8);'+
      'display:none;transition:all .2s;user-select:none;';
    document.body.appendChild(toggle);

    var dragState={moved:false,startX:0,startY:0,startLeft:0,startTop:0};
    toggle.addEventListener('mousedown',function(e){
      dragState.moved=false;
      dragState.startX=e.clientX;dragState.startY=e.clientY;
      var r=toggle.getBoundingClientRect();
      dragState.startLeft=r.left;dragState.startTop=r.top;
      toggle.style.cursor='grabbing';
      e.preventDefault();
    });
    document.addEventListener('mousemove',function(e){
      if(dragState.startX===0)return;
      var dx=e.clientX-dragState.startX,dy=e.clientY-dragState.startY;
      if(Math.abs(dx)>3||Math.abs(dy)>3)dragState.moved=true;
      if(dragState.moved){
        toggle.style.left=(dragState.startLeft+dx)+'px';
        toggle.style.top=(dragState.startTop+dy)+'px';
        toggle.style.right='auto';
      }
    });
    document.addEventListener('mouseup',function(){
      dragState.startX=0;
      toggle.style.cursor='grab';
      if(dragState.moved){
        var r=toggle.getBoundingClientRect();
        try{localStorage.setItem('xz_btn_pos',JSON.stringify({left:r.left,top:r.top}));}catch(e){}
      }
    });

    var savedPos=null;
    try{savedPos=JSON.parse(localStorage.getItem('xz_btn_pos'));}catch(e){}
    if(savedPos&&savedPos.left!=null){
      toggle.style.left=savedPos.left+'px';
      toggle.style.top=savedPos.top+'px';
      toggle.style.right='auto';
    }

    /* 关闭/打开 */
    document.getElementById('xz-close').onclick = function(){
      panel.classList.add('xz-hide');
      setTimeout(function(){panel.style.display='none';panel.classList.remove('xz-hide');},200);
      toggle.style.display='';
    };
    toggle.onclick = function(){
      if(dragState.moved)return;
      panel.style.display='';
      toggle.style.display='none';
    };

    /* Escape 键关闭面板 */
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape'&&panel.style.display!=='none'){
        panel.classList.add('xz-hide');
        setTimeout(function(){panel.style.display='none';panel.classList.remove('xz-hide');},200);
        toggle.style.display='';
      }
    });

    /* 清空历史 */
    var clearBtn=document.getElementById('xz-history-clear');
    if(clearBtn)clearBtn.onclick=function(){
      try{localStorage.removeItem(HISTORY_KEY);}catch(e){}
      var hList=document.getElementById('xz-history-list');
      if(hList)hList.innerHTML=renderHistory();
    };

    /* Tab 切换 */
    panel.querySelectorAll('.tab').forEach(function(tab) {
      tab.onclick = function() {
        panel.querySelectorAll('.tab').forEach(function(t){t.classList.remove('active')});
        tab.classList.add('active');
        panel.querySelectorAll('.sec').forEach(function(s){s.classList.remove('show')});
        var target = document.getElementById('xz-sec-' + tab.dataset.tab);
        if (target) target.classList.add('show');
        if(tab.dataset.tab==='about'){
          var hList=document.getElementById('xz-history-list');
          if(hList)hList.innerHTML=renderHistory();
        }
      };
    });

    /* 暗色模式 */
    var darkToggle=document.getElementById('xz-dark-toggle');
    var isDark=false;
    try{isDark=localStorage.getItem('xz_dark')==='1';}catch(e){}
    if(isDark)panel.classList.add('xz-dark');
    if(darkToggle){
      darkToggle.checked=isDark;
      darkToggle.onchange=function(){
        panel.classList.toggle('xz-dark',this.checked);
        try{localStorage.setItem('xz_dark',this.checked?'1':'0');}catch(e){}
      };
    }

    statusEl = document.getElementById('xz-st');
    logEl = document.getElementById('xz-log-box');
    btnExport = document.getElementById('xz-btn-export');

    var logCb = document.getElementById('xz-log');
    if (logCb) logCb.onchange = function(){ document.getElementById('xz-log-box').classList.toggle('show', this.checked); };

    if (btnExport) btnExport.onclick = runExport;

    /* 自动刷课 */
    if (isAutoPage) {
      Logger.init(document.getElementById('xz-auto-log'));
      btnAuto = document.getElementById('xz-btn-auto');

      btnAuto.onclick = function() {
        autoState.paused = !autoState.paused;

        var c = {
          rate: parseFloat(document.getElementById('xz-rate').value) || 1.5,
          stayTime: parseInt(document.getElementById('xz-stay').value) || 5,
          autoMute: document.getElementById('xz-auto-mute').checked,
          autoPlay: document.getElementById('xz-auto-play').checked,
          autoAnswer: document.getElementById('xz-auto-answer').checked,
          autoSubmit: document.getElementById('xz-auto-submit').checked,
          autoNext: document.getElementById('xz-auto-next').checked,
          maxRetry: parseInt(document.getElementById('xz-max-retry').value) || 7,
          accuracyMin: parseInt(document.getElementById('xz-acc-min').value) || 100,
          accuracyMax: parseInt(document.getElementById('xz-acc-max').value) || 100,
          answerDelay: parseInt(document.getElementById('xz-answer-delay').value) || 500,
          targetChapter: document.getElementById('xz-ch-start').value || '',
          targetSection: document.getElementById('xz-ch-end').value || ''
        };
        saveCfg(c);

        if (!autoState.paused) {
          autoState.startTime=Date.now();
          autoState.pagesDone=0;
          autoState.questionsDone=0;
          autoState.questionsCorrect=0;
          autoStatsInterval=0;
          updateAutoProgress();
          autoLoop();
          var accStr = c.accuracyMin===c.accuracyMax ? c.accuracyMin+'%' : c.accuracyMin+'%~'+c.accuracyMax+'%';
          Logger.log('自动刷课已启动 | 倍速:'+c.rate+'x | 停留:'+c.stayTime+'s | 正确率:'+accStr+' | 答题间隔:'+c.answerDelay+'ms');
        } else {
          var stats=getAutoStats();
          Logger.log('自动刷课已暂停'+(stats?' | '+stats:''));
          updateAutoProgress();
        }
        updateAutoUI();
      };
    }
  }

  function setStatus(t) { if(statusEl) statusEl.textContent = t; }

  function updateAutoUI() {
    if (!btnAuto) return;
    if (autoState.paused) {
      btnAuto.textContent = '开始自动刷课';
      btnAuto.className = 'xz-btn xz-btn-success';
    } else {
      btnAuto.textContent = '暂停自动刷课';
      btnAuto.className = 'xz-btn xz-btn-danger';
    }
  }

  // ==================== 导出主流程 ====================
  function setExportHint(type,title,text){
    var el=document.getElementById('xz-export-hint');
    if(!el)return;
    el.className='xz-hint'+(type==='ok'?' hint-ok':type==='err'?' hint-err':type==='warn'?' hint-warn':'');
    el.querySelector('.hint-title').innerHTML=title;
    el.querySelector('.hint-text').innerHTML=text;
  }

  async function runExport() {
    exportCancelled = false;
    btnExport.disabled = true;
    btnExport.textContent = '导出中...';
    var progressWrap = document.getElementById('xz-export-progress');
    var cancelBtn = document.getElementById('xz-btn-cancel');
    if(progressWrap) progressWrap.style.display='block';
    setProgress(0,'准备导出...');
    if(cancelBtn){
      cancelBtn.onclick = function(){
        exportCancelled = true;
        cancelBtn.textContent = '正在取消...';
        cancelBtn.disabled = true;
      };
    }
    try {
      var data;
      if (IS_COURSE) { setProgress(0,'正在导出课件题库...'); data = await exportCourseware(); }
      else if (IS_TRAINING) { setProgress(0,'正在导出训练题库...'); data = await exportTraining(); }
      else throw new Error('请在课件页面或训练页面运行');

      var name = clean(data.name);
      var dateStr=new Date().toISOString().slice(0,10).replace(/-/g,'');
      download(name+'_'+dateStr+'_题库.json', JSON.stringify(data.questions, null, 2), 'application/json;charset=utf-8');

      var stats = {};
      data.questions.forEach(function(q){ stats[q['题型']]=(stats[q['题型']]||0)+1; });
      var total=data.questions.length;
      var typesStr=Object.keys(stats).map(function(k){return k+stats[k]+'题'}).join('、');
      addHistory(data.name,total,typesStr,IS_COURSE?'课件':'训练');
      var statsLines=Object.keys(stats).map(function(k){
        var n=stats[k],pct=Math.round(n/total*100);
        return '<div style="display:flex;align-items:center;gap:8px;margin:3px 0;">'+
          '<span style="width:60px;font-size:12px;color:#555;">'+k+'</span>'+
          '<div style="flex:1;background:rgba(0,0,0,.04);border-radius:4px;height:6px;overflow:hidden;">'+
          '<div style="background:#4a90d9;height:100%;width:'+pct+'%;border-radius:4px;"></div></div>'+
          '<span style="width:50px;text-align:right;font-size:12px;color:#888;">'+n+' 题</span></div>';
      }).join('');
      setProgress(100,'完成！共 ' + total + ' 题');
      setExportHint('ok','导出成功',
        '<div style="margin-bottom:6px;">共导出 <strong>'+total+'</strong> 题</div>'+statsLines+
        '<div style="margin-top:6px;font-size:10px;color:#aaa;">文件已自动下载</div>');
      notify('导出完成！共 ' + total + ' 题');
    } catch (e) {
      if(e.message==='用户取消导出'){
        setProgress(0,'已取消导出');
        setExportHint('warn','已取消','用户取消了导出操作，可重新点击按钮开始');
      }else{
        setProgress(0,'导出失败: ' + e.message);
        setExportHint('err','导出失败',e.message);
        notify('导出失败: ' + e.message);
      }
    } finally {
      btnExport.disabled = false;
      btnExport.textContent = IS_COURSE ? '开始导出课件题库' : '开始导出训练题库';
      if(cancelBtn){cancelBtn.onclick=null;cancelBtn.textContent='取消导出';cancelBtn.disabled=false;}
      setTimeout(function(){if(progressWrap)progressWrap.style.display='none';},3000);
    }
  }

  // ==================== 初始化 ====================
  function init() {
    try {
      if (document.getElementById('xz-panel')) return;
      createUI();
      console.log('[莞工小蟑螂] v3.3 已加载');
      var lastVer='';
      try{lastVer=localStorage.getItem('xz_last_ver')||'';}catch(e){}
      if(lastVer!=='3.3'){
        try{localStorage.setItem('xz_last_ver','3.3');}catch(e){}
        notify('莞工小蟑螂 v3.3 已更新：并发导出、拖动面板、暗色模式、品牌Logo');
      }
    } catch (e) { console.error('[莞工小蟑螂]', e); }
  }

  if (document.readyState === 'complete') init();
  else window.addEventListener('load', init);
  setInterval(function(){ if(!document.getElementById('xz-panel')) init(); }, 2000);

})();
