/*
 * jqModal - Minimalist Modaling with jQuery
 *   (http://dev.iceburg.net/jquery/jqModal/)
 *
 * Copyright (c) 2007,2008 Brice Burgess <bhb@iceburg.net>
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 * 
 * $Version: 03/01/2009 +r14
 */
(function($) {
$.fn.jqm=function(o){
var p={
overlay: 50,
overlayClass: 'jqmOverlay',
closeClass: 'jqmClose',
trigger: '.jqModal',
ajax: F,
ajaxText: '',
target: F,
modal: F,
toTop: F,
onShow: F,
onHide: F,
onLoad: F
};
return this.each(function(){if(this._jqm)return H[this._jqm].c=$.extend({},H[this._jqm].c,o);s++;this._jqm=s;
H[s]={c:$.extend(p,$.jqm.params,o),a:F,w:$(this).addClass('jqmID'+s),s:s};
if(p.trigger)$(this).jqmAddTrigger(p.trigger);
});};

$.fn.jqmAddClose=function(e){return hs(this,e,'jqmHide');};
$.fn.jqmAddTrigger=function(e){return hs(this,e,'jqmShow');};
$.fn.jqmShow=function(t){return this.each(function(){t=t||window.event;$.jqm.open(this._jqm,t);});};
$.fn.jqmHide=function(t){return this.each(function(){t=t||window.event;$.jqm.close(this._jqm,t)});};

$.jqm = {
hash:{},
open:function(s,t){var h=H[s],c=h.c,cc='.'+c.closeClass,z=(parseInt(h.w.css('z-index'))),z=(z>0)?z:3000,o=$('<div></div>').css({height:'100%',width:'100%',position:'fixed',left:0,top:0,'z-index':z-1,opacity:c.overlay/100});if(h.a)return F;h.t=t;h.a=true;h.w.css('z-index',z);
 if(c.modal) {if(!A[0])L('bind');A.push(s);}
 else if(c.overlay > 0)h.w.jqmAddClose(o);
 else o=F;

 h.o=(o)?o.addClass(c.overlayClass).prependTo('body'):F;
 if(ie6){$('html,body').css({height:'100%',width:'100%'});if(o){o=o.css({position:'absolute'})[0];for(var y in {Top:1,Left:1})o.style.setExpression(y.toLowerCase(),"(_=(document.documentElement.scroll"+y+" || document.body.scroll"+y+"))+'px'");}}

 if(c.ajax) {var r=c.target||h.w,u=c.ajax,r=(typeof r == 'string')?$(r,h.w):$(r),u=(u.substr(0,1) == '@')?$(t).attr(u.substring(1)):u;
  r.html(c.ajaxText).load(u,function(){if(c.onLoad)c.onLoad.call(this,h);if(cc)h.w.jqmAddClose($(cc,h.w));e(h);});}
 else if(cc)h.w.jqmAddClose($(cc,h.w));

 if(c.toTop&&h.o)h.w.before('<span id="jqmP'+h.w[0]._jqm+'"></span>').insertAfter(h.o);	
 (c.onShow)?c.onShow(h):h.w.show();e(h);return F;
},
close:function(s){var h=H[s];if(!h.a)return F;h.a=F;
 if(A[0]){A.pop();if(!A[0])L('unbind');}
 if(h.c.toTop&&h.o)$('#jqmP'+h.w[0]._jqm).after(h.w).remove();
 if(h.c.onHide)h.c.onHide(h);else{h.w.hide();if(h.o)h.o.remove();} return F;
},
params:{}};
var s=0,H=$.jqm.hash,A=[],ie6=$.browser.msie&&($.browser.version == "6.0"),F=false,
i=$('<iframe src="javascript:false;document.write(\'\');" class="jqm"></iframe>').css({opacity:0}),
e=function(h){if(ie6)if(h.o)h.o.html('<p style="width:100%;height:100%"/>').prepend(i);else if(!$('iframe.jqm',h.w)[0])h.w.prepend(i); f(h);},
f=function(h){try{$(':input:visible',h.w)[0].focus();}catch(_){}},
L=function(t){$(document)[t]("keypress",m)[t]("keydown",m)[t]("mousedown",m);},
m=function(e){var h=H[A[A.length-1]],r=(!$(e.target).parents('.jqmID'+h.s)[0]);if(r)f(h);return !r;},
hs=function(w,t,c){return w.each(function(){var s=this._jqm;$(t).each(function() {
 if(!this[c]){this[c]=[];$(this).click(function(){for(var i in {jqmShow:1,jqmHide:1})for(var s in this[i])if(H[this[i][s]])H[this[i][s]].w[i](this);return F;});}this[c].push(s);});});};
})(jQuery);

