
GDTDefine('gdt:mod/asynload.js',function(require,exports,module){var helper=require('gdt:comm/helper.js');var comm=require('gdt:comm/comm.js');var supportlv2=(window.XMLHttpRequest)&&('withCredentials'in new XMLHttpRequest);var AsynMod={};AsynMod.CONST={ALLOWPID:["6090707234381466","648519450970936527"],REQRATE:1,CHECK_CONTENT_LENGTH:213};AsynMod._check=function(url){comm.xhr(url,function(obj){AsynMod._dealresp(obj,url);},function(obj){AsynMod._dealresp(obj,url);},{headers:{"X-Tgw-Sc":"Qz-Index"}});};AsynMod.check=function(obj,allowPid){var url=obj.url;if(url.indexOf(allowPid)>=0){AsynMod._check(url);}};AsynMod.getRespRet=function(obj){var data={result:0,err:0};var resp=obj.resp;if(resp&&resp.length!=AsynMod.CONST.CHECK_CONTENT_LENGTH){data.result=1;data.err=4;}
if(obj.ret!=0){data.err=4;}
return data;}
AsynMod._dealresp=function(obj,requrl){obj=obj||{};var resp=obj.resp||"",xmlHttp=obj.xmlHttp;var url="http://tgwsc.qq.com/sc";var respRet=AsynMod.getRespRet(obj);var server=xmlHttp&&xmlHttp.getResponseHeader("Server")||"";var status=obj.status||(xmlHttp&&xmlHttp.status)||"";var data={product:"GDT",result:respRet.result,err:respRet.err,url:requrl,location:"",rsp_code:status,rsp_len:resp.length+"",rsp_text:resp,rsp_server:server};comm.xhr(url,function(){},function(){},{method:"POST",data:{data:comm.JSONToString(data)}});};AsynMod.init=function(obj){obj=obj||{};var checkPlist=AsynMod.CONST.ALLOWPID;var rate=AsynMod.CONST.REQRATE;if(Math.random()*100<rate&&supportlv2){comm.each(checkPlist,function(pid){AsynMod.check(obj,pid);});}};module.exports=AsynMod;});