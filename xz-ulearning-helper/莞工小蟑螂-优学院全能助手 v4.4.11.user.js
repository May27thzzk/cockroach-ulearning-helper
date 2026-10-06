// ==UserScript==
// @name         莞工小蟑螂 - 优学院全能助手
// @namespace    https://github.com/May27thzzk/cockroach-ulearning-helper
// @version      4.4.11
// @description  优学院课件题库导出 + 训练题库导出 + 自动静音播放/答题/翻页，莞工小蟑螂出品
// @author       莞工小蟑螂
// @match        https://ua.dgut.edu.cn/*
// @match        https://ua.ulearning.cn/*
// @match        https://lms.dgut.edu.cn/*
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiByb2xlPSJpbWciIGFyaWEtbGFiZWw9IuaKseedgOe0q+iJsueslOiusOacrOeahOWPr+eIseWwj+ifkeiegiI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9InRpbGUiIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI2ZjZjlmZiIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNkZGQwZmEiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9InNoZWxsIiB4MT0iLjE1IiB5MT0iMCIgeDI9Ii44NSIgeTI9IjEiPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjZDc5YjZjIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2E4NjE0MiIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZmFjZSIgeDE9Ii4yIiB5MT0iMCIgeDI9Ii44IiB5Mj0iMSI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNlNWFlN2QiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjYmY3OTUwIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJib29rIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNiMDlhZWUiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjODI2OGNhIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGZpbHRlciBpZD0ic2hhZG93IiB4PSItNTAlIiB5PSItNTAlIiB3aWR0aD0iMjAwJSIgaGVpZ2h0PSIyMDAlIj4KICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iNSIvPgogICAgPC9maWx0ZXI+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiByeD0iNjAiIGZpbGw9InVybCgjdGlsZSkiLz4KICA8cGF0aCBkPSJNMjAgODJDMjYgMzkgNjEgMTUgMTA3IDE3IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIuNTgiIHN0cm9rZS13aWR0aD0iMTAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxlbGxpcHNlIGN4PSIxMzAiIGN5PSIyMTgiIHJ4PSI3MyIgcnk9IjEyIiBmaWxsPSIjNzM1NmFiIiBvcGFjaXR5PSIuMTQiIGZpbHRlcj0idXJsKCNzaGFkb3cpIi8+CiAgPHBhdGggZD0iTTkxIDYyQzgzIDQ3IDc5IDM5IDY2IDM1TTE2NCA2MEMxNjkgNDUgMTc5IDM4IDE5MCAzNiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjODQ1MzQ0IiBzdHJva2Utd2lkdGg9IjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxjaXJjbGUgY3g9IjY0IiBjeT0iMzQiIHI9IjgiIGZpbGw9IiNhODY4NGMiLz4KICA8Y2lyY2xlIGN4PSIxOTIiIGN5PSIzNSIgcj0iOCIgZmlsbD0iI2E4Njg0YyIvPgogIDxlbGxpcHNlIGN4PSI4NiIgY3k9IjE4NSIgcng9IjE1IiByeT0iMjUiIHRyYW5zZm9ybT0icm90YXRlKDI1IDg2IDE4NSkiIGZpbGw9IiNhZDZkNGIiLz4KICA8ZWxsaXBzZSBjeD0iMTcwIiBjeT0iMTg1IiByeD0iMTUiIHJ5PSIyNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTI1IDE3MCAxODUpIiBmaWxsPSIjYWQ2ZDRiIi8+CiAgPGVsbGlwc2UgY3g9IjkxIiBjeT0iMjEwIiByeD0iMTYiIHJ5PSIxMSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE4IDkxIDIxMCkiIGZpbGw9IiM5MjU4M2YiLz4KICA8ZWxsaXBzZSBjeD0iMTY1IiBjeT0iMjEwIiByeD0iMTYiIHJ5PSIxMSIgdHJhbnNmb3JtPSJyb3RhdGUoMTggMTY1IDIxMCkiIGZpbGw9IiM5MjU4M2YiLz4KICA8ZWxsaXBzZSBjeD0iMTI4IiBjeT0iMTY1IiByeD0iNjgiIHJ5PSI2MCIgZmlsbD0idXJsKCNzaGVsbCkiIHN0cm9rZT0iIzk2NWE0MCIgc3Ryb2tlLXdpZHRoPSI0Ii8+CiAgPGVsbGlwc2UgY3g9IjEyOCIgY3k9IjEwNCIgcng9IjcyIiByeT0iNjUiIGZpbGw9InVybCgjZmFjZSkiIHN0cm9rZT0iIzk2NWE0MCIgc3Ryb2tlLXdpZHRoPSI0Ii8+CiAgPGVsbGlwc2UgY3g9IjEyOCIgY3k9IjEyNiIgcng9IjUzIiByeT0iMzYiIGZpbGw9IiNmMmM2OTciIG9wYWNpdHk9Ii43NCIvPgogIDxlbGxpcHNlIGN4PSIxMDIiIGN5PSIxMDgiIHJ4PSIxMiIgcnk9IjE3IiBmaWxsPSIjMzUyYTM3Ii8+CiAgPGVsbGlwc2UgY3g9IjE1NCIgY3k9IjEwOCIgcng9IjEyIiByeT0iMTciIGZpbGw9IiMzNTJhMzciLz4KICA8Y2lyY2xlIGN4PSI5OCIgY3k9IjEwMiIgcj0iNCIgZmlsbD0iI2ZmZiIvPgogIDxjaXJjbGUgY3g9IjE1MCIgY3k9IjEwMiIgcj0iNCIgZmlsbD0iI2ZmZiIvPgogIDxjaXJjbGUgY3g9IjEwNiIgY3k9IjExNSIgcj0iMiIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iLjY1Ii8+CiAgPGNpcmNsZSBjeD0iMTU4IiBjeT0iMTE1IiByPSIyIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuNjUiLz4KICA8ZWxsaXBzZSBjeD0iODIiIGN5PSIxMzIiIHJ4PSIxMSIgcnk9IjYiIGZpbGw9IiNlNjg0ODciIG9wYWNpdHk9Ii42MiIvPgogIDxlbGxpcHNlIGN4PSIxNzQiIGN5PSIxMzIiIHJ4PSIxMSIgcnk9IjYiIGZpbGw9IiNlNjg0ODciIG9wYWNpdHk9Ii42MiIvPgogIDxwYXRoIGQ9Ik0xMjEgMTM5UTEyOCAxNDcgMTM1IDEzOSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNzA0MjNlIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxnIHRyYW5zZm9ybT0icm90YXRlKC01IDEyOCAxODUpIj4KICAgIDxyZWN0IHg9Ijg1IiB5PSIxNTciIHdpZHRoPSI4NiIgaGVpZ2h0PSI2NCIgcng9IjEwIiBmaWxsPSIjNmE0ZGE4Ii8+CiAgICA8cmVjdCB4PSI5MCIgeT0iMTU0IiB3aWR0aD0iNzkiIGhlaWdodD0iNjQiIHJ4PSI5IiBmaWxsPSJ1cmwoI2Jvb2spIiBzdHJva2U9IiM3NDU5YjUiIHN0cm9rZS13aWR0aD0iMyIvPgogICAgPHBhdGggZD0iTTEwMyAxNTVWMjE2IiBzdHJva2U9IiNkN2NhZmEiIHN0cm9rZS13aWR0aD0iNCIvPgogICAgPHBhdGggZD0iTTEyMCAxNzhIMTUwTTEyMCAxODlIMTQzIiBzdHJva2U9IiNlZWU4ZmYiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBvcGFjaXR5PSIuODUiLz4KICAgIDxwYXRoIGQ9Ik0xMzcgMTY3TDEzOSAxNzMgMTQ1IDE3NSAxMzkgMTc3IDEzNyAxODMgMTM0IDE3NyAxMjggMTc1IDEzNCAxNzNaIiBmaWxsPSIjZmZmNGQ3Ii8+CiAgPC9nPgogIDxlbGxpcHNlIGN4PSI4NyIgY3k9IjE3OSIgcng9IjEyIiByeT0iOCIgdHJhbnNmb3JtPSJyb3RhdGUoMjcgODcgMTc5KSIgZmlsbD0iI2RmYTc3OCIgc3Ryb2tlPSIjOWY2NTQ3IiBzdHJva2Utd2lkdGg9IjMiLz4KICA8ZWxsaXBzZSBjeD0iMTY5IiBjeT0iMTc5IiByeD0iMTIiIHJ5PSI4IiB0cmFuc2Zvcm09InJvdGF0ZSgtMjcgMTY5IDE3OSkiIGZpbGw9IiNkZmE3NzgiIHN0cm9rZT0iIzlmNjU0NyIgc3Ryb2tlLXdpZHRoPSIzIi8+Cjwvc3ZnPgo=
// @grant        GM_notification
// @grant        GM_xmlhttpRequest
// @connect      self
// @connect      api.dgut.edu.cn
// @connect      api.ulearning.cn
// @license      MIT
// @run-at       document-idle
// @homepageURL  https://github.com/May27thzzk/cockroach-ulearning-helper
// @supportURL   https://github.com/May27thzzk/cockroach-ulearning-helper/issues
// ==/UserScript==