/*
 * jqDnR - Minimalistic Drag'n'Resize for jQuery.
 *
 * Copyright (c) 2007 Brice Burgess <bhb@iceburg.net>, http://www.iceburg.net
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * $Version: 2007.08.19 +r2
 */

(function($){
$.fn.jqDrag=function(h){return i(this,h,'d');};
$.fn.jqResize=function(h){return i(this,h,'r');};
$.jqDnR={dnr:{},e:0,
drag:function(v){
 if(M.k == 'd')E.css({left:M.X+v.pageX-M.pX,top:M.Y+v.pageY-M.pY});
 else E.css({width:Math.max(v.pageX-M.pX+M.W,0),height:Math.max(v.pageY-M.pY+M.H,0)});
  return false;},
stop:function(){E.css('opacity',M.o);$(document).unbind('mousemove',J.drag).unbind('mouseup',J.stop);}
};
var J=$.jqDnR,M=J.dnr,E=J.e,
i=function(e,h,k){return e.each(function(){h=(h)?$(h,e):e;
 h.bind('mousedown',{e:e,k:k},function(v){var d=v.data,p={};E=d.e;
 // attempt utilization of dimensions plugin to fix IE issues
 if(E.css('position') != 'relative'){try{E.position(p);}catch(e){}}
 M={X:p.left||f('left')||0,Y:p.top||f('top')||0,W:f('width')||E[0].scrollWidth||0,H:f('height')||E[0].scrollHeight||0,pX:v.pageX,pY:v.pageY,k:d.k,o:E.css('opacity')};
 E.css({opacity:0.8});$(document).mousemove($.jqDnR.drag).mouseup($.jqDnR.stop);
 return false;
 });
});},
f=function(k){return parseInt(E.css(k))||false;};
})(jQuery);

/*
 * jQuery Impromptu
 * By: Trent Richardson [http://trentrichardson.com]
 * Version 3.1
 * Last Modified: 3/30/2010
 * 
 * Copyright 2010 Trent Richardson
 * Dual licensed under the MIT and GPL licenses.
 * http://trentrichardson.com/Impromptu/GPL-LICENSE.txt
 * http://trentrichardson.com/Impromptu/MIT-LICENSE.txt
 * 
 */
