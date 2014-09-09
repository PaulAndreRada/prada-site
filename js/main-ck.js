// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());


// @enquire 
/*!
 * @enquire.js v2.1.2 - Awesome Media Queries in JavaScript
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/enquire.js
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

!function(a,b,c){var d=window.matchMedia;"undefined"!=typeof module&&module.exports?module.exports=c(d):"function"==typeof define&&define.amd?define(function(){return b[a]=c(d)}):b[a]=c(d)}("enquire",this,function(a){"use strict";function b(a,b){var c,d=0,e=a.length;for(d;e>d&&(c=b(a[d],d),c!==!1);d++);}function c(a){return"[object Array]"===Object.prototype.toString.apply(a)}function d(a){return"function"==typeof a}function e(a){this.options=a,!a.deferSetup&&this.setup()}function f(b,c){this.query=b,this.isUnconditional=c,this.handlers=[],this.mql=a(b);var d=this;this.listener=function(a){d.mql=a,d.assess()},this.mql.addListener(this.listener)}function g(){if(!a)throw new Error("matchMedia not present, legacy browsers require a polyfill");this.queries={},this.browserIsIncapable=!a("only all").matches}return e.prototype={setup:function(){this.options.setup&&this.options.setup(),this.initialised=!0},on:function(){!this.initialised&&this.setup(),this.options.match&&this.options.match()},off:function(){this.options.unmatch&&this.options.unmatch()},destroy:function(){this.options.destroy?this.options.destroy():this.off()},equals:function(a){return this.options===a||this.options.match===a}},f.prototype={addHandler:function(a){var b=new e(a);this.handlers.push(b),this.matches()&&b.on()},removeHandler:function(a){var c=this.handlers;b(c,function(b,d){return b.equals(a)?(b.destroy(),!c.splice(d,1)):void 0})},matches:function(){return this.mql.matches||this.isUnconditional},clear:function(){b(this.handlers,function(a){a.destroy()}),this.mql.removeListener(this.listener),this.handlers.length=0},assess:function(){var a=this.matches()?"on":"off";b(this.handlers,function(b){b[a]()})}},g.prototype={register:function(a,e,g){var h=this.queries,i=g&&this.browserIsIncapable;return h[a]||(h[a]=new f(a,i)),d(e)&&(e={match:e}),c(e)||(e=[e]),b(e,function(b){d(b)&&(b={match:b}),h[a].addHandler(b)}),this},unregister:function(a,b){var c=this.queries[a];return c&&(b?c.removeHandler(b):(c.clear(),delete this.queries[a])),this}},new g});


//@hammer
/*! jQuery plugin for Hammer.JS - v1.1.3 - 2014-05-20
 * http://eightmedia.github.com/hammer.js
 *
 * Copyright (c) 2014 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */

