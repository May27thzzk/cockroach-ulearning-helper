// ==UserScript==
// @name         莞工小蟑螂 - 优学院全能助手
// @namespace    https://greasyfork.org/users/1540778
// @version      3.4.0
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

  // ============================================================
  //  常量与配置
  // ============================================================
  var HOST = location.hostname;
  var BASE = location.origin;
  var API_HOST = HOST.includes('dgut.edu.cn') ? BASE : 'https://api.dgut.edu.cn';
  var IS_DGUT = HOST.includes('dgut.edu.cn');
  var IS_COURSE = HOST.startsWith('ua.');
  var IS_TRAINING = HOST.startsWith('lms.');
  var TYPE_NAME = {1:'单选题',2:'多选题',3:'不定项选择题',4:'判断题',5:'填空题',6:'简答题',7:'文件题',11:'阅读理解',12:'排序题',17:'选词填空',24:'综合题'};
  var LABELS = 'ABCDEFGHIJ'.split('');
  var CONTENT_TYPE_NAME = {5:'图文',6:'视频',7:'练习'};
  var HISTORY_KEY = 'xz_export_history';

  var LOGO_URI = 'data:image/png;base64,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BzT4w1g7NilqMkGERE2CvnklBdVqRwu+r+mLQ7Dri0kmaKE0Qho0QZUatUT3X7uQJLidKjLIJR5RCJsUNbmiik3tqasr41ezDkJjm+HG6YpZ9U2NnZ09GvdTXwKE8usJYYll4gyJTYj6xN4dOHVgH+4WFrC/ScxCgibEanUraPrSENy+dA4PtSiqZAwa9HkZ7v5Bao8Ru0EP7fgFyYlH2e+UkalanWhWI4enSLASKBOo1BS3YBHVEWr3V/LyRduhY7D3yykGaJ1uBNWNRUz3vhqPC64eIVhlizwT6aXg4qnjOJmwB+OWrZeFWSJrUVMOPW0EXadhM1bnRBOBtWMQ06MfknZu0rOF2sNuqiGjJR3b+tl+rMS1FLIz0hG/aQMrXmTtyFrU5CetDa16ii9iqBLb+yUUZ9/G1ePieTQMjauHF7q8PxVOlaT5ndBNSg5ZVKJZCreuperZQstA1qIWc/wXotMLA9CwfVfpJ7ezQ6vXR8Le0QmXD0vrDfWBBN1tzEy4C6x4qmPIlDlYMuFdlotaE8HVeTIbi8fd2wdvTPkc304bq/a4l0dNQstnpPfSZdjZocXAYexXYwpbV0HjadalDxetxrLJ75d5GgpRr0VbvWq4WxKyFjUR27ojpqzZjLOH96P46ewH4e3nz1xK6Ut3kfg4F4OEXcnTC0m//WyAFpfHMzAEHYZP1EnQCrz9AzF++XfMvyUz7SpuXk3Fk8d/J6KkKgfVatcV9VC0RmQvajwtcikW2WIoYp8bAN/wSBxcOR8lj3XLXKpKcEwjtBnyARxd9Eu5oIAyo9LL2IkxzY1NiNpUhMU1R49xsxG/+FPcy8vR61zR3foi7rn/MBOHox1c1AbGOyQcvSbNQ8Ky2chK1b5cHQ08aQBKXoEc3eCiNgLObu7oOno6EjeuxIXfhTNDCeHm6492b4+FT6hxklbaClzURqRx/8GIbNMFpzavR/pZ8fqN5Dpa75l+qNW2O+wtKLrGWuGfoJHxCq6G9sMmIPfGFWRfSUFhVgbybqbB1d0THoEh8A6phqpRDeCgJkklRzu4qE0EmRTcrDANXNQc2cFFzZEdXNQc2cFFzZEdXNQc2cFFzZEdXNQc2cFFzZEdXNQc2cFFzZEdXNQc2cFFzZEdXNQc2cFFzZEdXNQc2cFFzZEdXNQc2cFFzZEdXNQc2cFFzZEdXNQc2cFFzZEdXNQc2cFFzZEdXNQc2cFFzZEdXNQc2cFFzZEdXNQc2cFFzZEdXNQc2cFFzZEdXNQc2cFFzZEdXNQc2cFFzZEdXNQc2cFFzZEdXNQc2cFFzZEdXNQc2cFFzZEdXNQc2cFFzZEdXNQc2cFFzZEdXNQc2cFFzZEdXNQc2cFFzZEdXNQc2cFFzZEdXNQc2cFFzZEdXNQc2cFFzZEdXNQc2cFFzZEd/wdUT4sW5Ct/sQAAAABJRU5ErkJggg==';

  // ============================================================
  //  工具函数
  // ============================================================
  function html2text(h){if(!h)return'';var d=document.createElement('div');d.innerHTML=h;return(d.textContent||'').replace(/\u00A0/g,' ').trim();}
  function clean(s){return(s||'untitled').replace(/[<>:"/\\|?*]/g,'_').replace(/\s+/g,'_').slice(0,120);}
  function wait(ms){return new Promise(function(r){setTimeout(r,ms)});}
  function jitteredDelay(base){var j=base*0.3;return base-j+Math.random()*j*2;}
  function notify(t){try{GM_notification({text:t,title:'莞工小蟑螂',timeout:4000})}catch(e){alert(t)}}
  function getCookie(n){for(var i=0;i<document.cookie.split(';').length;i++){var p=document.cookie.split(';')[i].trim();if(p.indexOf(n+'=')===0)return decodeURIComponent(p.slice(n.length+1));}return'';}

  // ============================================================
  //  认证
  // ============================================================
  var authHeaders={};
  var origFetch=window.fetch;
  window.fetch=function(){var url=arguments[0],opts=arguments[1]||{};if(typeof url==='string'&&(url.indexOf('/uaapi/')!==-1||url.indexOf('/utestapi/')!==-1)&&opts.headers){var h=opts.headers;if(h instanceof Headers){h.forEach(function(v,k){if(/auth/i.test(k))authHeaders[k]=v;});}else if(typeof h==='object'){for(var k in h){if(/auth/i.test(k))authHeaders[k]=h[k];}}}return origFetch.apply(this,arguments);};
  function getHeaders(){var h={'Content-Type':'application/json'};for(var k in authHeaders)h[k]=authHeaders[k];var a=getCookie('AUTHORIZATION')||getCookie('token')||'';if(a&&!h['Authorization'])h['Authorization']=a.includes('.')?'Bearer '+a:a;var ua=getCookie('UA_AUTHORIZATION')||getCookie('ua-authorization')||'';if(ua&&!h['ua-authorization'])h['ua-authorization']=ua;return h;}
  function getAuth(){return authHeaders['Authorization']||authHeaders['ua-authorization']||getCookie('AUTHORIZATION')||getCookie('token')||'';}

  async function api(method,path,body,retries){
    retries=retries||3;
    var url=API_HOST+path;
    for(var attempt=1;attempt<=retries;attempt++){
      try{
        var res=await origFetch(url,{method:method,credentials:'include',headers:getHeaders(),body:body?JSON.stringify(body):undefined});
        if(res.status===401||res.status===403){notify('登录已过期，请刷新页面后重新登录');throw new Error('HTTP '+res.status);}
        if(!res.ok&&attempt<retries){await wait(1000*attempt);continue;}
        return res.json();
      }catch(e){if(attempt>=retries)throw e;await wait(1000*attempt);}
    }
  }

  // ============================================================
  //  答案解析
  // ============================================================
  function parseAnswer(resp){if(!resp)return{text:'',values:[],typeCode:null};var d=resp.data||resp;if(!d||(!d.correctAnswerList&&!d.correctAnswer&&!d.answer&&!d.answers))return{text:'',values:[],typeCode:null};var values=[],typeCode=null;if(Array.isArray(d.correctAnswerList)&&d.correctAnswerList.length){d.correctAnswerList.forEach(function(a){var s=String(a).trim();if(s==='true')values.push('正确');else if(s==='false')values.push('错误');else{var t=html2text(s);if(t)values.push(t);}});}if(!values.length&&typeof d.correctAnswer!=='undefined'&&d.correctAnswer!==null){if(typeof d.correctAnswer==='boolean')values.push(d.correctAnswer?'正确':'错误');else if(Array.isArray(d.correctAnswer))d.correctAnswer.forEach(function(a){var t=html2text(String(a));if(t)values.push(t)});else{var t=html2text(String(d.correctAnswer));if(t)values.push(t)}}if(!values.length&&typeof d.answer!=='undefined'&&d.answer!==null){if(typeof d.answer==='boolean')values.push(d.answer?'正确':'错误');else{var t=html2text(String(d.answer));if(t)values.push(t)}}if(!values.length&&Array.isArray(d.answers))d.answers.forEach(function(a){var t=html2text(String(a));if(t)values.push(t)});if(Array.isArray(d.subQuestionAnswerDTOList)&&d.subQuestionAnswerDTOList.length){d.subQuestionAnswerDTOList.forEach(function(sub,i){var ans=Array.isArray(sub.correctAnswerList)?sub.correctAnswerList.map(function(x){return html2text(String(x))}).filter(Boolean).join(' | '):html2text(String(sub.correctAnswer||sub.correctAnswerList||''));if(ans)values.push('子题'+(i+1)+': '+ans);});}var cs=[d.questionType,d.questiontype,d.type,d.questionTypeCode,d.questionDto&&d.questionDto.questionType];for(var i=0;i<cs.length;i++){var n=Number(cs[i]);if(isFinite(n)&&n>0){typeCode=n;break;}}return{text:values.join(' | '),values:values,typeCode:typeCode};}

  // ============================================================
  //  格式化
  // ============================================================
  function formatChoiceQ(t,o,a){var ans=a.replace(/\s*\|\s*/g,'').replace(/[^A-Za-z]/g,'').toUpperCase();return{'题型':'选择题','题干':t,'选项':o,'答案':ans||a,'解析':''};}
  function formatJudgeQ(t,a){var r='';if(/^(T|对|正确|true)/i.test(a))r='正确';else if(/^(F|错|错误|false)/i.test(a))r='错误';else r=a;return{'题型':'判断题','题干':t,'答案':r,'解析':''};}
  function formatBlankQ(t,a){
    var ans=a||'';
    if(ans){var answers=ans.split('|').map(function(s){return s.trim()}).filter(Boolean);var idx=0;t=t.replace(/\(\s*\)|_{2,}|【\s*】|\[\s*\]/g,function(){return '{'+(answers[idx++]||'___')+'}'});}
    return{'题型':'填空题','题干':t,'答案':ans,'解析':''};
  }
  function formatEssayQ(t,a){return{'题型':'问答题','题干':t,'答案':a,'解析':''};}

  function formatCourseQ(q,ansData){
    var type=q.type||0,title=html2text(q.title||''),choices=q.choiceitemModels||[],ansText=ansData?ansData.text||'':'';
    if(ansData&&ansData.typeCode&&ansData.typeCode>0)type=ansData.typeCode;
    if(type===4)return formatJudgeQ(title,ansText);
    if(type===6)return formatEssayQ(title,ansText);
    if(type===5)return formatBlankQ(title,ansText);
    if(choices.length>=2){var opts=choices.map(function(c,i){return(c.option||LABELS[i]||String(i))+'. '+html2text(c.title||'');});return formatChoiceQ(title,opts,ansText);}
    if(/\(\s*\)|_{2,}|【\s*】|\[\s*\]/.test(title))return formatBlankQ(title,ansText);
    return formatBlankQ(title,ansText);
  }

  function detectTrainType(q){
    var items=Array.isArray(q.item)?q.item:[],answer=Array.isArray(q.userAnswer)?q.userAnswer:[],title=html2text(q.title||'');
    if(/\(\s*\)|_{2,}|【\s*】|\[\s*\]/.test(title))return 5;
    if(items.length===2){var t=items.map(function(it){return html2text(it&&it.title||'')}).join('');if(/正确|错误|对错/.test(t))return 4;}
    if(answer.length>0&&(typeof answer[0]==='boolean'||/^(true|false)$/i.test(String(answer[0]).trim())))return 4;
    if(q.type===3){if(items.length>=2)return 3;return 5;}
    if(items.length>=2){var c=items.filter(function(it){return it&&it.title&&html2text(it.title).length>0}).length;if(c>=2)return q.type||2;}
    return q.type||5;
  }

  function formatTrainQ(q){
    var type=detectTrainType(q),title=html2text(q.title),items=Array.isArray(q.item)?q.item:[],answer=Array.isArray(q.userAnswer)?q.userAnswer:[];
    if(type===1||type===2||type===3){if(items.length>=2){var opts=items.map(function(it,i){return(LABELS[i]||i)+'. '+html2text(it&&it.title||'');});return formatChoiceQ(title,opts,answer.map(function(a){return String(a).toUpperCase()}).sort().join(''));}return formatBlankQ(title,answer.join(' | '));}
    if(type===4){var raw=answer[0]||'';if(['A','正确','True','true','对'].indexOf(raw)!==-1)return formatJudgeQ(title,'正确');if(['B','错误','False','false','错'].indexOf(raw)!==-1)return formatJudgeQ(title,'错误');if(typeof raw==='boolean')return formatJudgeQ(title,raw?'正确':'错误');return formatJudgeQ(title,String(raw));}
    if(type===5){var t=title;answer.forEach(function(v){for(var pi=0,pats=[/_{2,}/,/\(\s*\)/,/【\s*】/,/\[\s*\]/];pi<pats.length;pi++){if(pats[pi].test(t)){t=t.replace(pats[pi],'{'+v+'}');break;}}});return formatBlankQ(t,answer.join(' | '));}
    return formatEssayQ(title,answer.join('\n'));
  }

  // ============================================================
  //  课件导出
  // ============================================================
  function getQs(cp){if(!cp)return[];if(Array.isArray(cp.questionDTOList))return cp.questionDTOList;if(Array.isArray(cp.questions))return cp.questions;if(Array.isArray(cp.children)){var r=[];cp.children.forEach(function(c){r=r.concat(getQs(c))});return r;}return[];}

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
        '#xz-sel-foot .btn-cancel{padding:7px 18px;border:1px solid #e0e0e0;background:#fff;color:#666;border-radius:8px;cursor:pointer;font-size:13px;}',
        '#xz-sel-foot .btn-ok{padding:7px 18px;border:none;background:#1677ff;color:#fff;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600;}',
        '#xz-sel-foot .btn-ok:disabled{background:#ccc;cursor:not-allowed;}',
        '</style>',
        '<div id="xz-sel-box">',
        '  <div id="xz-sel-head">',
        '    <div class="ico">\uD83D\uDC63</div>',
        '    <div class="txt"><h3>'+html2text(courseName)+'</h3><small>勾选需要导出的章节</small></div>',
        '  </div>',
        '  <div id="xz-sel-actions"><button id="xz-sel-all">全选</button><button id="xz-sel-none">全不选</button></div>',
        '  <div id="xz-sel-list"></div>',
        '  <div id="xz-sel-foot">',
        '    <span class="info" id="xz-sel-info">已选 0 章</span>',
        '    <div class="btns"><button class="btn-cancel" id="xz-sel-cancel">取消</button><button class="btn-ok" id="xz-sel-ok">开始导出</button></div>',
        '  </div>',
        '</div>'
      ].join('');
      document.body.appendChild(overlay);

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

      function updateInfo(){var cbs=listEl.querySelectorAll('.xz-ch-cb:checked');infoEl.textContent='已选 '+cbs.length+' / '+chapters.length+' 章';overlay.querySelector('#xz-sel-ok').disabled=cbs.length===0;}
      updateInfo();
      overlay.querySelector('#xz-sel-all').onclick=function(){listEl.querySelectorAll('.xz-ch-cb').forEach(function(cb){cb.checked=true;});updateInfo();};
      overlay.querySelector('#xz-sel-none').onclick=function(){listEl.querySelectorAll('.xz-ch-cb').forEach(function(cb){cb.checked=false;});updateInfo();};
      overlay.querySelector('#xz-sel-cancel').onclick=function(){overlay.remove();reject(new Error('用户取消'));};
      overlay.querySelector('#xz-sel-ok').onclick=function(){var selected=[];listEl.querySelectorAll('.xz-ch-cb:checked').forEach(function(cb){selected.push({chIndex:parseInt(cb.dataset.ch),pageIndices:null});});overlay.remove();resolve(selected);};
    });
  }

  async function exportCourseware(){
    var url=new URL(location.href);
    var courseId=url.searchParams.get('courseId')||url.searchParams.get('courseid');
    var classId=url.searchParams.get('classId')||url.searchParams.get('classid');
    if(!courseId)throw new Error('URL 缺少 courseId');

    setStatus('正在获取课程目录...');
    var dirResp;
    if(IS_DGUT){dirResp=await api('GET','/uaapi/course/stu/'+encodeURIComponent(courseId)+'/directory'+(classId?'?classId='+encodeURIComponent(classId):''));}
    else{try{dirResp=await api('GET','/course/all/'+encodeURIComponent(courseId)+'/directory');}catch(e){}if(!dirResp||(!dirResp.data&&!dirResp.chapters)){try{dirResp=await api('GET','/course/'+encodeURIComponent(courseId)+'/directory');}catch(e){}}}
    if(!dirResp)throw new Error('获取课程目录失败');
    var dirData=dirResp.data||dirResp;
    var courseName=dirData.coursename||dirData.courseName||'course_'+courseId;
    var chapters=[];
    if(Array.isArray(dirData.chapters)){
      dirData.chapters.forEach(function(ch){
        var chNodeId=ch.nodeid||ch.id||ch.nodeId;
        if(Array.isArray(ch.items)&&ch.items.length){ch.items.forEach(function(item){var pages=[];if(Array.isArray(item.coursepages)){item.coursepages.forEach(function(p){pages.push({title:p.title||'页面',contentType:p.contentType||0,id:p.id||p.relationid,coursepageDTOList:[]});});}chapters.push({title:item.title||item.name||'未命名',nodeId:chNodeId,itemId:item.itemid||item.id,pages:pages});});}
        else{chapters.push({title:ch.nodetitle||ch.title||ch.name||'未命名',nodeId:chNodeId,itemId:null,pages:[]});}
      });
    }
    if(!chapters.length)throw new Error('课程目录为空');

    setStatus('正在解析页面...');
    for(var ci=0;ci<chapters.length;ci++){
      var ch=chapters[ci];
      for(var di=0;di<(dirData.chapters||[]).length;di++){
        var dirCh=dirData.chapters[di];
        if(dirCh.nodeid===ch.nodeId){for(var ii=0;ii<(dirCh.items||[]).length;ii++){var item=dirCh.items[ii];if(item.itemid===ch.itemId||item.id===ch.itemId){var pages=[];for(var pi=0;pi<(item.coursepages||[]).length;pi++){var cp=item.coursepages[pi];pages.push({title:cp.title||'页面',contentType:cp.contentType||0,id:cp.id||cp.relationid,coursepageDTOList:[]});}ch.pages=pages;break;}}break;}
      }
    }

    var totalQuizPages=0;chapters.forEach(function(ch){totalQuizPages+=ch.pages.filter(function(p){return p.contentType===7}).length;});
    if(!totalQuizPages)throw new Error('课程中没有找到练习页面');

    setStatus('正在获取题目数据...');
    var fetchedPages={};
    for(var ci=0;ci<chapters.length;ci++){
      var ch=chapters[ci];
      for(var pi=0;pi<ch.pages.length;pi++){
        var pg=ch.pages[pi];
        if(pg.contentType!==7||!pg.id||fetchedPages[pg.id])continue;
        fetchedPages[pg.id]=true;
        try{var pageResp=await api('GET','/wholepage/all/'+encodeURIComponent(pg.id));if(pageResp&&pageResp.coursepageDTOList){pg.coursepageDTOList=pageResp.coursepageDTOList;}}catch(e){}
        await wait(100);
      }
    }

    setStatus('请选择要导出的课件...');
    var selected;try{selected=await showCoursewareSelector(courseName,chapters);}catch(e){throw new Error('用户取消导出');}

    var result=[],total=0,totalQ=0;
    selected.forEach(function(sel){var ch=chapters[sel.chIndex];ch.pages.forEach(function(pg){if(pg&&pg.contentType===7){(pg.coursepageDTOList||[]).forEach(function(cp){totalQ+=getQs(cp).length;});}});});
    if(!totalQ)throw new Error('选中的章节中没有找到题目');

    var CONCURRENT=4,idx=0,done=0,failCount=0;
    var results=new Array(totalQ);
    var allTasks=[];
    selected.forEach(function(sel){var ch=chapters[sel.chIndex];ch.pages.forEach(function(pg){if(pg&&pg.contentType===7){(pg.coursepageDTOList||[]).forEach(function(cp){getQs(cp).forEach(function(q){allTasks.push({q:q,parentId:pg.id});});});}});});

    async function fetchOne(task,i){
      var q=task.q,qid=q.questionid,ansData=null;
      if(qid&&task.parentId){
        for(var retry=0;retry<2;retry++){
          try{var aResp;if(IS_DGUT){aResp=await api('GET','/uaapi/questionAnswer/'+encodeURIComponent(qid)+'?parentId='+encodeURIComponent(task.parentId));}else{aResp=await api('GET','/questionAnswer/'+encodeURIComponent(qid)+'?parentId='+encodeURIComponent(task.parentId));}if(aResp&&aResp.correctAnswerList){ansData={text:aResp.correctAnswerList.join(' | '),values:aResp.correctAnswerList,typeCode:q.type};}break;}catch(e){if(retry===0)await wait(300);else failCount++;}
        }
      }
      results[i]=formatCourseQ(q,ansData);
      done++;
      if(done%3===0||done===totalQ)setProgress(Math.min(99,Math.round(done/totalQ*100)),'正在提取第 '+done+' / '+totalQ+' 题...');
    }

    while(idx<totalQ){
      if(exportCancelled)throw new Error('用户取消导出');
      var batch=[];for(var c=0;c<CONCURRENT&&idx<totalQ;c++,idx++){batch.push(fetchOne(allTasks[idx],idx));}
      await Promise.all(batch);await new Promise(function(r){setTimeout(r,0);});
    }

    result=results.filter(function(r){return r!=null;});
    setProgress(100,'提取完成');
    return{name:courseName,questions:result};
  }

  // ============================================================
  //  训练导出
  // ============================================================
  async function exportTraining(){
    var hash=location.hash||'';var m=hash.match(/#\/questionTrain\/practice\/(\d+)\/(\d+)\/(\d+)/);
    if(!m)throw new Error('请先打开题库训练页面');
    var qtId=m[1],ocId=m[2],qtType=m[3];
    var info=getCookie('USERINFO')||getCookie('USER_INFO')||'';var userId='';try{userId=String(JSON.parse(decodeURIComponent(info)).userId||'');}catch(e){}
    if(!userId)throw new Error('缺少用户ID');
    var base={qtId:qtId,ocId:ocId,qtType:qtType,traceId:userId};
    setProgress(5,'正在获取答题卡...');
    var sheet=await api('GET','/utestapi/questionTraining/student/answerSheet?'+new URLSearchParams(base));
    if(!sheet||sheet.code!==1)throw new Error('获取答题卡失败');
    var sheetList=(sheet.result&&sheet.result.list)||[];var total=sheetList.length;var pages=Math.ceil(total/30)||1;var allQ=[];
    for(var p=1;p<=pages;p++){if(exportCancelled)throw new Error('用户取消导出');setProgress(Math.round(p/pages*60),'获取题目 '+p+'/'+pages+'...');var resp=await api('GET','/utestapi/questionTraining/student/questionList?'+new URLSearchParams(Object.assign({},base,{pn:p,ps:30})));if(resp&&resp.result&&resp.result.trainingQuestions)allQ=allQ.concat(resp.result.trainingQuestions);await wait(300);}
    setProgress(60,'正在获取标准答案...');
    var correctMap={};var CONCURRENT=4,tIdx=0,tDone=0;
    async function fetchTrainAns(item,i){var qid=item.id;var q=allQ.find(function(x){return x.id===qid})||{type:item.questionType};var dummy=(q.type===1||q.type===2||q.type===3)?['A']:[''];for(var retry=0;retry<2;retry++){try{var aResp=await api('POST','/utestapi/questionTraining/student/answer?traceId='+userId,{qtId:Number(qtId),qtType:Number(qtType),index:i,relationId:qid,answer:dummy});var ca=aResp.result&&aResp.result.correctAnswer;correctMap[qid]=Array.isArray(ca)?ca.map(String):[];break;}catch(e){if(retry===0)await wait(300);}}tDone++;if(tDone%5===0||tDone===total)setProgress(60+Math.round(tDone/total*35),'已获取答案 '+tDone+'/'+total);}
    while(tIdx<total){if(exportCancelled)throw new Error('用户取消导出');var tBatch=[];for(var c=0;c<CONCURRENT&&tIdx<total;c++,tIdx++){tBatch.push(fetchTrainAns(sheetList[tIdx],tIdx));}await Promise.all(tBatch);await new Promise(function(r){setTimeout(r,0);});}
    allQ.forEach(function(q){if(correctMap[q.id])q.userAnswer=correctMap[q.id];});
    setProgress(100,'提取完成');
    return{name:'题库训练_'+qtId,questions:allQ.map(formatTrainQ).filter(Boolean)};
  }

  // ============================================================
  //  导出历史
  // ============================================================
  function getHistory(){try{return JSON.parse(localStorage.getItem(HISTORY_KEY))||[];}catch(e){return[];}}
  function addHistory(name,count,types,source){var h=getHistory();h.unshift({name:name,count:count,types:types,source:source||'导出',time:new Date().toLocaleString()});if(h.length>10)h=h.slice(0,10);try{localStorage.setItem(HISTORY_KEY,JSON.stringify(h));}catch(e){}}
  function renderHistory(){var h=getHistory();if(!h.length)return '<div style="text-align:center;padding:20px;color:#bbb;font-size:12px;">暂无导出记录</div>';return h.map(function(item,i){return '<div style="padding:8px 0;'+(i>0?'border-top:1px solid rgba(0,0,0,.04);':'')+'"><div style="display:flex;align-items:center;gap:6px;"><span style="font-size:10px;padding:1px 5px;border-radius:4px;background:'+(item.source==='课件'?'#e6f4ff':'#f0fff4')+';color:'+(item.source==='课件'?'#4a90d9':'#52c41a')+';">'+item.source+'</span><span style="font-size:12px;color:#333;font-weight:500;">'+html2text(item.name)+'</span></div><div style="font-size:11px;color:#aaa;margin-top:2px;">'+item.count+' 题 \u00B7 '+item.types+' \u00B7 '+item.time+'</div></div>';}).join('');}

  // ============================================================
  //  自动刷课 - 配置与状态
  // ============================================================
  var CFG_KEY='xz_autocfg';
  function loadCfg(){try{return JSON.parse(localStorage.getItem(CFG_KEY))||{};}catch(e){return{};}}
  function saveCfg(c){localStorage.setItem(CFG_KEY,JSON.stringify(c));}
  var defaultCfg={rate:1.5,stayTime:5,autoMute:true,autoPlay:true,autoAnswer:true,autoNext:true,autoSubmit:true,maxRetry:7,accuracyMin:100,accuracyMax:100,answerDelay:500,targetChapter:'',targetSection:''};
  var _cfgCache=null;
  function getCfg(){if(!_cfgCache){_cfgCache=loadCfg();for(var k in defaultCfg){if(typeof _cfgCache[k]==='undefined')_cfgCache[k]=defaultCfg[k];}}return _cfgCache;}
  function refreshCfg(){_cfgCache=null;return getCfg();}

  var autoState={paused:true,navigating:false,answerInProgress:false,retry:0,startTime:0,pagesDone:0,questionsDone:0,questionsCorrect:0};

  function parseAccuracy(str){str=String(str||'').trim();if(!str)return{min:100,max:100};if(str.indexOf('-')!==-1){var parts=str.split('-');var a=parseInt(parts[0])||0,b=parseInt(parts[1])||100;if(a<0)a=0;if(b>100)b=100;if(a>b){var t=a;a=b;b=t;}return{min:a,max:b};}var v=parseInt(str);if(isNaN(v))v=100;if(v<0)v=0;if(v>100)v=100;return{min:v,max:v};}
  function getTargetAccuracy(){var cfg=getCfg();var r=parseAccuracy(cfg.accuracyMin+'-'+cfg.accuracyMax);if(r.min===r.max)return r.min/100;return(r.min+Math.random()*(r.max-r.min))/100;}

  // ============================================================
  //  自动刷课 - 统一定时器
  // ============================================================
  var timerRegistry={_timers:{},_id:0,set:function(fn,delay){var id=++this._id;var self=this;this._timers[id]=setTimeout(function(){delete self._timers[id];fn();},delay);return id;},clear:function(id){if(this._timers[id]){clearTimeout(this._timers[id]);delete this._timers[id];}},clearAll:function(){for(var id in this._timers){clearTimeout(this._timers[id]);}this._timers={};}};

  // ============================================================
  //  自动刷课 - 视频处理
  // ============================================================
  var _videoObserver=null;
  var _lastVideoCheck=0;

  function setupVideoObserver(){
    if(_videoObserver)return;
    _videoObserver=new MutationObserver(function(mutations){
      if(autoState.paused||autoState.navigating||autoState.answerInProgress)return;
      var now=Date.now();
      if(now-_lastVideoCheck<2000)return;
      _lastVideoCheck=now;
      processVideo();
      checkModal();
    });
    _videoObserver.observe(document.querySelector('.page-scroller')||document.body,{childList:true,subtree:true});
  }

  function processVideo(){
    if(autoState.paused||autoState.navigating||autoState.answerInProgress)return;
    var cfg=getCfg();
    if(!cfg.autoPlay)return;
    var video=document.querySelector('video');
    if(!video){
      Logger.log('当前页无视频，'+cfg.stayTime+'秒后翻页');
      timerRegistry.set(function(){goNext();},cfg.stayTime*1000);
      return;
    }
    video.playbackRate=cfg.rate;
    if(cfg.autoMute&&!video.muted)video.muted=true;
    if(video.paused)video.play().catch(function(){});
    if(!video._xzEnded){
      video._xzEnded=true;
      video.addEventListener('ended',function(){
        Logger.log('视频播放完毕，'+cfg.stayTime+'秒后翻页');
        timerRegistry.set(function(){goNext();},cfg.stayTime*1000);
      },{once:true});
    }
  }

  function checkModal(){
    if(autoState.paused||autoState.answerInProgress)return;
    var cfg=getCfg();
    if(document.querySelector('.question-wrapper')&&cfg.autoAnswer){startAnswerQuiz();return;}
    var statModal=document.getElementById('statModal');
    if(statModal){var btns=statModal.getElementsByTagName('button');if(btns.length>=2)btns[1].click();return;}
    var alertModal=document.getElementById('alertModal');
    if(alertModal&&alertModal.className.includes('in')){
      var ops=document.querySelectorAll('.modal-operation button, .btn-submit');
      ops.forEach(function(btn){if(btn.textContent.trim()!=='提交')btn.click();});
    }
  }

  // ============================================================
  //  自动刷课 - 答题
  // ============================================================
  function startAnswerQuiz(){
    if(autoState.paused||autoState.answerInProgress)return;
    var cfg=getCfg();if(!cfg.autoAnswer)return;
    autoState.answerInProgress=true;
    Logger.log('检测到测验，开始答题...');

    var panels=document.querySelectorAll('.question-wrapper');
    var pageItems=document.querySelectorAll('.page-item');
    var parentId='';
    pageItems.forEach(function(item){var pn=item.querySelector('.page-name');if(pn&&pn.className.includes('active')){var id=item.getAttribute('id')||'';parentId=id.replace(/[a-zA-Z]/g,'');}});

    var qIds=[];
    panels.forEach(function(p){var id=p.getAttribute('id')||'';if(id.startsWith('question'))qIds.push(id.replace('question',''));});
    qIds=qIds.filter(function(v,i,a){return a.indexOf(v)===i;});
    Logger.log('发现 '+qIds.length+' 道题目');
    if(!qIds.length){autoState.answerInProgress=false;goNext();return;}

    var idx=0;
    function next(){
      if(autoState.paused){autoState.answerInProgress=false;return;}
      if(idx>=qIds.length){
        Logger.log(qIds.length+' 道题处理完毕');
        timerRegistry.set(function(){
          if(cfg.autoSubmit){var submit=document.querySelector('.btn-submit');if(submit){submit.click();Logger.log('已提交答案');}}
          autoState.answerInProgress=false;
          if(cfg.autoNext)goNext();
        },1000);
        return;
      }
      var qId=qIds[idx];
      var auth=getAuth();
      if(!auth){Logger.log('无认证信息');autoState.answerInProgress=false;return;}
      var apiHost=IS_DGUT?BASE:'https://ua.dgut.edu.cn';
      GM_xmlhttpRequest({
        method:'GET',
        url:apiHost+'/uaapi/questionAnswer/'+qId+'?parentId='+parentId,
        headers:{'UA-AUTHORIZATION':auth,'X-Requested-With':'XMLHttpRequest','Referer':location.href},
        onload:function(res){
          try{
            var data=JSON.parse(res.responseText);
            var answers=data.correctAnswerList||data.answer||[];
            if(answers.length)fillAnswer(qId,answers);
            Logger.log('题目 '+qId+': 已作答 (正确率'+Math.round(getTargetAccuracy()*100)+'%)');
          }catch(e){Logger.log('答案获取失败: '+e.message);}
          timerRegistry.set(function(){idx++;next();},jitteredDelay(cfg.answerDelay||500));
        },
        onerror:function(){Logger.log('网络异常，重试...');timerRegistry.set(function(){idx++;next();},jitteredDelay(cfg.answerDelay||800));}
      });
    }
    next();
  }

  function fillAnswer(qId,answers){
    var el=document.querySelector('#question'+qId);if(!el)return;
    var typeTag=el.querySelector('.question-type-tag');
    var typeText=typeTag?typeTag.textContent:'';
    var accuracy=getTargetAccuracy();
    var shouldCorrect=Math.random()<accuracy;
    autoState.questionsDone++;
    if(shouldCorrect)autoState.questionsCorrect++;

    if(typeText.includes('选择')){
      var opts=el.querySelectorAll('.choice-item, .option-item, .question-option');
      if(shouldCorrect){
        opts.forEach(function(opt){var label=opt.querySelector('.option')||opt.querySelector('.option-letter')||opt.querySelector('span:first-child');if(label){var letter=label.textContent.trim().replace('.','');if(answers.includes(letter)){var cb=opt.querySelector('.checkbox, .option-checkbox, .radio');if(cb&&!cb.classList.contains('selected')){opt.click();if(!cb.classList.contains('selected'))cb.click();}}}});
      }else{
        var wrongOpts=[];opts.forEach(function(opt){var label=opt.querySelector('.option')||opt.querySelector('.option-letter')||opt.querySelector('span:first-child');if(label){var letter=label.textContent.trim().replace('.','');if(!answers.includes(letter))wrongOpts.push(opt);}});
        if(wrongOpts.length){var pick=wrongOpts[Math.floor(Math.random()*wrongOpts.length)];var cb=pick.querySelector('.checkbox, .option-checkbox, .radio');if(cb&&!cb.classList.contains('selected')){pick.click();if(!cb.classList.contains('selected'))cb.click();}}
      }
    }else if(typeText.includes('判断')){
      var isCorrect=shouldCorrect?(String(answers[0])==='true'):(String(answers[0])!=='true');
      var btn=el.querySelector(isCorrect?'.right-btn':'.wrong-btn');
      if(btn&&!btn.classList.contains('selected'))btn.click();
    }else if(typeText.includes('填空')){
      var inputs=el.querySelectorAll('textarea, .blank-input');
      answers.forEach(function(ans,i){if(inputs[i]){inputs[i].value=shouldCorrect?ans.replace(/(<[^>]+>|\\n|\\r)/g,' '):'略';inputs[i].dispatchEvent(new Event('input',{bubbles:true}));inputs[i].dispatchEvent(new Event('change',{bubbles:true}));}});
    }
  }

  // ============================================================
  //  自动刷课 - 翻页
  // ============================================================
  function goNext(){
    if(autoState.paused||autoState.navigating||autoState.answerInProgress)return;
    var cfg=getCfg();if(!cfg.autoNext)return;
    autoState.navigating=true;
    var btns=document.querySelectorAll('.mobile-next-page-btn, .next-btn, .btn-next, .nextVideoBtn');
    if(btns.length===0){
      autoState.retry++;
      Logger.log('未找到下一页 ('+autoState.retry+'/'+cfg.maxRetry+')');
      if(autoState.retry>=cfg.maxRetry){autoState.paused=true;timerRegistry.clearAll();updateAutoUI();Logger.log('刷课完成');notify('刷课完成！'+getStats());}
      autoState.navigating=false;return;
    }
    autoState.retry=0;autoState.pagesDone++;
    for(var i=0;i<btns.length;i++){var b=btns[i];var s=window.getComputedStyle(b);if(s.display!=='none'&&s.visibility!=='hidden'&&!b.classList.contains('disabled')){b.click();Logger.log('已翻页 ('+autoState.pagesDone+'页,'+autoState.questionsDone+'题)');break;}}
    timerRegistry.set(function(){autoState.navigating=false;processVideo();checkModal();},3000);
  }

  function getStats(){
    if(!autoState.startTime)return'';
    var e=Math.floor((Date.now()-autoState.startTime)/1000),m=Math.floor(e/60),s=e%60;
    var acc=autoState.questionsDone?Math.round(autoState.questionsCorrect/autoState.questionsDone*100):0;
    return '运行'+m+'分'+s+'秒 | '+autoState.pagesDone+'页 | '+autoState.questionsDone+'题 | 正确率'+acc+'%';
  }

  function updateProgress(){
    var wrap=document.getElementById('xz-auto-progress');
    var bar=document.getElementById('xz-auto-bar');
    var txt=document.getElementById('xz-auto-progress-text');
    if(!wrap)return;
    if(autoState.paused&&!autoState.startTime){wrap.style.display='none';return;}
    wrap.style.display='block';
    var el=autoState.startTime?Math.floor((Date.now()-autoState.startTime)/1000):0;
    var m=Math.floor(el/60),s=el%60;
    var acc=autoState.questionsDone?Math.round(autoState.questionsCorrect/autoState.questionsDone*100):0;
    if(bar)bar.style.width=(autoState.paused?'100':'0')+'%';
    if(txt)txt.textContent=(autoState.paused?'已完成 ':'运行中 ')+m+'分'+s+'秒 | '+autoState.pagesDone+'页 | '+autoState.questionsDone+'题 | 正确率'+acc+'%';
  }

  // ============================================================
  //  自动刷课 - 主循环
  // ============================================================
  var autoLoopId=null;

  function autoLoop(){
    if(autoState.paused){if(autoLoopId){timerRegistry.clear(autoLoopId);autoLoopId=null;}return;}
    var cfg=getCfg();
    var start=parseInt(cfg.targetChapter)||0,end=parseInt(cfg.targetSection)||0;
    if(start||end){
      var items=document.querySelectorAll('.chapter-item');
      for(var i=0;i<items.length;i++){if(items[i].querySelector('.page-name.active')){
        var cur=i+1;
        if(start&&cur<start){Logger.log('章节'+cur+'不在范围内('+start+'-'+end+')，已暂停');autoState.paused=true;timerRegistry.clearAll();updateAutoUI();updateProgress();return;}
        if(end&&cur>end){Logger.log('章节'+cur+'不在范围内('+start+'-'+end+')，已暂停');autoState.paused=true;timerRegistry.clearAll();updateAutoUI();updateProgress();return;}
        break;
      }}
    }
    updateProgress();
    autoLoopId=timerRegistry.set(autoLoop,5000);
  }

  // ============================================================
  //  Logger
  // ============================================================
  var Logger={el:null,count:0,max:200,init:function(el){this.el=el;this.count=0;},log:function(msg){
    console.log('[小蟑螂] '+msg);
    if(!this.el)return;
    this.count++;
    if(this.count>this.max){this.el.innerHTML='';this.count=0;}
    var node=document.createElement('div');
    node.textContent='['+new Date().toLocaleTimeString()+'] '+msg;
    this.el.appendChild(node);
    this.el.scrollTop=this.el.scrollHeight;
  }};

  // ============================================================
  //  导出与下载
  // ============================================================
  var exportCancelled=false;
  function setProgress(pct,text){var bar=document.getElementById('xz-progress-bar');var txt=document.getElementById('xz-progress-text');if(bar)bar.style.width=pct+'%';if(txt&&text)txt.textContent=text;if(pct>0&&pct<100)setStatus('['+pct+'%] '+(text||''));else setStatus(text||'');}
  function download(name,content,mime){var blob=new Blob([content],{type:mime});var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(a.href)},2000);}

  // ============================================================
  //  UI
  // ============================================================
  var statusEl,logEl,btnExport,btnAuto;

  function createUI(){
    var panel=document.createElement('div');panel.id='xz-panel';
    var isAutoPage=IS_COURSE&&location.href.includes('learnCourse');
    var cfg=getCfg();
    var isRelevantPage=IS_COURSE||IS_TRAINING;
    var showTabs=isAutoPage?['首页','题库导出','自动刷课','关于']:(isRelevantPage?['首页','题库导出','关于']:['首页','关于']);

    panel.innerHTML=[
      '<style>',
      '#xz-panel{position:fixed;right:20px;top:80px;z-index:999999;width:320px;max-height:calc(100vh - 100px);display:flex;flex-direction:column;background:rgba(255,255,255,.72);backdrop-filter:blur(20px) saturate(1.4);-webkit-backdrop-filter:blur(20px) saturate(1.4);border:1px solid rgba(255,255,255,.6);border-radius:18px;box-shadow:0 8px 32px rgba(0,0,0,.08),inset 0 1px 0 rgba(255,255,255,.8);font-family:-apple-system,"PingFang SC",sans-serif;font-size:13px;color:#333;transition:transform .25s,opacity .25s;}',
      '#xz-panel .xz-head{padding:18px 18px 0;flex-shrink:0;cursor:move;user-select:none;}',
      '#xz-panel .xz-body{flex:1;overflow-y:auto;overflow-x:hidden;padding:0 18px 18px;min-height:0;scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.1) transparent;}',
      '#xz-panel.xz-hide{transform:scale(.96) translateY(8px);opacity:0;pointer-events:none;}',
      '#xz-panel .brand{text-align:center;margin-bottom:10px;}',
      '#xz-panel .brand .name{font-size:17px;font-weight:700;color:#1a1a2e;}',
      '#xz-panel .brand .ver{font-size:10px;color:#a0a0b0;margin-top:3px;}',
      '#xz-panel .tabs{display:flex;gap:3px;margin-bottom:12px;background:rgba(0,0,0,.04);border-radius:10px;padding:3px;box-shadow:inset 0 1px 3px rgba(0,0,0,.06);}',
      '#xz-panel .tab{flex:1;padding:7px 0;text-align:center;border-radius:8px;cursor:pointer;font-size:12px;color:#888;transition:all .2s;}',
      '#xz-panel .tab.active{background:rgba(255,255,255,.85);color:#1a1a2e;font-weight:600;box-shadow:0 2px 8px rgba(0,0,0,.06);}',
      '#xz-panel .sec{display:none;}#xz-panel .sec.show{display:block;}',
      '.xz-cards{display:flex;flex-direction:column;gap:8px;margin-top:10px;}',
      '.xz-card{background:rgba(255,255,255,.5);border:1px solid rgba(255,255,255,.6);border-radius:14px;padding:14px 16px;cursor:pointer;transition:all .2s;box-shadow:0 2px 8px rgba(0,0,0,.04);}',
      '.xz-card:hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(0,0,0,.08);}',
      '.xz-card .card-title{font-size:13px;font-weight:600;color:#1a1a2e;margin-bottom:3px;}',
      '.xz-card .card-desc{font-size:11px;color:#888;line-height:1.5;}',
      '.xz-card .card-hint{font-size:10px;color:#4a90d9;margin-top:8px;display:block;}',
      '.xz-card.disabled{opacity:.4;cursor:default;transform:none;}.xz-card.disabled:hover{transform:none;box-shadow:0 2px 8px rgba(0,0,0,.04);}.xz-card.disabled .card-hint{color:#bbb;}',
      '.xz-sub-head{display:flex;align-items:center;gap:10px;margin-bottom:14px;}',
      '.xz-sub-head .back{width:30px;height:30px;border-radius:10px;border:1px solid rgba(0,0,0,.06);background:rgba(255,255,255,.6);color:#888;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;}',
      '.xz-sub-head .back:hover{background:rgba(255,255,255,.9);color:#555;}',
      '.xz-sub-head .title{font-size:15px;font-weight:600;color:#1a1a2e;}',
      '.xz-hint{background:rgba(0,0,0,.03);border:1px solid rgba(0,0,0,.04);border-radius:12px;padding:12px 14px;margin-bottom:12px;}',
      '.xz-hint .ht{font-size:12px;font-weight:600;color:#555;margin-bottom:4px;}',
      '.xz-hint .hp{font-size:11px;color:#999;line-height:1.6;}',
      '.xz-btn{width:100%;padding:11px;border:none;border-radius:12px;font-size:13px;cursor:pointer;font-weight:600;color:#fff;transition:all .2s;letter-spacing:.3px;}',
      '.xz-btn:hover{transform:translateY(-1px);}.xz-btn:active{transform:translateY(1px);}',
      '.xz-btn-primary{background:linear-gradient(135deg,#4a90d9,#357abd);box-shadow:0 4px 14px rgba(74,144,217,.3);}',
      '.xz-btn-success{background:linear-gradient(135deg,#52c41a,#389e0d);box-shadow:0 4px 14px rgba(82,196,26,.25);}',
      '.xz-btn-danger{background:linear-gradient(135deg,#ff4d4f,#cf1322);box-shadow:0 4px 14px rgba(255,77,79,.25);}',
      '.xz-btn:disabled{background:#e0e0e0;color:#aaa;cursor:not-allowed;box-shadow:none;transform:none;}',
      'label.xz-lbl{font-size:12px;color:#777;cursor:pointer;display:flex;align-items:center;gap:6px;margin:5px 0;}',
      '#xz-panel input[type=number]{width:52px;background:rgba(0,0,0,.03);color:#333;border:1px solid rgba(0,0,0,.08);border-radius:8px;padding:4px 6px;font-size:12px;outline:none;}',
      '#xz-panel input[type=number]:focus{border-color:#4a90d9;}',
      '#xz-panel input[type=checkbox]{accent-color:#4a90d9;}',
      '.xz-row{display:flex;align-items:center;gap:6px;margin:5px 0;font-size:12px;color:#777;}',
      '.xz-opt-title{font-size:10px;color:#aaa;margin:10px 0 4px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;}',
      '.xz-divider{border-top:1px solid rgba(0,0,0,.05);margin:12px 0;}',
      '.xz-st{margin-top:6px;font-size:11px;color:#aaa;min-height:16px;word-break:break-all;}',
      '.xz-log{margin-top:6px;font-size:10px;color:#999;max-height:80px;overflow-y:auto;background:rgba(0,0,0,.03);padding:6px 8px;border-radius:8px;border:1px solid rgba(0,0,0,.04);display:none;}.xz-log.show{display:block;}',
      '.xz-log-list{font-size:11px;color:#888;line-height:1.8;max-height:180px;overflow-y:auto;padding:4px 0;}',
      '.xz-log-list .ver{font-weight:600;color:#444;margin-top:8px;}.xz-log-list .ver:first-child{margin-top:0;}',
      '.xz-log-list .date{color:#bbb;font-size:10px;margin-left:6px;}',
      '.xz-log-list ul{margin:2px 0;padding-left:16px;}.xz-log-list li{margin:1px 0;}',
      '.xz-footer{text-align:center;padding:10px 0 0;margin-top:8px;border-top:1px solid rgba(0,0,0,.04);}',
      '.xz-footer .copy{font-size:10px;color:#ccc;}.xz-footer .disc{font-size:9px;color:#ddd;margin-top:5px;line-height:1.5;}',
      '#xz-panel .close{position:absolute;top:12px;right:14px;background:none;border:none;font-size:16px;color:#ccc;cursor:pointer;}',
      '#xz-panel .close:hover{color:#999;}',
      '</style>',
      '<button class="close" id="xz-close">&times;</button>',
      '<div class="xz-head"><div class="brand"><div class="name">\uD83D\uDC63 莞工小蟑螂</div><div class="ver">优学院全能助手 \u00B7 v3.4</div></div>',
      '<div class="tabs">'+showTabs.map(function(t,i){var k=t==='首页'?'home':t==='题库导出'?'export':t==='自动刷课'?'auto':'about';return '<div class="tab'+(i===0?' active':'')+'" data-tab="'+k+'">'+t+'</div>';}).join('')+'</div></div>',
      '<div class="xz-body">',
      '<div class="sec show" id="xz-sec-home">',
      '<div style="text-align:center;padding:4px 0 8px;"><div style="font-size:20px;font-weight:700;color:#1a1a2e;">\uD83D\uDC63 莞工小蟑螂</div><div style="font-size:11px;color:#b0b0c0;margin-top:3px;">优学院全能助手 \u00B7 请选择功能</div></div>',
      '<div class="xz-cards">',
      '<div class="xz-card'+(IS_COURSE?'':' disabled')+'"><div class="card-title">课件题库导出</div><div class="card-desc">从课件章节中提取练习题目和答案</div>'+('<span class="card-hint">'+(IS_COURSE?'当前可在「题库导出」使用':'请先打开课件页面')+'</span>')+'</div>',
      '<div class="xz-card'+(IS_TRAINING?'':' disabled')+'"><div class="card-title">训练题库导出</div><div class="card-desc">从题库训练中导出题目和标准答案</div>'+('<span class="card-hint">'+(IS_TRAINING?'当前可在「题库导出」使用':'请先打开训练页面')+'</span>')+'</div>',
      '<div class="xz-card'+(isAutoPage?'':' disabled')+'"><div class="card-title">自动刷课</div><div class="card-desc">自动播放视频、答题、翻页</div>'+('<span class="card-hint">'+(isAutoPage?'当前可在「自动刷课」配置':'请先打开学习页面')+'</span>')+'</div>',
      '</div></div>',
      isRelevantPage?'<div class="sec" id="xz-sec-export"><div class="xz-sub-head"><button class="back" data-goto="home">&larr;</button><div class="title">'+(IS_COURSE?'课件题库导出':'训练题库导出')+'</div></div>'+(IS_COURSE?'<label class="xz-lbl"><input type="checkbox" id="xz-log"> 显示调试日志</label>':'')+'<button class="xz-btn xz-btn-primary" id="xz-btn-export">'+(IS_COURSE?'开始导出课件题库':'开始导出训练题库')+'</button>'+'<div id="xz-export-progress" style="display:none;margin-top:10px;"><div style="background:rgba(0,0,0,.06);border-radius:6px;height:4px;overflow:hidden;"><div id="xz-progress-bar" style="background:linear-gradient(90deg,#4a90d9,#357abd);height:100%;width:0%;transition:width .3s;border-radius:6px;"></div></div><div style="display:flex;justify-content:space-between;margin-top:5px;"><span id="xz-progress-text" style="font-size:11px;color:#aaa;"></span><button id="xz-btn-cancel" style="background:none;border:1px solid rgba(255,77,79,.2);color:#ff4d4f;font-size:11px;cursor:pointer;padding:3px 10px;border-radius:6px;">取消</button></div></div>'+'<div class="xz-st" id="xz-st"></div><div class="xz-log" id="xz-log-box"></div></div>':'',
      isAutoPage?'<div class="sec" id="xz-sec-auto"><div class="xz-sub-head"><button class="back" data-goto="home">&larr;</button><div class="title">自动刷课设置</div></div>'+'<div class="xz-hint"><div class="ht">说明</div><div class="hp">自动播放视频并静音，答题时自动填写答案，完成后自动翻页。</div></div>'+'<div class="xz-opt-title">播放</div>'+'<div class="xz-row">倍速: <input type="number" id="xz-rate" value="'+cfg.rate+'" step="0.5" min="1" max="15"> x</div>'+'<div class="xz-row">停留: <input type="number" id="xz-stay" value="'+cfg.stayTime+'" step="1" min="0" max="120"> 秒</div>'+'<label class="xz-lbl"><input type="checkbox" id="xz-auto-mute" '+(cfg.autoMute?'checked':'')+'> 静音</label>'+'<label class="xz-lbl"><input type="checkbox" id="xz-auto-play" '+(cfg.autoPlay?'checked':'')+'> 自动播放</label>'+'<div class="xz-divider"></div>'+'<div class="xz-opt-title">答题</div>'+'<label class="xz-lbl"><input type="checkbox" id="xz-auto-answer" '+(cfg.autoAnswer?'checked':'')+'> 自动答题</label>'+'<label class="xz-lbl"><input type="checkbox" id="xz-auto-submit" '+(cfg.autoSubmit?'checked':'')+'> 自动提交</label>'+'<div class="xz-row">间隔: <input type="number" id="xz-answer-delay" value="'+(cfg.answerDelay||500)+'" step="100" min="100" max="5000"> ms</div>'+'<div class="xz-opt-title">正确率</div>'+'<div class="xz-row">最低: <input type="number" id="xz-acc-min" value="'+cfg.accuracyMin+'" step="1" min="0" max="100"> %</div>'+'<div class="xz-row">最高: <input type="number" id="xz-acc-max" value="'+cfg.accuracyMax+'" step="1" min="0" max="100"> %</div>'+'<div class="xz-divider"></div>'+'<div class="xz-opt-title">翻页</div>'+'<label class="xz-lbl"><input type="checkbox" id="xz-auto-next" '+(cfg.autoNext?'checked':'')+'> 自动翻页</label>'+'<div class="xz-row">最大重试: <input type="number" id="xz-max-retry" value="'+cfg.maxRetry+'" step="1" min="1" max="20"></div>'+'<div class="xz-divider"></div>'+'<button class="xz-btn xz-btn-success" id="xz-btn-auto">开始自动刷课</button>'+'<div id="xz-auto-progress" style="display:none;margin-top:8px;"><div style="background:rgba(0,0,0,.06);border-radius:6px;height:4px;overflow:hidden;"><div id="xz-auto-bar" style="background:linear-gradient(90deg,#52c41a,#389e0d);height:100%;width:0%;transition:width .5s;border-radius:6px;"></div></div><div id="xz-auto-progress-text" style="font-size:11px;color:#aaa;margin-top:4px;"></div></div>'+'<div class="xz-log" id="xz-auto-log" style="margin-top:6px;"></div></div>':'',
      '<div class="sec" id="xz-sec-about"><div class="xz-sub-head"><button class="back" data-goto="home">&larr;</button><div class="title">关于</div></div><div class="xz-log-list"><div class="ver">v3.4 <span class="date">2026-06-24</span></div><ul><li>全新重写，统一执行链和定时器</li><li>MutationObserver 监听页面变化</li><li>防重复初始化</li><li>性能优化：日志用 DOM 节点</li><li>支持旧版优学院</li></ul><div class="ver">v3.3 <span class="date">2026-06-13</span></div><ul><li>品牌 Logo、面板拖动、暗色模式</li><li>导出并发获取答案</li><li>导出历史记录</li></ul></div><div class="xz-divider"></div><div class="xz-footer"><div class="copy">\uD83D\uDC63 莞工小蟑螂 \u00B7 MIT License</div><div class="disc">本工具仅供学习交流使用，请遵守学校规定。</div></div></div>',
      '</div></div>'
    ].join('');

    document.body.appendChild(panel);

    // 面板拖动
    var head=panel.querySelector('.xz-head');
    var drag={active:false,sx:0,sy:0,ox:0,oy:0};
    head.addEventListener('mousedown',function(e){if(e.target.id==='xz-close'||e.target.closest('.tab'))return;drag.active=true;drag.sx=e.clientX;drag.sy=e.clientY;var r=panel.getBoundingClientRect();drag.ox=r.left;drag.oy=r.top;e.preventDefault();});
    document.addEventListener('mousemove',function(e){if(!drag.active)return;panel.style.left=(drag.ox+e.clientX-drag.sx)+'px';panel.style.top=(drag.oy+e.clientY-drag.sy)+'px';panel.style.right='auto';});
    document.addEventListener('mouseup',function(){if(drag.active){drag.active=false;var r=panel.getBoundingClientRect();try{localStorage.setItem('xz_panel_pos',JSON.stringify({l:r.left,t:r.top}));}catch(e){}}});
    var sp=null;try{sp=JSON.parse(localStorage.getItem('xz_panel_pos'));}catch(e){}
    if(sp&&sp.l!=null){panel.style.left=sp.l+'px';panel.style.top=sp.t+'px';panel.style.right='auto';}

    // 浮动按钮
    var toggle=document.createElement('button');toggle.id='xz-toggle';
    toggle.innerHTML='\uD83D\uDC63 小蟑螂';
    toggle.style.cssText='position:fixed;right:20px;top:90px;z-index:999998;width:auto;padding:8px 14px;border-radius:12px;border:1px solid rgba(255,255,255,.6);background:rgba(255,255,255,.72);backdrop-filter:blur(16px);color:#1a1a2e;font-size:12px;font-weight:600;cursor:grab;box-shadow:0 4px 16px rgba(0,0,0,.08);display:none;';
    document.body.appendChild(toggle);
    var tDrag={m:false,sx:0,sy:0,ox:0,oy:0};
    toggle.addEventListener('mousedown',function(e){tDrag.m=false;tDrag.sx=e.clientX;tDrag.sy=e.clientY;var r=toggle.getBoundingClientRect();tDrag.ox=r.left;tDrag.oy=r.top;e.preventDefault();});
    document.addEventListener('mousemove',function(e){if(!tDrag.sx)return;var dx=e.clientX-tDrag.sx,dy=e.clientY-tDrag.sy;if(Math.abs(dx)>3||Math.abs(dy)>3)tDrag.m=true;if(tDrag.m){toggle.style.left=(tDrag.ox+dx)+'px';toggle.style.top=(tDrag.oy+dy)+'px';toggle.style.right='auto';}});
    document.addEventListener('mouseup',function(){if(tDrag.sx){tDrag.sx=0;if(tDrag.m){var r=toggle.getBoundingClientRect();try{localStorage.setItem('xz_btn_pos',JSON.stringify({l:r.left,t:r.top}));}catch(e){}}}});
    var tp=null;try{tp=JSON.parse(localStorage.getItem('xz_btn_pos'));}catch(e){}
    if(tp&&tp.l!=null){toggle.style.left=tp.l+'px';toggle.style.top=tp.t+'px';toggle.style.right='auto';}

    // 关闭/打开
    document.getElementById('xz-close').onclick=function(){panel.style.display='none';toggle.style.display='';};
    toggle.onclick=function(){if(tDrag.m)return;panel.style.display='';toggle.style.display='none';};

    // Escape
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&panel.style.display!=='none'){panel.style.display='none';toggle.style.display='';}});

    // Tab
    panel.querySelectorAll('.tab').forEach(function(tab){tab.onclick=function(){panel.querySelectorAll('.tab').forEach(function(t){t.classList.remove('active');});tab.classList.add('active');panel.querySelectorAll('.sec').forEach(function(s){s.classList.remove('show');});var t=document.getElementById('xz-sec-'+tab.dataset.tab);if(t)t.classList.add('show');};});

    statusEl=document.getElementById('xz-st');logEl=document.getElementById('xz-log-box');
    var logCb=document.getElementById('xz-log');
    if(logCb)logCb.onchange=function(){document.getElementById('xz-log-box').classList.toggle('show',this.checked);};

    // 导出按钮
    btnExport=document.getElementById('xz-btn-export');
    if(btnExport)btnExport.onclick=runExport;

    // 自动刷课按钮
    if(isAutoPage){
      Logger.init(document.getElementById('xz-auto-log'));
      btnAuto=document.getElementById('xz-btn-auto');
      btnAuto.onclick=function(){
        autoState.paused=!autoState.paused;
        refreshCfg();
        var c=getCfg();
        c.rate=parseFloat(document.getElementById('xz-rate').value)||1.5;
        c.stayTime=parseInt(document.getElementById('xz-stay').value)||5;
        c.autoMute=document.getElementById('xz-auto-mute').checked;
        c.autoPlay=document.getElementById('xz-auto-play').checked;
        c.autoAnswer=document.getElementById('xz-auto-answer').checked;
        c.autoSubmit=document.getElementById('xz-auto-submit').checked;
        c.autoNext=document.getElementById('xz-auto-next').checked;
        c.maxRetry=parseInt(document.getElementById('xz-max-retry').value)||7;
        c.accuracyMin=parseInt(document.getElementById('xz-acc-min').value)||100;
        c.accuracyMax=parseInt(document.getElementById('xz-acc-max').value)||100;
        c.answerDelay=parseInt(document.getElementById('xz-answer-delay').value)||500;
        saveCfg(c);_cfgCache=null;getCfg();

        if(!autoState.paused){
          Logger.log('自动刷课启动');
          timerRegistry.clearAll();
          autoState.startTime=Date.now();autoState.pagesDone=0;autoState.questionsDone=0;autoState.questionsCorrect=0;
          setupVideoObserver();processVideo();checkModal();
          autoLoopId=timerRegistry.set(autoLoop,5000);
          var acc=c.accuracyMin===c.accuracyMax?c.accuracyMin+'%':c.accuracyMin+'%~'+c.accuracyMax+'%';
          Logger.log('配置: 倍速'+c.rate+'x 停留'+c.stayTime+'s 正确率'+acc+' 间隔'+c.answerDelay+'ms');
        }else{
          Logger.log('自动刷课暂停');timerRegistry.clearAll();if(autoLoopId){timerRegistry.clear(autoLoopId);autoLoopId=null;}
          Logger.log(getStats());
        }
        updateAutoUI();updateProgress();
      };
    }
  }

  function setStatus(t){if(statusEl)statusEl.textContent=t;}
  function updateAutoUI(){if(!btnAuto)return;btnAuto.textContent=autoState.paused?'开始自动刷课':'暂停自动刷课';btnAuto.className=autoState.paused?'xz-btn xz-btn-success':'xz-btn xz-btn-danger';}

  // ============================================================
  //  导出主流程
  // ============================================================
  async function runExport(){
    exportCancelled=false;btnExport.disabled=true;btnExport.textContent='导出中...';
    var pw=document.getElementById('xz-export-progress');var cb=document.getElementById('xz-btn-cancel');
    if(pw)pw.style.display='block';setProgress(0,'准备导出...');
    if(cb)cb.onclick=function(){exportCancelled=true;cb.textContent='正在取消...';cb.disabled=true;};
    try{
      var data;
      if(IS_COURSE){setProgress(0,'正在导出课件题库...');data=await exportCourseware();}
      else if(IS_TRAINING){setProgress(0,'正在导出训练题库...');data=await exportTraining();}
      else throw new Error('请在课件页面或训练页面运行');
      var name=clean(data.name),ds=new Date().toISOString().slice(0,10).replace(/-/g,'');
      download(name+'_'+ds+'_题库.json',JSON.stringify(data.questions,null,2),'application/json;charset=utf-8');
      var stats={};data.questions.forEach(function(q){stats[q['题型']]=(stats[q['题型']]||0)+1;});
      var total=data.questions.length,typesStr=Object.keys(stats).map(function(k){return k+stats[k]+'题'}).join('\u3001');
      addHistory(data.name,total,typesStr,IS_COURSE?'课件':'训练');
      setProgress(100,'完成！共 '+total+' 题');notify('导出完成！共 '+total+' 题');
    }catch(e){
      if(e.message==='用户取消导出'){setProgress(0,'已取消');}
      else{setProgress(0,'失败: '+e.message);notify('导出失败: '+e.message);}
    }finally{
      btnExport.disabled=false;btnExport.textContent=IS_COURSE?'开始导出课件题库':'开始导出训练题库';
      if(cb){cb.onclick=null;cb.textContent='取消';cb.disabled=false;}
      setTimeout(function(){if(pw)pw.style.display='none';},3000);
    }
  }

  // ============================================================
  //  初始化（防重复）
  // ============================================================
  var _inited=false;
  function init(){
    if(_inited)return;_inited=true;
    try{
      if(document.getElementById('xz-panel'))return;
      createUI();setupVideoObserver();
      console.log('[莞工小蟑螂] v3.4 已加载');
      var lastVer='';try{lastVer=localStorage.getItem('xz_last_ver')||'';}catch(e){}
      if(lastVer!=='3.4'){try{localStorage.setItem('xz_last_ver','3.4');}catch(e){}notify('莞工小蟑螂 v3.4：全新重写，统一执行链');}
    }catch(e){console.error('[莞工小蟑螂]',e);}
  }

  if(document.readyState==='complete')init();
  else window.addEventListener('load',init);
  setInterval(function(){if(!_inited&&!document.getElementById('xz-panel'))init();},2000);

})();