(function () {
  'use strict';

  var HOST = location.hostname;
  var IS_DGUT = HOST.includes('dgut.edu.cn');
  // 请求时再读取平台配置，避免脚本先于 urlStyle Cookie 初始化而固定到旧 API 域名。
  function resolveApiHost(){return IS_DGUT?(getCookie('urlStyle')==='2'||/^https:\/\/ua\.dgut\.edu\.cn\/uaapi\/?$/i.test(window.CONFIG_API_HOST||'')?location.origin:'https://api.dgut.edu.cn'):'https://api.ulearning.cn';}
  var API_HOST = resolveApiHost();
  var HASH_ROUTE = (location.hash || '').split('?')[0].toLowerCase();
  var IS_COURSE = (HOST.startsWith('ua.') && /\/learnCourse\//i.test(location.pathname)) || /^#\/course\/(?:textbook|learncourse)(?:\/|$)/.test(HASH_ROUTE);
  var IS_TRAINING = HOST.startsWith('lms.') && /^#\/questiontrain\/practice(?:\/|$)/.test(HASH_ROUTE);
  function getPageParam(name){
    var params=new URLSearchParams(location.search||'');
    var hash=location.hash||'',queryIndex=hash.indexOf('?');
    if(queryIndex!==-1){
      new URLSearchParams(hash.slice(queryIndex+1)).forEach(function(value,key){if(!params.has(key))params.set(key,value);});
    }
    var wanted=String(name).toLowerCase(),result=null;
    params.forEach(function(value,key){if(result===null&&key.toLowerCase()===wanted)result=value;});
    return result;
  }
  var TYPE_NAME = {1:'单选题',2:'多选题',3:'不定项选择题',4:'判断题',5:'填空题',6:'简答题',7:'文件题',11:'阅读理解',12:'排序题',17:'选词填空',24:'综合题'};
  var LABELS = 'ABCDEFGHIJ'.split('');
  var LOGO_URI = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiByb2xlPSJpbWciIGFyaWEtbGFiZWw9IuaKseedgOe0q+iJsueslOiusOacrOeahOWPr+eIseWwj+ifkeiegiI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9InRpbGUiIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI2ZjZjlmZiIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNkZGQwZmEiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9InNoZWxsIiB4MT0iLjE1IiB5MT0iMCIgeDI9Ii44NSIgeTI9IjEiPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjZDc5YjZjIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2E4NjE0MiIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZmFjZSIgeDE9Ii4yIiB5MT0iMCIgeDI9Ii44IiB5Mj0iMSI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNlNWFlN2QiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjYmY3OTUwIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJib29rIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNiMDlhZWUiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjODI2OGNhIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGZpbHRlciBpZD0ic2hhZG93IiB4PSItNTAlIiB5PSItNTAlIiB3aWR0aD0iMjAwJSIgaGVpZ2h0PSIyMDAlIj4KICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iNSIvPgogICAgPC9maWx0ZXI+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiByeD0iNjAiIGZpbGw9InVybCgjdGlsZSkiLz4KICA8cGF0aCBkPSJNMjAgODJDMjYgMzkgNjEgMTUgMTA3IDE3IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIuNTgiIHN0cm9rZS13aWR0aD0iMTAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxlbGxpcHNlIGN4PSIxMzAiIGN5PSIyMTgiIHJ4PSI3MyIgcnk9IjEyIiBmaWxsPSIjNzM1NmFiIiBvcGFjaXR5PSIuMTQiIGZpbHRlcj0idXJsKCNzaGFkb3cpIi8+CiAgPHBhdGggZD0iTTkxIDYyQzgzIDQ3IDc5IDM5IDY2IDM1TTE2NCA2MEMxNjkgNDUgMTc5IDM4IDE5MCAzNiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjODQ1MzQ0IiBzdHJva2Utd2lkdGg9IjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxjaXJjbGUgY3g9IjY0IiBjeT0iMzQiIHI9IjgiIGZpbGw9IiNhODY4NGMiLz4KICA8Y2lyY2xlIGN4PSIxOTIiIGN5PSIzNSIgcj0iOCIgZmlsbD0iI2E4Njg0YyIvPgogIDxlbGxpcHNlIGN4PSI4NiIgY3k9IjE4NSIgcng9IjE1IiByeT0iMjUiIHRyYW5zZm9ybT0icm90YXRlKDI1IDg2IDE4NSkiIGZpbGw9IiNhZDZkNGIiLz4KICA8ZWxsaXBzZSBjeD0iMTcwIiBjeT0iMTg1IiByeD0iMTUiIHJ5PSIyNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTI1IDE3MCAxODUpIiBmaWxsPSIjYWQ2ZDRiIi8+CiAgPGVsbGlwc2UgY3g9IjkxIiBjeT0iMjEwIiByeD0iMTYiIHJ5PSIxMSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE4IDkxIDIxMCkiIGZpbGw9IiM5MjU4M2YiLz4KICA8ZWxsaXBzZSBjeD0iMTY1IiBjeT0iMjEwIiByeD0iMTYiIHJ5PSIxMSIgdHJhbnNmb3JtPSJyb3RhdGUoMTggMTY1IDIxMCkiIGZpbGw9IiM5MjU4M2YiLz4KICA8ZWxsaXBzZSBjeD0iMTI4IiBjeT0iMTY1IiByeD0iNjgiIHJ5PSI2MCIgZmlsbD0idXJsKCNzaGVsbCkiIHN0cm9rZT0iIzk2NWE0MCIgc3Ryb2tlLXdpZHRoPSI0Ii8+CiAgPGVsbGlwc2UgY3g9IjEyOCIgY3k9IjEwNCIgcng9IjcyIiByeT0iNjUiIGZpbGw9InVybCgjZmFjZSkiIHN0cm9rZT0iIzk2NWE0MCIgc3Ryb2tlLXdpZHRoPSI0Ii8+CiAgPGVsbGlwc2UgY3g9IjEyOCIgY3k9IjEyNiIgcng9IjUzIiByeT0iMzYiIGZpbGw9IiNmMmM2OTciIG9wYWNpdHk9Ii43NCIvPgogIDxlbGxpcHNlIGN4PSIxMDIiIGN5PSIxMDgiIHJ4PSIxMiIgcnk9IjE3IiBmaWxsPSIjMzUyYTM3Ii8+CiAgPGVsbGlwc2UgY3g9IjE1NCIgY3k9IjEwOCIgcng9IjEyIiByeT0iMTciIGZpbGw9IiMzNTJhMzciLz4KICA8Y2lyY2xlIGN4PSI5OCIgY3k9IjEwMiIgcj0iNCIgZmlsbD0iI2ZmZiIvPgogIDxjaXJjbGUgY3g9IjE1MCIgY3k9IjEwMiIgcj0iNCIgZmlsbD0iI2ZmZiIvPgogIDxjaXJjbGUgY3g9IjEwNiIgY3k9IjExNSIgcj0iMiIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iLjY1Ii8+CiAgPGNpcmNsZSBjeD0iMTU4IiBjeT0iMTE1IiByPSIyIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuNjUiLz4KICA8ZWxsaXBzZSBjeD0iODIiIGN5PSIxMzIiIHJ4PSIxMSIgcnk9IjYiIGZpbGw9IiNlNjg0ODciIG9wYWNpdHk9Ii42MiIvPgogIDxlbGxpcHNlIGN4PSIxNzQiIGN5PSIxMzIiIHJ4PSIxMSIgcnk9IjYiIGZpbGw9IiNlNjg0ODciIG9wYWNpdHk9Ii42MiIvPgogIDxwYXRoIGQ9Ik0xMjEgMTM5UTEyOCAxNDcgMTM1IDEzOSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNzA0MjNlIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxnIHRyYW5zZm9ybT0icm90YXRlKC01IDEyOCAxODUpIj4KICAgIDxyZWN0IHg9Ijg1IiB5PSIxNTciIHdpZHRoPSI4NiIgaGVpZ2h0PSI2NCIgcng9IjEwIiBmaWxsPSIjNmE0ZGE4Ii8+CiAgICA8cmVjdCB4PSI5MCIgeT0iMTU0IiB3aWR0aD0iNzkiIGhlaWdodD0iNjQiIHJ4PSI5IiBmaWxsPSJ1cmwoI2Jvb2spIiBzdHJva2U9IiM3NDU5YjUiIHN0cm9rZS13aWR0aD0iMyIvPgogICAgPHBhdGggZD0iTTEwMyAxNTVWMjE2IiBzdHJva2U9IiNkN2NhZmEiIHN0cm9rZS13aWR0aD0iNCIvPgogICAgPHBhdGggZD0iTTEyMCAxNzhIMTUwTTEyMCAxODlIMTQzIiBzdHJva2U9IiNlZWU4ZmYiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBvcGFjaXR5PSIuODUiLz4KICAgIDxwYXRoIGQ9Ik0xMzcgMTY3TDEzOSAxNzMgMTQ1IDE3NSAxMzkgMTc3IDEzNyAxODMgMTM0IDE3NyAxMjggMTc1IDEzNCAxNzNaIiBmaWxsPSIjZmZmNGQ3Ii8+CiAgPC9nPgogIDxlbGxpcHNlIGN4PSI4NyIgY3k9IjE3OSIgcng9IjEyIiByeT0iOCIgdHJhbnNmb3JtPSJyb3RhdGUoMjcgODcgMTc5KSIgZmlsbD0iI2RmYTc3OCIgc3Ryb2tlPSIjOWY2NTQ3IiBzdHJva2Utd2lkdGg9IjMiLz4KICA8ZWxsaXBzZSBjeD0iMTY5IiBjeT0iMTc5IiByeD0iMTIiIHJ5PSI4IiB0cmFuc2Zvcm09InJvdGF0ZSgtMjcgMTY5IDE3OSkiIGZpbGw9IiNkZmE3NzgiIHN0cm9rZT0iIzlmNjU0NyIgc3Ryb2tlLXdpZHRoPSIzIi8+Cjwvc3ZnPgo=';

  // ==================== 工具 ====================
  function html2text(h){if(h===null||typeof h==='undefined')return'';var value=String(h);for(var i=0;i<3;i++){var d=document.createElement('div');d.innerHTML=value;var decoded=(d.textContent||'').replace(/\u00A0/g,' ');if(decoded===value)break;value=decoded;}return value.trim();}
  function isElementVisible(el){if(!el||!el.getClientRects||!el.getClientRects().length)return false;var style=window.getComputedStyle(el);return style.display!=='none'&&style.visibility!=='hidden';}
  function clean(s){return(s||'untitled').replace(/[<>:"/\\|?*]/g,'_').replace(/\s+/g,'_').slice(0,120);}
  function wait(ms){return new Promise(function(r){setTimeout(r,ms)})}
  function jitteredDelay(base){var j=base*0.3;return Math.round(base-j+Math.random()*j*2);}
  function notify(t){try{GM_notification({text:t,title:'莞工小蟑螂',timeout:4000})}catch(e){alert(t)}}
  function getCookie(n){for(var i=0;i<document.cookie.split(';').length;i++){var p=document.cookie.split(';')[i].trim();if(p.indexOf(n+'=')===0)return decodeURIComponent(p.slice(n.length+1));}return'';}

  // ==================== 统一定时器 ====================
  var timerRegistry={_timers:{},_id:0,set:function(fn,delay){var id=++this._id;var self=this;this._timers[id]=setTimeout(function(){delete self._timers[id];fn();},delay);return id;},clear:function(id){if(this._timers[id]){clearTimeout(this._timers[id]);delete this._timers[id];}},clearAll:function(){for(var id in this._timers){clearTimeout(this._timers[id]);}this._timers={};}};

  // 配置缓存
  var _cfgCache=null;

  // ==================== 认证 ====================
  var authHeaders={};
  var origFetch=window.fetch;
  window.fetch=function(){var url=arguments[0],opts=arguments[1]||{};if(typeof url==='string'&&(url.indexOf('/uaapi/')!==-1||url.indexOf('/utestapi/')!==-1||url.indexOf('api.ulearning.cn')!==-1)&&opts.headers){var h=opts.headers;if(h instanceof Headers){h.forEach(function(v,k){if(/auth/i.test(k))authHeaders[k]=v;});}else if(typeof h==='object'){for(var k in h){if(/auth/i.test(k))authHeaders[k]=h[k];}}}return origFetch.apply(this,arguments);};
  function getHeaders(){var h={'Content-Type':'application/json'},a='',ua='';for(var k in authHeaders){var key=k.toLowerCase();if(key==='authorization')a=authHeaders[k];else if(key==='ua-authorization')ua=authHeaders[k];}var cookieAuth=getCookie('AUTHORIZATION')||getCookie('token')||'';if(!a&&cookieAuth)a=cookieAuth.includes('.')?'Bearer '+cookieAuth:cookieAuth;if(!ua)ua=getCookie('UA_AUTHORIZATION')||getCookie('ua-authorization')||'';if(!a&&ua)a=ua;if(!ua&&a)ua=a;if(a)h.Authorization=a;if(ua)h['ua-authorization']=ua;return h;}
  var activeExportRequests={};
  var activeExportRequestId=0;
  function createApiError(message,status,retryable){var error=new Error(message);if(typeof status==='number')error.status=status;error.retryable=!!retryable;return error;}
  function getApiStage(path){if(/courseDirectory|course\/stu\/.+\/directory/i.test(path))return'获取课程目录';if(/wholepage|WholeChapterPageContent/i.test(path))return'获取章节内容';if(/answerSheet/i.test(path))return'获取答题卡';if(/questionList/i.test(path))return'获取题目列表';if(/questionTraining\/student\/answer/i.test(path))return'获取训练题答案';if(/questionAnswer/i.test(path))return'获取题目答案';return'API请求';}
  function ensureExportActive(){if(exportCancelled)throw new Error('用户取消导出');}
  async function api(method,path,body,retries,scope){
    retries=typeof retries==='number'&&isFinite(retries)?Math.max(1,Math.floor(retries)):3;
    var url=resolveApiHost()+path,fallbackUsed=false;
    var stage=getApiStage(path);
    console.log('[小蟑螂] API请求:',method,url);
    if(scope==='export')ensureExportActive();

    // 使用 GM_xmlhttpRequest 绕过 CORS，并在导出取消时释放当前请求。
    function gmRequest(opts){
      return new Promise(function(resolve,reject){
        var settled=false,trackingId=0,handle=null;
        function finish(callback,value){if(settled)return;settled=true;if(trackingId)delete activeExportRequests[trackingId];callback(value);}
        function makeOptions(){return{
          method:opts.method||'GET',
          url:opts.url,
          headers:opts.headers||{},
          data:opts.data||null,
          timeout:30000,
          onload:function(res){
            console.log('[小蟑螂] GM响应:',res.status,opts.url);
            if(res.status>=200&&res.status<300){
              try{finish(resolve,JSON.parse(res.responseText));}catch(e){var html=/^\s*(?:<!doctype|<html|<head|<body)/i.test(res.responseText||'');var parseError=createApiError(stage+'失败: '+(html?'接口返回网页，请检查登录状态或平台代理地址':'JSON解析失败')+' (HTTP '+res.status+')',res.status,false);parseError.invalidJsonResponse=true;finish(reject,parseError);}
            }else{
              var status=Number(res.status)||0;
              finish(reject,createApiError(stage+'失败: HTTP '+status,status,status===408||status===429||status>=500));
            }
          },
          onerror:function(){finish(reject,createApiError(stage+'失败: 网络错误',0,true));},
          ontimeout:function(){finish(reject,createApiError(stage+'失败: 请求超时',0,true));},
          onabort:function(){finish(reject,new Error(scope==='export'&&exportCancelled?'用户取消导出':'请求已取消'));}
        };}
        try{
          handle=GM_xmlhttpRequest(makeOptions());
          if(scope==='export'&&!settled&&handle&&typeof handle.abort==='function'){
            trackingId=++activeExportRequestId;
            activeExportRequests[trackingId]=handle;
            if(exportCancelled){
              try{handle.abort();}catch(e){}
              finish(reject,new Error('用户取消导出'));
            }
          }
        }catch(e){finish(reject,createApiError(stage+'失败: 请求启动错误',0,false));}
      });
    }

    var headers=getHeaders();
    for(var attempt=1;attempt<=retries;attempt++){
      if(scope==='export')ensureExportActive();
      try{
        var data=await gmRequest({method:method,url:url,headers:headers,data:body?JSON.stringify(body):null});
        if(scope==='export')ensureExportActive();
        console.log('[小蟑螂] 响应数据:',JSON.stringify(data).slice(0,200));
        return data;
      }catch(e){
        if(scope==='export'&&exportCancelled)throw new Error('用户取消导出');
        if(IS_DGUT&&e.invalidJsonResponse&&!fallbackUsed&&url.indexOf(location.origin)!==0){
          url=location.origin+path;
          fallbackUsed=true;
          attempt--;
          Logger.log(stage+'返回网页，改用学校同源接口重试');
          continue;
        }
        console.log('[小蟑螂] 请求异常:',e.message,'尝试:',attempt+'/'+retries);
        if(attempt>=retries||e.retryable!==true)throw e;
        await wait(Math.min(1000*attempt,3000));
      }
    }
  }
  function getAuth(){var h=getHeaders();return h['ua-authorization']||h.Authorization||'';}

  // ==================== 答案解析 ====================
  function parseAnswer(resp){if(!resp)return{text:'',values:[],typeCode:null};var d=resp.data||resp;if(!d||(!d.correctAnswerList&&!d.correctAnswer&&!d.answer&&!d.answers))return{text:'',values:[],typeCode:null};var values=[],typeCode=null;if(Array.isArray(d.correctAnswerList)&&d.correctAnswerList.length){d.correctAnswerList.forEach(function(a){var s=String(a).trim();if(s==='true')values.push('正确');else if(s==='false')values.push('错误');else{var t=html2text(s);if(t)values.push(t);}});}if(!values.length&&typeof d.correctAnswer!=='undefined'&&d.correctAnswer!==null){if(typeof d.correctAnswer==='boolean')values.push(d.correctAnswer?'正确':'错误');else if(Array.isArray(d.correctAnswer))d.correctAnswer.forEach(function(a){var t=html2text(String(a));if(t)values.push(t)});else{var t=html2text(String(d.correctAnswer));if(t)values.push(t)}}if(!values.length&&typeof d.answer!=='undefined'&&d.answer!==null){if(typeof d.answer==='boolean')values.push(d.answer?'正确':'错误');else{var t=html2text(String(d.answer));if(t)values.push(t)}}if(!values.length&&Array.isArray(d.answers))d.answers.forEach(function(a){var t=html2text(String(a));if(t)values.push(t)});if(Array.isArray(d.subQuestionAnswerDTOList)&&d.subQuestionAnswerDTOList.length){d.subQuestionAnswerDTOList.forEach(function(sub,i){var ans=Array.isArray(sub.correctAnswerList)?sub.correctAnswerList.map(function(x){return html2text(String(x))}).filter(Boolean).join(' | '):html2text(String(sub.correctAnswer||sub.correctAnswerList||''));if(ans)values.push('子题'+(i+1)+': '+ans);});}var cs=[d.questionType,d.questiontype,d.type,d.questionTypeCode,d.questionDto&&d.questionDto.questionType];for(var i=0;i<cs.length;i++){var n=Number(cs[i]);if(isFinite(n)&&n>0){typeCode=n;break;}}return{text:values.join(' | '),values:values,typeCode:typeCode};}

  function normalizeAnswerText(value){if(value===null||typeof value==='undefined')return'';if(typeof value==='boolean')return value?'true':'false';if(Array.isArray(value))return value.map(normalizeAnswerText).filter(Boolean).join(' | ');if(typeof value==='object'){var keys=['answer','correctAnswer','correctAnswerList','answerContent','content','value','text'];for(var i=0;i<keys.length;i++){if(typeof value[keys[i]]!=='undefined'&&value[keys[i]]!==null)return normalizeAnswerText(value[keys[i]]);}return'';}return html2text(String(value)).replace(/〖答案要点〗/g,'').trim();}
  function getQuizAnswers(resp){var d=resp&&typeof resp==='object'?(resp.data||resp.result||resp):null;if(!d)return[];var candidates=[d.correctAnswerList,d.correctAnswer,d.answer,d.answers],raw=null;for(var i=0;i<candidates.length;i++){var candidate=candidates[i];if(candidate!==null&&typeof candidate!=='undefined'&&(!Array.isArray(candidate)||candidate.length)){raw=candidate;break;}}if(raw===null&&Array.isArray(d.subQuestionAnswerDTOList)){raw=d.subQuestionAnswerDTOList.map(function(sub){return sub.correctAnswerList||sub.correctAnswer||sub.answer||'';});}if(typeof raw==='string'&&/^\s*[\[{]/.test(raw)){try{raw=JSON.parse(raw);}catch(e){}}if(!Array.isArray(raw))raw=[raw];return raw.reduce(function(list,item){if(Array.isArray(item))return list.concat(item.map(normalizeAnswerText).filter(Boolean));var value=normalizeAnswerText(item);if(value)list.push(value);return list;},[]);}

  // ==================== 格式化 ====================
  function formatChoiceQ(t,o,a){var ans=a.replace(/\s*\|\s*/g,'').replace(/[^A-Za-z]/g,'').toUpperCase();return{'题型':'选择题','题干':t,'选项':o,'答案':ans||a,'解析':''};}
  function formatJudgeQ(t,a){var r='';if(/^(T|对|正确|true)/i.test(a))r='正确';else if(/^(F|错|错误|false)/i.test(a))r='错误';else r=a;return{'题型':'判断题','题干':t,'答案':r,'解析':''};}
  function formatBlankQ(t,a){
    var ans=a||'';
    if(ans){
      var answers=ans.split('|').map(function(s){return s.trim()}).filter(Boolean);
      var idx=0;
      t=t.replace(/\(\s*\)|_{2,}|【\s*】|\[\s*\]/g,function(){return '{'+(answers[idx++]||'___')+'}'});
    }
    return{'题型':'填空题','题干':t,'答案':ans,'解析':''};
  }
  function formatEssayQ(t,a){return{'题型':'问答题','题干':t,'答案':a,'解析':''};}

  function formatCourseQ(q,ansData){
    var type=q.type||0,title=html2text(q.title||''),choices=q.choiceitemModels||[],ansText=ansData?ansData.text||'':'';
    if(ansData&&ansData.typeCode&&ansData.typeCode>0)type=ansData.typeCode;
    // 先按题型判断
    if(type===4)return formatJudgeQ(title,ansText);
    if(type===6)return formatEssayQ(title,ansText);
    if(type===5)return formatBlankQ(title,ansText);
    // 有选项的是选择题
    if(choices.length>=2){
      var opts=choices.map(function(c,i){return(c.option||LABELS[i]||String(i))+'. '+html2text(c.title||'');});
      return formatChoiceQ(title,opts,ansText);
    }
    // 检查是否是填空题（标题包含括号或下划线）
    if(/\(\s*\)|_{2,}|【\s*】|\[\s*\]/.test(title)){
      return formatBlankQ(title,ansText);
    }
    // 默认填空题
    return formatBlankQ(title,ansText);
  }

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
      String.raw`#xz-sel-overlay { position: fixed; inset: 0; z-index: 1000000; display: flex; align-items: center; justify-content: center; padding: 14px; background: rgba(32,40,52,.45); font: 13px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif; }
#xz-sel-overlay * { box-sizing: border-box; }
#xz-sel-box { display: flex; flex-direction: column; width: 480px; max-width: 100%; max-height: min(76vh,700px); overflow: hidden; border: 1px solid #e7eaf0; border-radius: 20px; background: #fff; color: #202834; box-shadow: 0 24px 64px rgba(32,40,52,.20); }
#xz-sel-head { display: flex; align-items: center; gap: 12px; padding: 20px 22px 17px; border-bottom: 1px solid #e7eaf0; }
#xz-sel-head .ico { width: 34px; height: 34px; flex: none; border-radius: 8px; background: #f2edff url(${LOGO_URI}) center/contain no-repeat; font-size: 0 !important; }
#xz-sel-head .txt { min-width: 0; }
#xz-sel-head .txt h3 { margin: 0; color: #202834; font-size: 17px; font-weight: 700; line-height: 1.3; overflow-wrap: anywhere; }
#xz-sel-head .txt small { display: block; margin-top: 4px; color: #687482; font-size: 11px; line-height: 1.5; }
#xz-sel-actions { display: flex; gap: 15px; padding: 10px 22px; border-bottom: 1px solid #e7eaf0; }
#xz-sel-actions button { padding: 3px 0; border: 0; background: none; color: #8065ce; font-family: inherit; font-size: 12px; font-weight: 650; line-height: 1.5; cursor: pointer; }
#xz-sel-actions button:hover { text-decoration: underline; }
#xz-sel-list { flex: 1; min-height: 0; overflow-y: auto; padding: 4px 22px; }
.xz-ch-item { display: flex; align-items: center; gap: 10px; min-height: 44px; padding: 8px 2px; border-bottom: 1px solid #e7eaf0; cursor: pointer; }
.xz-ch-item:hover { background: #f2edff; }
.xz-ch-item input[type=checkbox] { width: 16px; height: 16px; margin: 0; accent-color: #8065ce; }
.xz-ch-item .ch-name { flex: 1; min-width: 0; color: #202834; font-size: 12px; overflow-wrap: anywhere; }
.xz-ch-item .ch-count { flex: none; color: #687482; font-size: 11px; }
#xz-sel-foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 14px 22px; border-top: 1px solid #e7eaf0; }
#xz-sel-foot .info { color: #687482; font-size: 11px; }
#xz-sel-foot .btns { display: flex; gap: 8px; }
#xz-sel-foot button { min-height: 36px; padding: 6px 13px; border-radius: 999px; font-family: inherit; font-size: 12px; font-weight: 650; line-height: 1.3; cursor: pointer; transition:background-color .16s ease,box-shadow .16s ease,transform .16s ease; }
#xz-sel-foot button:not(:disabled):hover { transform:translateY(-1px); box-shadow:0 4px 11px rgba(54,42,100,.13); }
#xz-sel-foot button:not(:disabled):active { transform:scale(.98); box-shadow:none; }
#xz-sel-foot .btn-cancel { border: 1px solid #e7eaf0; background: #fff; color: #202834; }
#xz-sel-foot .btn-cancel:hover { background: #f2edff; }
#xz-sel-foot .btn-ok { border: 1px solid #8065ce; background: #8065ce; color: #fff; }
#xz-sel-foot .btn-ok:hover { background: #6e54ba; }
#xz-sel-foot .btn-ok:disabled { border-color: #e7e2f0; background: #e7e2f0; color: #77867d; cursor: not-allowed; }

#xz-sel-overlay :is(button,label) { cursor: default !important; }
#xz-sel-overlay :is(button,input):focus-visible { outline: 2px solid #8065ce; outline-offset: 2px; }
#xz-sel-overlay.xz-sel-dark { background: rgba(7,8,18,.68); }
#xz-sel-overlay.xz-sel-dark #xz-sel-box { border-color: #48465c; background: #252838; color: #f2f2fa; box-shadow:0 24px 70px rgba(4,5,14,.55); }
#xz-sel-overlay.xz-sel-dark #xz-sel-head { background:#2d2d43; }
#xz-sel-overlay.xz-sel-dark #xz-sel-head, #xz-sel-overlay.xz-sel-dark #xz-sel-actions, #xz-sel-overlay.xz-sel-dark #xz-sel-foot, #xz-sel-overlay.xz-sel-dark .xz-ch-item { border-color: #3d4256; }
#xz-sel-overlay.xz-sel-dark #xz-sel-head h3, #xz-sel-overlay.xz-sel-dark .xz-ch-item .ch-name { color: #f3f2fa; }
#xz-sel-overlay.xz-sel-dark #xz-sel-head small, #xz-sel-overlay.xz-sel-dark #xz-sel-foot .info, #xz-sel-overlay.xz-sel-dark .xz-ch-item .ch-count { color: #b8c0d1; }
#xz-sel-overlay.xz-sel-dark #xz-sel-actions button { color: #c4b0f4; }
#xz-sel-overlay.xz-sel-dark .xz-ch-item:hover { background: #34334d; }
#xz-sel-overlay.xz-sel-dark #xz-sel-foot { background:#202334; }
#xz-sel-overlay.xz-sel-dark #xz-sel-foot .btn-cancel { border-color: #5b6176; border-radius:999px; background: #303648; color: #f2f2fa; }
#xz-sel-overlay.xz-sel-dark #xz-sel-foot .btn-ok { border-color:#b79cef; border-radius:999px; background:#b79cef; color:#211d32; }
@media (max-width: 480px) { #xz-sel-box { max-height: calc(100dvh - 28px); } #xz-sel-head, #xz-sel-foot { padding-right: 16px; padding-left: 16px; } #xz-sel-actions, #xz-sel-list { padding-right: 16px; padding-left: 16px; } }`,
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
        '      <button class="btn-ok" id="xz-sel-ok">导出所选章节</button>',
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
    var courseId=getPageParam('courseId');
    var classId=getPageParam('classId');
    var isPreview=getPageParam('isPreview')==='true';
    if(!courseId)throw new Error('URL 缺少 courseId');
    if(IS_DGUT&&HOST.startsWith('lms.')&&/^#\/course\/textbook/.test(location.hash||'')){
      var textbookId=getPageParam('textbookId2');
      if(!textbookId){
        try{
          var ko=window.requirejs&&window.requirejs('knockout');
          var button=Array.from(document.querySelectorAll('button')).find(function(el){return /learnChapter/.test(el.getAttribute('data-bind')||'');});
          var context=ko&&button&&ko.contextFor(button);
          var textbook=context&&context.$component&&context.$component.currentTextbook&&context.$component.currentTextbook();
          textbookId=textbook&&typeof textbook.id==='function'?textbook.id():textbook&&textbook.id;
        }catch(e){}
      }
      if(!textbookId)throw new Error('课件列表尚未加载教材编号，请稍后重试或进入专题学习页导出');
      courseId=String(textbookId);
    }

    setStatus('正在获取课程目录...');
    console.log('[小蟑螂] 平台: '+(IS_DGUT?'DGUT':'标准优学院')+', courseId='+courseId+', classId='+(classId||'无')+', API_HOST='+API_HOST);
    var dirResp;
    if(IS_DGUT){
      console.log('[小蟑螂] 尝试DGUT API: /uaapi/course/stu/'+courseId+'/directory');
      dirResp=await api('GET','/uaapi/course/stu/'+encodeURIComponent(courseId)+'/directory'+(classId?'?classId='+encodeURIComponent(classId):''),null,undefined,'export');
    }else{
      // 标准优学院 - POST 接口
      console.log('[小蟑螂] 尝试API: POST /api/v2/learnCourse/courseDirectory');
      try{dirResp=await api('POST','/api/v2/learnCourse/courseDirectory',{courseId:courseId,classId:classId},undefined,'export');}catch(e){if(e.status===401||e.status===403)throw e;ensureExportActive();console.log('[小蟑螂] API失败:',e.message);}
      if(!dirResp||(!dirResp.success&&!dirResp.data)){
        console.log('[小蟑螂] 尝试API: POST /learnCourse/courseDirectory');
        try{dirResp=await api('POST','/learnCourse/courseDirectory',{courseId:courseId,classId:classId},undefined,'export');}catch(e){ensureExportActive();console.log('[小蟑螂] API失败:',e.message);}
      }
    }
    console.log('[小蟑螂] 目录响应:',dirResp?JSON.stringify(dirResp).slice(0,500):'null');
    if(!dirResp)throw new Error('获取课程目录失败，请查看控制台日志（F12→Console）');
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
      console.log('[小蟑螂] 获取章节:',ch.title,'nodeId='+chId);
      var chResp;
      if(IS_DGUT)chResp=await api('GET','/uaapi/wholepage/chapter/stu/'+encodeURIComponent(chId),null,undefined,'export');
      else{chResp=await api('POST','/api/v2/learnCourse/getWholeChapterPageContent',{nodeId:chId},undefined,'export');if(!chResp||!chResp.data)chResp=await api('POST','/learnCourse/getWholeChapterPageContent',{nodeId:chId},undefined,'export');}
      if(!chResp){console.log('[小蟑螂] 章节响应为空:',ch.title);continue;}
      var cd=chResp.data||chResp;
      var items=cd.wholepageItemDTOList||cd.items||[];
      console.log('[小蟑螂] 章节items数量:',items.length);
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
            console.log('[小蟑螂] 匹配成功:',chapters[ci2].title,'页面数:',sectionPages.length);
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
    console.log('[小蟑螂] 共找到 '+totalQuizPages+' 个练习页面');
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
            if(IS_DGUT){
              aResp=await api('GET','/uaapi/questionAnswer/'+encodeURIComponent(qid)+'?parentId='+encodeURIComponent(task.parentId),null,1,'export');
            }else{
              // 旧版优学院 - 使用 /questionAnswer/ 路径
              aResp=await api('GET','/questionAnswer/'+encodeURIComponent(qid)+'?parentId='+encodeURIComponent(task.parentId),null,1,'export');
            }
            if(aResp&&aResp.correctAnswerList){
              ansData={text:aResp.correctAnswerList.join(' | '),values:aResp.correctAnswerList,typeCode:q.type};
              if(i<3)console.log('[小蟑螂] 题'+(i+1)+' 答案:',ansData.text);
            }else{
              if(i<3)console.log('[小蟑螂] 题'+(i+1)+' 无答案数据:',JSON.stringify(aResp).slice(0,100));
            }
            break;
          }catch(e){
            if(exportCancelled)throw new Error('用户取消导出');
            if(e.status===401||e.status===403)throw e;
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
      ensureExportActive();
      await new Promise(function(r){setTimeout(r,0)});
    }

    result=results.filter(function(r){return r!=null});
    if(failCount)console.log('[小蟑螂] '+failCount+' 道题答案获取失败');
    setProgress(100,'提取完成');
    return{name:courseName,questions:result,failedAnswers:failCount};
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
    var sheet=await api('GET','/utestapi/questionTraining/student/answerSheet?'+new URLSearchParams(base),null,undefined,'export');
    if(!sheet||sheet.code!==1)throw new Error('获取答题卡失败');
    var sheetList=(sheet.result&&sheet.result.list)||[];
    var total=Number((sheet.result&&sheet.result.total)||sheetList.length);
    var pages=Math.ceil(total/30)||1;
    var allQ=[];
    for(var p=1;p<=pages;p++){
      if(exportCancelled)throw new Error('用户取消导出');
      setProgress(Math.round(p/pages*60),'获取题目 '+p+'/'+pages+'...');
      var resp=await api('GET','/utestapi/questionTraining/student/questionList?'+new URLSearchParams(Object.assign({},base,{pn:p,ps:30})),null,undefined,'export');
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
          var aResp=await api('POST','/utestapi/questionTraining/student/answer?traceId='+userId,{qtId:Number(qtId),qtType:Number(qtType),index:i,relationId:qid,answer:dummy},1,'export');
          var ca=aResp.result&&aResp.result.correctAnswer;
          correctMap[qid]=Array.isArray(ca)?ca.map(String):[];
          break;
        }catch(e){
          if(exportCancelled)throw new Error('用户取消导出');
          if(e.status===401||e.status===403)throw e;
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
      ensureExportActive();
      await new Promise(function(r){setTimeout(r,0)});
    }
    allQ.forEach(function(q){if(correctMap[q.id])q.userAnswer=correctMap[q.id];});
    setProgress(100,'提取完成');
    return{name:'题库训练_'+qtId,questions:allQ.map(formatTrainQ).filter(Boolean),failedAnswers:Math.max(0,tTotal-Object.keys(correctMap).length)};
  }

  // ==================== 自动刷课 ====================

  // 配置持久化
  var CFG_KEY = 'xz_autocfg';
  function loadCfg(){try{return JSON.parse(localStorage.getItem(CFG_KEY))||{};}catch(e){return{};}}
  function saveCfg(c){localStorage.setItem(CFG_KEY,JSON.stringify(c));_cfgCache=c;}

  var autoState = {
    paused: true,
    preloading: false,
    navigating: false,
    answerInProgress: false,
    runId: 0,
    navigationReady: false,
    navigationBlockedSignature: '',
    currentQuestionIds: [],
    retry: 0,
    startTime: 0,
    pagesDone: 0,
    questionsDone: 0,
    questionsCorrect: 0,
    courseProgress: null,
    lastAnsweredSignature: '',
    pauseReason: '',
    lastActivityAt: 0
  };
  var NAVIGATION_CONFIRM_TIMEOUT_MS=20000;

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
    answerDelay: 500
  };

  function getCfg(){if(!_cfgCache){_cfgCache=loadCfg();for(var k in defaultCfg){if(typeof _cfgCache[k]==='undefined')_cfgCache[k]=defaultCfg[k];}}return _cfgCache;}
  function refreshCfg(){_cfgCache=null;return getCfg();}

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

  function getCurrentPageSignature(){
    var pageId='',pageTitle='',pageIndex=-1;
    var items=document.querySelectorAll('.page-item');
    for(var i=0;i<items.length;i++){
      var name=items[i].querySelector('.page-name');
      if(name&&name.classList&&name.classList.contains('active')){
        pageId=items[i].id||'';
        pageTitle=html2text(name.textContent);
        pageIndex=i;
        break;
      }
    }
    var questions=Array.from(document.querySelectorAll('.question-wrapper')).map(function(el){
      var title=el.querySelector('.question-title, .question-title-text, .question-stem, .stem');
      return (el.id||'')+':'+(title?html2text(title.textContent).slice(0,180):'');
    }).join(',');
    var videoSources=Array.from(document.querySelectorAll('video')).map(function(v){return v.currentSrc||v.src||'';}).join(',');
    return[location.href,pageIndex,pageId,pageTitle,questions,videoSources].join('|');
  }

  // 只用能代表学习页的稳定标识确认翻页。视频源或加载占位变化不能算成功。
  function getNavigationMarker(){
    var active=null;
    var items=document.querySelectorAll('.page-item');
    for(var i=0;i<items.length;i++){
      var name=items[i].querySelector('.page-name');
      if(name&&name.classList.contains('active')){
        active=[i,items[i].id||'',html2text(name.textContent)];
        break;
      }
    }
    var questions=Array.from(document.querySelectorAll('.question-wrapper')).map(function(el){
      var title=el.querySelector('.question-title, .question-title-text, .question-stem, .stem');
      return(el.id||'')+':'+(title?html2text(title.textContent).slice(0,180):'');
    }).filter(function(item){return item!==':';}).join(',');
    return {route:location.href,page:active?active.join('|'):'',questions:questions};
  }
  function hasConfirmedNavigation(before,after){
    if(after.page&&after.page!==before.page)return true;
    if(after.questions&&after.questions!==before.questions)return true;
    return after.route!==before.route&&!!(after.page||after.questions);
  }

  // 视频状态跟踪
  var _videoStates = [];
  var _noVideoTimerId = null;
  var _videoCheckTimerId = null;
  var _nextPageTimerId = null;
  var _videoObserver = null;
  var _videoObserverTarget = null;
  var _modalRetryTimerId = null;
  var _lastStatAdvanceAt = 0;
  function resetVideoTracking(){
    if(_videoCheckTimerId){timerRegistry.clear(_videoCheckTimerId);_videoCheckTimerId=null;}
    if(_noVideoTimerId){timerRegistry.clear(_noVideoTimerId);_noVideoTimerId=null;}
    _videoStates=[];
  }
  function pauseAutoFlow(reason){
    autoState.runId++;
    autoState.paused=true;
    autoState.preloading=false;
    autoState.navigating=false;
    autoState.answerInProgress=false;
    autoState.navigationReady=false;
    autoState.pauseReason=reason||'已暂停';
    timerRegistry.clearAll();
    _nextPageTimerId=null;
    _modalRetryTimerId=null;
    resetVideoTracking();
    stopAntiIdle();
    updateAutoUI();
    updateAutoProgress();
    Logger.warn(autoState.pauseReason);
    notify(autoState.pauseReason);
  }
  function scheduleVideoCheck(){
    if(_videoCheckTimerId||autoState.paused)return;
    _videoCheckTimerId=timerRegistry.set(function(){_videoCheckTimerId=null;videoCtrl();},1000);
  }
  function getActiveVideos(){return Array.from(document.querySelectorAll('video')).filter(isElementVisible);}

  // 章节容器被整块替换时重新绑定观察目标。
  function setupVideoObserver() {
    var target = document.querySelector('.course-container') || document.querySelector('#course-container') || document.body;
    if(_videoObserver&&_videoObserverTarget===target&&target.isConnected)return;
    if(_videoObserver)_videoObserver.disconnect();
    _videoObserverTarget=target;
    var lastUrl = location.href;
    _videoObserver = new MutationObserver(function() {
      if (autoState.paused || autoState.navigating) return;
      // 检测 URL 变化（用户手动切页面），重置答题状态
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        autoState.runId++;
        autoState.answerInProgress = false;
        autoState.navigationReady = false;
        autoState.navigationBlockedSignature = '';
        autoState.currentQuestionIds = [];
        resetVideoTracking();
        Logger.log('检测到页面切换，重置状态');
      }
      if (autoState.answerInProgress) return;
      autoProcessVideos();
      autoCheckModals();
    });
    _videoObserver.observe(target, { childList: true, subtree: true });
  }

  function autoProcessVideos() {
    if (autoState.paused || autoState.navigating || autoState.answerInProgress) return;
    var cfg = getCfg();
    if (!cfg.autoPlay) return;

    var videos = getActiveVideos();
    if (videos.length === 0) {
      if(_videoCheckTimerId){timerRegistry.clear(_videoCheckTimerId);_videoCheckTimerId=null;}
      _videoStates=[];
      if (_noVideoTimerId) return;
      Logger.log('当前页无视频，'+cfg.stayTime+' 秒后翻页');
      _noVideoTimerId = timerRegistry.set(function(){ _noVideoTimerId = null; autoGoNext(); }, cfg.stayTime * 1000);
      return;
    }
    if(_noVideoTimerId){timerRegistry.clear(_noVideoTimerId);_noVideoTimerId=null;}

    // 页面可能用新 video 节点替换旧节点，但数量不变。
    if (_videoStates.length !== videos.length || Array.from(videos).some(function(v,i){return _videoStates[i].ele!==v;})) {
      if(_videoCheckTimerId){timerRegistry.clear(_videoCheckTimerId);_videoCheckTimerId=null;}
      _videoStates = [];
      videos.forEach(function(v) {
        var state={ele:v,status:!!v.ended,lastTime:v.currentTime||0,lastProgressAt:Date.now(),lastPlayAttemptAt:0,lastWarningAt:0,stallRetries:0};
        _videoStates.push(state);
        v.addEventListener('ended',function(){state.status=true;autoProcessVideos();},{once:true});
      });
      Logger.log('检测到 '+videos.length+' 个视频，开始跟踪当前页面');
    }

    // 检查 data-bind 属性判断完成状态
    var statusIndicators = Array.from(document.querySelectorAll('.video-bottom span:first-child')).filter(isElementVisible);
    if (statusIndicators.length > 0 && statusIndicators.length === videos.length) {
      videos.forEach(function(v, i) {
        if (i < _videoStates.length) {
          var bind = statusIndicators[i].getAttribute('data-bind') || '';
          if (bind.includes('finished')) {
            _videoStates[i].status = true;
          }
        }
      });
    }

    videoCtrl();
  }

  function videoCtrl() {
    if (autoState.paused || autoState.navigating || autoState.answerInProgress) return;
    var cfg = getCfg();

    // 视频节点变化时重新初始化，避免继续操作已经离开页面的节点。
    var videos = getActiveVideos();
    if (videos.length !== _videoStates.length || Array.from(videos).some(function(v,i){return _videoStates[i].ele!==v;})) {
      autoProcessVideos();
      return;
    }

    // 找到第一个未完成的视频
    for (var i = 0; i < _videoStates.length; i++) {
      var vs = _videoStates[i];
      if (!vs.status) {
        var v = vs.ele;
        if(v.ended){vs.status=true;continue;}
        if (cfg.autoMute && !v.muted) v.muted = true;
        if (v.playbackRate !== cfg.rate) {try{v.playbackRate = cfg.rate;}catch(e){}}

        if(v.currentTime>vs.lastTime+0.05){vs.lastTime=v.currentTime;vs.lastProgressAt=Date.now();vs.stallRetries=0;autoState.lastActivityAt=Date.now();}
        var stalled=Date.now()-vs.lastProgressAt>12000;
        if(v.paused||stalled){
          if(stalled){
            vs.stallRetries++;
            if(vs.stallRetries>=4){pauseAutoFlow('视频连续 4 次未播放或进度未变化，自动流程已暂停');return;}
            try{v.currentTime=Math.max(0,v.currentTime-3);}catch(e){}
            vs.lastTime=v.currentTime;
            vs.lastProgressAt=Date.now();
            Logger.log('视频进度超过 12 秒未变化，回退 3 秒重试');
          }
          if(Date.now()-vs.lastPlayAttemptAt>=3000){
            vs.lastPlayAttemptAt=Date.now();
            try{
              var playResult=v.play();
              if(playResult&&typeof playResult.catch==='function')playResult.catch(function(e){
                if(Date.now()-vs.lastWarningAt>10000){vs.lastWarningAt=Date.now();Logger.warn('视频播放未启动：'+(e&&e.message||e));}
              });
            }catch(e){
              if(Date.now()-vs.lastWarningAt>10000){vs.lastWarningAt=Date.now();Logger.warn('视频播放失败：'+(e.message||e));}
            }
          }
        }
        scheduleVideoCheck();
        return;
      }
    }

    // 所有视频都完成了，翻页
    if(!_nextPageTimerId){Logger.log('所有视频播放完毕，' + cfg.stayTime + ' 秒后翻页');scheduleAutoGoNext(cfg.stayTime * 1000);}
  }

  function advanceStatModal() {
    var statModal=document.getElementById('statModal');
    if(!isElementVisible(statModal))return false;
    var forward=Array.from(statModal.querySelectorAll('button[data-bind*="goNextPage"]')).find(function(btn){
      return isElementVisible(btn)&&!btn.disabled&&btn.getAttribute('aria-disabled')!=='true';
    });
    if(!forward)return true;
    if(Date.now()-_lastStatAdvanceAt<1500)return true;
    _lastStatAdvanceAt=Date.now();
    Logger.log('检测到章节统计页，继续下一页');
    try{forward.click();}catch(e){Logger.warn('章节统计页继续失败：'+(e&&e.message||e));}
    return true;
  }

  function autoCheckModals() {
    if (autoState.paused) return;
    var cfg = getCfg();

    if(advanceStatModal())return;

    // 处理 alertModal — 和参考脚本逻辑对齐
    var alertModal = document.getElementById('alertModal');
    if (isElementVisible(alertModal)) {
      var modalActions=Array.from(alertModal.querySelectorAll('.modal-operation button, .modal-operation a, .modal-operation .btn-hollow')).filter(isElementVisible);
      var stayAction=modalActions.find(function(btn){return /^(留在本页|stay on this page)$/i.test((btn.textContent||'').replace(/\s+/g,' ').trim());});
      var dismissAction=modalActions.find(function(btn){return /^(知道了|继续学习|got it|continue study)$/i.test((btn.textContent||'').replace(/\s+/g,' ').trim());});
      var safeAction=stayAction||dismissAction;
      if(safeAction){
        try{safeAction.click();}catch(e){Logger.warn('关闭提示弹窗失败：'+(e&&e.message||e));}
        if(stayAction)Logger.log('检测到未完成题离页确认，留在当前页');
      }else{
        Logger.warn('检测到无法识别的提示弹窗，为避免误提交或离开当前题目，自动流程已暂停');
        pauseAutoFlow('提示弹窗操作无法识别，请手动检查当前页面');
        return;
      }
      // 留在题目页后再处理练习；关闭通知后继续原流程。
      if (cfg.autoAnswer && !_modalRetryTimerId) {
        _modalRetryTimerId=timerRegistry.set(function(){_modalRetryTimerId=null;autoCheckModals();},500);
      }
      return;
    }

    if (autoState.answerInProgress || autoState.navigating) return;
    var questionPanel = document.querySelector('.question-wrapper');
    if (questionPanel && cfg.autoAnswer) { autoAnswerQuiz(); return; }
  }

  function autoAnswerQuiz() {
    if (autoState.paused || autoState.answerInProgress) return;
    var cfg = getCfg();
    if (!cfg.autoAnswer) return;
    var pageSignature = getCurrentPageSignature();
    var initialPanels = Array.from(document.querySelectorAll('.question-wrapper'));
    var panels = initialPanels.filter(isElementVisible);
    var operationAreas = Array.from(document.querySelectorAll('.question-operation-area')).filter(function(area){return !area.closest('.modal,[role="dialog"]');});
    var initialSubmitButtons = Array.from(document.querySelectorAll('.btn-submit')).filter(function(button){return !button.closest('.modal,[role="dialog"]');});
    var multipleExerciseGroups = operationAreas.length > 1 || initialSubmitButtons.filter(isElementVisible).length > 1;
    function unfinishedPanels(includeHidden){
      return Array.from(document.querySelectorAll('.question-wrapper')).filter(function(panel){
        return !panel.classList.contains('finished') && (includeHidden || isElementVisible(panel));
      });
    }
    function waitForLateExerciseGroups(quietMs){
      if(autoState.answerInProgress)return;
      var waitRunId=autoState.runId,startedAt=Date.now(),clearSince=0;
      autoState.answerInProgress=true;
      autoState.navigationReady=false;
      autoState.navigationBlockedSignature=pageSignature;
      Logger.log('检测到练习组状态未稳定，等待延迟出现的题组后再翻页');
      function poll(){
        if(autoState.paused||autoState.runId!==waitRunId||getCurrentPageSignature()!==pageSignature){
          if(autoState.runId===waitRunId)autoState.answerInProgress=false;
          return;
        }
        var visiblePending=unfinishedPanels(false);
        if(visiblePending.length){
          autoState.answerInProgress=false;
          autoState.navigationBlockedSignature='';
          autoState.lastAnsweredSignature='';
          autoAnswerQuiz();
          return;
        }
        if(unfinishedPanels(true).length){
          clearSince=0;
        }else{
          if(!clearSince)clearSince=Date.now();
          if(Date.now()-clearSince>=quietMs){
            autoState.answerInProgress=false;
            autoState.navigationBlockedSignature='';
            autoState.lastAnsweredSignature=pageSignature;
            autoState.lastActivityAt=Date.now();
            if(cfg.autoNext){autoState.navigationReady=true;scheduleAutoGoNext(600);}
            else{autoState.navigationReady=false;pauseAutoFlow('当前页练习已完成，请手动翻页');}
            return;
          }
        }
        if(Date.now()-startedAt>=9000){
          autoState.answerInProgress=false;
          autoState.navigationBlockedSignature=pageSignature;
          pauseAutoFlow('存在尚未显示或未完成的练习组，等待超时；已停止自动翻页');
          return;
        }
        timerRegistry.set(poll,150);
      }
      timerRegistry.set(poll,150);
    }
    if (autoState.lastAnsweredSignature === pageSignature && !unfinishedPanels(true).length) return;
    if (!panels.length) {
      if(unfinishedPanels(true).length)waitForLateExerciseGroups(500);
      return;
    }
    // 已完成的题目页只允许前进，不能再次填答或要求不存在的提交按钮。
    if(panels.every(function(panel){return panel.classList.contains('finished');})){
      if(unfinishedPanels(true).length){waitForLateExerciseGroups(multipleExerciseGroups?3000:500);return;}
      if(multipleExerciseGroups){waitForLateExerciseGroups(3000);return;}
      autoState.lastAnsweredSignature=pageSignature;
      autoState.lastActivityAt=Date.now();
      Logger.log('当前页题目已完成，跳过重复提交');
      if(cfg.autoNext)scheduleAutoGoNext(Math.max(500,cfg.stayTime*1000));
      else pauseAutoFlow('当前页题目已完成，请手动翻页');
      return;
    }
    var pageItems = document.querySelectorAll('.page-item');
    var parentId = '';

    pageItems.forEach(function(item) {
      var pn = item.querySelector('.page-name');
      if (pn && pn.classList && pn.classList.contains('active')) {
        var id = item.getAttribute('id') || '';
        var ids = id.match(/\d+/g);
        parentId = ids && ids.length ? ids[ids.length - 1] : id;
      }
    });

    // 兜底：从 URL 参数取 courseId/chapterId
    if (!parentId) {
      parentId = getPageParam('chapterId') || '';
    }

    var answerPanels = panels.filter(function(p){return !p.classList.contains('finished');});
    var qIds = [];
    answerPanels.forEach(function(p) {
      var id = p.getAttribute('id') || '';
      if (id.startsWith('question')) qIds.push(id.replace('question', ''));
    });
    qIds = qIds.filter(function(v, i, a) { return a.indexOf(v) === i; });
    autoState.currentQuestionIds = qIds.slice();
    if (!qIds.length) {
      Logger.log('题目编号未知 处理失败 [阶段: 题目编号]：检测到题目区域，但题目编号尚未加载；暂不提交或翻页');
      autoState.navigationBlockedSignature = pageSignature;
      return;
    }
    if (!parentId) {
      Logger.log('题目 ' + qIds.join(',') + ' 处理失败 [阶段: 页面编号]：无法识别当前练习页面编号；暂不请求答案');
      autoState.navigationBlockedSignature = pageSignature;
      return;
    }

    autoState.answerInProgress = true;
    var answerRunId = autoState.runId;
    function answerRunActive(){return !autoState.paused && autoState.runId===answerRunId && getCurrentPageSignature()===pageSignature;}
    autoState.navigationReady = false;
    Logger.log('检测到测验，开始处理 ' + qIds.length + ' 道题...');
    var idx = 0;
    var failed = [];
    async function next() {
      if (!answerRunActive()) { if(autoState.runId===answerRunId)autoState.answerInProgress = false; return; }
      if (idx >= qIds.length) {
        autoState.lastAnsweredSignature = pageSignature;
        if (failed.length) {
          Logger.log('有题目未能确认填入（' + failed.join(', ') + '），已停止自动提交和翻页，请检查后手动处理');
          autoState.navigationBlockedSignature = pageSignature;
          pauseAutoFlow('题目 '+failed.join(', ')+' 填入失败，自动流程已暂停');
          return;
        }
        autoState.navigationBlockedSignature = '';
        autoState.navigationReady = false;
        Logger.log(qIds.length + ' 道题均已填入');
        var cfg2 = getCfg();
        timerRegistry.set(async function() {
          if (!answerRunActive()) { if(autoState.runId===answerRunId)autoState.answerInProgress = false; return; }
          if (!cfg2.autoSubmit) {
            Logger.log('自动提交已关闭，答案保留在页面供检查');
            pauseAutoFlow('答案待手动检查与提交，自动流程已暂停');
            return;
          }
          function pendingQuestions(scope,includeHidden){
            scope=scope||document;
            return Array.from(scope.querySelectorAll('.question-wrapper')).filter(function(panel){return !panel.classList.contains('finished')&&(includeHidden||isElementVisible(panel));});
          }
          function hiddenPendingQuestions(){return pendingQuestions(document,true).filter(function(panel){return !isElementVisible(panel);});}
          function submitScope(button){
            var scope=button.parentElement;
            while(scope&&!scope.querySelector('.question-wrapper'))scope=scope.parentElement;
            return scope;
          }
          function availableSubmitButtons(){return Array.from(document.querySelectorAll('.btn-submit')).filter(function(btn){
            if(!isElementVisible(btn)||btn.closest('.modal,[role="dialog"]')||btn.disabled||btn.getAttribute('aria-disabled')==='true'||btn.classList.contains('disabled'))return false;
            var scope=submitScope(btn);
            if(scope&&scope.querySelectorAll('.btn-submit').length===1){return Array.from(scope.querySelectorAll('.question-wrapper')).some(function(panel){return isElementVisible(panel)&&!panel.classList.contains('finished');});}
            return true;
          });}
          function hasNewExercisePanels(pending){return pending.some(function(panel){return answerPanels.indexOf(panel)===-1;});}
          function continueNewExercise(){
            autoState.answerInProgress=false;
            autoState.navigationReady=false;
            autoState.lastAnsweredSignature='';
            autoState.currentQuestionIds=[];
            Logger.log('本页出现另一组待答练习，继续处理后再翻页');
            timerRegistry.set(function(){if(!autoState.paused)autoAnswerQuiz();},500);
          }
          if(!availableSubmitButtons().length){
            Logger.log('题目 '+qIds.join(',')+' 处理失败 [阶段: 提交按钮]：未找到可用按钮；答案保留在页面');
            pauseAutoFlow('未找到提交按钮，自动流程已暂停');
            return;
          }
          var clickedButtons=new Set(),submitCount=0,deadline=Date.now()+9000,noPendingSince=0;
          var multipleExerciseGroups=Array.from(document.querySelectorAll('.question-operation-area')).filter(function(area){return !area.closest('.modal,[role="dialog"]');}).length>1
            ||Array.from(document.querySelectorAll('.btn-submit')).filter(function(button){return !button.closest('.modal,[role="dialog"]')&&isElementVisible(button);}).length>1;
          var completionQuietMs=multipleExerciseGroups?3000:600;
          while(Date.now()<deadline){
            if(autoState.paused||autoState.runId!==answerRunId)return;
            var pending=pendingQuestions();
            if(hasNewExercisePanels(pending)){continueNewExercise();return;}
            if(!pending.length){
              if(hiddenPendingQuestions().length){noPendingSince=0;await wait(150);continue;}
              if(!noPendingSince)noPendingSince=Date.now();
              if(Date.now()-noPendingSince>=completionQuietMs)break;
              await wait(150);
              continue;
            }
            noPendingSince=0;
            var submitBtn=availableSubmitButtons().find(function(btn){return !clickedButtons.has(btn);});
            if(!submitBtn){await wait(350);continue;}
            var scopedPanels=Array.from((submitScope(submitBtn)||document).querySelectorAll('.question-wrapper')).filter(function(panel){return isElementVisible(panel)&&!panel.classList.contains('finished');});
            var hasSingleButtonScope=!!submitScope(submitBtn)&&submitScope(submitBtn).querySelectorAll('.btn-submit').length===1;
            clickedButtons.add(submitBtn);
            try{submitBtn.click();submitCount++;Logger.log('已提交第 '+submitCount+' 组练习，等待完成状态');}
            catch(e){Logger.log('题目 '+qIds.join(',')+' 处理失败 [阶段: 提交执行]：'+(e.message||e));pauseAutoFlow('提交执行失败，自动流程已暂停');return;}
            if(hasSingleButtonScope&&scopedPanels.length){
              while(Date.now()<deadline){
                if(autoState.paused||autoState.runId!==answerRunId)return;
                var groupPending=scopedPanels.filter(function(panel){return panel.isConnected&&isElementVisible(panel)&&!panel.classList.contains('finished');});
                if(!groupPending.length){
                  var newlyPending=pendingQuestions();
                  if(hasNewExercisePanels(newlyPending)){continueNewExercise();return;}
                  break;
                }
                await wait(150);
              }
            }else{
              await wait(700);
            }
          }
          if(autoState.paused||autoState.runId!==answerRunId)return;
          var remaining=pendingQuestions();
          if(remaining.length){
            if(hasNewExercisePanels(remaining)){continueNewExercise();return;}
            Logger.log('题目 '+qIds.join(',')+' 处理失败 [阶段: 提交确认]：仍有 '+remaining.length+' 道题未显示完成，已停止自动翻页');
            pauseAutoFlow('本页练习尚未全部完成，请检查提交结果');
            return;
          }
          var hiddenRemaining=hiddenPendingQuestions();
          if(hiddenRemaining.length){
            Logger.log('题目 '+qIds.join(',')+' 处理失败 [阶段: 提交确认]：仍有 '+hiddenRemaining.length+' 道隐藏练习题未完成，已停止自动翻页');
            pauseAutoFlow('发现隐藏的未完成练习组，已停止自动翻页');
            return;
          }
          if(!submitCount){
            Logger.log('题目 '+qIds.join(',')+' 处理失败 [阶段: 提交按钮]：未找到可用按钮；答案保留在页面');
            pauseAutoFlow('未找到提交按钮，自动流程已暂停');
            return;
          }
          autoState.lastActivityAt=Date.now();
          if(cfg2.autoNext){autoState.navigationReady=true;scheduleAutoGoNext(2000);}
          else{autoState.navigationReady=false;autoState.answerInProgress=false;}
        }, 1000);
        return;
      }

      var qId = qIds[idx];
      var path = (IS_DGUT ? '/uaapi/questionAnswer/' : '/questionAnswer/') + encodeURIComponent(qId) + '?parentId=' + encodeURIComponent(parentId);
      var filled = false;
      var failureStage = '答案请求';
      var errorText = '接口未返回答案';
      for (var attempt = 1; attempt <= 2 && !filled; attempt++) {
        try {
          failureStage = '答案请求';
          var response = await api('GET', path, null, 1);
          if(!answerRunActive()){if(autoState.runId===answerRunId)autoState.answerInProgress=false;return;}
          failureStage = '答案解析';
          var answers = getQuizAnswers(response);
          if (!answers.length) throw new Error('接口未返回可用答案');
          failureStage = '答案写入';
          if (!(await autoFillAnswer(qId, answers))) throw new Error('答案未能写入题目');
          if(!answerRunActive()){if(autoState.runId===answerRunId)autoState.answerInProgress=false;return;}
          filled = true;
          autoState.lastActivityAt=Date.now();
          Logger.log('题目 ' + qId + ' 已填入');
        } catch (e) {
          if(!answerRunActive()){if(autoState.runId===answerRunId)autoState.answerInProgress=false;return;}
          errorText = e && e.message ? e.message : String(e);
          if (attempt < 2) await wait(500 * attempt);
        }
      }
      if (!filled) {
        failed.push(qId);
        Logger.log('题目 ' + qId + ' 处理失败 [阶段: ' + failureStage + ']：' + errorText);
      }
      await wait(jitteredDelay(getCfg().answerDelay || 500));
      if(!answerRunActive()){if(autoState.runId===answerRunId)autoState.answerInProgress=false;return;}
      idx++;
      next();
    }
    next();
  }

  // 选择题：正确答案用ko内部属性绑定，而非只click
  function _hasSelectedMarker(el) {
    if (!el) return false;
    var nodes = [el];
    if (el.querySelectorAll) nodes = nodes.concat(Array.from(el.querySelectorAll('*')));
    return nodes.some(function(node) {
      if (node.matches && node.matches('input[type="radio"], input[type="checkbox"]') && node.checked) return true;
      if (node.getAttribute && (node.getAttribute('aria-checked') === 'true' || node.getAttribute('aria-pressed') === 'true')) return true;
      var classes = node.classList ? Array.from(node.classList) : [];
      return classes.some(function(name) { return /(^|[-_])(active|selected|checked|chosen|choose|on)([-_]|$)/i.test(name); });
    });
  }

  async function _koClick(el) {
    if (!el) return false;
    // 优先点原生控件，等页面状态更新后确认确实选中。
    var input = el.matches && el.matches('input[type="radio"], input[type="checkbox"]') ? el : el.querySelector('input[type="radio"], input[type="checkbox"]');
    if (input) {
      if (input.disabled) return false;
      if (!input.checked) input.click();
      await wait(50);
      return input.checked;
    }
    if (_hasSelectedMarker(el)) return true;
    var target = el.querySelector('.checkbox, .option-checkbox, .radio') || el;
    target.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true}));
    target.dispatchEvent(new Event('change', {bubbles: true}));
    await wait(50);
    return _hasSelectedMarker(el);
  }

  function _koSetValue(el, val) {
    if (!el) return false;
    if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
      var proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
      var descriptor = Object.getOwnPropertyDescriptor(proto, 'value');
      if (descriptor && descriptor.set) descriptor.set.call(el, val);
      else el.value = val;
    } else if (el.isContentEditable) el.textContent = val;
    else if ('value' in el) el.value = val;
    else return false;
    el.dispatchEvent(new Event('input', {bubbles:true}));
    el.dispatchEvent(new Event('change', {bubbles:true}));
    // jQuery trigger — ULearning 用 Knockout.js，jQuery trigger 最可靠
    try {
      if (typeof $ !== 'undefined' && $.fn && $.fn.trigger) {
        $(el).trigger('change').trigger('input');
      }
    } catch(e) {}
    // Knockout.js 原生 API
    try {
      if (typeof ko !== 'undefined') {
        var ctx = ko.contextFor(el);
        if (ctx && ctx.$data && typeof ctx.$data.value === 'function') {
          ctx.$data.value(val);
        }
      }
    } catch(e) {}
    return String(el.isContentEditable ? el.textContent : el.value) === String(val);
  }

  async function autoFillAnswer(qId, answers) {
    // 部分课件会在同一页的多个练习组复用题目 ID；答案接口按 ID 请求一次，页面上的每个待答实例都要填写。
    var matchingPanels = Array.from(document.querySelectorAll('.question-wrapper')).filter(function(panel) {
      return panel.id === 'question' + qId && isElementVisible(panel) && !panel.classList.contains('finished');
    });
    if (!matchingPanels.length) { Logger.log('找不到待答题目容器: #question' + qId); return false; }
    var allFilled = true;
    for (var panelIndex = 0; panelIndex < matchingPanels.length; panelIndex++) {
      if (!(await autoFillAnswerInPanel(matchingPanels[panelIndex], qId, answers))) allFilled = false;
    }
    return allFilled;
  }

  async function autoFillAnswerInPanel(el, qId, answers) {
    if (!Array.isArray(answers)) answers = [normalizeAnswerText(answers)];
    answers = answers.map(normalizeAnswerText).filter(function(a){return a!=='';});
    if (!answers.length) return false;
    var typeTag = el.querySelector('.question-type-tag');
    var typeText = typeTag ? typeTag.textContent.trim() : '';
    Logger.log('题目容器找到, 类型标签: "' + typeText + '"');

    var accuracy = getTargetAccuracy();
    var shouldAnswerCorrect = Math.random() < accuracy;

    if (typeText.includes('选')) {
      var opts = el.querySelectorAll('.choice-item, .option-item, .question-option');
      if (!opts.length) return false;
      var answerLetters = [];
      var answerTexts = answers.map(function(a){return normalizeAnswerText(a).toLocaleLowerCase();});
      answers.forEach(function(answer){
        var value = normalizeAnswerText(answer).toUpperCase().trim();
        if (/^[A-J\s,，、;；|]+$/.test(value)) {
          var found = value.match(/[A-J]/g) || [];
          answerLetters = answerLetters.concat(found);
        } else {
          var prefix = value.match(/^([A-J])(?:\b|[.。．、，:：)）\s])/);
          if (prefix) answerLetters.push(prefix[1]);
        }
      });
      var correctOpts = [];
      opts.forEach(function(opt) {
        var label = opt.querySelector('.option, .option-letter') || opt.querySelector('span:first-child');
        var letter = label ? normalizeAnswerText(label.textContent).toUpperCase().replace(/[.。．、，:：)）\s]/g, '') : '';
        var optionText = normalizeAnswerText(opt.textContent).toLocaleLowerCase();
        if (label) {
          var labelText = normalizeAnswerText(label.textContent).toLocaleLowerCase();
          if (labelText && optionText.indexOf(labelText) === 0) optionText = optionText.slice(labelText.length).trim();
        }
        var textMatch = answerTexts.some(function(a){return a===optionText;});
        if ((letter && answerLetters.indexOf(letter) !== -1) || textMatch) correctOpts.push(opt);
      });
      if (!correctOpts.length) return false;
      var isMultiple = /多选|不定项|多项/.test(typeText);
      var candidates = shouldAnswerCorrect ? correctOpts : Array.from(opts).filter(function(opt){return correctOpts.indexOf(opt)===-1;});
      if (!candidates.length) return false;
      if (!shouldAnswerCorrect || !isMultiple) candidates = [candidates[Math.floor(Math.random()*candidates.length)]];
      var clicked = 0;
      for (var ci = 0; ci < candidates.length; ci++) { if (await _koClick(candidates[ci])) clicked++; }
      if (clicked) { autoState.questionsDone++; if(shouldAnswerCorrect)autoState.questionsCorrect++; return true; }
      return false;
    } else if (typeText.includes('判断')) {
      var judge = normalizeAnswerText(answers[0]).toLowerCase();
      var isTrue = /^(true|1|a|对|正确|是|yes|√)$/.test(judge);
      var isFalse = /^(false|0|b|错|错误|否|no|×)$/.test(judge);
      if (!isTrue && !isFalse) return false;
      var isCorrect = shouldAnswerCorrect ? isTrue : isFalse;
      var btn = el.querySelector(isCorrect ? '.right-btn' : '.wrong-btn');
      if (btn) {
        if (!(await _koClick(btn))) return false;
        autoState.questionsDone++; if(shouldAnswerCorrect)autoState.questionsCorrect++;
        return true;
      }
      return false;
    } else if (typeText.includes('填空')) {
      // .blank-input may be a container around an input; count editable fields only.
      var inputs = el.querySelectorAll('textarea, input[type="text"], input:not([type]), [contenteditable="true"]');
      if (!inputs.length) return false;
      if (inputs.length > 1 && answers.length === 1) {
        var split = answers[0].split(/\s*(?:\|\||\||;|；|\n)\s*/).filter(Boolean);
        if (split.length === inputs.length) answers = split;
      }
      if (answers.length !== inputs.length) return false;
      var allSet = true;
      for (var i = 0; i < inputs.length; i++) {
        var val = shouldAnswerCorrect ? normalizeAnswerText(answers[i]) : '略';
        if (!_koSetValue(inputs[i], val) || !String(inputs[i].isContentEditable ? inputs[i].textContent : inputs[i].value || '').trim()) allSet = false;
      }
      if (allSet) { autoState.questionsDone++; if(shouldAnswerCorrect)autoState.questionsCorrect++; }
      return allSet;
    } else if (typeText.includes('问答') || typeText.includes('简答') || typeText.includes('论述') || typeText.includes('综合')) {
      var textareas = el.querySelectorAll('textarea, input[type="text"].form-control, [contenteditable="true"]');
      if (!textareas.length) return false;
      if (textareas.length > 1 && answers.length !== textareas.length) return false;
      var allEssaySet = true;
      for (var j = 0; j < textareas.length; j++) {
        var essay = textareas.length === 1 ? answers.join('\n') : normalizeAnswerText(answers[j]);
        if (!essay || !_koSetValue(textareas[j], essay) || !String(textareas[j].isContentEditable ? textareas[j].textContent : textareas[j].value || '').trim()) allEssaySet = false;
      }
      if (allEssaySet) { autoState.questionsDone++; if(shouldAnswerCorrect)autoState.questionsCorrect++; }
      return allEssaySet;
    } else if (typeText.includes('文件')) {
      Logger.log('文件题跳过: ' + qId);
      return false;
    } else {
      Logger.log('未识别题型: ' + typeText + ' (qId: ' + qId + ')');
      return false;
    }
  }

  function autoGoNext() {
    if (autoState.paused || autoState.navigating) return;
    var cfg = getCfg();
    if (!cfg.autoNext) return;
    var currentSignature = getCurrentPageSignature();
    if (autoState.navigationBlockedSignature === currentSignature) return;
    if (autoState.answerInProgress && !autoState.navigationReady) return;
    var pendingHere=Array.from(document.querySelectorAll('.question-wrapper')).filter(function(panel){return isElementVisible(panel)&&!panel.classList.contains('finished');});
    if(pendingHere.length){pauseAutoFlow('当前页仍有 '+pendingHere.length+' 道未完成题目，已停止自动翻页');return;}
    if (_nextPageTimerId) { timerRegistry.clear(_nextPageTimerId); _nextPageTimerId = null; }

    function retryNavigation(reason) {
      autoState.navigating = false;
      var unfinished=Array.from(document.querySelectorAll('.question-wrapper')).filter(function(panel){return isElementVisible(panel)&&!panel.classList.contains('finished');});
      if(unfinished.length){pauseAutoFlow('翻页受阻：当前页仍有 '+unfinished.length+' 道未完成题目，请检查各组练习提交状态');return;}
      autoState.retry++;
      var qLabel = autoState.currentQuestionIds.length ? (autoState.currentQuestionIds.length>3?autoState.currentQuestionIds.slice(0,3).join(',')+' 等 '+autoState.currentQuestionIds.length+' 题':autoState.currentQuestionIds.join(',')) : '无';
      Logger.log('题目 ' + qLabel + ' 翻页失败 [阶段: 翻页确认]：' + reason + ' (' + autoState.retry + '/' + cfg.maxRetry + ')');
      if (autoState.retry >= cfg.maxRetry) {
        pauseAutoFlow('连续多次未能确认翻页，自动流程已暂停');
        return;
      }
      // 答题状态保持锁定，避免翻页重试期间再次处理同一页的题目。
      timerRegistry.set(function(){ autoGoNext(); }, 1200);
    }

    var btns = Array.from(document.querySelectorAll('.next-page-btn, .mobile-next-page-btn, .next-btn, .btn-next, .nextVideoBtn'));
    var nextBtn = btns.find(function(btn){
      return isElementVisible(btn) && !btn.disabled && btn.getAttribute('aria-disabled') !== 'true' && !btn.classList.contains('disabled');
    });
    if (!nextBtn) {
      retryNavigation('未找到可用的下一页按钮');
      return;
    }

    var before = getNavigationMarker();
    autoState.navigating = true;
    try { nextBtn.click(); }
    catch (e) { retryNavigation('点击下一页失败：' + (e.message||e)); return; }
    Logger.log('已点击下一页，等待页面切换确认...');
    var startedAt = Date.now();
    var candidate='';
    function verifyNavigation() {
      if (autoState.paused) { autoState.navigating = false; return; }
      advanceStatModal();
      var after=getNavigationMarker();
      var marker=JSON.stringify(after);
      if(hasConfirmedNavigation(before,after)&&candidate===marker) {
        autoState.retry = 0;
        autoState.pagesDone++;
        autoState.lastActivityAt=Date.now();
        updateAutoProgress();
        autoState.navigating = false;
        autoState.answerInProgress = false;
        autoState.navigationReady = false;
        autoState.navigationBlockedSignature = '';
        autoState.currentQuestionIds = [];
        resetVideoTracking();
        var pageTitle=getActivePageTitle();
        Logger.log('翻页已确认'+(pageTitle?'，当前页「'+pageTitle+'」':'')+'，耗时 ' + (Date.now() - startedAt) + ' ms (累计 ' + autoState.pagesDone + ' 页, ' + autoState.questionsDone + ' 题)');
        timerRegistry.set(function(){
          if (autoState.paused) return;
          autoProcessVideos();
          autoCheckModals();
        }, 800);
        return;
      }
      candidate=hasConfirmedNavigation(before,after)?marker:'';
      if (Date.now() - startedAt >= NAVIGATION_CONFIRM_TIMEOUT_MS) {
        retryNavigation('点击后未检测到页面切换（等待 ' + (Date.now() - startedAt) + ' ms）');
        return;
      }
      timerRegistry.set(verifyNavigation, 500);
    }
    timerRegistry.set(verifyNavigation, 500);
  }

  function getActivePageTitle(){
    var active=Array.from(document.querySelectorAll('.page-item .page-name')).find(function(name){return name.classList&&name.classList.contains('active');});
    return active?html2text(active.textContent).replace(/[\uE000-\uF8FF]/g,'').replace(/\s+/g,' ').trim().slice(0,60):'';
  }
  function getAutoStats(){
    if(!autoState.startTime)return '';
    var elapsed=Math.floor((Date.now()-autoState.startTime)/1000);
    var m=Math.floor(elapsed/60),s=elapsed%60;
    var acc=autoState.questionsDone?Math.round(autoState.questionsCorrect/autoState.questionsDone*100):0;
    var pageTitle=getActivePageTitle();
    return '运行'+m+'分'+s+'秒'+(pageTitle?' | 当前页「'+pageTitle+'」':'')+' | '+autoState.pagesDone+'页 | '+autoState.questionsDone+'题 | 正确率'+acc+'%';
  }

  async function readCourseProgress(runId){
    var courseId=getPageParam('courseId'),classId=getPageParam('classId');
    if(!courseId||!IS_DGUT)return;
    autoState.courseProgress={status:'loading',total:0,current:0};
    updateAutoProgress();
    try{
      var path='/uaapi/course/stu/'+encodeURIComponent(courseId)+'/directory'+(classId?'?classId='+encodeURIComponent(classId):'');
      var response=await api('GET',path,null,1);
      var directory=response&&response.data||response;
      var chapterNodes=(directory&&directory.chapters||[]).map(function(ch){return String(ch.nodeid||ch.nodeId||ch.id||'');}).filter(Boolean);
      if(!chapterNodes.length&&classId){
        response=await api('GET','/uaapi/course/stu/'+encodeURIComponent(courseId)+'/directory',null,1);
        directory=response&&response.data||response;
        chapterNodes=(directory&&directory.chapters||[]).map(function(ch){return String(ch.nodeid||ch.nodeId||ch.id||'');}).filter(Boolean);
      }
      chapterNodes=chapterNodes.filter(function(id,index){return chapterNodes.indexOf(id)===index;});
      if(!chapterNodes.length)throw new Error('课程目录没有专题页');
      var chapterSections=new Array(chapterNodes.length),nextChapter=0,readCount=0,scanError=null;
      var scanConcurrency=Math.min(3,chapterNodes.length);
      async function readChapterWorker(){
        while(nextChapter<chapterNodes.length){
          if(autoState.runId!==runId||autoState.paused||scanError)return;
          var chapterIndexToRead=nextChapter++;
          try{
            var chapterResponse=await api('GET','/uaapi/wholepage/chapter/stu/'+encodeURIComponent(chapterNodes[chapterIndexToRead]),null,1);
            if(autoState.runId!==runId||autoState.paused)return;
            var chapter=chapterResponse&&chapterResponse.data||chapterResponse;
            var chapterItems=[];
            (chapter&&chapter.wholepageItemDTOList||[]).forEach(function(item){
              var count=(item.wholepageDTOList||[]).length;
              chapterItems.push({id:String(item.itemid||item.id||''),count:count});
            });
            chapterSections[chapterIndexToRead]=chapterItems;
            readCount++;
            var scannedTotal=chapterSections.reduce(function(sum,items){return sum+(items||[]).reduce(function(part,item){return part+item.count;},0);},0);
            autoState.courseProgress={status:'loading',total:scannedTotal,current:0,read:readCount,chapters:chapterNodes.length};
            updateAutoProgress();
          }catch(error){scanError=error;return;}
        }
      }
      await Promise.all(Array.from({length:scanConcurrency},readChapterWorker));
      if(autoState.runId!==runId||autoState.paused)return;
      if(scanError)throw scanError;
      var sections=[],total=0;
      chapterSections.forEach(function(items){(items||[]).forEach(function(section){sections.push(section);total+=section.count;});});
      if(!total)throw new Error('课程页面列表为空');
      if(autoState.runId!==runId||autoState.paused)return;
      var chapterIndex=sections.findIndex(function(section){return section.id===String(getPageParam('chapterId')||'');});
      var pageItems=Array.from(document.querySelectorAll('.page-item'));
      var activeIndex=pageItems.findIndex(function(item){var name=item.querySelector('.page-name');return name&&name.classList.contains('active');});
      var wholeCourseVisible=activeIndex>=0&&pageItems.length===total;
      var sectionVisible=chapterIndex>=0&&activeIndex>=0&&pageItems.length===sections[chapterIndex].count;
      var calibrated=wholeCourseVisible||sectionVisible;
      var base=wholeCourseVisible?activeIndex+1:sectionVisible?sections.slice(0,chapterIndex).reduce(function(a,b){return a+b.count;},0)+activeIndex+1:0;
      autoState.courseProgress={status:'ready',total:total,current:base,calibrated:calibrated,wholeCourseVisible:wholeCourseVisible,startingPagesDone:autoState.pagesDone};
      updateAutoProgress();
      Logger.log('已读取课程结构：'+sections.length+' 个小节、'+total+' 页'+(calibrated?'，当前第 '+base+' 页':'；当前页无法与目录校准'));
    }catch(e){
      if(autoState.runId!==runId||autoState.paused)return;
      autoState.courseProgress={status:'error',total:0,current:0};
      updateAutoProgress();
      Logger.warn('课程进度读取失败：'+(e&&e.message||e));
    }
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
    var course=autoState.courseProgress;
    var position=course&&course.calibrated?Math.min(course.total,course.current+autoState.pagesDone-(course.startingPagesDone||0)):0;
    if(course&&course.status==='ready'){
      var activePageItems=document.querySelectorAll('.page-item');
      if(activePageItems.length===course.total){
        for(var activeI=0;activeI<activePageItems.length;activeI++)if(activePageItems[activeI].querySelector('.page-name.active')){
          course.calibrated=true;
          course.wholeCourseVisible=true;
          course.current=activeI+1;
          course.startingPagesDone=autoState.pagesDone;
          position=activeI+1;
          break;
        }
      }
    }
    var scanningCourse=!!(autoState.preloading&&course&&course.status==='loading');
    if(bar){
      var progressTrack=bar.parentElement;
      if(scanningCourse){
        var readChapters=course.read||0,chapterTotal=course.chapters||0;
        bar.style.width=chapterTotal?Math.round(readChapters/chapterTotal*100)+'%':'0%';
        progressTrack.setAttribute('aria-label','课程内容预读进度');
        progressTrack.setAttribute('aria-valuenow',String(readChapters));
        progressTrack.setAttribute('aria-valuemax',String(chapterTotal));
      }else{
        bar.style.width=position&&course&&course.total?Math.round(position/course.total*100)+'%':'0%';
        progressTrack.setAttribute('aria-label','课程学习进度');
        progressTrack.setAttribute('aria-valuenow',String(position));
        progressTrack.setAttribute('aria-valuemax',String(course&&course.total||0));
      }
    }
    var phase=autoState.preloading?'读取课程内容中':autoState.navigating?'确认翻页中':autoState.answerInProgress?'处理题目中':_videoStates.length?'播放视频中':_noVideoTimerId?'等待翻页':'检查页面中';
    var courseText=!course?'课程结构未读取':course.status==='loading'?'全课内容预读 '+(course.read||0)+'/'+(course.chapters||0)+' 专题 · 已发现 '+(course.total||0)+' 页':course.status==='error'?'课程总进度暂不可用':course.calibrated?'课程位置 '+position+'/'+course.total+' 页':'全课 '+course.total+' 页 · 当前页未校准';
    var activePageTitle=getActivePageTitle();
    if(txt)txt.textContent=(autoState.paused?(autoState.pauseReason||'已暂停'):'运行中 · '+phase)+' · '+courseText+(activePageTitle?' · 当前页「'+activePageTitle+'」':'')+' · 本次已翻 '+autoState.pagesDone+' 页 · '+m+'分'+s+'秒 | '+autoState.questionsDone+'题 | 正确率'+acc+'%';
  }

  var autoStatsInterval = 0;
  var autoLoopId = null;
  function scheduleAutoGoNext(delay){if(_nextPageTimerId)return;_nextPageTimerId=timerRegistry.set(function(){_nextPageTimerId=null;autoGoNext();},delay);}
  function autoLoop() {
    if (autoState.paused) {
      if (autoLoopId) { timerRegistry.clear(autoLoopId); autoLoopId = null; }
      stopAntiIdle();
      return;
    }

    try{
      setupVideoObserver();
      autoProcessVideos();
      autoCheckModals();
      if(autoState.lastActivityAt&&Date.now()-autoState.lastActivityAt>Math.max(180000,getCfg().stayTime*1000+60000)){
        pauseAutoFlow('长时间未检测到学习进度，自动流程已暂停');
        return;
      }
      updateAutoProgress();
      autoStatsInterval++;
      if(autoStatsInterval>=6){autoStatsInterval=0;var stats=getAutoStats();if(stats)Logger.log('[统计] '+stats);}
    }catch(e){Logger.error('自动流程检查异常：'+(e&&e.message||e));}
    finally{
      if(!autoState.paused){autoLoopId=timerRegistry.set(autoLoop,5000);startAntiIdle();}
    }
  }
  var _antiIdleId = null;
  function startAntiIdle() {
    if (_antiIdleId) return;
    _antiIdleId = timerRegistry.set(function antiTick() {
      if (autoState.paused) { _antiIdleId = null; return; }
      document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: Math.random() * window.innerWidth, clientY: Math.random() * window.innerHeight }));
      _antiIdleId = timerRegistry.set(antiTick, 30000);
    }, 30000);
  }
  function stopAntiIdle() {
    if (_antiIdleId) { timerRegistry.clear(_antiIdleId); _antiIdleId = null; }
  }

  // ==================== 下载 ====================
  var exportCancelled = false;
  function abortExportRequests(){
    Object.keys(activeExportRequests).forEach(function(id){
      var request=activeExportRequests[id];
      try{if(request&&typeof request.abort==='function')request.abort();}catch(e){}
    });
  }

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
    floatEl: null,
    floatBody: null,
    inlineEls: [],
    count: 0,
    max: 200,
    paused: false,
    _queue: [],
    _flushScheduled: false,
    init: function(el) { this.el = el; this.count = 0; this.inlineEls = el ? [el] : []; },
    addInline: function(el) { this.inlineEls=this.inlineEls.filter(function(node){return node&&node.isConnected;});if(el&&this.inlineEls.indexOf(el)===-1)this.inlineEls.push(el); },
    _addLine: function(msg) {
      console.log('[小蟑螂] ' + msg);
      var t = new Date().toLocaleTimeString();
      // 写入面板内联日志
      for (var i = 0; i < this.inlineEls.length; i++) {
        var iel = this.inlineEls[i];
        if (iel && iel.parentNode) {
          this.count++;
          if (this.count > this.max) { iel.innerHTML = ''; this.count = 0; }
          var node = document.createElement('div');
          node.textContent = '[' + t + '] ' + msg;
          iel.appendChild(node);
          iel.scrollTop = iel.scrollHeight;
        }
      }
      // 浮窗：排队批量渲染，避免逐条 DOM 操作导致卡顿
      if (this.floatBody) {
        this._queue.push({t: t, msg: msg});
        // 后台标签页可能暂停 requestAnimationFrame，队列必须始终有上限。
        if(this._queue.length>500)this._queue.splice(0,this._queue.length-500);
        if (!this._flushScheduled) {
          this._flushScheduled = true;
          var self = this;
          setTimeout(function() { self._flush(); }, 100);
        }
      }
    },
    _flush: function() {
      this._flushScheduled = false;
      if (!this._queue.length || !this.floatBody) return;
      var frag = document.createDocumentFragment();
      var pending = this._queue.splice(0);
      pending.forEach(function(item) {
        var line = document.createElement('div');
        var isError = item.msg.indexOf('失败') !== -1 || item.msg.indexOf('错误') !== -1;
        var isOk = item.msg.indexOf('已') === 0 || item.msg.indexOf('完成') !== -1 || item.msg.indexOf('启动') !== -1;
        line.textContent = item.t + ' ' + item.msg;
        line.className = 'xz-log-line' + (isError?' xz-log-error':isOk?' xz-log-ok':'');
        frag.appendChild(line);
      });
      // 移除超限旧条目
      this.floatBody.appendChild(frag);
      while (this.floatBody.children.length > 500) this.floatBody.removeChild(this.floatBody.firstChild);
      if (!this.paused) this.floatBody.scrollTop = this.floatBody.scrollHeight;
      if (this._countEl) this._countEl.textContent = this.floatBody.children.length;
    },
    log: function(msg) { this._addLine(msg); },
    info: function(msg) { this._addLine(msg); },
    warn: function(msg) { this._addLine('[WARN] ' + msg); if(this.floatEl&&this.floatEl.style.display!=='none'&&this._setCollapsed)this._setCollapsed(false); },
    error: function(msg) { this._addLine('[ERROR] ' + msg); if(this.floatEl&&this.floatEl.style.display!=='none'&&this._setCollapsed)this._setCollapsed(false); },
    createFloat: function() {
      if (this.floatEl) return;
      var existingFloat=document.getElementById('xz-float-log');
      if(existingFloat){this.floatEl=existingFloat;this.floatBody=existingFloat.querySelector('#xz-log-body');this._countEl=existingFloat.querySelector('#xz-log-count');return;}
      var self = this;

      // 与主面板共用冷色轻玻璃视觉
      var wrap = document.createElement('div');
      wrap.id = 'xz-float-log';
      try{wrap.classList.toggle('xz-log-dark',localStorage.getItem('xz_dark')==='1');}catch(e){}
      wrap.style.cssText = 'position:fixed;bottom:16px;left:16px;z-index:999997;width:min(380px,calc(100vw - 32px));height:42px;'+
        'background:rgba(249,251,253,.96);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);'+
        'border:1px solid #dce5ed;border-radius:16px;'+
        'box-shadow:0 16px 44px rgba(35,57,80,.18);'+
        'font-family:-apple-system,"PingFang SC","Helvetica Neue",sans-serif;'+
        'display:flex;flex-direction:column;overflow:hidden;'+
        'transition:opacity .2s,transform .2s;'+
        'transform-origin:bottom left;';

      wrap.innerHTML =
        '<style>#xz-float-log .xz-log-line{padding:3px 0;color:#344658;font-size:11px;line-height:1.55;white-space:pre-wrap;word-break:break-word;border-bottom:1px solid rgba(107,129,151,.10);}'+
        '#xz-float-log .xz-log-error{color:#b7333c;}#xz-float-log .xz-log-ok{color:#18744d;}'+
        '#xz-float-log button:focus-visible{outline:2px solid #1769d2;outline-offset:2px;}'+
        '#xz-float-log.xz-log-dark{background:#19202a!important;border-color:#405164!important;color:#eef4fa;}'+
        '#xz-float-log.xz-log-dark .xz-log-head{background:#263341!important;border-color:#405164!important;}'+
        '#xz-float-log.xz-log-dark .xz-log-head span{color:#eef4fa!important;}'+
        '#xz-float-log.xz-log-dark .xz-log-head button{background:#202c39!important;border-color:#405164!important;color:#c7d5e2!important;}'+
        '#xz-float-log.xz-log-dark #xz-log-body{color:#eef4fa!important;}'+
        '#xz-float-log.xz-log-dark .xz-log-line{color:#c7d5e2;border-color:#405164;}'+
        '#xz-float-log.xz-log-dark .xz-log-error{color:#ff9ca2;}#xz-float-log.xz-log-dark .xz-log-ok{color:#78dbab;}'+
        '@media(max-width:480px){#xz-float-log{left:12px!important;right:12px!important;bottom:12px!important;top:auto!important;width:auto!important;max-height:40dvh;}}'+
        '@media(prefers-reduced-motion:reduce){#xz-float-log,#xz-float-log *{transition-duration:.01ms!important;}}</style>'+
        '<div class="xz-log-head" style="display:flex;align-items:center;justify-content:space-between;'+
        'padding:10px 14px;cursor:default;touch-action:none;user-select:none;flex-shrink:0;'+
        'background:rgba(255,255,255,.7);border-bottom:1px solid #dce5ed;">'+
        '<span style="font-size:12px;font-weight:650;color:#17202b;">运行日志</span>'+
        '<div style="display:flex;gap:5px;align-items:center;">'+
        '<span id="xz-log-count" style="font-size:10px;color:#5c6b7b;min-width:20px;text-align:right;">0</span>'+
        '<button id="xz-log-pause" style="background:rgba(0,0,0,.04);border:1px solid rgba(0,0,0,.08);'+
        'color:#1769d2;cursor:pointer;font-size:10px;padding:3px 8px;border-radius:8px;'+
        'transition:background .15s,color .15s;" title="暂停滚动">滚动中</button>'+
        '<button id="xz-log-clear" style="background:rgba(0,0,0,.04);border:1px solid rgba(0,0,0,.08);'+
        'color:#344658;cursor:pointer;font-size:10px;padding:3px 7px;border-radius:8px;'+
        'transition:background .15s,color .15s;" title="清空日志">清空</button>'+
        '<button id="xz-log-copy" style="background:rgba(0,0,0,.04);border:1px solid rgba(0,0,0,.08);'+
        'color:#344658;cursor:pointer;font-size:10px;padding:3px 7px;border-radius:8px;" title="复制可见日志">复制</button>'+
        '<button id="xz-log-toggle" style="background:rgba(0,0,0,.04);border:1px solid rgba(0,0,0,.08);'+
        'color:#344658;cursor:pointer;font-size:11px;padding:3px 7px;border-radius:8px;'+
        'line-height:1;transition:background .15s,color .15s;" title="展开日志">展开</button>'+
        '</div></div>'+
        '<div id="xz-log-body" style="flex:1;overflow-y:auto;padding:7px 14px;'+
        'font-size:11px;line-height:1.55;color:#344658;'+
        'scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.1) transparent;"></div>';
      document.body.appendChild(wrap);
      this.floatEl = wrap;
      this.floatBody = wrap.querySelector('#xz-log-body');
      this._countEl = wrap.querySelector('#xz-log-count');

      // 折叠/展开
      var collapsed = true;
      var logBody = wrap.querySelector('#xz-log-body');
      logBody.style.display='none';
      function setCollapsed(value){
        collapsed=value;
        logBody.style.display = collapsed ? 'none' : '';
        wrap.style.height = collapsed ? '42px' : '210px';
        var button=wrap.querySelector('#xz-log-toggle');
        button.textContent=collapsed?'展开':'收起';
        button.title=collapsed?'展开日志':'收起日志';
      }
      this._setCollapsed=setCollapsed;
      wrap.querySelector('#xz-log-toggle').onclick=function(){setCollapsed(!collapsed);};

      // 暂停/恢复滚动
      var pauseBtn = wrap.querySelector('#xz-log-pause');
      function setPauseUI(paused) {
        self.paused = paused;
        pauseBtn.textContent = paused ? '已暂停' : '滚动中';
        pauseBtn.style.color = paused ? '#b7333c' : '#1769d2';
        pauseBtn.style.background = paused ? 'rgba(183,51,60,.10)' : 'rgba(0,0,0,.04)';
        if (!paused && self.floatBody) self.floatBody.scrollTop = self.floatBody.scrollHeight;
      }
      pauseBtn.onclick = function() { setPauseUI(!self.paused); };

      // 滚动时用户手动上滚 → 自动暂停
      var scrollTimer = null;
      this.floatBody.addEventListener('scroll', function() {
        if (self.paused) return;
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function() {
          var el = self.floatBody;
          if (!el) return;
          var atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 30;
          if (!atBottom) setPauseUI(true);
        }, 150);
      });

      // 清空
      wrap.querySelector('#xz-log-clear').onclick = function() {
        self.floatBody.innerHTML = '';
        self._queue = [];
        if (self._countEl) self._countEl.textContent = '0';
      };
      wrap.querySelector('#xz-log-copy').onclick = function() {
        var copyBtn=this;
        var content=self.floatBody ? Array.from(self.floatBody.children).map(function(line){return line.textContent;}).join('\n') : '';
        if(!content){copyBtn.textContent='无内容';setTimeout(function(){copyBtn.textContent='复制';},1200);return;}
        if(navigator.clipboard&&navigator.clipboard.writeText){
          navigator.clipboard.writeText(content).then(function(){copyBtn.textContent='已复制';},function(){copyBtn.textContent='复制失败';}).finally(function(){setTimeout(function(){copyBtn.textContent='复制';},1500);});
        }else{copyBtn.textContent='复制失败';setTimeout(function(){copyBtn.textContent='复制';},1500);}
      };

      // 拖动：使用指针捕获，拖到视口边缘时仍能顺利拉回。
      var logHead=wrap.querySelector('.xz-log-head');
      var logDrag={active:false,pointerId:null,startX:0,startY:0,left:0,top:0};
      function finishLogDrag(e){
        if(!logDrag.active||(e&&e.pointerId!==logDrag.pointerId))return;
        logDrag.active=false;logDrag.pointerId=null;wrap.style.transition='';
        var rr=wrap.getBoundingClientRect();
        try{localStorage.setItem('xz_log_pos',JSON.stringify({left:rr.left,top:rr.top}));}catch(err){}
      }
      logHead.addEventListener('pointerdown',function(e){
        if(e.target.closest('button')||e.isPrimary===false||e.button!==0)return;
        logDrag.active=true;logDrag.pointerId=e.pointerId;logDrag.startX=e.clientX;logDrag.startY=e.clientY;
        var r=wrap.getBoundingClientRect();logDrag.left=r.left;logDrag.top=r.top;
        try{logHead.setPointerCapture(e.pointerId);}catch(err){}
        wrap.style.transition='none';e.preventDefault();
      });
      logHead.addEventListener('pointermove',function(e){
        if(!logDrag.active||e.pointerId!==logDrag.pointerId)return;
        var r=wrap.getBoundingClientRect(),margin=8;
        var left=Math.max(margin,Math.min(innerWidth-r.width-margin,logDrag.left+e.clientX-logDrag.startX));
        var top=Math.max(margin,Math.min(innerHeight-r.height-margin,logDrag.top+e.clientY-logDrag.startY));
        wrap.style.left=left+'px';wrap.style.top=top+'px';wrap.style.bottom='auto';wrap.style.right='auto';
      });
      ['pointerup','pointercancel','lostpointercapture'].forEach(function(type){logHead.addEventListener(type,finishLogDrag);});
      // 恢复位置
      var savedLogPos = null;
      try { savedLogPos = JSON.parse(localStorage.getItem('xz_log_pos')); } catch(e) {}
      if (savedLogPos && savedLogPos.left != null) {
        wrap.style.left = savedLogPos.left + 'px';
        wrap.style.top = savedLogPos.top + 'px';
        wrap.style.bottom = 'auto';
      }
    },
    toggleFloat: function() {
      if (!this.floatEl) return;
      var vis = this.floatEl.style.display !== 'none';
      this.floatEl.style.display = vis ? 'none' : 'flex';
      // 记住用户选择
      try { localStorage.setItem('xz_log_hidden', vis ? '1' : '0'); } catch(e) {}
    },
    showFloat: function() {
      if (this.floatEl) this.floatEl.style.display = 'flex';
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
    var pageName = isAutoPage ? '课件学习页' : IS_COURSE ? '课件目录页' : IS_TRAINING ? '题库训练页' : '其他页面';
    var pageIntro = isAutoPage ? '可自动学习，也可导出本课程题库。' : IS_COURSE ? '已识别课程，可按章节选择并导出题库。' : IS_TRAINING ? '已识别训练，可导出当前训练的题目与答案。' : '打开课件学习页或题库训练页后使用对应功能。';

    panel.innerHTML = [
            '<style>',
      String.raw`/* Learning utility sidebar. Embedded into the installable userscript. */
#xz-panel {
  --xz-canvas: #faf8ff;
  --xz-surface: #fff;
  --xz-ink: #2c2940;
  --xz-muted: #746f86;
  --xz-line: #e7e2f0;
  --xz-pine: #7357bc;
  --xz-pine-hover: #6248ab;
  --xz-tint: #f2edff;
  --xz-alert: #b95769;
  position: fixed;
  top: 18px;
  right: 18px;
  z-index: 999999;
  display: flex;
  flex-direction: column;
  width: 372px;
  max-width: calc(100vw - 24px);
  max-height: calc(100dvh - 36px);
  overflow: hidden;
  border: 1px solid #e9e2f5;
  border-radius: 18px;
  background: linear-gradient(145deg, #fefcff 0%, #f8f4ff 52%, #f4f1ff 100%);
  color: var(--xz-ink);
  box-shadow: 0 22px 58px rgba(82, 67, 130, .16), 0 3px 12px rgba(82, 67, 130, .06);
  font: 13px/1.55 "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif;
  letter-spacing: 0;
  transition: opacity .18s ease, transform .18s ease;
}
#xz-panel *, #xz-panel *::before, #xz-panel *::after { box-sizing: border-box; }
#xz-panel.xz-hide { opacity: 0; transform: translateY(7px); pointer-events: none; }
#xz-panel .xz-head { flex: none; padding: 19px 22px 18px; border-bottom: 1px solid var(--xz-line); background: rgba(255,255,255,.58); color: var(--xz-ink); cursor: grab; user-select: none; }
#xz-panel .brand { display: flex; min-height: 38px; margin: 0 97px 0 0; align-items: flex-start; }
#xz-panel .brand .logo { width: 38px; height: 38px; margin: 0 10px 0 0; border-radius: 10px; object-fit: contain; }
#xz-panel .brand .name { color: var(--xz-ink); font-size: 17px; font-weight: 700; line-height: 1.2; letter-spacing: -.025em; }
#xz-panel .brand .ver { margin-top: 5px; color: var(--xz-muted); font-size: 10px; font-weight: 400; letter-spacing: .01em; }
#xz-panel .close { position: absolute; top: 16px; right: 17px; display: grid; width: 31px; height: 31px; place-items: center; border: 0; border-radius: 6px; background: transparent; color: var(--xz-muted); font-family: inherit; font-size: 22px; line-height: 1; cursor: pointer; }
#xz-panel .close:hover { background: var(--xz-tint); color: var(--xz-ink); }
#xz-panel .xz-header-about { position: absolute; top: 19px; right: 54px; min-height: 28px; padding: 3px 6px; border: 0; border-radius: 6px; background: transparent; color: var(--xz-muted); font-family: inherit; font-size: 11px; cursor: pointer; }
#xz-panel .xz-header-about:hover { background: var(--xz-tint); color: var(--xz-pine); }
#xz-panel .xz-capsule-nav { display: flex; flex: none; gap: 4px; margin: 15px 20px 0; padding: 5px; border: 1px solid #e3d9f3; border-radius: 999px; background: #eee8fa; }
#xz-panel .xz-capsule-nav button { position: relative; flex: 1; min-width: 0; min-height: 38px; padding: 7px 6px; border: 0; border-radius: 999px; background: transparent; color: #6d6285; font: 650 13px/1.3 "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif; cursor: pointer; transition: background .16s ease, color .16s ease, box-shadow .16s ease; }
#xz-panel .xz-capsule-nav button:hover { background: rgba(255,255,255,.72); color: var(--xz-ink); }
#xz-panel .xz-capsule-nav button.active { background: #765abd; color: #fff; box-shadow: 0 3px 8px rgba(91,61,158,.2); }
#xz-panel .xz-capsule-nav button.active:hover { background: #654aab; color: #fff; }
#xz-panel .xz-capsule-nav button.is-running::after { content: ""; position: absolute; top: 8px; right: 8px; width: 6px; height: 6px; border-radius: 50%; background: #5dbd8b; box-shadow: 0 0 0 2px rgba(93,189,139,.18); }
#xz-panel.xz-view-about .xz-capsule-nav { display: none; }
#xz-panel .xz-body { flex: 1; min-height: 0; overflow: auto; padding: 20px 22px 26px; scrollbar-width: thin; scrollbar-color: #c0afd9 transparent; }
#xz-panel .xz-body::-webkit-scrollbar { width: 5px; }
#xz-panel .xz-body::-webkit-scrollbar-thumb { background: #c0afd9; }
#xz-panel .sec { display: none; }
#xz-panel .sec.show { display: block; }
#xz-panel .xz-context { padding: 18px 17px 20px; border: 1px solid #e9e2f6; border-radius: 15px; background: linear-gradient(135deg,rgba(255,255,255,.94),rgba(244,237,255,.78)); }
#xz-panel .xz-context-label { display: flex; align-items: center; gap: 8px; color: var(--xz-pine); font-size: 11px; font-weight: 650; }
#xz-panel .xz-context-dot { width: 6px; height: 6px; border-radius: 50%; background: #9578d5; }
#xz-panel .xz-context-unknown { background: #aea6bd; }
#xz-panel .xz-context-title { margin: 13px 0 7px; color: var(--xz-ink); font-size: 28px; font-weight: 690; line-height: 1.23; letter-spacing: -.05em; }
#xz-panel .xz-context p { margin: 0; color: var(--xz-muted); font-size: 12px; line-height: 1.7; }
#xz-panel .xz-home-title { margin: 23px 0 2px; color: var(--xz-muted); font-size: 11px; font-weight: 600; }
#xz-panel .xz-home-action, #xz-panel .xz-home-secondary button { position: relative; display: block; width: 100%; padding: 15px 30px 15px 0; border: 0; border-bottom: 1px solid var(--xz-line); border-radius: 0; background: transparent; color: var(--xz-ink); text-align: left; font-family: inherit; cursor: pointer; }
#xz-panel .xz-home-action { padding: 16px 40px 16px 16px; border: 1px solid #e2d8f4; border-radius: 12px; background: rgba(255,255,255,.8); }
#xz-panel .xz-home-action:hover, #xz-panel .xz-home-secondary button:hover { color: var(--xz-pine); background: #fff; }
#xz-panel .xz-home-action-name { display: block; font-size: 18px; font-weight: 690; line-height: 1.4; letter-spacing: -.035em; }
#xz-panel .xz-home-action-desc { display: block; margin-top: 4px; color: var(--xz-muted); font-size: 11px; line-height: 1.5; }
#xz-panel .xz-home-chevron { position: absolute; top: 22px; right: 15px; color: var(--xz-pine); font-size: 26px; font-weight: 300; line-height: 1; }
#xz-panel .xz-home-secondary { display: flex; flex-direction: column; margin: 0; }
#xz-panel .xz-home-secondary button { display: flex; min-height: 46px; align-items: center; justify-content: space-between; padding-top: 12px; padding-bottom: 12px; font-size: 12px; font-weight: 600; }
#xz-panel .xz-home-secondary span { position: absolute; right: 2px; color: var(--xz-pine); font-size: 20px; font-weight: 300; }
#xz-panel .xz-home-guide { display: flex; gap: 3px; flex-direction: column; margin-top: 21px; padding: 0 0 0 13px; border-left: 2px solid #bba5e3; color: var(--xz-muted); font-size: 11px; line-height: 1.65; }
#xz-panel .xz-home-guide strong { color: var(--xz-ink); font-size: 11px; font-weight: 650; }
#xz-panel .xz-sub-head { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
#xz-panel .xz-sub-head .back { display: grid; width: 29px; height: 29px; place-items: center; padding: 0; border: 1px solid var(--xz-line); border-radius: 3px; background: var(--xz-surface); color: var(--xz-ink); font-size: 18px; cursor: pointer; }
#xz-panel .xz-sub-head .back:hover { border-color: var(--xz-pine); color: var(--xz-pine); }
#xz-panel .xz-sub-head .title { color: var(--xz-ink); font-size: 19px; font-weight: 680; letter-spacing: -.035em; }
#xz-panel .xz-hint { margin-bottom: 14px; padding: 11px 13px; border: 0; border-left: 2px solid #b79be9; border-radius: 0 9px 9px 0; background: var(--xz-tint); }
#xz-panel .xz-hint .ht, #xz-panel .xz-export-result .hint-title { margin-bottom: 4px; color: var(--xz-ink); font-size: 12px; font-weight: 650; }
#xz-panel .xz-hint .hp, #xz-panel .xz-export-result .hint-text { color: var(--xz-muted); font-size: 12px; line-height: 1.65; }
#xz-panel .xz-export-result { display: none; margin: 12px 0 0; }
#xz-panel .xz-export-result.hint-ok { border-left-color: #4d8d65; }
#xz-panel .xz-export-result.hint-err { border-left-color: var(--xz-alert); }
#xz-panel .xz-export-result.hint-warn { border-left-color: #a07c32; }
#xz-panel .xz-btn { width: 100%; min-height: 43px; padding: 10px 16px; border: 1px solid transparent; border-radius: 999px; background: var(--xz-pine); color: #fff; font-family: inherit; font-size: 13px; font-weight: 650; line-height: 1.4; letter-spacing: 0; cursor: pointer; }
#xz-panel .xz-btn:hover { background: var(--xz-pine-hover); }
#xz-panel .xz-btn:active { transform: translateY(1px); }
#xz-panel .xz-btn-primary, #xz-panel .xz-btn-success { background: linear-gradient(110deg,#8b70d3,#6d55b9); color: #fff; }
#xz-panel .xz-btn-danger { border-color: #d4a3b2; background: transparent; color: var(--xz-alert); }
#xz-panel .xz-btn-danger:hover { background: #faefeb; }
#xz-panel .xz-btn:disabled { border-color: var(--xz-line); background: #ede9f4; color: #8a829b; cursor: not-allowed; }
#xz-panel .xz-opt-title { margin: 20px 0 6px; color: var(--xz-pine); font-size: 12px; font-weight: 700; }
#xz-panel .xz-row, #xz-panel label.xz-lbl { display: flex; min-height: 37px; align-items: center; gap: 8px; margin: 0; padding: 7px 0; border-bottom: 1px solid var(--xz-line); color: var(--xz-ink); font-size: 13px; line-height: 1.5; cursor: default; }
#xz-panel label.xz-lbl { cursor: pointer; }
#xz-panel .xz-toggle-group { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 8px; margin: 10px 0 5px; }
#xz-panel .xz-toggle-group label.xz-lbl { justify-content: center; min-height: 42px; gap: 7px; padding: 8px 10px; border: 1px solid #e3d9f3; border-radius: 999px; background: rgba(255,255,255,.64); color: #6e6580; text-align: center; font-size: 12px; font-weight: 600; }
#xz-panel .xz-toggle-group label.xz-lbl:hover { border-color: #bca5e7; background: #fff; }
#xz-panel .xz-toggle-group label.xz-lbl:has(input:focus-visible) { outline: 2px solid #9c7ddd; outline-offset: 2px; }
#xz-panel .xz-toggle-group label.xz-lbl:has(input:checked) { border-color: #ae95df; background: #e9dffd; color: #513c82; }
#xz-panel .xz-toggle-group input[type=checkbox] { appearance: none; flex: none; width: 13px; height: 13px; border: 1.5px solid currentColor; border-radius: 50%; background: transparent; }
#xz-panel .xz-toggle-group input[type=checkbox]:checked { border-color: #765abd; background: #765abd; box-shadow: inset 0 0 0 3px #e9dffd; }
#xz-panel .xz-advanced { margin-top: 20px; }
#xz-panel .xz-advanced summary { display: flex; min-height: 44px; align-items: center; gap: 7px; padding: 9px 15px; border: 1px solid #e3d9f3; border-radius: 999px; background: rgba(255,255,255,.7); color: var(--xz-ink); font-size: 12px; font-weight: 650; list-style: none; cursor: pointer; }
#xz-panel .xz-advanced summary::-webkit-details-marker { display: none; }
#xz-panel .xz-advanced summary span { margin-left: auto; color: var(--xz-muted); font-size: 11px; font-weight: 400; }
#xz-panel .xz-advanced summary::after { content: "⌄"; margin-left: 4px; color: var(--xz-pine); font-size: 18px; line-height: 1; }
#xz-panel .xz-advanced[open] summary::after { transform: rotate(180deg); }
#xz-panel .xz-advanced summary:hover { border-color: #bca5e7; background: #fff; }
#xz-panel input[type=number] { width: 60px; min-height: 27px; padding: 3px 6px; border: 1px solid #d9cfee; border-radius: 6px; outline: none; background: var(--xz-surface); color: var(--xz-ink); font-family: inherit; font-size: 12px; line-height: 1.3; }
#xz-panel input[type=number]:focus { border-color: var(--xz-pine); box-shadow: 0 0 0 2px rgba(115,87,188,.13); }
#xz-panel input[type=checkbox] { width: 15px; height: 15px; margin: 0; accent-color: var(--xz-pine); }
#xz-panel .xz-divider { margin: 16px 0; border-top: 1px solid var(--xz-line); }
#xz-panel .xz-st { min-height: 16px; margin-top: 10px; color: var(--xz-muted); font-size: 11px; overflow-wrap: anywhere; }
#xz-panel .xz-log { display: none; max-height: 90px; margin-top: 9px; padding: 8px 10px; overflow: auto; border: 1px solid var(--xz-line); background: var(--xz-surface); color: var(--xz-muted); font-size: 10px; }
#xz-panel .xz-log.show { display: block; }
#xz-panel .xz-log-list { max-height: 210px; overflow: auto; color: var(--xz-muted); font-size: 11px; line-height: 1.75; }
#xz-panel .xz-log-list .ver { margin-top: 10px; color: var(--xz-ink); font-weight: 700; }
#xz-panel .xz-log-list .ver:first-child { margin-top: 0; }
#xz-panel .xz-log-list .date { margin-left: 5px; color: var(--xz-muted); font-size: 10px; }
#xz-panel .xz-log-list ul { margin: 3px 0 10px; padding-left: 18px; }
#xz-panel .xz-footer { margin-top: 15px; padding-top: 12px; border-top: 1px solid var(--xz-line); color: var(--xz-muted); text-align: left; }
#xz-panel .xz-footer .copy { font-size: 10px; }
#xz-panel .xz-footer .disc { margin-top: 5px; font-size: 9px; line-height: 1.6; }
#xz-panel .xz-action-dock { display: none; flex: none; padding: 12px 22px 17px; border-top: 1px solid var(--xz-line); background: linear-gradient(90deg,rgba(250,247,255,.93),rgba(244,239,255,.93)); }
#xz-panel.xz-view-auto .xz-action-dock { display: block; }
#xz-panel.xz-view-auto .xz-reading-dock { display: none; }
#xz-panel.xz-view-reading .xz-reading-dock { display: flex; gap: 8px; }
#xz-panel .xz-reading-dock #xz-btn-reading { flex: 1; min-width: 0; }
#xz-panel .xz-reading-dock #xz-btn-reading-reset { flex: none; width: 76px; }
#xz-panel .xz-action-dock #xz-auto-progress { margin-top: 9px; }
#xz-panel #xz-progress-bar, #xz-panel #xz-auto-bar, #xz-panel #xz-rd-bar { background: var(--xz-pine) !important; }
#xz-panel #xz-rd-apply { min-height: 27px; border: 0; border-radius: 6px !important; background: var(--xz-pine) !important; color: #fff; cursor: pointer; }
#xz-panel #xz-btn-cancel { min-height: 28px; border-color: #d4a3b2 !important; border-radius: 3px !important; color: var(--xz-alert) !important; }
#xz-panel #xz-reading-timer { color: var(--xz-ink) !important; font-variant-numeric: tabular-nums; }
#xz-panel #xz-rd-pages, #xz-panel #xz-rd-total { color: var(--xz-pine) !important; }
#xz-panel :is(button, input, summary):focus-visible { outline: 2px solid #9c7ddd; outline-offset: 2px; }
#xz-panel.xz-dark { --xz-canvas:#242033; --xz-surface:#302a42; --xz-ink:#f4f0ff; --xz-muted:#c4bcd5; --xz-line:#514967; --xz-pine:#c6aafa; --xz-pine-hover:#d9c5ff; --xz-tint:#352e4a; --xz-alert:#f1aebb; border-color:#514967; background:linear-gradient(145deg,#282238,#211e30); color:var(--xz-ink); }
#xz-panel.xz-dark .xz-head { background: rgba(41,35,56,.88); }
#xz-panel.xz-dark .xz-capsule-nav { border-color: #53466d; background: #39304f; }
#xz-panel.xz-dark .xz-capsule-nav button { color: #d2c4e9; }
#xz-panel.xz-dark .xz-capsule-nav button:hover { background: #4e416a; color: #fff; }
#xz-panel.xz-dark .xz-capsule-nav button.active { background: #aa88e4; color: #211a30; }
#xz-panel.xz-dark .xz-toggle-group label.xz-lbl { border-color: #514967; background: #302a42; color: #d3c8e5; }
#xz-panel.xz-dark .xz-toggle-group label.xz-lbl:has(input:checked) { border-color: #a98cdb; background: #4c3d69; color: #f5edff; }
#xz-panel.xz-dark .xz-toggle-group input[type=checkbox]:checked { border-color: #c6aafa; background: #c6aafa; box-shadow: inset 0 0 0 3px #4c3d69; }
#xz-panel.xz-dark .xz-advanced summary { border-color: #514967; background: #302a42; }
#xz-panel.xz-dark .xz-advanced summary:hover { background: #3b3251; }
#xz-panel.xz-dark .xz-btn-primary, #xz-panel.xz-dark .xz-btn-success { background: linear-gradient(110deg,#b99be9,#9877d8); color: #221a36; }
#xz-panel.xz-dark .xz-btn:hover { background: #d9c5ff; color: #221a36; }
#xz-panel.xz-dark .xz-btn-danger { background: transparent; color: var(--xz-alert); }
#xz-panel.xz-dark .xz-home-action:hover, #xz-panel.xz-dark .xz-home-secondary button:hover { background: var(--xz-tint); }
#xz-panel.xz-dark .xz-btn:disabled { border-color: var(--xz-line); background: #3a344c; color: #b2a8c4; }
#xz-panel.xz-dark .xz-action-dock { background: linear-gradient(90deg,rgba(39,33,55,.96),rgba(32,28,46,.96)); }
#xz-panel.xz-dark input[type=number] { border-color: var(--xz-line); background: var(--xz-surface); color: var(--xz-ink); }
#xz-toggle { border: 1px solid #e4daf3 !important; border-radius: 10px !important; background: #fff !important; color: #2c2940 !important; box-shadow: 0 8px 22px rgba(82,67,130,.12) !important; backdrop-filter: none !important; font-family: "Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif !important; }
#xz-toggle:hover { border-color: #bca9e5 !important; background: #f2edff !important; }
#xz-float-log { border: 1px solid #e4daf3 !important; border-radius: 10px !important; background: #fff !important; box-shadow: 0 10px 30px rgba(82,67,130,.12) !important; backdrop-filter: none !important; }
#xz-float-log .xz-log-head { border-color: #e7e2f0 !important; background: #fff !important; }
#xz-float-log .xz-log-head > span { color: #2c2940 !important; }
#xz-float-log .xz-log-head button { border-color: #e4daf3 !important; border-radius: 5px !important; background: #fff !important; color: #7357bc !important; }
#xz-float-log .xz-log-head button:hover { background: #f2edff !important; }
#xz-float-log .xz-log-line { border-color: #e7e2f0 !important; color: #5a536a !important; }
#xz-float-log .xz-log-error { color: #b95769 !important; }
#xz-float-log .xz-log-ok { color: #8061bd !important; }
#xz-float-log.xz-log-dark { border-color: #514967 !important; background: #242033 !important; color: #f4f0ff !important; }
#xz-float-log.xz-log-dark .xz-log-head { border-color: #514967 !important; background: #302a42 !important; }
#xz-float-log.xz-log-dark .xz-log-head > span { color: #f4f0ff !important; }
#xz-float-log.xz-log-dark .xz-log-head button { border-color: #514967 !important; background: #302a42 !important; color: #f4f0ff !important; }
#xz-float-log.xz-log-dark .xz-log-line { border-color: #514967 !important; color: #d4cae4 !important; }

/* Reference-led workspace treatment: cool canvas, white task cards, restrained lavender. */
#xz-panel {
  box-sizing: border-box;
  --xz-canvas: #eef2f6;
  --xz-surface: #fff;
  --xz-ink: #202834;
  --xz-muted: #687482;
  --xz-line: #e7eaf0;
  --xz-pine: #8065ce;
  --xz-pine-hover: #6e54ba;
  --xz-tint: #f2effb;
  width: 412px;
  border-color: #dfe5ed;
  border-radius: 23px;
  background: linear-gradient(148deg,#f7f9fb 0%,#eef2f6 58%,#f2eff9 100%);
  box-shadow: 0 24px 64px rgba(38,48,68,.17),0 4px 12px rgba(38,48,68,.05);
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;
  font-size: 13px;
}
#xz-panel :is(button,summary,label) { touch-action: manipulation; -webkit-tap-highlight-color: transparent; }
#xz-panel .xz-head { padding: 18px 20px 17px; border-bottom: 1px solid var(--xz-line); background: rgba(255,255,255,.92); }
#xz-panel .close { top: 16px; right: 15px; width: 36px; height: 36px; }
#xz-panel .xz-header-about { top: 17px; right: 56px; min-height: 34px; }
#xz-panel .brand .name { font-size: 16px; letter-spacing: -.015em; }
#xz-panel .brand .ver { color: #687482; font-size: 11px; }
#xz-panel .xz-capsule-nav { gap: 5px; margin: 15px 17px 0; padding: 5px; border: 1px solid #e8ebf0; border-radius: 999px; background: #fff; box-shadow: 0 2px 8px rgba(42,52,70,.035); }
#xz-panel .xz-capsule-nav button { min-height: 42px; border-radius: 999px; color: #687482; font-size: 12px; transition:background-color .16s ease,color .16s ease,box-shadow .16s ease,transform .16s ease; }
#xz-panel .xz-capsule-nav button:hover { background: #f1f3f7; color: #202834; transform:translateY(-1px); }
#xz-panel .xz-capsule-nav button:active { transform:scale(.98); }
#xz-panel .xz-capsule-nav button.active,#xz-panel .xz-capsule-nav button.active:hover { background: #242a34; color: #fff; box-shadow: 0 3px 8px rgba(27,34,46,.13); }
#xz-panel .xz-body { padding: 17px 17px 24px; overscroll-behavior: contain; }
#xz-panel .xz-card { min-width: 0; margin-bottom: 12px; padding: 16px 17px; border: 1px solid #e9ecf1; border-radius: 17px; background: #fff; box-shadow: 0 2px 9px rgba(42,52,70,.035); }
#xz-panel .xz-card-intro { position: relative; overflow: hidden; padding-top: 17px; padding-bottom: 15px; }
#xz-panel .xz-card-intro::after { content: ""; position: absolute; top: -43px; right: -21px; width: 120px; height: 112px; border-radius: 50%; background: radial-gradient(circle at 40% 40%,rgba(181,165,244,.38),rgba(191,219,255,.22) 48%,transparent 72%); pointer-events: none; }
#xz-panel .xz-sub-head { position: relative; z-index: 1; margin-bottom: 8px; }
#xz-panel .xz-sub-head .title { font-size: 19px; font-weight: 720; letter-spacing: -.025em; }
#xz-panel .xz-card-intro .xz-hint { position: relative; z-index: 1; margin: 0; padding: 0; border: 0; border-radius: 0; background: none; }
#xz-panel .xz-card-intro .xz-hint .ht { display: none; }
#xz-panel .xz-card-intro .xz-hint .hp { color: #687482; font-size: 12px; line-height: 1.7; }
#xz-panel .xz-card-settings .xz-opt-title { margin: 0 0 9px; color: #202834; font-size: 13px; font-weight: 690; }
#xz-panel .xz-card-settings .xz-row { min-height: 39px; border-color: #edf0f4; }
#xz-panel .xz-card-settings .xz-row:last-child { border-bottom: 0; }
#xz-panel .xz-card-settings .xz-toggle-group { margin: 11px 0 1px; }
#xz-panel .xz-toggle-group label.xz-lbl { min-height: 44px; border-color: #e4e8ef; background: #f7f8fa; color: #4d5868; transition: border-color .16s ease, background-color .16s ease, transform .16s ease; }
#xz-panel .xz-toggle-group label.xz-lbl:hover { border-color: #a993e8; background: #f5f2fe; transform: translateY(-1px); }
#xz-panel .xz-toggle-group label.xz-lbl:active { transform: translateY(0); }
#xz-panel .xz-toggle-group label.xz-lbl:has(input:checked) { border-color: #bba8ee; background: #f6f2ff; color: #4c3e7e; }
#xz-panel .xz-toggle-group input[type=checkbox] { display: grid; place-items: center; width: 16px; height: 16px; border: 1.5px solid #8893a2; border-radius: 50%; background: #fff; }
#xz-panel .xz-toggle-group input[type=checkbox]::after { content: ""; width: 6px; height: 3px; border-left: 1.5px solid #fff; border-bottom: 1.5px solid #fff; transform: translateY(-1px) rotate(-45deg); opacity: 0; }
#xz-panel .xz-toggle-group input[type=checkbox]:checked { border-color: #8065ce; background: #8065ce; box-shadow: none; }
#xz-panel .xz-toggle-group input[type=checkbox]:checked::after { opacity: 1; }
#xz-panel .xz-advanced { margin: 0 0 12px; padding: 0; border: 1px solid #e9ecf1; border-radius: 17px; background: #fff; box-shadow: 0 2px 9px rgba(42,52,70,.035); }
#xz-panel .xz-advanced summary { min-height: 49px; padding: 10px 16px; border: 0; border-radius: 17px; background: transparent; }
#xz-panel .xz-advanced summary:hover { background: #f8f9fc; }
#xz-panel .xz-advanced[open] { padding-bottom: 15px; }
#xz-panel .xz-advanced[open] summary { border-bottom: 1px solid #edf0f4; border-radius: 17px 17px 0 0; }
#xz-panel .xz-advanced > :not(summary) { margin-left: 16px !important; margin-right: 16px !important; }
#xz-panel .xz-advanced .xz-opt-title { color: #202834; }
#xz-panel .xz-advanced .xz-hint { background: #f7f5fc; }
#xz-panel .xz-btn { min-height: 46px; border-radius: 999px; transition: background-color .16s ease, box-shadow .16s ease, transform .16s ease; }
#xz-panel .xz-btn:not(:disabled):active { transform:scale(.985); box-shadow:none; }
#xz-panel .xz-btn-primary,#xz-panel .xz-btn-success { background: #8065ce; box-shadow: 0 4px 10px rgba(105,80,178,.16); }
#xz-panel .xz-btn-primary:hover,#xz-panel .xz-btn-success:hover { background: #6e54ba; box-shadow: 0 6px 16px rgba(105,80,178,.24); transform: translateY(-1px); }
#xz-panel .xz-btn-danger { border-color: #e6c9d1; background: #fff; color: #ad586e; }
#xz-panel .xz-action-dock { padding: 12px 17px 15px; border-color: #e8ebf1; background: rgba(255,255,255,.96); }
#xz-panel .xz-card-timer { background: linear-gradient(150deg,#fff 0%,#fff 62%,#f7f4ff 100%); }
#xz-panel .xz-card-timer #xz-reading-timer { font-size: 31px !important; color: #242a34 !important; }
#xz-panel .xz-card-timer input[type=number] { width: 43px !important; min-height: 34px; text-align: center; }
#xz-panel .xz-card-timer #xz-rd-apply { min-height: 34px; padding: 0 11px; border-radius: 999px !important; }
#xz-panel .xz-card-timer .xz-timer-caption,#xz-panel .xz-card-timer #xz-rd-page-elapsed,#xz-panel .xz-card-timer #xz-rd-page-pct,#xz-panel .xz-card-timer #xz-rd-current,#xz-panel #xz-progress-text { color:#687482 !important; }
#xz-panel .xz-sub-head .back { width: 34px; height: 34px; border-radius: 50%; }
#xz-panel .close { border-radius: 50%; }
#xz-panel .xz-header-about { padding: 5px 11px; border-radius: 999px; }
#xz-panel .xz-card-settings #xz-btn-export { margin-top: 9px; }
#xz-panel .xz-layout-row { justify-content:space-between; }
#xz-panel .xz-small-action { min-height:32px; padding:5px 12px; border:1px solid #d9d2ef; border-radius:999px; background:#fff; color:#634ca7; font-family:inherit;font-size:11px;font-weight:600;line-height:1.3; cursor:pointer; transition:background-color .16s ease,transform .16s ease; }
#xz-panel .xz-small-action:hover { background:#f3efff; transform:translateY(-1px); }
#xz-panel .xz-small-action:active { transform:scale(.98); }
#xz-panel .xz-resize-grip { position:absolute; bottom:0; left:0; z-index:3; width:24px; height:24px; padding:0; border:0; border-radius:0 12px 0 0; background:transparent; color:#8a77c3; cursor:nesw-resize; touch-action:none; }
#xz-panel .xz-resize-grip::before { content:""; position:absolute; bottom:6px; left:5px; width:10px; height:10px; border-left:2px solid currentColor; border-bottom:2px solid currentColor; transform:skew(8deg,8deg); opacity:.72; }
#xz-panel .xz-resize-grip:hover { background:rgba(138,114,211,.13); color:#7257bf; }
#xz-panel.xz-dark { --xz-canvas:#191b29; --xz-surface:#272b3b; --xz-ink:#f2f2fa; --xz-muted:#b8c0d1; --xz-line:#3b4054; --xz-pine:#bba3f1; --xz-pine-hover:#cdbaf5; --xz-tint:#37344d; border-color:#48465c; background:linear-gradient(150deg,#1a1d2b 0%,#1d2030 60%,#252037 100%); color-scheme:dark; box-shadow:0 24px 64px rgba(4,5,14,.48),0 4px 16px rgba(4,5,14,.2); }
#xz-panel.xz-dark .xz-head { position:relative; border-color:#383d50; background:#212433; }
#xz-panel.xz-dark .xz-head::before { content:""; position:absolute; top:0; right:0; left:0; height:2px; background:linear-gradient(90deg,#8e72d6,#b7a2ed 55%,#91afd9); }
#xz-panel.xz-dark .xz-action-dock { border-color:#383d50; background:#202334; }
#xz-panel.xz-dark .brand .ver { color:#b8c0d1; }
#xz-panel.xz-dark .close:hover,#xz-panel.xz-dark .xz-header-about:hover { background:#393850; color:#f2edff; }
#xz-panel.xz-dark .xz-capsule-nav { border-color:#3d4056; background:#292c3e; box-shadow:0 3px 10px rgba(5,7,18,.12); }
#xz-panel.xz-dark .xz-capsule-nav button { color:#bec5d5; }
#xz-panel.xz-dark .xz-capsule-nav button:hover { background:#3c4054; color:#fff; }
#xz-panel.xz-dark .xz-capsule-nav button.active,#xz-panel.xz-dark .xz-capsule-nav button.active:hover { background:#c1aaf2; color:#242235; box-shadow:0 3px 10px rgba(12,8,29,.24); }
#xz-panel.xz-dark .xz-capsule-nav button.active:hover { background:#cfbcf7; }
#xz-panel.xz-dark .xz-card,#xz-panel.xz-dark .xz-advanced { border-color:#3d4256; background:#282c3c; box-shadow:0 5px 16px rgba(4,6,17,.13); }
#xz-panel.xz-dark .xz-card-intro { border-color:#5c5278; background:linear-gradient(130deg,#3a3453 0%,#2c2d43 58%,#2a3449 100%); }
#xz-panel.xz-dark .xz-card-intro .xz-hint .hp { color:#c6cad8; }
#xz-panel.xz-dark .xz-card-settings .xz-opt-title,#xz-panel.xz-dark .xz-advanced .xz-opt-title { color:#f3f2fa; }
#xz-panel.xz-dark .xz-card-settings .xz-row { border-color:#3e4356; }
#xz-panel.xz-dark .xz-card-intro::after { background:radial-gradient(circle at 40% 40%,rgba(175,147,247,.28),rgba(109,145,204,.11) 48%,transparent 74%); }
#xz-panel.xz-dark .xz-toggle-group label.xz-lbl { border-color:#4b5269; background:#303648; color:#d8dce9; }
#xz-panel.xz-dark .xz-toggle-group label.xz-lbl:hover { border-color:#9f8bdb; background:#3a3954; }
#xz-panel.xz-dark .xz-toggle-group label.xz-lbl:has(input:checked) { border-color:#8874bd; background:#403957; color:#f4efff; }
#xz-panel.xz-dark .xz-toggle-group input[type=checkbox] { border-color:#9ea9bd; background:#303648; }
#xz-panel.xz-dark .xz-toggle-group input[type=checkbox]:checked { border-color:#c1aaf2; background:#c1aaf2; }
#xz-panel.xz-dark .xz-toggle-group input[type=checkbox]:checked::after { border-color:#242235; }
#xz-panel.xz-dark .xz-advanced summary:hover { background:#34394d; }
#xz-panel.xz-dark .xz-advanced[open] summary { border-color:#3e4356; }
#xz-panel.xz-dark .xz-advanced .xz-hint { background:#37364f; }
#xz-panel.xz-dark input[type=number] { border-color:#5d6079; background:#222638; color:#f2f2fa; }
#xz-panel.xz-dark .xz-card-timer { background:linear-gradient(150deg,#292c3e,#32304b); }
#xz-panel.xz-dark .xz-card-timer #xz-reading-timer { color:#f4f1ff !important; }
#xz-panel.xz-dark .xz-card-timer .xz-timer-caption,#xz-panel.xz-dark .xz-card-timer #xz-rd-page-elapsed,#xz-panel.xz-dark .xz-card-timer #xz-rd-page-pct,#xz-panel.xz-dark .xz-card-timer #xz-rd-current,#xz-panel.xz-dark #xz-progress-text { color:#b8c0d1 !important; }
#xz-panel.xz-dark .xz-btn-primary,#xz-panel.xz-dark .xz-btn-success { background:#b79cef; color:#211d32; box-shadow:0 5px 16px rgba(5,5,18,.23); }
#xz-panel.xz-dark .xz-btn-primary:hover,#xz-panel.xz-dark .xz-btn-success:hover { background:#c9b4f5; color:#211d32; }
#xz-panel.xz-dark .xz-btn-danger { border-color:#79586e; background:#332b3d; color:#f5bfce; }
#xz-panel.xz-dark .xz-small-action { border-color:#655c83; background:#302c47; color:#d6c6ff; }
#xz-panel.xz-dark .xz-small-action:hover { background:#403858; }
#xz-panel.xz-dark .xz-resize-grip { color:#bba3f1; }
#xz-panel.xz-dark .xz-resize-grip:hover { background:rgba(187,163,241,.16); }
@media (max-width: 480px) {
  #xz-panel { top: 12px !important; right: 12px !important; left: 12px !important; width: auto; max-width: none; max-height: calc(100dvh - 24px); }
  #xz-panel .xz-head { padding: 16px 17px 15px; }
  #xz-panel .xz-capsule-nav { margin: 12px 15px 0; }
  #xz-panel .xz-body { padding: 18px 17px 22px; }
  #xz-panel .xz-action-dock { padding: 11px 17px 14px; }
  #xz-panel .xz-card { padding: 14px; }
  #xz-panel .xz-resize-grip { display:none; }
}
@media (prefers-reduced-motion: reduce) {
  #xz-panel, #xz-panel * { transition-duration: .01ms !important; animation-duration: .01ms !important; }
}

/* v4.4.3: a single lavender workspace with clear, quiet control groups. */
#xz-panel {
  --xz-canvas: #f2edfc;
  --xz-surface: #fffefd;
  --xz-ink: #29243d;
  --xz-muted: #716a86;
  --xz-line: #e4dcf1;
  --xz-pine: #7350c4;
  --xz-pine-hover: #6342b3;
  --xz-tint: #eee7fb;
  border-color: #e2d8f2;
  background: linear-gradient(158deg,#f8f4ff 0%,#eee5fc 58%,#f4efff 100%);
  box-shadow: 0 24px 70px rgba(66,42,116,.19),0 5px 18px rgba(66,42,116,.07);
}
#xz-panel .xz-head { padding: 19px 20px 16px; border-bottom: 0; background: transparent; }
#xz-panel .brand .logo { width: 42px; height: 42px; margin-right: 12px; border-radius: 13px; box-shadow: 0 3px 9px rgba(88,55,141,.12); }
#xz-panel .brand .name { margin-top: 1px; font-size: 17px; color: #32234e; }
#xz-panel .brand .ver { margin-top: 3px; color: #776b90; }
#xz-panel .xz-capsule-nav { margin: 4px 18px 0; padding: 4px; border-color: #ddd1ed; background: rgba(255,255,255,.54); box-shadow: inset 0 1px 3px rgba(74,50,108,.05); }
#xz-panel .xz-capsule-nav button { min-height: 40px; color: #6e6088; font-weight: 650; }
#xz-panel .xz-capsule-nav button:hover { background: rgba(255,255,255,.78); color: #4a316f; transform: none; }
#xz-panel .xz-capsule-nav button.active,#xz-panel .xz-capsule-nav button.active:hover { background: #fff; color: #5c37a2; box-shadow: 0 2px 8px rgba(66,42,116,.12); }
#xz-panel .xz-capsule-nav button.active::before { content: ""; position: absolute; right: 24%; bottom: 4px; left: 24%; height: 2px; border-radius: 2px; background: #8d6bd4; }
#xz-panel .xz-body { padding: 17px 18px 22px; scrollbar-color: #bba9dd transparent; }
#xz-panel .xz-card { margin-bottom: 0; border: 0; box-shadow: none; background: #fffefd; }
#xz-panel .xz-card-intro { min-height: 139px; margin-bottom: 15px; padding: 21px 21px 18px; border: 1px solid #cfc0ed; border-radius: 22px; background: linear-gradient(125deg,#eadfff 0%,#e7dcfb 57%,#d9cef3 100%); }
#xz-panel .xz-card-intro::after { top: -30px; right: -24px; width: 142px; height: 142px; border: 1px solid rgba(255,255,255,.35); background: radial-gradient(circle at 35% 38%,rgba(255,255,255,.44),rgba(255,255,255,0) 65%); }
#xz-panel .xz-card-intro .xz-sub-head { margin-bottom: 11px; }
#xz-panel .xz-card-intro .xz-sub-head .title { color: #442b73; font-size: 23px; font-weight: 750; letter-spacing: -.035em; }
#xz-panel .xz-card-intro .xz-hint .hp { max-width: 285px; color: #5c4c7b; font-size: 12px; line-height: 1.65; }
#xz-panel .xz-card-settings { padding: 17px 18px 18px; border: 1px solid #e8def3; border-radius: 0; }
#xz-panel .xz-card-intro + .xz-card-settings { border-radius: 19px 19px 0 0; }
#xz-panel .xz-card-settings + .xz-card-settings { border-top: 1px solid #eee9f4; border-radius: 0 0 19px 19px; }
#xz-panel .xz-card-settings:not(:has(+ .xz-card-settings)) { border-radius: 0 0 19px 19px; }
#xz-panel #xz-sec-export .xz-card-settings,#xz-panel #xz-sec-reading .xz-card-settings { border-radius: 19px; }
#xz-panel .xz-card-settings .xz-opt-title { margin: 0 0 10px; color: #4a366d; font-size: 13px; font-weight: 720; }
#xz-panel .xz-card-settings .xz-row { min-height: 42px; justify-content: space-between; gap: 8px; border-color: #f0ebf5; font-size: 12px; }
#xz-panel .xz-card-settings .xz-row input { margin-left: auto; }
#xz-panel .xz-card-settings .xz-row:last-child { border-bottom: 0; }
#xz-panel input[type=number] { min-height: 32px; border-color: #d9cceb; border-radius: 9px; background: #fff; text-align: center; font-variant-numeric: tabular-nums; }
#xz-panel .xz-toggle-group { gap: 9px; }
#xz-panel .xz-toggle-group label.xz-lbl { min-height: 43px; border-color: #e8dff3; background: #faf7ff; color: #695b7e; font-weight: 630; }
#xz-panel .xz-toggle-group label.xz-lbl:hover { border-color: #bda6e8; background: #f3ecff; transform: none; }
#xz-panel .xz-toggle-group label.xz-lbl:has(input:checked) { border-color: #b89ce9; background: #ede2ff; color: #513285; }
#xz-panel .xz-toggle-group input[type=checkbox]:checked { border-color: #7c55c7; background: #7c55c7; }
#xz-panel .xz-advanced { margin: 14px 0 0; border-color: #e4d8ef; border-radius: 16px; background: rgba(255,255,255,.72); box-shadow: none; }
#xz-panel .xz-advanced summary { min-height: 52px; border-radius: 16px; }
#xz-panel .xz-advanced[open] summary { border-radius: 16px 16px 0 0; }
#xz-panel .xz-btn-primary,#xz-panel .xz-btn-success { background: #7753c7; box-shadow: 0 5px 14px rgba(90,57,166,.18); }
#xz-panel .xz-btn-primary:hover,#xz-panel .xz-btn-success:hover { background: #6843b9; box-shadow: 0 7px 16px rgba(90,57,166,.23); }
#xz-panel .xz-action-dock { border-color: #ded2ef; background: rgba(249,245,255,.95); box-shadow: 0 -5px 17px rgba(72,49,114,.06); }
#xz-panel .xz-card-timer { margin-bottom: 14px; border: 1px solid #e5dbf1; border-radius: 19px; background: #fffefd; }
#xz-panel .xz-card-timer #xz-reading-timer { color: #4d2f85 !important; }
#xz-panel .xz-home-action { border-color: #dbc9f5; border-radius: 18px; background: #fffefd; }
#xz-panel .xz-context { border-color: #d2beef; border-radius: 19px; background: linear-gradient(120deg,#efe5ff,#e3d6fb); }
#xz-panel .xz-header-about:hover,#xz-panel .close:hover { background: rgba(255,255,255,.65); }
#xz-panel.xz-dark { --xz-canvas:#231d35; --xz-surface:#302941; --xz-ink:#f5f0ff; --xz-muted:#c8bfd7; --xz-line:#524564; --xz-pine:#c6a6ff; --xz-pine-hover:#d5bcff; --xz-tint:#3e3157; border-color:#57476b; background:linear-gradient(155deg,#2e2543 0%,#241d36 61%,#312547 100%); }
#xz-panel.xz-dark .xz-head { background: transparent; border: 0; }
#xz-panel.xz-dark .xz-head::before { display: none; }
#xz-panel.xz-dark .brand .name { color: #f6efff; }
#xz-panel.xz-dark .brand .ver { color: #c8bbdc; }
#xz-panel.xz-dark .xz-capsule-nav { border-color:#56476e; background:rgba(16,12,28,.25); }
#xz-panel.xz-dark .xz-capsule-nav button { color:#cfc0e7; }
#xz-panel.xz-dark .xz-capsule-nav button:hover { background:#493b60; color:#fff; }
#xz-panel.xz-dark .xz-capsule-nav button.active,#xz-panel.xz-dark .xz-capsule-nav button.active:hover { background:#5b447d; color:#fff; box-shadow:0 3px 9px rgba(0,0,0,.17); }
#xz-panel.xz-dark .xz-capsule-nav button.active::before { background:#d9baff; }
#xz-panel.xz-dark .xz-card-intro { border-color:#735d98; background:linear-gradient(125deg,#5f4a83,#4c3b6b 58%,#423654); }
#xz-panel.xz-dark .xz-card-intro::after { border-color:rgba(255,255,255,.12); background:radial-gradient(circle at 35% 38%,rgba(194,159,255,.24),transparent 65%); }
#xz-panel.xz-dark .xz-card-intro .xz-sub-head .title { color:#fff6ff; }
#xz-panel.xz-dark .xz-card-intro .xz-hint .hp { color:#e5d8f2; }
#xz-panel.xz-dark .xz-card-settings,#xz-panel.xz-dark .xz-card-timer { border-color:#4f4263; background:#30283f; box-shadow:none; }
#xz-panel.xz-dark .xz-card-settings + .xz-card-settings { border-top-color:#473a59; }
#xz-panel.xz-dark .xz-card-settings .xz-opt-title { color:#ecddff; }
#xz-panel.xz-dark .xz-card-settings .xz-row { border-color:#483b59; }
#xz-panel.xz-dark .xz-toggle-group label.xz-lbl { border-color:#59496e; background:#3a304d; color:#ded2ed; }
#xz-panel.xz-dark .xz-toggle-group label.xz-lbl:hover { border-color:#aa8adc; background:#46365f; }
#xz-panel.xz-dark .xz-toggle-group label.xz-lbl:has(input:checked) { border-color:#a582dd; background:#56416f; color:#fff; }
#xz-panel.xz-dark .xz-advanced { border-color:#544469; background:#30283f; box-shadow:none; }
#xz-panel.xz-dark .xz-advanced summary:hover { background:#40334f; }
#xz-panel.xz-dark .xz-action-dock { border-color:#514166; background:rgba(37,29,54,.96); }
#xz-panel.xz-dark .xz-card-timer #xz-reading-timer { color:#ead7ff !important; }
#xz-panel.xz-dark .xz-context { border-color:#735d98; background:linear-gradient(125deg,#5f4a83,#46365f); }
#xz-panel .xz-easter-trigger { display:block; padding:2px 6px; margin-left:-6px; border:0; border-radius:7px; background:transparent; font:inherit; text-align:left; cursor:pointer; }
#xz-panel .xz-easter-trigger:hover { color:var(--xz-pine); background:var(--xz-tint); }
#xz-panel .xz-easter[hidden] { display:none; }
#xz-panel .xz-easter { position:absolute; inset:0; z-index:8; display:grid; place-items:center; padding:24px; background:linear-gradient(155deg,#f8f3ff 0%,#e5d6ff 55%,#cdb7f5 100%); color:#432a70; text-align:center; }
#xz-panel .xz-easter::before,#xz-panel .xz-easter::after { content:""; position:absolute; width:260px; height:260px; border:1px solid rgba(255,255,255,.55); border-radius:50%; pointer-events:none; }
#xz-panel .xz-easter::after { width:340px; height:340px; opacity:.5; }
#xz-panel .xz-easter-close { position:absolute; top:17px; right:17px; z-index:1; width:38px; height:38px; border:1px solid rgba(90,60,140,.17); border-radius:50%; background:rgba(255,255,255,.6); color:#513679; font:26px/1 inherit; cursor:pointer; }
#xz-panel .xz-easter-content { position:relative; z-index:1; display:flex; flex-direction:column; align-items:center; max-width:280px; }
#xz-panel .xz-easter-stars { margin-bottom:22px; color:#8f6bc8; font-size:22px; letter-spacing:12px; }
#xz-panel .xz-easter-mascot { width:126px; height:126px; padding:13px; border:1px solid rgba(255,255,255,.7); border-radius:35px; background:rgba(255,255,255,.62); box-shadow:0 18px 35px rgba(92,54,149,.2); cursor:pointer; }
#xz-panel .xz-easter-mascot img { display:block; width:100%; height:100%; object-fit:contain; }
#xz-panel .xz-easter-pop { animation:xz-easter-bounce .48s ease both; }
@keyframes xz-easter-bounce { 0%,100%{transform:rotate(0) scale(1)} 35%{transform:rotate(-9deg) scale(1.1)} 70%{transform:rotate(7deg) scale(.97)} }
#xz-panel .xz-easter-title { margin-top:24px; font-size:25px; font-weight:760; letter-spacing:-.035em; }
#xz-panel .xz-easter p { min-height:42px; margin:10px 0 28px; color:#654c88; font-size:13px; line-height:1.6; }
#xz-panel .xz-easter-note { color:#826aa5; font-size:11px; }
#xz-panel.xz-dark .xz-easter { background:linear-gradient(155deg,#3d2f5c,#2a203f 55%,#493563); color:#f5eaff; }
#xz-panel.xz-dark .xz-easter p,#xz-panel.xz-dark .xz-easter-note { color:#d7c5ed; }
#xz-panel.xz-dark .xz-easter-close { background:#514069; color:#fff; }
#xz-panel.xz-dark .xz-easter-mascot { background:#5b4875; border-color:#80679f; }
#xz-panel .xz-locate-action { width:100%; min-height:39px; margin:4px 0 0 !important; font-size:12px; }
#xz-panel .xz-locate-action:disabled { opacity:.58; box-shadow:none; }
#xz-panel .xz-locate-status { min-height:18px; margin-top:8px; color:var(--xz-muted); font-size:11px; line-height:1.6; overflow-wrap:anywhere; }
/* Keep the operating system's ordinary arrow cursor throughout the assistant. */
#xz-panel .xz-head,#xz-panel :is(button,summary,label),#xz-toggle,#xz-float-log button { cursor:default !important; }
@media (max-width:480px) {
  #xz-panel .xz-head { padding:16px 17px 14px; }
  #xz-panel .xz-body { padding:14px 15px 20px; }
  #xz-panel .xz-card-intro { min-height: 0; padding:18px; }
  #xz-panel .xz-card-settings { padding:15px; }
}

/* Toggle capsules respond smoothly without shifting their layout. */
#xz-panel .xz-toggle-group label.xz-lbl {
  transition: border-color .14s ease-out, background-color .14s ease-out, color .14s ease-out, box-shadow .14s ease-out, transform .14s ease-out;
}
#xz-panel .xz-toggle-group label.xz-lbl:hover { box-shadow: 0 2px 8px rgba(76,54,120,.09); }
#xz-panel .xz-toggle-group label.xz-lbl:active { transform: scale(.985); box-shadow: none; }
#xz-panel.xz-dark .xz-toggle-group label.xz-lbl:hover { box-shadow: 0 2px 8px rgba(0,0,0,.18); }

/* Dark appearance: neutral graphite surfaces with a restrained lavender accent. */
#xz-panel.xz-dark {
  --xz-canvas:#1b1d24;
  --xz-surface:#252831;
  --xz-ink:#eef0f5;
  --xz-muted:#a8adba;
  --xz-line:#383b46;
  --xz-pine:#b8a8e8;
  --xz-pine-hover:#c8bbef;
  --xz-tint:#30313d;
  --xz-alert:#e5a9b3;
  border-color:#3b3d49;
  background:radial-gradient(ellipse at 100% 0%,rgba(126,104,176,.14),transparent 38%),linear-gradient(160deg,#22242c 0%,#1a1c23 100%);
  box-shadow:0 26px 72px rgba(4,5,10,.38),0 4px 14px rgba(5,6,12,.22);
}
#xz-panel.xz-dark .xz-head { border-bottom:1px solid #343742; background:rgba(31,33,41,.78); }
#xz-panel.xz-dark .brand .name { color:#f1f1f6; }
#xz-panel.xz-dark .brand .ver { color:#a9adba; }
#xz-panel.xz-dark .xz-capsule-nav { border-color:#3b3e49; background:#24262e; box-shadow:inset 0 1px 2px rgba(0,0,0,.22); }
#xz-panel.xz-dark .xz-capsule-nav button { color:#b9bdc8; }
#xz-panel.xz-dark .xz-capsule-nav button:hover { background:#30333d; color:#f4f3f8; }
#xz-panel.xz-dark .xz-capsule-nav button.active,
#xz-panel.xz-dark .xz-capsule-nav button.active:hover { background:#b4a1e6; color:#211d2c; box-shadow:0 2px 8px rgba(0,0,0,.2); }
#xz-panel.xz-dark .xz-capsule-nav button.active::before { background:#7b62b7; }
#xz-panel.xz-dark .xz-body { scrollbar-color:#625a72 transparent; }
#xz-panel.xz-dark .xz-card-intro {
  border-color:#41404e;
  background:radial-gradient(ellipse at 100% 0%,rgba(151,128,207,.18),transparent 48%),linear-gradient(140deg,#2b2d37,#262831 72%);
}
#xz-panel.xz-dark .xz-card-intro::after { border-color:rgba(211,199,239,.1); background:radial-gradient(circle,rgba(178,157,226,.12),transparent 69%); }
#xz-panel.xz-dark .xz-card-intro .xz-sub-head .title { color:#f1edf9; }
#xz-panel.xz-dark .xz-card-intro .xz-hint .hp { color:#c0c2cc; }
#xz-panel.xz-dark .xz-card-settings,
#xz-panel.xz-dark .xz-card-timer { border-color:#383b46; background:#242730; box-shadow:none; }
#xz-panel.xz-dark .xz-card-settings + .xz-card-settings { border-top-color:#383b46; }
#xz-panel.xz-dark .xz-card-settings .xz-opt-title,
#xz-panel.xz-dark .xz-advanced .xz-opt-title { color:#ded9eb; }
#xz-panel.xz-dark .xz-card-settings .xz-row { border-color:#373a44; color:#e5e6ec; }
#xz-panel.xz-dark input[type=number] { border-color:#454955; background:#1e2027; color:#eff0f5; }
#xz-panel.xz-dark .xz-toggle-group label.xz-lbl { border-color:#414550; background:#292c34; color:#c3c5cf; }
#xz-panel.xz-dark .xz-toggle-group label.xz-lbl:hover { border-color:#746a8c; background:#30323c; }
#xz-panel.xz-dark .xz-toggle-group label.xz-lbl:has(input:checked) { border-color:#8877b4; background:#383342; color:#ede8f7; }
#xz-panel.xz-dark .xz-toggle-group input[type=checkbox]:checked { border-color:#b8a8e8; background:#b8a8e8; box-shadow:inset 0 0 0 3px #383342; }
#xz-panel.xz-dark .xz-advanced { border-color:#393c47; background:#242730; box-shadow:none; }
#xz-panel.xz-dark .xz-advanced summary { border-color:#41444e; background:#292c34; color:#e5e6ed; }
#xz-panel.xz-dark .xz-advanced summary:hover { border-color:#5a536b; background:#30323c; }
#xz-panel.xz-dark .xz-advanced[open] summary { border-color:#41444e; }
#xz-panel.xz-dark .xz-advanced .xz-hint { background:#302f39; }
#xz-panel.xz-dark .xz-btn-primary,
#xz-panel.xz-dark .xz-btn-success { background:linear-gradient(110deg,#b3a0e5,#9983d4); color:#211d2c; box-shadow:0 4px 12px rgba(0,0,0,.22); }
#xz-panel.xz-dark .xz-btn-primary:hover,
#xz-panel.xz-dark .xz-btn-success:hover { background:linear-gradient(110deg,#c4b4ed,#ab98df); color:#211d2c; }
#xz-panel.xz-dark .xz-btn-danger { border-color:#694d59; background:#30272e; color:#eab5bf; }
#xz-panel.xz-dark .xz-btn:disabled { border-color:#3b3e49; background:#30323a; color:#999daa; }
#xz-panel.xz-dark .xz-home-action { border-color:#3d404a; background:#272a32; color:#ebebf1; }
#xz-panel.xz-dark .xz-home-action:hover,
#xz-panel.xz-dark .xz-home-secondary button:hover { background:#30323c; color:#e5dcf7; }
#xz-panel.xz-dark .xz-context { border-color:#454251; background:radial-gradient(ellipse at 100% 0%,rgba(141,116,194,.14),transparent 54%),#292b34; }
#xz-panel.xz-dark .xz-action-dock { border-color:#383b46; background:rgba(31,33,40,.97); box-shadow:0 -5px 16px rgba(0,0,0,.16); }
#xz-panel.xz-dark .xz-card-timer #xz-reading-timer { color:#e9e2f7 !important; }
#xz-panel.xz-dark .xz-card-timer .xz-timer-caption,
#xz-panel.xz-dark .xz-card-timer #xz-rd-page-elapsed,
#xz-panel.xz-dark .xz-card-timer #xz-rd-page-pct,
#xz-panel.xz-dark .xz-card-timer #xz-rd-current,
#xz-panel.xz-dark #xz-progress-text { color:#a9adba !important; }
#xz-panel.xz-dark .xz-small-action { border-color:#474451; background:#2b2b35; color:#d0c7e3; }
#xz-panel.xz-dark .xz-small-action:hover { background:#37343f; }
#xz-panel.xz-dark .xz-resize-grip { color:#a99acb; }
#xz-panel.xz-dark .xz-resize-grip:hover { background:rgba(184,168,232,.1); }
#xz-panel.xz-dark .xz-easter { background:radial-gradient(ellipse at 50% 25%,#373143,#202129 70%); color:#f0edf6; }
#xz-panel.xz-dark .xz-easter p,
#xz-panel.xz-dark .xz-easter-note { color:#c2bdca; }
#xz-panel.xz-dark .xz-easter-mascot { border-color:#4c4857; background:#302d37; }
#xz-panel.xz-dark .xz-easter-close { border-color:#494551; background:#302d37; color:#efebf5; }

/* Preserve the OS cursor while using pointer capture so drags remain recoverable at screen edges. */
#xz-panel .xz-head { touch-action:none; }
#xz-panel .xz-head,#xz-panel .xz-resize-grip,#xz-toggle { cursor:default !important; }`,
      '</style>',

      /* 顶栏 - 可拖动 */
      '<div class="xz-head">',
      '  <button class="close" id="xz-close" aria-label="关闭助手面板">&times;</button>',
      '  <button type="button" class="xz-header-about" data-goto="about" aria-label="查看关于与设置">关于</button>',
      '  <div class="brand">',
      '    <img class="logo" src="'+LOGO_URI+'" width="38" height="38" alt="小蟑螂">',
      '    <div class="brand-text"><div class="name">莞工小蟑螂</div><div class="ver">'+pageName+' · v4.4.11</div></div>',
      '  </div>',
      '</div>',

      isRelevantPage ? [
        '<nav class="xz-capsule-nav" aria-label="功能切换">',
        isAutoPage ? '  <button type="button" data-goto="auto" aria-pressed="false">自动刷课</button>' : '',
        '  <button type="button" data-goto="export" aria-pressed="false">题库导出</button>',
        isAutoPage ? '  <button type="button" data-goto="reading" aria-pressed="false">读书计时</button>' : '',
        '</nav>'
      ].join('') : '',

      /* 内容区 - 可滚动 */
      '<div class="xz-body">',

      /* ---- 仅非相关页面显示进入指引 ---- */
      '<div class="sec" id="xz-sec-home">',
      '  <div class="xz-context">',
      '    <div class="xz-context-label"><span class="xz-context-dot'+(isRelevantPage?'':' xz-context-unknown')+'"></span>当前页面</div>',
      '    <div class="xz-context-title">'+pageName+'</div>',
      '    <p>'+pageIntro+'</p>',
      '  </div>',
      '<div class="xz-home-guide"><strong>打开课程后使用</strong><span>进入课件学习页、课程目录或训练页面，再打开面板。</span></div>',
      '</div>',

      /* ---- 题库导出 ---- */
      isRelevantPage ? [
        '<div class="sec" id="xz-sec-export">',
        '  <div class="xz-card xz-card-intro">',
        '  <div class="xz-sub-head">',
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
        '  </div>',
        '  <div class="xz-card xz-card-settings">',
        IS_COURSE ? '<label class="xz-lbl"><input type="checkbox" id="xz-log"> 显示调试日志</label>' : '',
        IS_COURSE
          ? '<button class="xz-btn xz-btn-primary" id="xz-btn-export">开始导出课件题库</button>'
          : '<button class="xz-btn xz-btn-primary" id="xz-btn-export">开始导出训练题库</button>',
        '  <div id="xz-export-progress" style="display:none;margin-top:10px;" role="status" aria-live="polite">',
        '    <div style="background:rgba(0,0,0,.06);border-radius:6px;height:4px;overflow:hidden;"><div id="xz-progress-bar" style="background:linear-gradient(90deg,#4a90d9,#357abd);height:100%;width:0%;transition:width .3s;border-radius:6px;"></div></div>',
        '    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:5px;"><span id="xz-progress-text" style="font-size:11px;color:#aaa;"></span><button id="xz-btn-cancel" style="background:none;border:1px solid rgba(255,77,79,.2);color:#ff4d4f;font-size:11px;cursor:pointer;padding:3px 10px;border-radius:6px;transition:background .15s,color .15s;">取消</button></div>',
        '  </div>',
        '  <div id="xz-export-hint" class="xz-hint xz-export-result" role="status" aria-live="polite"><div class="hint-title"></div><div class="hint-text hp"></div></div>',
        '  <div class="xz-st" id="xz-st" role="status" aria-live="polite"></div>',
        '  <div class="xz-log" id="xz-log-box"></div>',
        '  </div>',
        '</div>'
      ].join('') : '',

      // 自动刷课
      isAutoPage ? [
        '<div class="sec" id="xz-sec-auto">',
        '  <div class="xz-card xz-card-intro">',
        '  <div class="xz-sub-head">',
        '    <div class="title">自动刷课</div>',
        '  </div>',
        '  <div class="xz-hint">',
        '    <div class="ht">使用说明</div>',
        '    <div class="hp">自动播放视频并静音，答题时自动填写答案，完成后自动翻页。可自定义倍速、停留时间和答题正确率。</div>',
        '  </div>',
        '  </div>',

        '  <div class="xz-card xz-card-settings">',
        '  <div class="xz-opt-title">播放设置</div>',
        '  <div class="xz-row">播放倍速: <input type="number" id="xz-rate" aria-label="播放倍速" value="'+cfg.rate+'" step="0.5" min="1" max="15"> x</div>',
        '  <div class="xz-row">页面停留: <input type="number" id="xz-stay" aria-label="页面停留秒数" value="'+cfg.stayTime+'" step="1" min="0" max="120"> 秒后翻页</div>',
        '  <div class="xz-toggle-group">',
        '    <label class="xz-lbl"><input type="checkbox" id="xz-auto-mute" '+(cfg.autoMute?'checked':'')+'> 自动静音</label>',
        '    <label class="xz-lbl"><input type="checkbox" id="xz-auto-play" '+(cfg.autoPlay?'checked':'')+'> 自动播放</label>',
        '  </div>',
        '  </div>',

        '  <div class="xz-card xz-card-settings">',
        '  <div class="xz-opt-title">答题设置</div>',
        '  <div class="xz-toggle-group">',
        '    <label class="xz-lbl"><input type="checkbox" id="xz-auto-answer" '+(cfg.autoAnswer?'checked':'')+'> 自动答题</label>',
        '    <label class="xz-lbl"><input type="checkbox" id="xz-auto-submit" '+(cfg.autoSubmit?'checked':'')+'> 自动提交</label>',
        '  </div>',
        '  <div class="xz-row" style="margin-top:6px;">答题间隔: <input type="number" id="xz-answer-delay" aria-label="答题间隔毫秒数" value="'+(cfg.answerDelay||500)+'" step="100" min="100" max="5000"> 毫秒</div>',
        '  </div>',

        '  <details class="xz-advanced" id="xz-advanced">',
        '    <summary>高级设置 <span>正确率、翻页、页面定位</span></summary>',
        '  <div class="xz-opt-title" style="margin-top:13px;">正确率控制</div>',
        '  <div class="xz-hint" style="margin:4px 0 6px;padding:10px 12px;">',
        '    <div class="hp" style="line-height:1.7;">',
        '      输入单个数字如 <strong>98</strong> 表示固定 98% 正确率<br>',
        '      输入区间如 <strong>95-98</strong> 表示在 95%~98% 之间随机<br>',
        '      设为 <strong>100</strong> 则全部答对（默认值）',
        '    </div>',
        '  </div>',
        '  <div class="xz-row">最低正确率: <input type="number" id="xz-acc-min" aria-label="最低正确率百分比" value="'+cfg.accuracyMin+'" step="1" min="0" max="100"> %</div>',
        '  <div class="xz-row">最高正确率: <input type="number" id="xz-acc-max" aria-label="最高正确率百分比" value="'+cfg.accuracyMax+'" step="1" min="0" max="100"> %</div>',

        '  <div class="xz-divider"></div>',
        '  <div class="xz-opt-title">翻页设置</div>',
        '  <div class="xz-toggle-group"><label class="xz-lbl"><input type="checkbox" id="xz-auto-next" '+(cfg.autoNext?'checked':'')+'> 自动翻页</label></div>',
        '  <div class="xz-row">最大重试: <input type="number" id="xz-max-retry" aria-label="翻页最大重试次数" value="'+cfg.maxRetry+'" step="1" min="1" max="20"> 次</div>',
        '  <div class="xz-divider"></div>',
        '  <div class="xz-opt-title">页面定位</div>',
        '  <button type="button" class="xz-small-action xz-locate-action" id="xz-locate-pending">前往首个未标记完成页</button>',
        '  <div class="xz-locate-status" id="xz-locate-status" role="status" aria-live="polite">依据平台页签标记定位，不自动开始学习。</div>',
        '  </details>',

      '  <div class="xz-divider"></div>',
      '  <div class="xz-log" id="xz-auto-log" style="margin-top:6px;"></div>',
        '</div>'
      ].join('') : '',

      /* ---- 读书挂机 ---- */
      isAutoPage ? [
        '<div class="sec" id="xz-sec-reading">',
        '  <div class="xz-card xz-card-intro">',
        '  <div class="xz-sub-head">',
        '    <div class="title">读书计时</div>',
        '  </div>',
        '  <div class="xz-hint">',
        '    <div class="ht">求是读书计划</div>',
        '    <div class="hp">按设置的时长记录停留并确认翻页，可自动处理暂停弹窗。学习记录和学分以平台实际结果为准。</div>',
        '  </div>',
        '  </div>',
        '',
        '  <div class="xz-card xz-card-timer">',
        '  <div style="text-align:center;margin:12px 0 4px;">',
        '    <div id="xz-reading-timer" style="font-size:28px;font-weight:700;color:#1a1a2e;letter-spacing:2px;font-variant-numeric:tabular-nums;">04:00:00</div>',
        '    <div class="xz-timer-caption" style="font-size:11px;margin-top:2px;">当前页剩余时间</div>',
        '  </div>',
        '',
        '  <div style="margin:8px 0;">',
        '    <div style="background:rgba(0,0,0,.06);border-radius:6px;height:6px;overflow:hidden;">',
        '      <div id="xz-rd-bar" style="background:linear-gradient(90deg,#40c057,#2f9e44);height:100%;width:0%;transition:width 1s linear;border-radius:6px;"></div>',
        '    </div>',
        '    <div style="display:flex;justify-content:space-between;margin-top:3px;">',
        '      <span id="xz-rd-page-elapsed" style="font-size:10px;color:#aaa;">本页已读: 0分0秒</span>',
        '      <span id="xz-rd-page-pct" style="font-size:10px;color:#aaa;">0%</span>',
        '    </div>',
        '  </div>',
        '',
        '  <div style="background:rgba(0,0,0,.03);border-radius:8px;padding:8px 12px;margin:8px 0;">',
        '    <div class="xz-row" style="margin:0;gap:4px;align-items:center;justify-content:center;">',
        '      <input type="number" id="xz-rd-h" aria-label="读书停留小时" value="4" min="0" max="24" style="width:36px;text-align:center;"> 时',
        '      <input type="number" id="xz-rd-m" aria-label="读书停留分钟" value="0" min="0" max="59" style="width:36px;text-align:center;"> 分',
        '      <input type="number" id="xz-rd-s" aria-label="读书停留秒数" value="0" min="0" max="59" style="width:36px;text-align:center;"> 秒',
        '      <button id="xz-rd-apply" aria-label="应用读书停留时间" style="background:#8065ce;color:#fff;border:none;padding:2px 8px;border-radius:4px;cursor:pointer;font-size:11px;margin-left:4px;">确定</button>',
        '    </div>',
        '  </div>',
        '',
        '  <div style="display:flex;justify-content:space-around;margin:10px 0;font-size:13px;">',
        '    <div style="text-align:center;">已读: <strong id="xz-rd-pages" style="color:#4CAF50;">0</strong> 页</div>',
        '    <div style="text-align:center;">累计: <strong id="xz-rd-total" style="color:#1976D2;">0分0秒</strong></div>',
        '  </div>',
        '  <div id="xz-rd-current" style="text-align:center;font-size:11px;color:#868e96;margin-bottom:6px;">当前: --</div>',
        '  </div>',
        '',
        '  <div class="xz-card xz-card-settings">',
        '  <div class="xz-toggle-group">',
        '    <label class="xz-lbl"><input type="checkbox" id="xz-rd-auto-dismiss" checked> 关闭暂停弹窗</label>',
        '    <label class="xz-lbl"><input type="checkbox" id="xz-rd-auto-next" checked> 到时自动翻页</label>',
        '  </div>',
        '  </div>',
        '',
        '  <div class="xz-divider"></div>',
        '  <div class="xz-log" id="xz-reading-log" style="margin-top:8px;"></div>',
        '</div>',
      ].join('') : '',

      /* ---- 关于页 ---- */
      '<div class="sec" id="xz-sec-about">',
      '  <div class="xz-sub-head">',
      '    <button class="back" data-goto="previous" aria-label="返回功能页">&larr;</button>',
      '    <div class="title">关于</div>',
      '  </div>',
      '  <div class="xz-log-list">',
      '    <button type="button" class="ver xz-easter-trigger" id="xz-easter-trigger" aria-label="版本 4.4.11，连续点击可发现彩蛋">v4.4.11 <span class="date">2026-10-05</span></button>',
      '    <ul><li>按按钮文案处理未完成题的离页确认；优先留在题页，不识别弹窗时暂停提示</li><li>按需定位首个未标记完成的课件页；运行中不会自动跳转</li></ul>',
      '    <div class="ver">v4.4.4 <span class="date">2026-10-04</span></div>',
      '    <ul><li>增加真实课程连续专题与页面定位验收记录</li></ul>',
      '    <div class="ver">v4.4.3 <span class="date">2026-10-04</span></div>',
      '    <ul><li>重新设计浅紫与暗色界面，整理操作层级；版本号里藏了一只小蟑螂</li></ul>',
      '    <div class="ver">v4.4.2 <span class="date">2026-10-01</span></div>',
      '    <ul><li>全课进度直接跟随当前页，修复异步读取时的页数偏差；真实课程连续跨入第 6 个专题</li></ul>',
      '    <div class="ver">v4.4.1 <span class="date">2026-10-01</span></div>',
      '    <ul>',
      '      <li>修复课件目录导出、同页多组练习和连续翻页</li>',
      '      <li>增加全课进度、窗口尺寸调节与越界恢复</li>',
      '      <li>重新设计暗色界面和控件交互</li>',
      '    </ul>',
      '    <div class="ver">v4.4.0 <span class="date">2026-09-30</span></div>',
      '    <ul>',
      '      <li>参考教育工作台视觉，改为冷色画布和白色任务卡</li>',
      '      <li>保留深色胶囊导航、集中设置和固定操作按钮</li>',
      '      <li>检查窄屏排版与原有流程连通性</li>',
      '    </ul>',
      '    <div class="ver">v4.3.0 <span class="date">2026-09-30</span></div>',
      '    <ul>',
      '      <li>常用功能改为顶部胶囊导航，学习页打开面板后直接进入自动刷课</li>',
      '      <li>设置开关改为可点击的胶囊，读书计时按钮固定在面板底部</li>',
      '      <li>统一浅紫渐变、可爱图标、章节选择与暗色模式</li>',
      '    </ul>',
      '    <div class="ver">v4.2.0 <span class="date">2026-09-29</span></div>',
      '    <ul><li>重新设计浅紫渐变侧栏与可爱小蟑螂图标</li></ul>',
      '    <div class="ver">v4.1.3 <span class="date">2026-09-29</span></div>',
      '    <ul>',
      '      <li>适配莞工学习页的同源 UA API，修复答案接口返回网页导致的卡滞</li>',
      '      <li>已完成题目只继续翻页；多空和简答按输入框数量校验，避免重复提交或截断</li>',
      '      <li>暂停或切页后丢弃过期答案请求的结果</li>',
      '    </ul>',
      '    <div class="ver">v4.1.2 <span class="date">2026-09-28</span></div>',
      '    <ul>',
      '      <li>修复跨专题统计弹窗未被识别，自动刷课和读书流程可继续前进</li>',
      '      <li>读书模式仅处理明确的提示弹窗，避免误点题目提交按钮</li>',
      '    </ul>',
      '    <div class="ver">v4.1.1 <span class="date">2026-09-28</span></div>',
      '    <ul>',
      '      <li>翻页需检测稳定的页面或题目标识，忽略短暂加载状态与视频地址变化</li>',
      '      <li>后台运行时限制待渲染日志数量，长时间无学习进度时显示暂停原因</li>',
      '      <li>修复折叠状态下复制日志为空</li>',
      '    </ul>',
      '    <div class="ver">v4.1 <span class="date">2026-09-28</span></div>',
      '    <ul>',
      '      <li>按当前页面推荐可用功能，首页操作可直接进入设置或导出</li>',
      '      <li>统一面板、章节选择和运行日志的冷色界面与交互反馈</li>',
      '      <li>补齐键盘焦点、窄屏布局及减少动态效果支持</li>',
      '    </ul>',
      '    <div class="ver">v4.0 <span class="date">2026-09-27</span></div>',
      '    <ul>',
      '      <li>翻页后确认活动页或题目标识变化，15秒内无变化则重试并暂停</li>',
      '      <li>答案多层解码并保留完整文本，填入失败或题型未知时禁止自动提交</li>',
      '      <li>选择题确认选中状态，失败日志记录题号和处理阶段</li>',
      '    </ul>',
      '    <div class="ver">v3.5.0 <span class="date">2026-07-06</span></div>',
      '    <ul>',
      '      <li>修复自动翻页、答题间隔和视频倍速逻辑</li>',
      '      <li>修复填空题/问答题 HTML 实体乱码</li>',
      '      <li>改进自动答题和导出章节选择界面</li>',
      '    </ul>',
      '    <div class="ver">v3.4.0 <span class="date">2026-06-24</span></div>',
      '    <ul>',
      '      <li>全新重写自动刷课逻辑</li>',
      '      <li>支持自动播放视频、自动答题、自动翻页</li>',
      '      <li>支持正确率控制（固定值/区间随机）</li>',
      '      <li>支持答题间隔随机化（防检测）</li>',
      '      <li>支持章节范围控制</li>',
      '    </ul>',
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
      '      <button type="button" id="xz-history-clear" style="font-size:11px;color:#687482;cursor:pointer;font-weight:500;border:0;background:none;padding:4px 6px;">清空</button>',
      '    </div>',
      '    <div id="xz-history-list">'+renderHistory()+'</div>',
      '  </div>',
      '  <div class="xz-divider"></div>',

      /* 暗色模式 */
      '  <div class="xz-row xz-layout-row"><span>窗口位置与大小</span><button type="button" id="xz-layout-reset" class="xz-small-action">恢复默认</button></div>',
      '  <label class="xz-lbl" style="justify-content:space-between;">',
      '    <span>暗色模式</span>',
      '    <input type="checkbox" id="xz-dark-toggle">',
      '  </label>',
      '  <label class="xz-lbl" style="justify-content:space-between;">',
      '    <span>运行日志</span>',
      '    <input type="checkbox" id="xz-log-toggle-btn">',
      '  </label>',

      '  <div class="xz-divider"></div>',
      '  <div class="xz-footer">',
      '    <div class="copy">莞工小蟑螂 · MIT License</div>',
      '    <div class="disc">本工具开发目的是方便同学在考前复习阶段，将优学院课件中的题库导出，便于导入佛脚等刷题工具进行系统性复习。仅供学习交流使用，请遵守相关法规及学校规定。</div>',
      '  </div>',
      '</div>',

      '</div>', /* xz-body */
      isAutoPage ? [
        '<div class="xz-action-dock" id="xz-auto-dock">',
        '  <button class="xz-btn xz-btn-success" id="xz-btn-auto">开始自动刷课</button>',
        '  <div id="xz-auto-progress" style="display:none;" role="status" aria-live="polite">',
        '    <div style="background:rgba(0,0,0,.06);border-radius:6px;height:4px;overflow:hidden;" role="progressbar" aria-label="课程学习进度" aria-valuemin="0" aria-valuenow="0" aria-valuemax="0"><div id="xz-auto-bar" style="height:100%;width:0%;transition:width .5s;border-radius:6px;"></div></div>',
        '    <div id="xz-auto-progress-text" style="font-size:11px;color:#5c6b7b;margin-top:5px;line-height:1.4;"></div>',
        '  </div>',
        '</div>'
      ].join('') : '',
      isAutoPage ? [
        '<div class="xz-action-dock xz-reading-dock" id="xz-reading-dock">',
        '  <button class="xz-btn xz-btn-success" id="xz-btn-reading">开始计时</button>',
        '  <button class="xz-btn xz-btn-danger" id="xz-btn-reading-reset">重置</button>',
        '</div>'
      ].join('') : '',
      '<div id="xz-easter" class="xz-easter" role="dialog" aria-modal="true" aria-label="小蟑螂彩蛋" hidden>',
      '  <button type="button" id="xz-easter-close" class="xz-easter-close" aria-label="关闭彩蛋">&times;</button>',
      '  <div class="xz-easter-content"><div class="xz-easter-stars" aria-hidden="true">✦ &nbsp; ✧ &nbsp; ✦</div>',
      '  <button type="button" id="xz-easter-mascot" class="xz-easter-mascot" aria-label="和小蟑螂打招呼"><img src="'+LOGO_URI+'" alt=""></button>',
      '  <div class="xz-easter-title">你找到我啦！</div><p id="xz-easter-message">点点我，看看今天的学习运气。</p>',
      '  <span class="xz-easter-note">莞工小蟑螂 · 隐藏彩蛋</span></div></div>',
      '<button type="button" id="xz-panel-resize" class="xz-resize-grip" aria-label="拖动调整助手窗口大小" title="拖动调整窗口大小"></button>',
    ].join('');

    document.body.appendChild(panel);
    panel.dataset.view='';

    /* 面板位置和尺寸始终留在可见区域，旧版本保存的越界坐标也会自动修正。 */
    function clampNumber(value,min,max){return Math.max(min,Math.min(max,Number(value)||0));}
    function placeInViewport(el,left,top){
      var rect=el.getBoundingClientRect(),margin=8;
      el.style.left=clampNumber(left,margin,Math.max(margin,innerWidth-rect.width-margin))+'px';
      el.style.top=clampNumber(top,margin,Math.max(margin,innerHeight-rect.height-margin))+'px';
      el.style.right='auto';
    }
    function keepVisible(el){
      if(innerWidth<=480&&el===panel)return;
      var rect=el.getBoundingClientRect();
      placeInViewport(el,rect.left,rect.top);
    }
    var savedPanelSize=null;
    try{savedPanelSize=JSON.parse(localStorage.getItem('xz_panel_size'));}catch(e){}
    if(savedPanelSize&&isFinite(savedPanelSize.width)&&isFinite(savedPanelSize.height)){
      panel.style.width=clampNumber(savedPanelSize.width,300,Math.max(300,innerWidth-16))+'px';
      panel.style.height=clampNumber(savedPanelSize.height,340,Math.max(340,innerHeight-16))+'px';
    }
    /* 面板拖动 - 通过头部拖动；指针捕获可避免在屏幕边缘丢失拖动状态。 */
    var panelHead=panel.querySelector('.xz-head');
    var panelDrag={active:false,pointerId:null,startX:0,startY:0,origLeft:0,origTop:0};
    if(panelHead){
      panelHead.addEventListener('pointerdown',function(e){
        if(e.target.closest('button')||e.isPrimary===false||e.button!==0)return;
        panelDrag.active=true;panelDrag.pointerId=e.pointerId;
        panelDrag.startX=e.clientX;panelDrag.startY=e.clientY;
        var r=panel.getBoundingClientRect();
        panelDrag.origLeft=r.left;panelDrag.origTop=r.top;
        try{panelHead.setPointerCapture(e.pointerId);}catch(err){}
        e.preventDefault();
      });
      panelHead.addEventListener('pointermove',function(e){
        if(!panelDrag.active||e.pointerId!==panelDrag.pointerId)return;
        var dx=e.clientX-panelDrag.startX,dy=e.clientY-panelDrag.startY;
        placeInViewport(panel,panelDrag.origLeft+dx,panelDrag.origTop+dy);
      });
      function finishPanelDrag(e){
        if(panelDrag.active&&(!e||e.pointerId===panelDrag.pointerId)){
          panelDrag.active=false;panelDrag.pointerId=null;
          var r=panel.getBoundingClientRect();
          try{localStorage.setItem('xz_panel_pos',JSON.stringify({left:r.left,top:r.top}));}catch(e){}
        }
      }
      ['pointerup','pointercancel','lostpointercapture'].forEach(function(type){panelHead.addEventListener(type,finishPanelDrag);});
      var savedPanelPos=null;
      try{savedPanelPos=JSON.parse(localStorage.getItem('xz_panel_pos'));}catch(e){}
      if(savedPanelPos&&savedPanelPos.left!=null){
        placeInViewport(panel,savedPanelPos.left,savedPanelPos.top);
      }
    }
    var resizeGrip=document.getElementById('xz-panel-resize');
    if(resizeGrip){
      var resizeState=null;
      resizeGrip.addEventListener('pointerdown',function(e){
        if(innerWidth<=480)return;
        var rect=panel.getBoundingClientRect();
        resizeState={x:e.clientX,y:e.clientY,left:rect.left,top:rect.top,right:rect.right,width:rect.width,height:rect.height};
        try{resizeGrip.setPointerCapture(e.pointerId);}catch(err){}
        e.preventDefault();
      });
      resizeGrip.addEventListener('pointermove',function(e){
        if(!resizeState)return;
        var width=clampNumber(resizeState.width+resizeState.x-e.clientX,300,Math.max(300,Math.min(720,innerWidth-16)));
        var height=clampNumber(resizeState.height+e.clientY-resizeState.y,340,Math.max(340,innerHeight-16));
        panel.style.width=width+'px';panel.style.height=height+'px';
        panel.style.maxHeight='calc(100dvh - 16px)';
        placeInViewport(panel,Math.max(8,resizeState.right-width),Math.min(resizeState.top,innerHeight-height-8));
      });
      function finishResize(){
        if(!resizeState)return;
        resizeState=null;
        var rect=panel.getBoundingClientRect();
        try{localStorage.setItem('xz_panel_size',JSON.stringify({width:rect.width,height:rect.height}));localStorage.setItem('xz_panel_pos',JSON.stringify({left:rect.left,top:rect.top}));}catch(e){}
      }
      resizeGrip.addEventListener('pointerup',finishResize);
      resizeGrip.addEventListener('pointercancel',finishResize);
    }

    /* 浮动按钮 - 玻璃拟态 */
    var toggle = document.createElement('button');
    toggle.id = 'xz-toggle';
    toggle.innerHTML = '<img src="'+LOGO_URI+'" width="20" height="20" alt="" aria-hidden="true" style="width:20px;height:20px;vertical-align:middle;margin-right:4px;border-radius:4px;">小蟑螂';
    toggle.title = '莞工小蟑螂（可拖动）';
    toggle.style.cssText = 'position:fixed;right:20px;top:90px;z-index:999998;'+
      'width:auto;height:auto;padding:8px 14px;border-radius:12px;'+
      'border:1px solid rgba(255,255,255,.6);'+
      'background:rgba(255,255,255,.72);backdrop-filter:blur(16px) saturate(1.4);-webkit-backdrop-filter:blur(16px) saturate(1.4);'+
      'color:#1a1a2e;font-size:12px;font-weight:600;letter-spacing:.3px;'+
      'cursor:default;box-shadow:0 4px 16px rgba(0,0,0,.08),inset 0 1px 0 rgba(255,255,255,.8);'+
      'display:none;transition:background .2s,color .2s,box-shadow .2s;user-select:none;';
    document.body.appendChild(toggle);

    var dragState={active:false,moved:false,pointerId:null,startX:0,startY:0,startLeft:0,startTop:0};
    toggle.addEventListener('pointerdown',function(e){
      if(e.isPrimary===false||e.button!==0)return;
      dragState.active=true;
      dragState.moved=false;
      dragState.pointerId=e.pointerId;
      dragState.startX=e.clientX;dragState.startY=e.clientY;
      var r=toggle.getBoundingClientRect();
      dragState.startLeft=r.left;dragState.startTop=r.top;
      try{toggle.setPointerCapture(e.pointerId);}catch(err){}
      e.preventDefault();
    });
    toggle.addEventListener('pointermove',function(e){
      if(!dragState.active||e.pointerId!==dragState.pointerId)return;
      var dx=e.clientX-dragState.startX,dy=e.clientY-dragState.startY;
      if(Math.abs(dx)>3||Math.abs(dy)>3)dragState.moved=true;
      if(dragState.moved){
        placeInViewport(toggle,dragState.startLeft+dx,dragState.startTop+dy);
      }
    });
    function finishToggleDrag(e){
      if(!dragState.active||(e&&e.pointerId!==dragState.pointerId))return;
      dragState.active=false;
      dragState.pointerId=null;
      if(dragState.moved){
        var r=toggle.getBoundingClientRect();
        try{localStorage.setItem('xz_btn_pos',JSON.stringify({left:r.left,top:r.top}));}catch(e){}
      }
    }
    ['pointerup','pointercancel','lostpointercapture'].forEach(function(type){toggle.addEventListener(type,finishToggleDrag);});

    var savedPos=null;
    try{savedPos=JSON.parse(localStorage.getItem('xz_btn_pos'));}catch(e){}
    if(savedPos&&savedPos.left!=null){
      toggle.style.visibility='hidden';toggle.style.display='';
      placeInViewport(toggle,savedPos.left,savedPos.top);
      toggle.style.display='none';toggle.style.visibility='';
    }
    window.addEventListener('resize',function(){
      if(innerWidth>480){
        if(panel.style.width)panel.style.width=Math.min(parseFloat(panel.style.width),Math.max(300,innerWidth-16))+'px';
        if(panel.style.height)panel.style.height=Math.min(parseFloat(panel.style.height),Math.max(340,innerHeight-16))+'px';
        keepVisible(panel);
      }
      keepVisible(toggle);
    });
    var resetLayout=document.getElementById('xz-layout-reset');
    if(resetLayout)resetLayout.onclick=function(){
      try{localStorage.removeItem('xz_panel_pos');localStorage.removeItem('xz_panel_size');localStorage.removeItem('xz_btn_pos');}catch(e){}
      panel.style.left='';panel.style.top='';panel.style.right='';panel.style.width='';panel.style.height='';panel.style.maxHeight='';
      toggle.style.left='';toggle.style.top='90px';toggle.style.right='20px';
      panel.style.display='';toggle.style.display='none';
      Logger.log('窗口位置与大小已恢复默认');
    };

    /* 关闭/打开 */
    document.getElementById('xz-close').onclick = function(){
      panel.classList.add('xz-hide');
      setTimeout(function(){panel.style.display='none';panel.classList.remove('xz-hide');},200);
      toggle.style.display='';keepVisible(toggle);
    };
    toggle.onclick = function(){
      if(dragState.moved)return;
      panel.style.display='';
      toggle.style.display='none';
      keepVisible(panel);
    };

    /* Escape 键关闭面板 */
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape'&&panel.style.display!=='none'){
        panel.classList.add('xz-hide');
        setTimeout(function(){panel.style.display='none';panel.classList.remove('xz-hide');},200);
        toggle.style.display='';keepVisible(toggle);
      }
    });

    /* 清空历史 */
    var clearBtn=document.getElementById('xz-history-clear');
    if(clearBtn)clearBtn.onclick=function(){
      if(!window.confirm('清空全部导出历史记录？'))return;
      try{localStorage.removeItem(HISTORY_KEY);}catch(e){}
      var hList=document.getElementById('xz-history-list');
      if(hList)hList.innerHTML=renderHistory();
    };

    /* 胶囊导航：常用功能直接切换，关于页返回上次使用的功能。 */
    var previousView=isAutoPage?'auto':isRelevantPage?'export':'home';
    function goToTab(key) {
        if(key==='previous')key=previousView;
        var target = document.getElementById('xz-sec-' + key);
        if(!target)return;
        if(key!=='about')previousView=key;
        panel.classList.toggle('xz-view-auto',key==='auto');
        panel.classList.toggle('xz-view-reading',key==='reading');
        panel.classList.toggle('xz-view-about',key==='about');
        panel.dataset.view=key;
        panel.querySelectorAll('.sec').forEach(function(s){s.classList.remove('show')});
        target.classList.add('show');
        panel.querySelectorAll('.xz-capsule-nav button').forEach(function(button){
          var selected=button.dataset.goto===key;
          button.classList.toggle('active',selected);
          button.setAttribute('aria-pressed',selected?'true':'false');
        });
        panel.querySelector('.xz-body').scrollTop=0;
        if(key==='about'){
          var hList=document.getElementById('xz-history-list');
          if(hList)hList.innerHTML=renderHistory();
        }
    }
    panel.querySelectorAll('[data-goto]').forEach(function(control){
      control.onclick=function(){goToTab(control.dataset.goto);};
    });
    goToTab(previousView);

    /* 只根据平台已渲染的页签标记定位；不猜测完成状态，也不启动自动学习。 */
    var locateButton=panel.querySelector('#xz-locate-pending');
    var locateStatus=panel.querySelector('#xz-locate-status');
    if(locateButton&&locateStatus)locateButton.addEventListener('click',async function(){
      if(!autoState.paused){locateStatus.textContent='请先暂停自动刷课，再定位页面。';return;}
      var pageNames=Array.from(document.querySelectorAll('.page-item .page-name'));
      var markedComplete=pageNames.filter(function(name){return name.classList.contains('complete');}).length;
      if(!pageNames.length){locateStatus.textContent='当前页面没有可用的课件页签。';return;}
      if(!markedComplete){locateStatus.textContent='平台没有提供完成标记，无法可靠定位。';return;}
      var candidate=pageNames.find(function(name){
        var item=name.closest('.page-item');
        return !name.classList.contains('complete')&&item&&!item.classList.contains('is-hide');
      });
      if(!candidate){locateStatus.textContent='没有可进入的未标记完成页。';return;}
      var targetIndex=pageNames.indexOf(candidate)+1;
      if(candidate.classList.contains('active')){locateStatus.textContent='当前就是首个未标记完成页（第 '+targetIndex+' 页）。';return;}
      var targetItem=candidate.closest('.page-item');
      var targetItemId=targetItem&&targetItem.id||'';
      function findLocatedPage(){
        if(targetItemId){var item=document.getElementById(targetItemId);return item&&item.querySelector('.page-name');}
        return Array.from(document.querySelectorAll('.page-item .page-name'))[targetIndex-1]||null;
      }
      locateButton.disabled=true;
      locateStatus.textContent='正在前往第 '+targetIndex+' 页…';
      try{
        candidate.click();
        var stableMarker='',stableSamples=0,located=false;
        for(var attempt=0;attempt<24;attempt++){
          var liveCandidate=findLocatedPage();
          if(liveCandidate&&liveCandidate.isConnected&&liveCandidate.classList.contains('active')){
            var marker=(liveCandidate.closest('.page-item')&&liveCandidate.closest('.page-item').id||String(targetIndex))+'|'+html2text(liveCandidate.textContent);
            stableSamples=marker===stableMarker?stableSamples+1:1;
            stableMarker=marker;
            if(stableSamples>=2){located=true;break;}
          }else{stableMarker='';stableSamples=0;}
          await wait(250);
        }
        locateStatus.textContent=located?'已到第 '+targetIndex+' 页；请检查页面后再开始学习。':'平台未稳定确认页面切换，请手动点击对应页签。';
      }catch(e){locateStatus.textContent='页面切换失败：'+(e&&e.message||'请手动点击页签');}
      finally{locateButton.disabled=false;}
    });

    /* 连点版本号七次打开彩蛋；只在助手面板内展示，不改变系统或脚本图标。 */
    var easterTrigger=panel.querySelector('#xz-easter-trigger');
    var easter=panel.querySelector('#xz-easter');
    var easterClose=panel.querySelector('#xz-easter-close');
    var easterMascot=panel.querySelector('#xz-easter-mascot');
    var easterMessage=panel.querySelector('#xz-easter-message');
    var easterClicks=0,easterLastClick=0,easterMood=0;
    if(easterTrigger&&easter){
      easterTrigger.addEventListener('click',function(){
        var now=Date.now();
        easterClicks=now-easterLastClick>2500?1:easterClicks+1;
        easterLastClick=now;
        if(easterClicks>=7){
          easterClicks=0;easter.hidden=false;
          easterMessage.textContent='点点我，看看今天的学习运气。';
          easterClose.focus();
        }
      });
      easterClose.addEventListener('click',function(){easter.hidden=true;easterTrigger.focus();});
      easter.addEventListener('keydown',function(e){if(e.key==='Escape'){easter.hidden=true;easterTrigger.focus();}});
      easterMascot.addEventListener('click',function(){
        var messages=['今天也要稳稳地翻到下一页！','遇到难题，慢慢来就好。','休息一下，小蟑螂陪你继续。','叮！今日学习运气 +1'];
        easterMessage.textContent=messages[easterMood++%messages.length];
        easterMascot.classList.remove('xz-easter-pop');
        void easterMascot.offsetWidth;
        easterMascot.classList.add('xz-easter-pop');
      });
    }

    /* 暗色模式 */
    var darkToggle=document.getElementById('xz-dark-toggle');
    var isDark=false;
    try{isDark=localStorage.getItem('xz_dark')==='1';}catch(e){}
    if(isDark)panel.classList.add('xz-dark');
      if(darkToggle){
        darkToggle.checked=isDark;
        darkToggle.onchange=function(){
          panel.classList.toggle('xz-dark',this.checked);
          if(Logger.floatEl)Logger.floatEl.classList.toggle('xz-log-dark',this.checked);
          try{localStorage.setItem('xz_dark',this.checked?'1':'0');}catch(e){}
      };
    }

    /* 运行日志开关 */
    var logToggleBtn=document.getElementById('xz-log-toggle-btn');
    var logHidden=false;
    try{logHidden=localStorage.getItem('xz_log_hidden')==='1';}catch(e){}
    if(logHidden)Logger.toggleFloat();
    if(logToggleBtn){
      logToggleBtn.checked=!logHidden;
      logToggleBtn.onchange=function(){
        Logger.toggleFloat();
        try{localStorage.setItem('xz_log_hidden',this.checked?'0':'1');}catch(e){}
      };
    }

    statusEl = document.getElementById('xz-st');
    logEl = document.getElementById('xz-log-box');
    btnExport = document.getElementById('xz-btn-export');

    var logCb = document.getElementById('xz-log');
    if (logCb) logCb.onchange = function(){ document.getElementById('xz-log-box').classList.toggle('show', this.checked); };

    /* 所有配置输入框实时同步到缓存，运行中改即生效 */
    ['xz-rate','xz-stay','xz-answer-delay','xz-max-retry','xz-acc-min','xz-acc-max'].forEach(function(id){
      var el=document.getElementById(id);
      if(!el)return;
      el.addEventListener('input',function(){
        var c=getCfg();
        var v=parseFloat(this.value);
        if(id==='xz-rate')c.rate=(isNaN(v)||v<1)?1.5:v;
        else if(id==='xz-stay')c.stayTime=(isNaN(v)||v<0)?5:Math.floor(v);
        else if(id==='xz-answer-delay')c.answerDelay=(isNaN(v)||v<100)?500:Math.floor(v);
        else if(id==='xz-max-retry')c.maxRetry=(isNaN(v)||v<1)?7:Math.floor(v);
        else if(id==='xz-acc-min')c.accuracyMin=(isNaN(v)||v<0)?100:Math.floor(v);
        else if(id==='xz-acc-max')c.accuracyMax=(isNaN(v)||v<0)?100:Math.floor(v);
        saveCfg(c);
      });
    });
    ['xz-auto-mute','xz-auto-play','xz-auto-answer','xz-auto-submit','xz-auto-next'].forEach(function(id){
      var el=document.getElementById(id);
      if(!el)return;
      el.addEventListener('change',function(){
        var c=getCfg();
        if(id==='xz-auto-mute')c.autoMute=this.checked;
        else if(id==='xz-auto-play')c.autoPlay=this.checked;
        else if(id==='xz-auto-answer')c.autoAnswer=this.checked;
        else if(id==='xz-auto-submit')c.autoSubmit=this.checked;
        else if(id==='xz-auto-next')c.autoNext=this.checked;
        saveCfg(c);
      });
    });

    if (btnExport) btnExport.onclick = runExport;

    /* ---- 读书计时逻辑 ---- */
    var stopReadingMode=null;
    if (isAutoPage) {
      var rdState = {running: false, remaining: 14400, totalSeconds: 14400, pages: 0, elapsed: 0, totalElapsed: 0, elapsedAtStart: 0, runStartedAt: 0, deadlineAt: 0, navigating: false, navRetries: 0};
      var rdInterval = null;
      var rdVerifyTimer = null;
      var rdLoggerEl = document.getElementById('xz-reading-log');
      if (rdLoggerEl) Logger.addInline(rdLoggerEl);

      function rdFormatTime(sec) {
        var h = Math.floor(sec/3600).toString().padStart(2,'0');
        var m = Math.floor((sec%3600)/60).toString().padStart(2,'0');
        var s = (sec%60).toString().padStart(2,'0');
        return h+':'+m+':'+s;
      }

      function rdUpdateDisplay() {
        var timerEl = document.getElementById('xz-reading-timer');
        if (timerEl) timerEl.textContent = rdFormatTime(rdState.remaining);
        var pagesEl = document.getElementById('xz-rd-pages');
        if (pagesEl) pagesEl.textContent = rdState.pages;
        var totalEl = document.getElementById('xz-rd-total');
        if (totalEl) totalEl.textContent = Math.floor(rdState.totalElapsed/60)+'分'+(rdState.totalElapsed%60)+'秒';
        // 进度条
        var bar = document.getElementById('xz-rd-bar');
        var pctEl = document.getElementById('xz-rd-page-pct');
        var pageElapsedEl = document.getElementById('xz-rd-page-elapsed');
        if (rdState.totalSeconds > 0) {
          var pct = Math.max(0,Math.min(100,Math.round((1 - rdState.remaining / rdState.totalSeconds) * 100)));
          if (bar) bar.style.width = pct + '%';
          if (pctEl) pctEl.textContent = pct + '%';
          var pageElapsed = Math.max(0,rdState.totalSeconds - rdState.remaining);
          if (pageElapsedEl) pageElapsedEl.textContent = '本页已读: ' + Math.floor(pageElapsed/60) + '分' + (pageElapsed%60) + '秒';
        }
        // 当前页名称
        var currentEl = document.getElementById('xz-rd-current');
        if (currentEl) {
          var pageName = '';
          var activePage = document.querySelector('.page-item .page-name.active');
          if (activePage) pageName = activePage.textContent.trim();
          if (!pageName) {
            var activeItem = document.querySelector('.page-item.active .page-name, .page-item.active');
            if (activeItem) pageName = activeItem.textContent.trim();
          }
          currentEl.textContent = '当前: ' + (pageName || '第' + (rdState.pages + 1) + '页');
        }
      }

      function rdDismissModals() {
        if(advanceStatModal())return true;
        var alertModal=document.getElementById('alertModal');
        if(!isElementVisible(alertModal))return false;
        var btn=Array.from(alertModal.querySelectorAll('.modal-operation button')).find(function(item){
          var label=html2text(item.textContent);
          return isElementVisible(item)&&/^(知道了|继续学习|Got it|Continue study)$/i.test(label);
        });
        if(btn){btn.click();Logger.log('[读书] 已关闭提示弹窗');return true;}
        return false;
      }

      function rdRetryNavigation(reason){
        rdState.navigating=false;
        rdState.navRetries++;
        Logger.warn('[读书] 翻页未确认：'+reason+'（'+rdState.navRetries+'/3）');
        if(rdState.navRetries>=3){
          rdStop();
          notify('读书翻页连续失败，已暂停，请检查当前页面');
          return;
        }
        rdState.remaining=10;
        rdState.deadlineAt=Date.now()+10000;
        rdUpdateDisplay();
      }

      function rdGoNext() {
        if(rdState.navigating||!rdState.running)return;
        var nextBtn=Array.from(document.querySelectorAll('.next-page-btn, .mobile-next-page-btn, .next-btn, .btn-next')).find(function(btn){
          return isElementVisible(btn)&&!btn.disabled&&btn.getAttribute('aria-disabled')!=='true'&&!btn.classList.contains('disabled');
        });
        if(!nextBtn){rdRetryNavigation('未找到可用的下一页按钮');return;}
        var before=getNavigationMarker();
        rdState.navigating=true;
        try{nextBtn.click();}catch(e){rdRetryNavigation('点击失败：'+(e.message||e));return;}
        var startedAt=Date.now();
        var candidate='';
        function verify(){
          rdVerifyTimer=null;
          if(!rdState.running)return;
          advanceStatModal();
          var after=getNavigationMarker();
          var marker=JSON.stringify(after);
          if(hasConfirmedNavigation(before,after)&&candidate===marker){
            rdState.navigating=false;
            rdState.navRetries=0;
            rdState.pages++;
            rdState.remaining=rdState.totalSeconds;
            rdState.elapsed=0;
            rdState.deadlineAt=Date.now()+rdState.totalSeconds*1000;
            rdUpdateDisplay();
            Logger.log('[读书] 翻页已确认（累计 '+rdState.pages+' 页，耗时 '+(Date.now()-startedAt)+' ms）');
            return;
          }
          candidate=hasConfirmedNavigation(before,after)?marker:'';
          if(Date.now()-startedAt>=15000){rdRetryNavigation('点击后页面未变化');return;}
          rdVerifyTimer=setTimeout(verify,500);
        }
        rdVerifyTimer=setTimeout(verify,500);
      }

      function rdTick() {
        if(!rdState.running)return;
        var now=Date.now();
        rdState.totalElapsed=rdState.elapsedAtStart+Math.floor((now-rdState.runStartedAt)/1000);
        rdState.remaining=Math.max(0,Math.ceil((rdState.deadlineAt-now)/1000));
        rdState.elapsed=Math.max(0,rdState.totalSeconds-rdState.remaining);
        rdUpdateDisplay();
        var autoDismiss = document.getElementById('xz-rd-auto-dismiss');
        if (autoDismiss && autoDismiss.checked) {
          rdDismissModals();
        }
        if(rdState.navigating||rdState.remaining>0)return;
        var autoNext = document.getElementById('xz-rd-auto-next');
        if (autoNext && autoNext.checked) {
          Logger.log('[读书] 倒计时结束，尝试翻页...');
          rdGoNext();
        } else {
          Logger.log('[读书] 倒计时结束，请手动翻页');
          rdStop();
        }
      }

      function rdStart() {
        if(!autoState.paused){
          var autoButton=document.getElementById('xz-btn-auto');
          if(autoButton)autoButton.click();
          Logger.log('[读书] 已暂停自动刷课，切换到读书计时');
        }
        var h = parseInt(document.getElementById('xz-rd-h').value) || 0;
        var m = parseInt(document.getElementById('xz-rd-m').value) || 0;
        var s = parseInt(document.getElementById('xz-rd-s').value) || 0;
        rdState.totalSeconds = h * 3600 + m * 60 + s;
        if (rdState.totalSeconds <= 0) {
          Logger.log('[读书] 请设置有效的停留时间');
          return;
        }
        rdState.remaining = rdState.totalSeconds;
        rdState.running = true;
        rdState.navigating = false;
        rdState.navRetries = 0;
        rdState.elapsedAtStart = rdState.totalElapsed;
        rdState.runStartedAt = Date.now();
        rdState.deadlineAt = rdState.runStartedAt + rdState.totalSeconds*1000;
        rdInterval = setInterval(rdTick, 1000);
        var btn = document.getElementById('xz-btn-reading');
        if (btn) { btn.textContent = '暂停计时'; btn.className = 'xz-btn xz-btn-danger'; }
        var nav=panel.querySelector('.xz-capsule-nav [data-goto="reading"]');
        if(nav){nav.classList.add('is-running');nav.setAttribute('aria-label','读书计时，运行中');}
        Logger.log('[读书] 已启动 | 每页 '+h+'时'+m+'分'+s+'秒 | 弹窗检测开启');
      }

      function rdStop() {
        if(rdState.running)rdState.totalElapsed=rdState.elapsedAtStart+Math.floor((Date.now()-rdState.runStartedAt)/1000);
        rdState.running = false;
        rdState.navigating = false;
        if (rdInterval) { clearInterval(rdInterval); rdInterval = null; }
        if (rdVerifyTimer) { clearTimeout(rdVerifyTimer); rdVerifyTimer = null; }
        var btn = document.getElementById('xz-btn-reading');
        if (btn) { btn.textContent = '开始计时'; btn.className = 'xz-btn xz-btn-success'; }
        var nav=panel.querySelector('.xz-capsule-nav [data-goto="reading"]');
        if(nav){nav.classList.remove('is-running');nav.setAttribute('aria-label','读书计时');}
      }
      stopReadingMode=rdStop;

      function rdReset() {
        rdStop();
        rdState.pages = 0;
        rdState.elapsed = 0;
        rdState.totalElapsed = 0;
        rdState.elapsedAtStart = 0;
        rdState.runStartedAt = 0;
        rdState.deadlineAt = 0;
        rdState.navRetries = 0;
        rdState.remaining = parseInt(document.getElementById('xz-rd-h').value || 4) * 3600 + parseInt(document.getElementById('xz-rd-m').value || 0) * 60 + parseInt(document.getElementById('xz-rd-s').value || 0);
        rdUpdateDisplay();
        Logger.log('[读书] 已重置');
      }

      var rdBtn = document.getElementById('xz-btn-reading');
      if (rdBtn) {
        rdBtn.onclick = function() {
          if (rdState.running) rdStop(); else rdStart();
        };
      }

      var rdResetBtn = document.getElementById('xz-btn-reading-reset');
      if (rdResetBtn) rdResetBtn.onclick = rdReset;

      var rdApplyBtn = document.getElementById('xz-rd-apply');
      if (rdApplyBtn) {
        rdApplyBtn.onclick = function() {
          var h = parseInt(document.getElementById('xz-rd-h').value) || 0;
          var m = parseInt(document.getElementById('xz-rd-m').value) || 0;
          var s = parseInt(document.getElementById('xz-rd-s').value) || 0;
          var seconds = h * 3600 + m * 60 + s;
          if(seconds<=0){Logger.warn('[读书] 请设置大于 0 秒的停留时间');return;}
          rdState.totalSeconds = seconds;
          rdState.remaining = rdState.totalSeconds;
          if(rdState.running)rdState.deadlineAt=Date.now()+rdState.totalSeconds*1000;
          rdUpdateDisplay();
          Logger.log('[读书] 时间已设置为 '+h+'时'+m+'分'+s+'秒');
        };
      }

      // 回车键保存时间
      ['xz-rd-h','xz-rd-m','xz-rd-s'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('keydown', function(e) { if (e.key === 'Enter' && rdApplyBtn) rdApplyBtn.click(); });
      });

      // 检测弹窗间隔
      var rdModalIntervalEl = document.getElementById('xz-rd-modal-interval');
      if (rdModalIntervalEl) {
        rdModalIntervalEl.onchange = function() {
          var sec = parseInt(this.value) || 5;
          Logger.log('[读书] 弹窗检测间隔已设为 '+sec+' 秒');
        };
      }

      rdUpdateDisplay();
    }

    /* 自动刷课 */
    if (isAutoPage) {
      Logger.init(document.getElementById('xz-auto-log'));
      btnAuto = document.getElementById('xz-btn-auto');

      btnAuto.onclick = function() {
        if(autoState.paused&&rdState.running&&stopReadingMode){
          stopReadingMode();
          Logger.log('已暂停读书计时，切换到自动刷课');
        }
          autoState.paused = !autoState.paused;
        autoState.runId++;

        var c = {
          rate: (function(){var v=parseFloat(document.getElementById('xz-rate').value);return(isNaN(v)||v<1)?1.5:v;})(),
          stayTime: (function(){var v=parseInt(document.getElementById('xz-stay').value);return(isNaN(v)||v<0)?5:v;})(),
          autoMute: document.getElementById('xz-auto-mute').checked,
          autoPlay: document.getElementById('xz-auto-play').checked,
          autoAnswer: document.getElementById('xz-auto-answer').checked,
          autoSubmit: document.getElementById('xz-auto-submit').checked,
          autoNext: document.getElementById('xz-auto-next').checked,
          maxRetry: (function(){var v=parseInt(document.getElementById('xz-max-retry').value);return(isNaN(v)||v<1)?7:v;})(),
          accuracyMin: (function(){var v=parseInt(document.getElementById('xz-acc-min').value);return(isNaN(v)||v<0)?100:v;})(),
          accuracyMax: (function(){var v=parseInt(document.getElementById('xz-acc-max').value);return(isNaN(v)||v<0)?100:v;})(),
          answerDelay: (function(){var v=parseInt(document.getElementById('xz-answer-delay').value);return(isNaN(v)||v<100)?500:v;})()
        };
        saveCfg(c);

        if (!autoState.paused) {
          timerRegistry.clearAll();
          _nextPageTimerId = null;
          _modalRetryTimerId = null;
          resetVideoTracking();
          autoState.navigating = false;
          autoState.answerInProgress = false;
          autoState.navigationReady = false;
          autoState.navigationBlockedSignature = '';
          autoState.lastAnsweredSignature = '';
          autoState.currentQuestionIds = [];
          autoState.retry = 0;
          autoState.pauseReason = '';
          _cfgCache = null;
          autoState.startTime=Date.now();
          autoState.lastActivityAt=autoState.startTime;
          autoState.pagesDone=0;
          autoState.questionsDone=0;
          autoState.questionsCorrect=0;
          autoState.courseProgress=null;
          autoStatsInterval=0;
          updateAutoProgress();
          var activeRunId=autoState.runId;
          autoState.preloading=IS_DGUT&&!!getPageParam('courseId');
          if(autoState.preloading){
            Logger.log('开始自动流程前，先读取全课课程内容');
            readCourseProgress(activeRunId).then(function(){
              if(autoState.runId!==activeRunId||autoState.paused)return;
              autoState.preloading=false;
              autoState.lastActivityAt=Date.now();
              if(!autoState.courseProgress||autoState.courseProgress.status!=='ready'){
                pauseAutoFlow('全课预读失败，自动学习已暂停；检查登录或网络后重试');
                return;
              }
              Logger.log('全课预读完成，开始学习');
              updateAutoProgress();
              autoLoop();
            }).catch(function(error){
              if(autoState.runId!==activeRunId||autoState.paused)return;
              autoState.preloading=false;
              autoState.lastActivityAt=Date.now();
              pauseAutoFlow('全课预读异常，自动学习已暂停：'+(error&&error.message||error));
            });
          }else{
            readCourseProgress(activeRunId);
            autoLoop();
          }
          var accStr = c.accuracyMin===c.accuracyMax ? c.accuracyMin+'%' : c.accuracyMin+'%~'+c.accuracyMax+'%';
          Logger.log('启动参数: 倍速='+c.rate+'x 停留='+c.stayTime+'s 间隔='+c.answerDelay+'ms 正确率='+accStr);
        } else {
          autoState.preloading=false;
          timerRegistry.clearAll();
          _nextPageTimerId = null;
          _modalRetryTimerId = null;
          resetVideoTracking();
          autoState.navigating = false;
          autoState.answerInProgress = false;
          autoState.navigationReady = false;
          autoState.currentQuestionIds = [];
          autoState.pauseReason = '手动暂停';
          stopAntiIdle();
          // 恢复所有视频倍速为 1x
          document.querySelectorAll('video').forEach(function(v) { v.playbackRate = 1; });
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
    var nav=document.querySelector('#xz-panel .xz-capsule-nav [data-goto="auto"]');
    if(nav){
      nav.classList.toggle('is-running',!autoState.paused);
      nav.setAttribute('aria-label',autoState.paused?'自动刷课':'自动刷课，运行中');
    }
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
    el.className='xz-hint xz-export-result'+(type==='ok'?' hint-ok':type==='err'?' hint-err':type==='warn'?' hint-warn':'');
    el.style.display='block';
    el.querySelector('.hint-title').textContent=title;
    var content=el.querySelector('.hint-text');
    if(type==='ok'||(type==='warn'&&text.indexOf('<div')===0))content.innerHTML=text;
    else content.textContent=text;
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
        abortExportRequests();
        cancelBtn.textContent = '正在取消...';
        cancelBtn.disabled = true;
      };
    }
    try {
      var data;
      if (IS_COURSE) { setProgress(0,'正在导出课件题库...'); data = await exportCourseware(); }
      else if (IS_TRAINING) { setProgress(0,'正在导出训练题库...'); data = await exportTraining(); }
      else throw new Error('请在课件页面或训练页面运行');

      ensureExportActive();
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
      var failedAnswers=Number(data.failedAnswers)||0;
      setExportHint(failedAnswers?'warn':'ok',failedAnswers?'导出完成（部分答案未取回）':'导出成功',
        '<div style="margin-bottom:6px;">共导出 <strong>'+total+'</strong> 题'+(failedAnswers?'，其中 <strong>'+failedAnswers+'</strong> 题答案未取回':'')+'</div>'+statsLines+
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

  // ==================== 反检测 ====================
  try {
    unsafeWindow.navigator.__defineGetter__("userAgent", function () {
      return "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36";
    });
  } catch(e) {}

  // ==================== 初始化 ====================
  var _inited=false;
  function init() {
    if(_inited) return;
    try {
      Logger.createFloat();
      if (document.getElementById('xz-panel')) { _inited=true; return; }
      createUI();
      _inited=true;
      console.log('[莞工小蟑螂] v4.4.5 已加载');
      var lastVer='';
      try{lastVer=localStorage.getItem('xz_last_ver')||'';}catch(e){}
      if(lastVer!=='4.4.11'){
        try{localStorage.setItem('xz_last_ver','4.4.11');}catch(e){}
        notify('莞工小蟑螂 v4.4.11 已加载');
      }
    } catch (e) { _inited=false; console.error('[莞工小蟑螂]', e); }
  }

  function ensurePanelObserver(){
    if(window.__xzUlearningPanelObserver||!document.documentElement)return;
    window.__xzUlearningPanelObserver=new MutationObserver(function(){
      if(!document.getElementById('xz-panel')){_inited=false;init();}
    });
    window.__xzUlearningPanelObserver.observe(document.documentElement,{childList:true,subtree:true});
  }
  function initialize(){init();ensurePanelObserver();}
  if(document.readyState==='complete')initialize();
  else window.addEventListener('load',initialize,{once:true});

})();