!function(a,b){"use strict";function c(){e.READY||(t.determineEventTypes(),s.each(e.gestures,function(a){v.register(a)}),t.onTouch(e.DOCUMENT,o,v.detect),t.onTouch(e.DOCUMENT,p,v.detect),e.READY=!0)}function d(a,c){Date.now||(Date.now=function(){return(new Date).getTime()}),a.utils.each(["on","off"],function(d){a.utils[d]=function(a,e,f){c(a)[d](e,function(a){var d=c.extend({},a.originalEvent,a);d.button===b&&(d.button=a.which-1),f.call(this,d)})}}),a.Instance.prototype.trigger=function(a,b){var d=c(this.element);return d.has(b.target).length&&(d=c(b.target)),d.trigger({type:a,gesture:b})},c.fn.hammer=function(b){return this.each(function(){var d=c(this),e=d.data("hammer");e?e&&b&&a.utils.extend(e.options,b):d.data("hammer",new a(this,b||{}))})}}var e=function w(a,b){return new w.Instance(a,b||{})};e.VERSION="1.1.3",e.defaults={behavior:{userSelect:"none",touchAction:"pan-y",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}},e.DOCUMENT=document,e.HAS_POINTEREVENTS=navigator.pointerEnabled||navigator.msPointerEnabled,e.HAS_TOUCHEVENTS="ontouchstart"in a,e.IS_MOBILE=/mobile|tablet|ip(ad|hone|od)|android|silk/i.test(navigator.userAgent),e.NO_MOUSEEVENTS=e.HAS_TOUCHEVENTS&&e.IS_MOBILE||e.HAS_POINTEREVENTS,e.CALCULATE_INTERVAL=25;var f={},g=e.DIRECTION_DOWN="down",h=e.DIRECTION_LEFT="left",i=e.DIRECTION_UP="up",j=e.DIRECTION_RIGHT="right",k=e.POINTER_MOUSE="mouse",l=e.POINTER_TOUCH="touch",m=e.POINTER_PEN="pen",n=e.EVENT_START="start",o=e.EVENT_MOVE="move",p=e.EVENT_END="end",q=e.EVENT_RELEASE="release",r=e.EVENT_TOUCH="touch";e.READY=!1,e.plugins=e.plugins||{},e.gestures=e.gestures||{};var s=e.utils={extend:function(a,c,d){for(var e in c)!c.hasOwnProperty(e)||a[e]!==b&&d||(a[e]=c[e]);return a},on:function(a,b,c){a.addEventListener(b,c,!1)},off:function(a,b,c){a.removeEventListener(b,c,!1)},each:function(a,c,d){var e,f;if("forEach"in a)a.forEach(c,d);else if(a.length!==b){for(e=0,f=a.length;f>e;e++)if(c.call(d,a[e],e,a)===!1)return}else for(e in a)if(a.hasOwnProperty(e)&&c.call(d,a[e],e,a)===!1)return},inStr:function(a,b){return a.indexOf(b)>-1},inArray:function(a,b){if(a.indexOf){var c=a.indexOf(b);return-1===c?!1:c}for(var d=0,e=a.length;e>d;d++)if(a[d]===b)return d;return!1},toArray:function(a){return Array.prototype.slice.call(a,0)},hasParent:function(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1},getCenter:function(a){var b=[],c=[],d=[],e=[],f=Math.min,g=Math.max;return 1===a.length?{pageX:a[0].pageX,pageY:a[0].pageY,clientX:a[0].clientX,clientY:a[0].clientY}:(s.each(a,function(a){b.push(a.pageX),c.push(a.pageY),d.push(a.clientX),e.push(a.clientY)}),{pageX:(f.apply(Math,b)+g.apply(Math,b))/2,pageY:(f.apply(Math,c)+g.apply(Math,c))/2,clientX:(f.apply(Math,d)+g.apply(Math,d))/2,clientY:(f.apply(Math,e)+g.apply(Math,e))/2})},getVelocity:function(a,b,c){return{x:Math.abs(b/a)||0,y:Math.abs(c/a)||0}},getAngle:function(a,b){var c=b.clientX-a.clientX,d=b.clientY-a.clientY;return 180*Math.atan2(d,c)/Math.PI},getDirection:function(a,b){var c=Math.abs(a.clientX-b.clientX),d=Math.abs(a.clientY-b.clientY);return c>=d?a.clientX-b.clientX>0?h:j:a.clientY-b.clientY>0?i:g},getDistance:function(a,b){var c=b.clientX-a.clientX,d=b.clientY-a.clientY;return Math.sqrt(c*c+d*d)},getScale:function(a,b){return a.length>=2&&b.length>=2?this.getDistance(b[0],b[1])/this.getDistance(a[0],a[1]):1},getRotation:function(a,b){return a.length>=2&&b.length>=2?this.getAngle(b[1],b[0])-this.getAngle(a[1],a[0]):0},isVertical:function(a){return a==i||a==g},setPrefixedCss:function(a,b,c,d){var e=["","Webkit","Moz","O","ms"];b=s.toCamelCase(b);for(var f=0;f<e.length;f++){var g=b;if(e[f]&&(g=e[f]+g.slice(0,1).toUpperCase()+g.slice(1)),g in a.style){a.style[g]=(null==d||d)&&c||"";break}}},toggleBehavior:function(a,b,c){if(b&&a&&a.style){s.each(b,function(b,d){s.setPrefixedCss(a,d,b,c)});var d=c&&function(){return!1};"none"==b.userSelect&&(a.onselectstart=d),"none"==b.userDrag&&(a.ondragstart=d)}},toCamelCase:function(a){return a.replace(/[_-]([a-z])/g,function(a){return a[1].toUpperCase()})}};e.Instance=function(a,b){var d=this;c(),this.element=a,this.enabled=!0,s.each(b,function(a,c){delete b[c],b[s.toCamelCase(c)]=a}),this.options=s.extend(s.extend({},e.defaults),b||{}),this.options.behavior&&s.toggleBehavior(this.element,this.options.behavior,!0),this.eventStartHandler=t.onTouch(a,n,function(a){d.enabled&&a.eventType==n?v.startDetect(d,a):a.eventType==r&&v.detect(a)}),this.eventHandlers=[]},e.Instance.prototype={on:function(a,b){var c=this;return t.on(c.element,a,b,function(a){c.eventHandlers.push({gesture:a,handler:b})}),c},off:function(a,b){var c=this;return t.off(c.element,a,b,function(a){var d=s.inArray({gesture:a,handler:b});d!==!1&&c.eventHandlers.splice(d,1)}),c},trigger:function(a,b){b||(b={});var c=e.DOCUMENT.createEvent("Event");c.initEvent(a,!0,!0),c.gesture=b;var d=this.element;return s.hasParent(b.target,d)&&(d=b.target),d.dispatchEvent(c),this},enable:function(a){return this.enabled=a,this},dispose:function(){var a,b;for(s.toggleBehavior(this.element,this.options.behavior,!1),a=-1;b=this.eventHandlers[++a];)s.off(this.element,b.gesture,b.handler);return this.eventHandlers=[],t.off(this.element,f[n],this.eventStartHandler),null}};var t=e.event={preventMouseEvents:!1,started:!1,shouldDetect:!1,on:function(a,b,c,d){var e=b.split(" ");s.each(e,function(b){s.on(a,b,c),d&&d(b)})},off:function(a,b,c,d){var e=b.split(" ");s.each(e,function(b){s.off(a,b,c),d&&d(b)})},onTouch:function(a,b,c){var d=this,g=function(f){var g,h=f.type.toLowerCase(),i=e.HAS_POINTEREVENTS,j=s.inStr(h,"mouse");j&&d.preventMouseEvents||(j&&b==n&&0===f.button?(d.preventMouseEvents=!1,d.shouldDetect=!0):i&&b==n?d.shouldDetect=1===f.buttons||u.matchType(l,f):j||b!=n||(d.preventMouseEvents=!0,d.shouldDetect=!0),i&&b!=p&&u.updatePointer(b,f),d.shouldDetect&&(g=d.doDetect.call(d,f,b,a,c)),g==p&&(d.preventMouseEvents=!1,d.shouldDetect=!1,u.reset()),i&&b==p&&u.updatePointer(b,f))};return this.on(a,f[b],g),g},doDetect:function(a,b,c,d){var e=this.getTouchList(a,b),f=e.length,g=b,h=e.trigger,i=f;b==n?h=r:b==p&&(h=q,i=e.length-(a.changedTouches?a.changedTouches.length:1)),i>0&&this.started&&(g=o),this.started=!0;var j=this.collectEventData(c,g,e,a);return b!=p&&d.call(v,j),h&&(j.changedLength=i,j.eventType=h,d.call(v,j),j.eventType=g,delete j.changedLength),g==p&&(d.call(v,j),this.started=!1),g},determineEventTypes:function(){var b;return b=e.HAS_POINTEREVENTS?a.PointerEvent?["pointerdown","pointermove","pointerup pointercancel lostpointercapture"]:["MSPointerDown","MSPointerMove","MSPointerUp MSPointerCancel MSLostPointerCapture"]:e.NO_MOUSEEVENTS?["touchstart","touchmove","touchend touchcancel"]:["touchstart mousedown","touchmove mousemove","touchend touchcancel mouseup"],f[n]=b[0],f[o]=b[1],f[p]=b[2],f},getTouchList:function(a,b){if(e.HAS_POINTEREVENTS)return u.getTouchList();if(a.touches){if(b==o)return a.touches;var c=[],d=[].concat(s.toArray(a.touches),s.toArray(a.changedTouches)),f=[];return s.each(d,function(a){s.inArray(c,a.identifier)===!1&&f.push(a),c.push(a.identifier)}),f}return a.identifier=1,[a]},collectEventData:function(a,b,c,d){var e=l;return s.inStr(d.type,"mouse")||u.matchType(k,d)?e=k:u.matchType(m,d)&&(e=m),{center:s.getCenter(c),timeStamp:Date.now(),target:d.target,touches:c,eventType:b,pointerType:e,srcEvent:d,preventDefault:function(){var a=this.srcEvent;a.preventManipulation&&a.preventManipulation(),a.preventDefault&&a.preventDefault()},stopPropagation:function(){this.srcEvent.stopPropagation()},stopDetect:function(){return v.stopDetect()}}}},u=e.PointerEvent={pointers:{},getTouchList:function(){var a=[];return s.each(this.pointers,function(b){a.push(b)}),a},updatePointer:function(a,b){a==p||a!=p&&1!==b.buttons?delete this.pointers[b.pointerId]:(b.identifier=b.pointerId,this.pointers[b.pointerId]=b)},matchType:function(a,b){if(!b.pointerType)return!1;var c=b.pointerType,d={};return d[k]=c===(b.MSPOINTER_TYPE_MOUSE||k),d[l]=c===(b.MSPOINTER_TYPE_TOUCH||l),d[m]=c===(b.MSPOINTER_TYPE_PEN||m),d[a]},reset:function(){this.pointers={}}},v=e.detection={gestures:[],current:null,previous:null,stopped:!1,startDetect:function(a,b){this.current||(this.stopped=!1,this.current={inst:a,startEvent:s.extend({},b),lastEvent:!1,lastCalcEvent:!1,futureCalcEvent:!1,lastCalcData:{},name:""},this.detect(b))},detect:function(a){if(this.current&&!this.stopped){a=this.extendEventData(a);var b=this.current.inst,c=b.options;return s.each(this.gestures,function(d){!this.stopped&&b.enabled&&c[d.name]&&d.handler.call(d,a,b)},this),this.current&&(this.current.lastEvent=a),a.eventType==p&&this.stopDetect(),a}},stopDetect:function(){this.previous=s.extend({},this.current),this.current=null,this.stopped=!0},getCalculatedData:function(a,b,c,d,f){var g=this.current,h=!1,i=g.lastCalcEvent,j=g.lastCalcData;i&&a.timeStamp-i.timeStamp>e.CALCULATE_INTERVAL&&(b=i.center,c=a.timeStamp-i.timeStamp,d=a.center.clientX-i.center.clientX,f=a.center.clientY-i.center.clientY,h=!0),(a.eventType==r||a.eventType==q)&&(g.futureCalcEvent=a),(!g.lastCalcEvent||h)&&(j.velocity=s.getVelocity(c,d,f),j.angle=s.getAngle(b,a.center),j.direction=s.getDirection(b,a.center),g.lastCalcEvent=g.futureCalcEvent||a,g.futureCalcEvent=a),a.velocityX=j.velocity.x,a.velocityY=j.velocity.y,a.interimAngle=j.angle,a.interimDirection=j.direction},extendEventData:function(a){var b=this.current,c=b.startEvent,d=b.lastEvent||c;(a.eventType==r||a.eventType==q)&&(c.touches=[],s.each(a.touches,function(a){c.touches.push({clientX:a.clientX,clientY:a.clientY})}));var e=a.timeStamp-c.timeStamp,f=a.center.clientX-c.center.clientX,g=a.center.clientY-c.center.clientY;return this.getCalculatedData(a,d.center,e,f,g),s.extend(a,{startEvent:c,deltaTime:e,deltaX:f,deltaY:g,distance:s.getDistance(c.center,a.center),angle:s.getAngle(c.center,a.center),direction:s.getDirection(c.center,a.center),scale:s.getScale(c.touches,a.touches),rotation:s.getRotation(c.touches,a.touches)}),a},register:function(a){var c=a.defaults||{};return c[a.name]===b&&(c[a.name]=!0),s.extend(e.defaults,c,!0),a.index=a.index||1e3,this.gestures.push(a),this.gestures.sort(function(a,b){return a.index<b.index?-1:a.index>b.index?1:0}),this.gestures}};!function(a){function b(b,d){var e=v.current;if(!(d.options.dragMaxTouches>0&&b.touches.length>d.options.dragMaxTouches))switch(b.eventType){case n:c=!1;break;case o:if(b.distance<d.options.dragMinDistance&&e.name!=a)return;var f=e.startEvent.center;if(e.name!=a&&(e.name=a,d.options.dragDistanceCorrection&&b.distance>0)){var k=Math.abs(d.options.dragMinDistance/b.distance);f.pageX+=b.deltaX*k,f.pageY+=b.deltaY*k,f.clientX+=b.deltaX*k,f.clientY+=b.deltaY*k,b=v.extendEventData(b)}(e.lastEvent.dragLockToAxis||d.options.dragLockToAxis&&d.options.dragLockMinDistance<=b.distance)&&(b.dragLockToAxis=!0);var l=e.lastEvent.direction;b.dragLockToAxis&&l!==b.direction&&(b.direction=s.isVertical(l)?b.deltaY<0?i:g:b.deltaX<0?h:j),c||(d.trigger(a+"start",b),c=!0),d.trigger(a,b),d.trigger(a+b.direction,b);var m=s.isVertical(b.direction);(d.options.dragBlockVertical&&m||d.options.dragBlockHorizontal&&!m)&&b.preventDefault();break;case q:c&&b.changedLength<=d.options.dragMaxTouches&&(d.trigger(a+"end",b),c=!1);break;case p:c=!1}}var c=!1;e.gestures.Drag={name:a,index:50,handler:b,defaults:{dragMinDistance:10,dragDistanceCorrection:!0,dragMaxTouches:1,dragBlockHorizontal:!1,dragBlockVertical:!1,dragLockToAxis:!1,dragLockMinDistance:25}}}("drag"),e.gestures.Gesture={name:"gesture",index:1337,handler:function(a,b){b.trigger(this.name,a)}},function(a){function b(b,d){var e=d.options,f=v.current;switch(b.eventType){case n:clearTimeout(c),f.name=a,c=setTimeout(function(){f&&f.name==a&&d.trigger(a,b)},e.holdTimeout);break;case o:b.distance>e.holdThreshold&&clearTimeout(c);break;case q:clearTimeout(c)}}var c;e.gestures.Hold={name:a,index:10,defaults:{holdTimeout:500,holdThreshold:2},handler:b}}("hold"),e.gestures.Release={name:"release",index:1/0,handler:function(a,b){a.eventType==q&&b.trigger(this.name,a)}},e.gestures.Swipe={name:"swipe",index:40,defaults:{swipeMinTouches:1,swipeMaxTouches:1,swipeVelocityX:.6,swipeVelocityY:.6},handler:function(a,b){if(a.eventType==q){var c=a.touches.length,d=b.options;if(c<d.swipeMinTouches||c>d.swipeMaxTouches)return;(a.velocityX>d.swipeVelocityX||a.velocityY>d.swipeVelocityY)&&(b.trigger(this.name,a),b.trigger(this.name+a.direction,a))}}},function(a){function b(b,d){var e,f,g=d.options,h=v.current,i=v.previous;switch(b.eventType){case n:c=!1;break;case o:c=c||b.distance>g.tapMaxDistance;break;case p:!s.inStr(b.srcEvent.type,"cancel")&&b.deltaTime<g.tapMaxTime&&!c&&(e=i&&i.lastEvent&&b.timeStamp-i.lastEvent.timeStamp,f=!1,i&&i.name==a&&e&&e<g.doubleTapInterval&&b.distance<g.doubleTapDistance&&(d.trigger("doubletap",b),f=!0),(!f||g.tapAlways)&&(h.name=a,d.trigger(h.name,b)))}}var c=!1;e.gestures.Tap={name:a,index:100,handler:b,defaults:{tapMaxTime:250,tapMaxDistance:10,tapAlways:!0,doubleTapDistance:20,doubleTapInterval:300}}}("tap"),e.gestures.Touch={name:"touch",index:-1/0,defaults:{preventDefault:!1,preventMouse:!1},handler:function(a,b){return b.options.preventMouse&&a.pointerType==k?void a.stopDetect():(b.options.preventDefault&&a.preventDefault(),void(a.eventType==r&&b.trigger("touch",a)))}},function(a){function b(b,d){switch(b.eventType){case n:c=!1;break;case o:if(b.touches.length<2)return;var e=Math.abs(1-b.scale),f=Math.abs(b.rotation);if(e<d.options.transformMinScale&&f<d.options.transformMinRotation)return;v.current.name=a,c||(d.trigger(a+"start",b),c=!0),d.trigger(a,b),f>d.options.transformMinRotation&&d.trigger("rotate",b),e>d.options.transformMinScale&&(d.trigger("pinch",b),d.trigger("pinch"+(b.scale<1?"in":"out"),b));break;case q:c&&b.changedLength<2&&(d.trigger(a+"end",b),c=!1)}}var c=!1;e.gestures.Transform={name:a,index:45,defaults:{transformMinScale:.01,transformMinRotation:1},handler:b}}("transform"),a.Hammer=e,"undefined"!=typeof module&&module.exports&&(module.exports=e),"function"==typeof define&&define.amd?define(["jquery"],function(b){return d(a.Hammer,b)}):d(a.Hammer,a.jQuery||a.Zepto)}(window);
//# sourceMappingURL=jquery.hammer-full.min.map