(function($){$.prompt=function(message,options){options=$.extend({},$.prompt.defaults,options);$.prompt.currentPrefix=options.prefix;var ie6=($.browser.msie&&$.browser.version<7);var $body=$(document.body);var $window=$(window);options.classes=$.trim(options.classes);if(options.classes!='')options.classes=' '+options.classes;var msgbox='<div class="'+options.prefix+'box'+options.classes+'" id="'+options.prefix+'box">';if(options.useiframe&&(($('object, applet').length>0)||ie6)){msgbox+='<iframe src="javascript:false;" style="display:block;position:absolute;z-index:-1;" class="'+options.prefix+'fade" id="'+options.prefix+'fade"></iframe>';}else{if(ie6){$('select').css('visibility','hidden');}msgbox+='<div class="'+options.prefix+'fade" id="'+options.prefix+'fade"></div>';}msgbox+='<div class="'+options.prefix+'" id="'+options.prefix+'"><div class="'+options.prefix+'container"><div class="';msgbox+=options.prefix+'close">X</div><div id="'+options.prefix+'states"></div>';msgbox+='</div></div></div>';var $jqib=$(msgbox).appendTo($body);var $jqi=$jqib.children('#'+options.prefix);var $jqif=$jqib.children('#'+options.prefix+'fade');if(message.constructor==String){message={state0:{html:message,buttons:options.buttons,focus:options.focus,submit:options.submit}};}var states="";$.each(message,function(statename,stateobj){stateobj=$.extend({},$.prompt.defaults.state,stateobj);message[statename]=stateobj;states+='<div id="'+options.prefix+'_state_'+statename+'" class="'+options.prefix+'_state" style="display:none;"><div class="'+options.prefix+'message">'+stateobj.html+'</div><div class="'+options.prefix+'buttons">';$.each(stateobj.buttons,function(k,v){if(typeof v=='object')states+='<button name="'+options.prefix+'_'+statename+'_button'+v.title.replace(/[^a-z0-9]+/gi,'')+'" id="'+options.prefix+'_'+statename+'_button'+v.title.replace(/[^a-z0-9]+/gi,'')+'" value="'+v.value+'">'+v.title+'</button>';else states+='<button name="'+options.prefix+'_'+statename+'_button'+k+'" id="'+options.prefix+'_'+statename+'_button'+k+'" value="'+v+'">'+k+'</button>';});states+='</div></div>';});$jqi.find('#'+options.prefix+'states').html(states).children('.'+options.prefix+'_state:first').css('display','block');$jqi.find('.'+options.prefix+'buttons:empty').css('display','none');$.each(message,function(statename,stateobj){var $state=$jqi.find('#'+options.prefix+'_state_'+statename);$state.children('.'+options.prefix+'buttons').children('button').click(function(){var msg=$state.children('.'+options.prefix+'message');var clicked=stateobj.buttons[$(this).text()];if(clicked==undefined){for(var i in stateobj.buttons)if(stateobj.buttons[i].title==$(this).text())clicked=stateobj.buttons[i].value;}if(typeof clicked=='object')clicked=clicked.value;var forminputs={};$.each($jqi.find('#'+options.prefix+'states :input').serializeArray(),function(i,obj){if(forminputs[obj.name]===undefined){forminputs[obj.name]=obj.value;}else if(typeof forminputs[obj.name]==Array||typeof forminputs[obj.name]=='object'){forminputs[obj.name].push(obj.value);}else{forminputs[obj.name]=[forminputs[obj.name],obj.value];}});var close=stateobj.submit(clicked,msg,forminputs);if(close===undefined||close){removePrompt(true,clicked,msg,forminputs);}});$state.find('.'+options.prefix+'buttons button:eq('+stateobj.focus+')').addClass(options.prefix+'defaultbutton');});var ie6scroll=function(){$jqib.css({top:$window.scrollTop()});};var fadeClicked=function(){if(options.persistent){var i=0;$jqib.addClass(options.prefix+'warning');var intervalid=setInterval(function(){$jqib.toggleClass(options.prefix+'warning');if(i++>1){clearInterval(intervalid);$jqib.removeClass(options.prefix+'warning');}},100);}else{removePrompt();}};var keyPressEventHandler=function(e){var key=(window.event)?event.keyCode:e.keyCode;if(key==27){fadeClicked();}if(key==9){var $inputels=$(':input:enabled:visible',$jqib);var fwd=!e.shiftKey&&e.target==$inputels[$inputels.length-1];var back=e.shiftKey&&e.target==$inputels[0];if(fwd||back){setTimeout(function(){if(!$inputels)return;var el=$inputels[back===true?$inputels.length-1:0];if(el)el.focus();},10);return false;}}};var positionPrompt=function(){$jqib.css({position:(ie6)?"absolute":"fixed",height:$window.height(),width:"100%",top:(ie6)?$window.scrollTop():0,left:0,right:0,bottom:0});$jqif.css({position:"absolute",height:$window.height(),width:"100%",top:0,left:0,right:0,bottom:0});$jqi.css({position:"absolute",top:options.top,left:"50%",marginLeft:(($jqi.outerWidth()/2)*-1)});};var stylePrompt=function(){$jqif.css({zIndex:options.zIndex,display:"none",opacity:options.opacity});$jqi.css({zIndex:options.zIndex+1,display:"none"});$jqib.css({zIndex:options.zIndex});};var removePrompt=function(callCallback,clicked,msg,formvals){$jqi.remove();if(ie6){$body.unbind('scroll',ie6scroll);}$window.unbind('resize',positionPrompt);$jqif.fadeOut(options.overlayspeed,function(){$jqif.unbind('click',fadeClicked);$jqif.remove();if(callCallback){options.callback(clicked,msg,formvals);}$jqib.unbind('keypress',keyPressEventHandler);$jqib.remove();if(ie6&&!options.useiframe){$('select').css('visibility','visible');}});};positionPrompt();stylePrompt();if(ie6){$window.scroll(ie6scroll);}$jqif.click(fadeClicked);$window.resize(positionPrompt);$jqib.bind("keydown keypress",keyPressEventHandler);$jqi.find('.'+options.prefix+'close').click(removePrompt);$jqif.fadeIn(options.overlayspeed);$jqi[options.show](options.promptspeed,options.loaded);$jqi.find('#'+options.prefix+'states .'+options.prefix+'_state:first .'+options.prefix+'defaultbutton').focus();if(options.timeout>0)setTimeout($.prompt.close,options.timeout);return $jqib;};$.prompt.defaults={prefix:'jqi',classes:'',buttons:{Ok:true},loaded:function(){},submit:function(){return true;},callback:function(){},opacity:0.6,zIndex:999,overlayspeed:'slow',promptspeed:'fast',show:'fadeIn',focus:0,useiframe:false,top:"15%",persistent:true,timeout:0,state:{html:'',buttons:{Ok:true},focus:0,submit:function(){return true;}}};$.prompt.currentPrefix=$.prompt.defaults.prefix;$.prompt.setDefaults=function(o){$.prompt.defaults=$.extend({},$.prompt.defaults,o);};$.prompt.setStateDefaults=function(o){$.prompt.defaults.state=$.extend({},$.prompt.defaults.state,o);};$.prompt.getStateContent=function(state){return $('#'+$.prompt.currentPrefix+'_state_'+state);};$.prompt.getCurrentState=function(){return $('.'+$.prompt.currentPrefix+'_state:visible');};$.prompt.getCurrentStateName=function(){var stateid=$.prompt.getCurrentState().attr('id');return stateid.replace($.prompt.currentPrefix+'_state_','');};$.prompt.goToState=function(state,callback){$('.'+$.prompt.currentPrefix+'_state').slideUp('slow');$('#'+$.prompt.currentPrefix+'_state_'+state).slideDown('slow',function(){$(this).find('.'+$.prompt.currentPrefix+'defaultbutton').focus();if(typeof callback=='function')callback();});};$.prompt.nextState=function(callback){var $next=$('.'+$.prompt.currentPrefix+'_state:visible').next();$('.'+$.prompt.currentPrefix+'_state').slideUp('slow');$next.slideDown('slow',function(){$next.find('.'+$.prompt.currentPrefix+'defaultbutton').focus();if(typeof callback=='function')callback();});};$.prompt.prevState=function(callback){var $next=$('.'+$.prompt.currentPrefix+'_state:visible').prev();$('.'+$.prompt.currentPrefix+'_state').slideUp('slow');$next.slideDown('slow',function(){$next.find('.'+$.prompt.currentPrefix+'defaultbutton').focus();if(typeof callback=='function')callback();});};$.prompt.close=function(){$('#'+$.prompt.currentPrefix+'box').fadeOut('fast',function(){$(this).remove();});};$.fn.prompt=function(options){if(options==undefined)options={};if(options.withDataAndEvents==undefined)options.withDataAndEvents=false;$.prompt($(this).clone(options.withDataAndEvents).html(),options);}})(jQuery);