//@hashchange
/*!
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

(function($,window,undefined){
  '$:nomunge'; // Used by YUI compressor.
  
  // Reused string.
  var str_hashchange = 'hashchange',
    
    // Method / object references.
    doc = document,
    fake_onhashchange,
    special = $.event.special,
    
    // Does the browser support window.onhashchange? Note that IE8 running in
    // IE7 compatibility mode reports true for 'onhashchange' in window, even
    // though the event isn't supported, so also test document.documentMode.
    doc_mode = doc.documentMode,
    supports_onhashchange = 'on' + str_hashchange in window && ( doc_mode === undefined || doc_mode > 7 );
  
  // Get location.hash (or what you'd expect location.hash to be) sans any
  // leading #. Thanks for making this necessary, Firefox!
  function get_fragment( url ) {
    url = url || location.href;
    return '#' + url.replace( /^[^#]*#?(.*)$/, '$1' );
  };
  
  // Method: jQuery.fn.hashchange
  // 
  // Bind a handler to the window.onhashchange event or trigger all bound
  // window.onhashchange event handlers. This behavior is consistent with
  // jQuery's built-in event handlers.
  // 
  // Usage:
  // 
  // > jQuery(window).hashchange( [ handler ] );
  // 
  // Arguments:
  // 
  //  handler - (Function) Optional handler to be bound to the hashchange
  //    event. This is a "shortcut" for the more verbose form:
  //    jQuery(window).bind( 'hashchange', handler ). If handler is omitted,
  //    all bound window.onhashchange event handlers will be triggered. This
  //    is a shortcut for the more verbose
  //    jQuery(window).trigger( 'hashchange' ). These forms are described in
  //    the <hashchange event> section.
  // 
  // Returns:
  // 
  //  (jQuery) The initial jQuery collection of elements.
  
  // Allow the "shortcut" format $(elem).hashchange( fn ) for binding and
  // $(elem).hashchange() for triggering, like jQuery does for built-in events.
  $.fn[ str_hashchange ] = function( fn ) {
    return fn ? this.bind( str_hashchange, fn ) : this.trigger( str_hashchange );
  };
  
  // Property: jQuery.fn.hashchange.delay
  // 
  // The numeric interval (in milliseconds) at which the <hashchange event>
  // polling loop executes. Defaults to 50.
  
  // Property: jQuery.fn.hashchange.domain
  // 
  // If you're setting document.domain in your JavaScript, and you want hash
  // history to work in IE6/7, not only must this property be set, but you must
  // also set document.domain BEFORE jQuery is loaded into the page. This
  // property is only applicable if you are supporting IE6/7 (or IE8 operating
  // in "IE7 compatibility" mode).
  // 
  // In addition, the <jQuery.fn.hashchange.src> property must be set to the
  // path of the included "document-domain.html" file, which can be renamed or
  // modified if necessary (note that the document.domain specified must be the
  // same in both your main JavaScript as well as in this file).
  // 
  // Usage:
  // 
  // jQuery.fn.hashchange.domain = document.domain;
  
  // Property: jQuery.fn.hashchange.src
  // 
  // If, for some reason, you need to specify an Iframe src file (for example,
  // when setting document.domain as in <jQuery.fn.hashchange.domain>), you can
  // do so using this property. Note that when using this property, history
  // won't be recorded in IE6/7 until the Iframe src file loads. This property
  // is only applicable if you are supporting IE6/7 (or IE8 operating in "IE7
  // compatibility" mode).
  // 
  // Usage:
  // 
  // jQuery.fn.hashchange.src = 'path/to/file.html';
  
  $.fn[ str_hashchange ].delay = 50;
  /*
  $.fn[ str_hashchange ].domain = null;
  $.fn[ str_hashchange ].src = null;
  */
  
  // Event: hashchange event
  // 
  // Fired when location.hash changes. In browsers that support it, the native
  // HTML5 window.onhashchange event is used, otherwise a polling loop is
  // initialized, running every <jQuery.fn.hashchange.delay> milliseconds to
  // see if the hash has changed. In IE6/7 (and IE8 operating in "IE7
  // compatibility" mode), a hidden Iframe is created to allow the back button
  // and hash-based history to work.
  // 
  // Usage as described in <jQuery.fn.hashchange>:
  // 
  // > // Bind an event handler.
  // > jQuery(window).hashchange( function(e) {
  // >   var hash = location.hash;
  // >   ...
  // > });
  // > 
  // > // Manually trigger the event handler.
  // > jQuery(window).hashchange();
  // 
  // A more verbose usage that allows for event namespacing:
  // 
  // > // Bind an event handler.
  // > jQuery(window).bind( 'hashchange', function(e) {
  // >   var hash = location.hash;
  // >   ...
  // > });
  // > 
  // > // Manually trigger the event handler.
  // > jQuery(window).trigger( 'hashchange' );
  // 
  // Additional Notes:
  // 
  // * The polling loop and Iframe are not created until at least one handler
  //   is actually bound to the 'hashchange' event.
  // * If you need the bound handler(s) to execute immediately, in cases where
  //   a location.hash exists on page load, via bookmark or page refresh for
  //   example, use jQuery(window).hashchange() or the more verbose 
  //   jQuery(window).trigger( 'hashchange' ).
  // * The event can be bound before DOM ready, but since it won't be usable
  //   before then in IE6/7 (due to the necessary Iframe), recommended usage is
  //   to bind it inside a DOM ready handler.
  
  // Override existing $.event.special.hashchange methods (allowing this plugin
  // to be defined after jQuery BBQ in BBQ's source code).
  special[ str_hashchange ] = $.extend( special[ str_hashchange ], {
    
    // Called only when the first 'hashchange' event is bound to window.
    setup: function() {
      // If window.onhashchange is supported natively, there's nothing to do..
      if ( supports_onhashchange ) { return false; }
      
      // Otherwise, we need to create our own. And we don't want to call this
      // until the user binds to the event, just in case they never do, since it
      // will create a polling loop and possibly even a hidden Iframe.
      $( fake_onhashchange.start );
    },
    
    // Called only when the last 'hashchange' event is unbound from window.
    teardown: function() {
      // If window.onhashchange is supported natively, there's nothing to do..
      if ( supports_onhashchange ) { return false; }
      
      // Otherwise, we need to stop ours (if possible).
      $( fake_onhashchange.stop );
    }
    
  });
  
  // fake_onhashchange does all the work of triggering the window.onhashchange
  // event for browsers that don't natively support it, including creating a
  // polling loop to watch for hash changes and in IE 6/7 creating a hidden
  // Iframe to enable back and forward.
  fake_onhashchange = (function(){
    var self = {},
      timeout_id,
      
      // Remember the initial hash so it doesn't get triggered immediately.
      last_hash = get_fragment(),
      
      fn_retval = function(val){ return val; },
      history_set = fn_retval,
      history_get = fn_retval;
    
    // Start the polling loop.
    self.start = function() {
      timeout_id || poll();
    };
    
    // Stop the polling loop.
    self.stop = function() {
      timeout_id && clearTimeout( timeout_id );
      timeout_id = undefined;
    };
    
    // This polling loop checks every $.fn.hashchange.delay milliseconds to see
    // if location.hash has changed, and triggers the 'hashchange' event on
    // window when necessary.
    function poll() {
      var hash = get_fragment(),
        history_hash = history_get( last_hash );
      
      if ( hash !== last_hash ) {
        history_set( last_hash = hash, history_hash );
        
        $(window).trigger( str_hashchange );
        
      } else if ( history_hash !== last_hash ) {
        location.href = location.href.replace( /#.*/, '' ) + history_hash;
      }
      
      timeout_id = setTimeout( poll, $.fn[ str_hashchange ].delay );
    };
    
    return self;
  })();
  
})(jQuery,this);




/* **********************************************
     Begin vertical-carousel.js
********************************************** */

$.verticalCarousel = function( element , options ){

    var VC = {
	onChange : undefined
    },
    $doc = $( document ),
    $element = $doc.find( element ), 
    $container = $element.find( 'ul' ), 
    $panes = $container.find( 'li' ), 
    paneHeight = 0,
    paneCount = $panes.length,
    currentPane = VC.startPane || 0,
    animationTime = 450,
    quietPeriod = 800,
    lastAnimationTime = 0,
    callback;
    //
    // add any new options to the carousel object
    VC = $.extend( VC , options );

    
    VC.init = function(){ 
	//
	VC.setPaneDimensions();
	//
	$(window).on("load resize orientationchange", 
		     function() {
			 VC.setPaneDimensions();
		     });
	//
	return VC;
    };


    VC.setPaneDimensions = function(){ 
	//
	paneHeight = $element.height();
	//
	for ( var i=0; i<paneCount; i++ ){ 
	    // 
	    $panes.height( paneHeight );
	};
	//
	$container.height( paneHeight * paneCount );
	//
	return VC;
    };
	        
	        
    VC.showPane = function( index ) { 
	//
	// prevent going under or over
	var index = Math.max( 0, Math.min( index,
					   paneCount -1 ));
	//
	currentPane = index;
	// 
	// create the offset value for the container
	// starting at 0
	var offset = -(( 100/paneCount ) * currentPane );
	//
	VC.setContainerOffset( offset, true );
	//
	// if theres a callback activate it
	if( typeof VC.onChange === 'function' ){ 
	    //
	    VC.onChange.call( VC , currentPane );
	    //
	}
	//
	return VC;
    };
	        

    VC.setContainerOffset = function( percent, animate ){ 
	$container.removeClass("animate");

	if(animate) {
	    $container.addClass("animate");
	}
	if(Modernizr.csstransforms3d) {
	    $container.css("transform", "translate3d(0,"
			   + percent +"%,0) scale3d(1,1,1)");
	}
	else if(Modernizr.csstransforms) {
	    $container.css("transform", "translate(0,"
			   + percent +"%)");
	}
	else {
	    //
	    var px = (( paneHeight * paneCount ) / 100) * percent;
	    //
	    $container.css("top", px+"px");
	}
    };
	        

    VC.next = function(){ 
	// 
	return VC.showPane( currentPane + 1 );
	//
    };

    VC.prev = function(){ 
	//
	return VC.showPane( currentPane - 1);
	//
    };

    var handleScroll = function( event, delta ){ 
	//
	var $this = $(this),
	deltaOfInterest = delta,
	timeNow = new Date().getTime(),
	timeElapsed = timeNow - lastAnimationTime,
	waitTime = animationTime + quietPeriod,
	scrollTop = $this.scrollTop();
	//
	// Cancel scroll if currently animating or within quiet period
	if( timeElapsed < waitTime ){
	    //
	    event.preventDefault();
	    //
	    // leave the function
	    return;
	}
	//
	// if delta is negative call prev()
	if (deltaOfInterest < 0) {
	    VC.next()
	} else {
	    VC.prev()
	}
	// set the last animations time
	lastAnimationTime = timeNow;
	//
    };
    //	    
    // @DESKTOP HANDLER
    // activate the carousel event handler for the desktop
    // make event handler
    $doc.bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(event) {
	    //
	    event.preventDefault();
	    // 
	    // assing the delta depending on the brower 
	    // [ webkit and presto || mozilla ]
	    var delta = event.originalEvent.wheelDelta 
		|| -event.originalEvent.detail;
	    //
	    // call scroll function
	    handleScroll(event, delta);
	});

		
    var handleTouch = function( ev ){ 
	//
	// disable browser scrolling
	ev.gesture.preventDefault();
	//
	switch(ev.type) {
	case 'dragup':
	case 'dragdown':
	    //
	    // stick to the finger
	    var pane_offset = -(100/paneCount)*currentPane;
	    var drag_offset = ((100/paneHeight)*ev.gesture.deltaY)/ paneCount;
	    //
	    // slow down at the first and last pane
	    if((currentPane == 0 && 
		ev.gesture.direction == Hammer.DIRECTION_DOWN ) ||
	       (currentPane == paneCount-1 &&
		ev.gesture.direction == Hammer.DIRECTION_UP )) {
		drag_offset *= .4;
	    }
	    //
	    VC.setContainerOffset(drag_offset + pane_offset);
	    //
	    break;

	case 'swipeup':
	    VC.next();
	    ev.gesture.stopDetect();
	    break;

	case 'swipedown':
	    VC.prev();
	    ev.gesture.stopDetect();
	    break;

	case 'release':
	    // more then 50% moved, navigate
	    if(Math.abs(ev.gesture.deltaY) > paneHeight/2) {
		if(ev.gesture.direction === 'down') {
		    //
		    VC.prev();
		    //
		} else {
		    //
		    VC.next();
		    //
		}
	    }
	    else {
		//
		VC.showPane(currentPane, true);
		//
	    }
	    break;
	}
    };
    //
    // @MOBILE HANDLER
    // activate the carousel event handler for mobile
    $element.hammer({ drag_to_lock_target : true })
    .on( 'release dragdown dragup swipeleft swiperight swipeup swipedown',
	 handleTouch );
    
    
    
    return VC;
    //
};//verticalCarousel