/*
 * https://github.com/blueimp/JavaScript-Templates
 */

(function(a){"use strict";var b=function(a,c){var d=/[^\w\-\.:]/.test(a)?new Function(b.arg+",tmpl","var _e=tmpl.encode"+b.helper+",_s='"+a.replace(b.regexp,b.func)+"';return _s;"):b.cache[a]=b.cache[a]||b(b.load(a));return c?d(c,b):function(a){return d(a,b)}};b.cache={},b.load=function(a){return document.getElementById(a).innerHTML},b.regexp=/([\s'\\])(?![^%]*%\})|(?:\{%(=|#)([\s\S]+?)%\})|(\{%)|(%\})/g,b.func=function(a,b,c,d,e,f){if(b)return{"\n":"\\n","\r":"\\r","\t":"\\t"," ":" "}[a]||"\\"+a;if(c)return c==="="?"'+_e("+d+")+'":"'+("+d+"||'')+'";if(e)return"';";if(f)return"_s+='"},b.encReg=/[<>&"'\x00]/g,b.encMap={"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&#39;"},b.encode=function(a){return String(a||"").replace(b.encReg,function(a){return b.encMap[a]||""})},b.arg="o",b.helper=",print=function(s,e){_s+=e&&(s||'')||_e(s);},include=function(s,d){_s+=tmpl(s,d);}",typeof define=="function"&&define.amd?define(function(){return b}):a.tmpl=b})(this);