/* **********************************************
     Begin main.js
********************************************** */

//
// Needs some seious cleanup and organizing
//
// @codekit-prepend "plugins.js";
// @codekit-prepend "vertical-carousel.js";


$(function(){
	'use strict';

	var $doc =$(document),
	    // 
	    // site objects
	    navigation,
	    hashManager,
	    //
	    HIDDEN = 'hidden';
	
	// @hashManager
	var HashManager = function( options ){ 
	    
	    var that = { 
		settings : { 
		    currentHash : 'home',
		    $link : {},
		    onChange : function(){},
		}
	    };
	    var HM = (function(){ return that; }()),
	    s = $.extend( HM.settings, options );

	    
	    HM.checkForChanges = function(){ 
		//
		// check the url for change
		$( window ).on( 'load hashchange',function(){ 
			//
			HM.handleHash( HM.getHash() );
			//
		    });
		//
		return HM
	    };


	    HM.getHash = function(){ 
		//
		var hashNow = window.location.hash.slice(1);
		//
		return hashNow;
		//
	    };


	    HM.handleHash = function( newHash ){ 
		//
		var prevHash = s.currentHash,
		newHash =  newHash;
		//
		// check if the newhash is the same as the last
		if( newHash === s.currentHash ){ 
		    //
		    // leave function
		    return HM;
		    //
		}		
		// setup the hash to Home under these conditions
		else if( newHash === 'setup' ||
			 newHash === "" 
			 || newHash === undefined ){ 
		    //
		    HM.changeHashTo( 'home' );
		    //
		} else { 
		    //
		    // if the hash is different
		    // call the callback function
		    // with that hash info 
		    s.onChange.call( HM, newHash );
		    // 
		};
		return HM;
		//
	    }; 
		
		
	    HM.changeHashTo = function( hash ){ 
		//
		s.currentHash = hash;
		//
		if( hash !== undefined ){
		    window.location.hash = s.currentHash;
		};
		// 
		return HM;
	    };
		
		
	    return HM;
	    //
	};
	
	    

	var Navigation = function( options ){ 
	    //
	    // create the NAV object
	    var that = { 
		settings : { 
		    //
		    mode : 'desktop',
		    toggleState : 'off',
		    currentHash : 'home',
		    section : 'home',
		    // carousel Object
		    carousel : undefined,
		    hashManager : undefined,
		    //ids
		    NAV_ID : 'navigation',
		    TOG_BUTTON_ID : 'toggleButton',
		    MENU_ICON_ID : 'menuIcon',
		    NAV_BG_ID : 'navBG',
		    // Data tags
		    LINK_TAG : 'link',
		    SECTION_INDEX_TAG : 'section-index',
		    SECTION_TYPE_TAG : 'section-type',
		    NAV_STATE_TAG : 'nav-state',
		    // link and pane types  
		    sections : {
			HOME : 'home',
			UX : 'ux',
			GRAPHICS : 'gpx',
			CODE : 'code',
			LINKS : 'links',
		    },
		    // style classes
		    NAV_FOCUS : 'focused_nav',
		    LINK_FOCUS : 'link_icon_focused',
		    HOME_FOCUS : 'home_icon_focused',
		    MENU_ICON : 'nav_icon_hamburger',
		    CANCEL_ICON : 'nav_icon_x'
		}
	    },
	    //
	    // Make the NAV object dynamic through closures
	    NAV = (function(){ return that; }()),
	    //
	    // merge the options object into the default settings
	    s = $.extend( NAV.settings, options ),
	    //
	    // jQuery elements
	    $nav =  $doc.find( '#'+s.NAV_ID ),
	    $links = $nav.find( '[data-'+s.LINK_TAG+']' ),
	    $linkClicked = '',
	    // Navigation toggle
	    $navToggle =  $doc.find( '#'+s.TOG_BUTTON_ID ),
	    $menuIcon =  $navToggle.find( '#'+s.MENU_ICON_ID ),
	    $guideIcon =  $menuIcon.siblings(),
	    $navBG = $doc.find( '#'+ s.NAV_BG_ID );

	    // @INIT METHODS ----------------------------------------//

	    NAV.init = function(){
		//
		// update the carousel and nav
		// if any links are clicked
		$nav.on( 'click', function(e){
			//
			// need a prevent for if target === null @FIX
			e.preventDefault();
			//
			// Store the nav and its links
			var $this = $(this);
			$linkClicked = $this.find( e.target );
			$links = $this.children();
			// //@currfix
			NAV
			//
			.clearFocusedLinks()
			//
			.handleFocus();
			//
			if( s.mode === 'mobile' ){ 
			    //
			    // hide the Nav
			    $navToggle.trigger( 'click' );
			    //
			};
			//
			NAV
			//
			.callPane()
			//
			.changeHash()
			//
			.updateMobileGuide();
			//			
		    });
		//
		NAV. setupPage();
		//
		return NAV;
	    };

	    
	    NAV.setupPage = function(){ 
		//
		//
		if( s.hashManager.checkForChanges ){
		    //
		    var hash = s.hashManager.getHash();
		    //
		    if( !NAV.compareSectionsWith( hash ) ){ 
			//
			s.hashManager.handleHash( 'setup' );
			//
		    };
		    //
		    // listen for hash event changes
		    s.hashManager.checkForChanges();
		    //
		};
		//
		return NAV;
	    };

	    

	    // NAV @ACTIONS ----------------------------------//
		
	    NAV.clearFocusedLinks = function(){ 
		//
		$links.children().removeClass( s.NAV_FOCUS )
		.removeClass( s.HOME_FOCUS )
		.removeClass( s.LINK_FOCUS );
		//
		return NAV;
	    };
	    
	    
	    NAV.focusIcon = function( $icon ){ 
		//
		var iconType = $icon.parent().attr( 'href' );
		//
		$icon.addClass( iconType+'_icon_focused' );
		//
		return NAV;
	    };
	    

	    NAV.focusText = function( $text ){ 
		//
		$text.addClass( s.NAV_FOCUS );
		//
		return NAV	    
	    };
	    

	    NAV.handleFocus = function( $linkEl ){ 
		//		
		var $link = $linkEl || $linkClicked,
		section = $link.parent().attr('href');
		//
		// check for icons or text
		if ( section === s.sections.HOME || section === s.sections.LINKS ){
		    //
		    NAV.focusIcon( $link );
		    //
		} else {
		    //
		    NAV.focusText( $link );
		};
		//
		return NAV;
	    };
	    
	    
	    NAV.callPane = function( ){ 
		//
		var index = $linkClicked.parent().data( s.SECTION_INDEX_TAG );
		//
		if( s.carousel.showPane ){ 
		    //
		    s.carousel.showPane( parseInt(index) );
		    //
		};
		//
		return NAV;
	    };


	    NAV.changeHash = function( $link ){ 
		//
		var $element = $link || $linkClicked,
		section = $element.parent().attr( 'href' );
		//
		if( s.hashManager ){ 
		    //
		    // change the hash
		    s.hashManager.changeHashTo( section );
		    //
		    // update the nav object's hash
		    s.currentHash = s.hashManager.getHash();
		    //
		};
		// 
		return NAV;
	    };

	    
	    NAV.triggerLink = function( section ){
		//
		var $sectionLink = $links.children().filter( '[data-'+s.LINK_TAG+
							 '='
							 +section+']' );
		//
		$sectionLink.trigger( 'click' );
		//
		return NAV;
		//
	    };

	    
	    NAV.updateMobileGuide = function( section ){ 
		//
		var section = section || s.currentHash;
		//
		$guideIcon.removeClass().addClass( section + '_mini' );
		//
		return NAV;
	    };
	    
	    
	    // @MODES ----------------------------------------//
	    
	    // @switch modes
	    NAV.switchModeTo = function( mode ){ 
		//
		if( s.mode === mode ){
		    // 
		    // leave function 
		    return NAV;
		    //		    
		}
		//
		// save for later use
		s.mode = mode;
		//
		if( mode === 'desktop' || mode === 'tablet' ){ 
		    //
		    NAV.desktopMode();
		    //
		} else if ( mode === 'mobile' ){ 
		    //
		    NAV.mobileMode();
		    //
		} else { 
		    //
		    NAV.switchModeTo( 'desktop' );
		    //
		} 
		//
	    };

	    // @desktop
	    NAV.desktopMode = function(){ 
		//
		// show the nav
		$nav.removeClass( HIDDEN );
		//
		// hide the nav background
		NAV.navBackground( 'off' );
		//
		// hide the nav toggle button
		$navToggle.addClass( HIDDEN )
		.off( 'click' );
		//
		// report the mode
		s.mode = 'desktop';
		//
		return NAV;
	    };
	    
	    // @mobile
	    NAV.mobileMode = function(){  
		//
		// hide the nav 
		$nav.addClass( HIDDEN );
		//
		// activate the toggle button's click event
		$navToggle.on( 'click', function( e ){ 
			//
			e.preventDefault();
			//
			NAV.toggleNav();
			//
		    });
		//
		// show the nav toggle button
		$navToggle.removeClass( HIDDEN );
		//
		// report the mode
		s.mode = 'mobile';
		//
		return NAV;
		//
	    };
	    	
	    NAV.navBackground = function( state ){ 
		//
		if( state === 'on' ){
		    //
		    $navBG.removeClass( HIDDEN );
		    //
		} else if( state === 'off' ){
		    //
		    $navBG.addClass( HIDDEN );
		    //
		}; 
		//
		return NAV;
		//
	    };

	    
	    // @TOGGLE BUTTON METHODS ----------------------------//
	    	    
	    NAV.toggleNav = function(){ 
		//
		var $toggleIcon = $navToggle.children( '#'+s.MENU_ICON_ID );
		//
		if ( s.toggleState === 'off' ){ 
		    //
		    //
		    // show the nav
		    $nav.removeClass( HIDDEN );
		    //
		    // hide the projects with a background
		    NAV.navBackground( 'on' );		    
		    //
		    // change the menu icon for a cancel icon
		    $toggleIcon.removeClass().addClass( s.CANCEL_ICON );
		    //
		    // change the state
		    s.toggleState = 'on'
		    //
		} else if ( s.toggleState === 'on' ){ 
		    //
		    // hide the nav
		    $nav.addClass( HIDDEN );
		    //
		    // show the projects by hiding the BG
		    NAV.navBackground( 'off' );		    
		    //
		    // change the menu icon for a cancel icon
		    $toggleIcon.removeClass().addClass( s.MENU_ICON );
		    //
		    // change the state
		    s.toggleState = 'off';
		}
		//
		return NAV
		//
	    };
	    
	    // Update Nav  ----------------------------//
	    
	    NAV.updateNav = function( sectionIndex ){
		//
		var $link = $links.filter( '[data-'+ s.SECTION_INDEX_TAG +
					   '='+sectionIndex+']' ).children();
		//
		NAV
		//
		.clearFocusedLinks()
		//
		.handleFocus( $link )
		//
		.changeHash( $link )
		//
		.updateMobileGuide();
		//
		return NAV;
	    };


	    // @Helpers ------------------------------//


	    NAV.findIndexFrom = function( section ){ 
		//
		// get the link button
		var $link = $links.filter( '[data-'+ s.LINK_TAG +
				     '='+section+']' ),
		//
		// get its index
		index = $link.data( s.SECTION_INDEX_TAG );
		//
		return index
		//
	    };
	    
	    NAV.findSectionFrom = function( index ){ 
		//
		// get the link button using the index
		var $link = $links.filter( '[data-'+ s.SECTION_INDEX_TAG +
				     '='+index+']' ),
		//
		// get the section
		section = $link.attr( 'href' );
		//
		//
		return section; 
		//
	    };

	    NAV.findLinkFrom = function( section ){ 
		//
		// Accepts number(by index)  or string ( by section name )
		//
		if( typeof section === 'string' ){
		    //
		    var $link = $links.filter( '[data-'+s.SECTION_INDEX_TAG+
					       '='+section+']' );
		    //
		} else if( typeof section === 'number' ){ 
		    //
		    var $link = $links.filter( '[data-'+s.SECTION_TYPE_TAG+
					       '='+section+']' );
		    //
		};
		//
		return $link;
		//
	    };


	    NAV.compareSectionsWith = function( possibleSec ){ 
		//
		var sections = s.sections,
		answer = false;
		//
		// check if the argument is  a section
		for(var prop in sections ){ 
		    //
		    if ( sections[ prop ] === possibleSec ){ 
			//
			answer = true;
			//
			return answer;
		    };
		    //
		};
		return answer;
	    };

	    
	    return NAV;
	    //
	}// end NAV 



	// @INIT site objects 
	//
	navigation = Navigation({ 
		//		
		carousel: $.verticalCarousel( '#vertical-carousel',{
			//
			onChange : function( newPane ){ 
			    //
			    // show the pane
			    navigation.updateNav( newPane );
			    //
			    // conver the index to its corresponding section name
			    var section = navigation.findSectionFrom( newPane );
			    //
			    // change the hash
			    navigation.settings
			    .hashManager.changeHashTo( section );
			    //
			} 
			//			
		    }),
		hashManager : HashManager({ 
			    //
			onChange : function( hash ){
			    //
			    var section = hash,
			    index = navigation.findIndexFrom( section );
			    //
			    navigation.settings.carousel.showPane( index );
			    //
			}
		    })
	    });
	//
	// @nav init
	//
	// @carousel init
	navigation.settings.carousel.init();
	navigation.init();




	// ENQUIRE SITE MODES
	
	// window thresholds
	var base_width = 960,
	    tablet_width =  768,
	    mobile_portrait_width = 300,
	    mobile_landscape_width = 420,
	    margin = 10,
	    topMaxWidth = base_width -1,
	    topMinWidth = tablet_width,
	    medMaxWidth = 768,
	    medMinWidth = 481,
	    botMaxWidth = 480,
	    $html = $doc.find( 'html' );



	var siteMode = function( screenMode ){ 
	    //
	    var screenMode = screenMode || 'desktop',
	    tablet = 'tablet_size',
	    mobile = 'mobile_size',
	    mobile_small = 'mobile_sm_size';

	    switch( screenMode ){ 
		//
	    case "desktop": 
		//
		$html.removeClass( tablet 
				   +" "+ mobile 
				   +" "+ mobile_small );
		//
		navigation.switchModeTo( 'desktop' );
		//
		console.log( 'mode : desktop' );
		//
		break;
	    case "tablet": 
		//
		$html.removeClass( mobile 
				   +" "+ mobile_small );
		//
		$html.addClass( tablet );
		//
		navigation.switchModeTo( 'tablet' );
		//
		console.log( 'mode : tablet' );
		break;	    
	    case "mobile": 
		//
		$html.removeClass( tablet 
				   +" "+ mobile_small );
		//
		$html.addClass( mobile );
		//
		navigation.switchModeTo( 'mobile' );
		//
		console.log( 'mode : mobile' );
		//
		break;	    
	    case "mobile_small": 
		//
		$html.removeClass( tablet 
				   +" "+ mobile);
		//
		$html.addClass( mobile_small );
		//
		navigation.switchModeTo( 'mobile' );
		//
		console.log( 'mode : tablet_sm' );
		//
		break;
	    };
	}



	enquire
	    .register("screen and (min-width: "+topMaxWidth+"px )", {
		    //
		    match : function(){
			//
			siteMode( 'desktop' );
			//
		    }
		    
		})
	    .register("screen and (min-width: "+topMinWidth+
		      "px ) and (max-width: "+topMaxWidth+"px )", {
			//
			match : function(){
			    //
			    siteMode( 'tablet' );
			    //
			}
		    })
	    .register("screen and (min-width: "+medMinWidth+
		      "px ) and (max-width: "+medMaxWidth+"px ) ", {
			    //
			    match : function(){
				//
				siteMode( 'mobile' );
				//
			    }
			})
	    .register("screen and (max-width: "+botMaxWidth+"px)", {
				// 
				match: function(){ 
				    //
				siteMode( 'mobile_small' );
				//
				}
			    });
    });

