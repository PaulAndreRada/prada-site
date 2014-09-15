// Avoid `console` errors in browsers that lack a console.
(function(){var e,t=function(){},n=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeStamp","trace","warn"],r=n.length,i=window.console=window.console||{};while(r--){e=n[r];i[e]||(i[e]=t)}})();!function(e,t,n){var r=window.matchMedia;"undefined"!=typeof module&&module.exports?module.exports=n(r):"function"==typeof define&&define.amd?define(function(){return t[e]=n(r)}):t[e]=n(r)}("enquire",this,function(e){"use strict";function t(e,t){var n,r=0,i=e.length;for(r;i>r&&(n=t(e[r],r),n!==!1);r++);}function n(e){return"[object Array]"===Object.prototype.toString.apply(e)}function r(e){return"function"==typeof e}function i(e){this.options=e,!e.deferSetup&&this.setup()}function s(t,n){this.query=t,this.isUnconditional=n,this.handlers=[],this.mql=e(t);var r=this;this.listener=function(e){r.mql=e,r.assess()},this.mql.addListener(this.listener)}function o(){if(!e)throw new Error("matchMedia not present, legacy browsers require a polyfill");this.queries={},this.browserIsIncapable=!e("only all").matches}return i.prototype={setup:function(){this.options.setup&&this.options.setup(),this.initialised=!0},on:function(){!this.initialised&&this.setup(),this.options.match&&this.options.match()},off:function(){this.options.unmatch&&this.options.unmatch()},destroy:function(){this.options.destroy?this.options.destroy():this.off()},equals:function(e){return this.options===e||this.options.match===e}},s.prototype={addHandler:function(e){var t=new i(e);this.handlers.push(t),this.matches()&&t.on()},removeHandler:function(e){var n=this.handlers;t(n,function(t,r){return t.equals(e)?(t.destroy(),!n.splice(r,1)):void 0})},matches:function(){return this.mql.matches||this.isUnconditional},clear:function(){t(this.handlers,function(e){e.destroy()}),this.mql.removeListener(this.listener),this.handlers.length=0},assess:function(){var e=this.matches()?"on":"off";t(this.handlers,function(t){t[e]()})}},o.prototype={register:function(e,i,o){var u=this.queries,a=o&&this.browserIsIncapable;return u[e]||(u[e]=new s(e,a)),r(i)&&(i={match:i}),n(i)||(i=[i]),t(i,function(t){r(t)&&(t={match:t}),u[e].addHandler(t)}),this},unregister:function(e,t){var n=this.queries[e];return n&&(t?n.removeHandler(t):(n.clear(),delete this.queries[e])),this}},new o});!function(e,t){"use strict";function n(){i.READY||(b.determineEventTypes(),y.each(i.gestures,function(e){E.register(e)}),b.onTouch(i.DOCUMENT,d,E.detect),b.onTouch(i.DOCUMENT,v,E.detect),i.READY=!0)}function r(e,n){Date.now||(Date.now=function(){return(new Date).getTime()}),e.utils.each(["on","off"],function(r){e.utils[r]=function(e,i,s){n(e)[r](i,function(e){var r=n.extend({},e.originalEvent,e);r.button===t&&(r.button=e.which-1),s.call(this,r)})}}),e.Instance.prototype.trigger=function(e,t){var r=n(this.element);return r.has(t.target).length&&(r=n(t.target)),r.trigger({type:e,gesture:t})},n.fn.hammer=function(t){return this.each(function(){var r=n(this),i=r.data("hammer");i?i&&t&&e.utils.extend(i.options,t):r.data("hammer",new e(this,t||{}))})}}var i=function S(e,t){return new S.Instance(e,t||{})};i.VERSION="1.1.3",i.defaults={behavior:{userSelect:"none",touchAction:"pan-y",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}},i.DOCUMENT=document,i.HAS_POINTEREVENTS=navigator.pointerEnabled||navigator.msPointerEnabled,i.HAS_TOUCHEVENTS="ontouchstart"in e,i.IS_MOBILE=/mobile|tablet|ip(ad|hone|od)|android|silk/i.test(navigator.userAgent),i.NO_MOUSEEVENTS=i.HAS_TOUCHEVENTS&&i.IS_MOBILE||i.HAS_POINTEREVENTS,i.CALCULATE_INTERVAL=25;var s={},o=i.DIRECTION_DOWN="down",u=i.DIRECTION_LEFT="left",a=i.DIRECTION_UP="up",f=i.DIRECTION_RIGHT="right",l=i.POINTER_MOUSE="mouse",c=i.POINTER_TOUCH="touch",h=i.POINTER_PEN="pen",p=i.EVENT_START="start",d=i.EVENT_MOVE="move",v=i.EVENT_END="end",m=i.EVENT_RELEASE="release",g=i.EVENT_TOUCH="touch";i.READY=!1,i.plugins=i.plugins||{},i.gestures=i.gestures||{};var y=i.utils={extend:function(e,n,r){for(var i in n)!n.hasOwnProperty(i)||e[i]!==t&&r||(e[i]=n[i]);return e},on:function(e,t,n){e.addEventListener(t,n,!1)},off:function(e,t,n){e.removeEventListener(t,n,!1)},each:function(e,n,r){var i,s;if("forEach"in e)e.forEach(n,r);else if(e.length!==t){for(i=0,s=e.length;s>i;i++)if(n.call(r,e[i],i,e)===!1)return}else for(i in e)if(e.hasOwnProperty(i)&&n.call(r,e[i],i,e)===!1)return},inStr:function(e,t){return e.indexOf(t)>-1},inArray:function(e,t){if(e.indexOf){var n=e.indexOf(t);return-1===n?!1:n}for(var r=0,i=e.length;i>r;r++)if(e[r]===t)return r;return!1},toArray:function(e){return Array.prototype.slice.call(e,0)},hasParent:function(e,t){for(;e;){if(e==t)return!0;e=e.parentNode}return!1},getCenter:function(e){var t=[],n=[],r=[],i=[],s=Math.min,o=Math.max;return 1===e.length?{pageX:e[0].pageX,pageY:e[0].pageY,clientX:e[0].clientX,clientY:e[0].clientY}:(y.each(e,function(e){t.push(e.pageX),n.push(e.pageY),r.push(e.clientX),i.push(e.clientY)}),{pageX:(s.apply(Math,t)+o.apply(Math,t))/2,pageY:(s.apply(Math,n)+o.apply(Math,n))/2,clientX:(s.apply(Math,r)+o.apply(Math,r))/2,clientY:(s.apply(Math,i)+o.apply(Math,i))/2})},getVelocity:function(e,t,n){return{x:Math.abs(t/e)||0,y:Math.abs(n/e)||0}},getAngle:function(e,t){var n=t.clientX-e.clientX,r=t.clientY-e.clientY;return 180*Math.atan2(r,n)/Math.PI},getDirection:function(e,t){var n=Math.abs(e.clientX-t.clientX),r=Math.abs(e.clientY-t.clientY);return n>=r?e.clientX-t.clientX>0?u:f:e.clientY-t.clientY>0?a:o},getDistance:function(e,t){var n=t.clientX-e.clientX,r=t.clientY-e.clientY;return Math.sqrt(n*n+r*r)},getScale:function(e,t){return e.length>=2&&t.length>=2?this.getDistance(t[0],t[1])/this.getDistance(e[0],e[1]):1},getRotation:function(e,t){return e.length>=2&&t.length>=2?this.getAngle(t[1],t[0])-this.getAngle(e[1],e[0]):0},isVertical:function(e){return e==a||e==o},setPrefixedCss:function(e,t,n,r){var i=["","Webkit","Moz","O","ms"];t=y.toCamelCase(t);for(var s=0;s<i.length;s++){var o=t;if(i[s]&&(o=i[s]+o.slice(0,1).toUpperCase()+o.slice(1)),o in e.style){e.style[o]=(null==r||r)&&n||"";break}}},toggleBehavior:function(e,t,n){if(t&&e&&e.style){y.each(t,function(t,r){y.setPrefixedCss(e,r,t,n)});var r=n&&function(){return!1};"none"==t.userSelect&&(e.onselectstart=r),"none"==t.userDrag&&(e.ondragstart=r)}},toCamelCase:function(e){return e.replace(/[_-]([a-z])/g,function(e){return e[1].toUpperCase()})}};i.Instance=function(e,t){var r=this;n(),this.element=e,this.enabled=!0,y.each(t,function(e,n){delete t[n],t[y.toCamelCase(n)]=e}),this.options=y.extend(y.extend({},i.defaults),t||{}),this.options.behavior&&y.toggleBehavior(this.element,this.options.behavior,!0),this.eventStartHandler=b.onTouch(e,p,function(e){r.enabled&&e.eventType==p?E.startDetect(r,e):e.eventType==g&&E.detect(e)}),this.eventHandlers=[]},i.Instance.prototype={on:function(e,t){var n=this;return b.on(n.element,e,t,function(e){n.eventHandlers.push({gesture:e,handler:t})}),n},off:function(e,t){var n=this;return b.off(n.element,e,t,function(e){var r=y.inArray({gesture:e,handler:t});r!==!1&&n.eventHandlers.splice(r,1)}),n},trigger:function(e,t){t||(t={});var n=i.DOCUMENT.createEvent("Event");n.initEvent(e,!0,!0),n.gesture=t;var r=this.element;return y.hasParent(t.target,r)&&(r=t.target),r.dispatchEvent(n),this},enable:function(e){return this.enabled=e,this},dispose:function(){var e,t;for(y.toggleBehavior(this.element,this.options.behavior,!1),e=-1;t=this.eventHandlers[++e];)y.off(this.element,t.gesture,t.handler);return this.eventHandlers=[],b.off(this.element,s[p],this.eventStartHandler),null}};var b=i.event={preventMouseEvents:!1,started:!1,shouldDetect:!1,on:function(e,t,n,r){var i=t.split(" ");y.each(i,function(t){y.on(e,t,n),r&&r(t)})},off:function(e,t,n,r){var i=t.split(" ");y.each(i,function(t){y.off(e,t,n),r&&r(t)})},onTouch:function(e,t,n){var r=this,o=function(s){var o,u=s.type.toLowerCase(),a=i.HAS_POINTEREVENTS,f=y.inStr(u,"mouse");f&&r.preventMouseEvents||(f&&t==p&&0===s.button?(r.preventMouseEvents=!1,r.shouldDetect=!0):a&&t==p?r.shouldDetect=1===s.buttons||w.matchType(c,s):f||t!=p||(r.preventMouseEvents=!0,r.shouldDetect=!0),a&&t!=v&&w.updatePointer(t,s),r.shouldDetect&&(o=r.doDetect.call(r,s,t,e,n)),o==v&&(r.preventMouseEvents=!1,r.shouldDetect=!1,w.reset()),a&&t==v&&w.updatePointer(t,s))};return this.on(e,s[t],o),o},doDetect:function(e,t,n,r){var i=this.getTouchList(e,t),s=i.length,o=t,u=i.trigger,a=s;t==p?u=g:t==v&&(u=m,a=i.length-(e.changedTouches?e.changedTouches.length:1)),a>0&&this.started&&(o=d),this.started=!0;var f=this.collectEventData(n,o,i,e);return t!=v&&r.call(E,f),u&&(f.changedLength=a,f.eventType=u,r.call(E,f),f.eventType=o,delete f.changedLength),o==v&&(r.call(E,f),this.started=!1),o},determineEventTypes:function(){var t;return t=i.HAS_POINTEREVENTS?e.PointerEvent?["pointerdown","pointermove","pointerup pointercancel lostpointercapture"]:["MSPointerDown","MSPointerMove","MSPointerUp MSPointerCancel MSLostPointerCapture"]:i.NO_MOUSEEVENTS?["touchstart","touchmove","touchend touchcancel"]:["touchstart mousedown","touchmove mousemove","touchend touchcancel mouseup"],s[p]=t[0],s[d]=t[1],s[v]=t[2],s},getTouchList:function(e,t){if(i.HAS_POINTEREVENTS)return w.getTouchList();if(e.touches){if(t==d)return e.touches;var n=[],r=[].concat(y.toArray(e.touches),y.toArray(e.changedTouches)),s=[];return y.each(r,function(e){y.inArray(n,e.identifier)===!1&&s.push(e),n.push(e.identifier)}),s}return e.identifier=1,[e]},collectEventData:function(e,t,n,r){var i=c;return y.inStr(r.type,"mouse")||w.matchType(l,r)?i=l:w.matchType(h,r)&&(i=h),{center:y.getCenter(n),timeStamp:Date.now(),target:r.target,touches:n,eventType:t,pointerType:i,srcEvent:r,preventDefault:function(){var e=this.srcEvent;e.preventManipulation&&e.preventManipulation(),e.preventDefault&&e.preventDefault()},stopPropagation:function(){this.srcEvent.stopPropagation()},stopDetect:function(){return E.stopDetect()}}}},w=i.PointerEvent={pointers:{},getTouchList:function(){var e=[];return y.each(this.pointers,function(t){e.push(t)}),e},updatePointer:function(e,t){e==v||e!=v&&1!==t.buttons?delete this.pointers[t.pointerId]:(t.identifier=t.pointerId,this.pointers[t.pointerId]=t)},matchType:function(e,t){if(!t.pointerType)return!1;var n=t.pointerType,r={};return r[l]=n===(t.MSPOINTER_TYPE_MOUSE||l),r[c]=n===(t.MSPOINTER_TYPE_TOUCH||c),r[h]=n===(t.MSPOINTER_TYPE_PEN||h),r[e]},reset:function(){this.pointers={}}},E=i.detection={gestures:[],current:null,previous:null,stopped:!1,startDetect:function(e,t){this.current||(this.stopped=!1,this.current={inst:e,startEvent:y.extend({},t),lastEvent:!1,lastCalcEvent:!1,futureCalcEvent:!1,lastCalcData:{},name:""},this.detect(t))},detect:function(e){if(this.current&&!this.stopped){e=this.extendEventData(e);var t=this.current.inst,n=t.options;return y.each(this.gestures,function(r){!this.stopped&&t.enabled&&n[r.name]&&r.handler.call(r,e,t)},this),this.current&&(this.current.lastEvent=e),e.eventType==v&&this.stopDetect(),e}},stopDetect:function(){this.previous=y.extend({},this.current),this.current=null,this.stopped=!0},getCalculatedData:function(e,t,n,r,s){var o=this.current,u=!1,a=o.lastCalcEvent,f=o.lastCalcData;a&&e.timeStamp-a.timeStamp>i.CALCULATE_INTERVAL&&(t=a.center,n=e.timeStamp-a.timeStamp,r=e.center.clientX-a.center.clientX,s=e.center.clientY-a.center.clientY,u=!0),(e.eventType==g||e.eventType==m)&&(o.futureCalcEvent=e),(!o.lastCalcEvent||u)&&(f.velocity=y.getVelocity(n,r,s),f.angle=y.getAngle(t,e.center),f.direction=y.getDirection(t,e.center),o.lastCalcEvent=o.futureCalcEvent||e,o.futureCalcEvent=e),e.velocityX=f.velocity.x,e.velocityY=f.velocity.y,e.interimAngle=f.angle,e.interimDirection=f.direction},extendEventData:function(e){var t=this.current,n=t.startEvent,r=t.lastEvent||n;(e.eventType==g||e.eventType==m)&&(n.touches=[],y.each(e.touches,function(e){n.touches.push({clientX:e.clientX,clientY:e.clientY})}));var i=e.timeStamp-n.timeStamp,s=e.center.clientX-n.center.clientX,o=e.center.clientY-n.center.clientY;return this.getCalculatedData(e,r.center,i,s,o),y.extend(e,{startEvent:n,deltaTime:i,deltaX:s,deltaY:o,distance:y.getDistance(n.center,e.center),angle:y.getAngle(n.center,e.center),direction:y.getDirection(n.center,e.center),scale:y.getScale(n.touches,e.touches),rotation:y.getRotation(n.touches,e.touches)}),e},register:function(e){var n=e.defaults||{};return n[e.name]===t&&(n[e.name]=!0),y.extend(i.defaults,n,!0),e.index=e.index||1e3,this.gestures.push(e),this.gestures.sort(function(e,t){return e.index<t.index?-1:e.index>t.index?1:0}),this.gestures}};!function(e){function t(t,r){var i=E.current;if(!(r.options.dragMaxTouches>0&&t.touches.length>r.options.dragMaxTouches))switch(t.eventType){case p:n=!1;break;case d:if(t.distance<r.options.dragMinDistance&&i.name!=e)return;var s=i.startEvent.center;if(i.name!=e&&(i.name=e,r.options.dragDistanceCorrection&&t.distance>0)){var l=Math.abs(r.options.dragMinDistance/t.distance);s.pageX+=t.deltaX*l,s.pageY+=t.deltaY*l,s.clientX+=t.deltaX*l,s.clientY+=t.deltaY*l,t=E.extendEventData(t)}(i.lastEvent.dragLockToAxis||r.options.dragLockToAxis&&r.options.dragLockMinDistance<=t.distance)&&(t.dragLockToAxis=!0);var c=i.lastEvent.direction;t.dragLockToAxis&&c!==t.direction&&(t.direction=y.isVertical(c)?t.deltaY<0?a:o:t.deltaX<0?u:f),n||(r.trigger(e+"start",t),n=!0),r.trigger(e,t),r.trigger(e+t.direction,t);var h=y.isVertical(t.direction);(r.options.dragBlockVertical&&h||r.options.dragBlockHorizontal&&!h)&&t.preventDefault();break;case m:n&&t.changedLength<=r.options.dragMaxTouches&&(r.trigger(e+"end",t),n=!1);break;case v:n=!1}}var n=!1;i.gestures.Drag={name:e,index:50,handler:t,defaults:{dragMinDistance:10,dragDistanceCorrection:!0,dragMaxTouches:1,dragBlockHorizontal:!1,dragBlockVertical:!1,dragLockToAxis:!1,dragLockMinDistance:25}}}("drag"),i.gestures.Gesture={name:"gesture",index:1337,handler:function(e,t){t.trigger(this.name,e)}},function(e){function t(t,r){var i=r.options,s=E.current;switch(t.eventType){case p:clearTimeout(n),s.name=e,n=setTimeout(function(){s&&s.name==e&&r.trigger(e,t)},i.holdTimeout);break;case d:t.distance>i.holdThreshold&&clearTimeout(n);break;case m:clearTimeout(n)}}var n;i.gestures.Hold={name:e,index:10,defaults:{holdTimeout:500,holdThreshold:2},handler:t}}("hold"),i.gestures.Release={name:"release",index:1/0,handler:function(e,t){e.eventType==m&&t.trigger(this.name,e)}},i.gestures.Swipe={name:"swipe",index:40,defaults:{swipeMinTouches:1,swipeMaxTouches:1,swipeVelocityX:.6,swipeVelocityY:.6},handler:function(e,t){if(e.eventType==m){var n=e.touches.length,r=t.options;if(n<r.swipeMinTouches||n>r.swipeMaxTouches)return;(e.velocityX>r.swipeVelocityX||e.velocityY>r.swipeVelocityY)&&(t.trigger(this.name,e),t.trigger(this.name+e.direction,e))}}},function(e){function t(t,r){var i,s,o=r.options,u=E.current,a=E.previous;switch(t.eventType){case p:n=!1;break;case d:n=n||t.distance>o.tapMaxDistance;break;case v:!y.inStr(t.srcEvent.type,"cancel")&&t.deltaTime<o.tapMaxTime&&!n&&(i=a&&a.lastEvent&&t.timeStamp-a.lastEvent.timeStamp,s=!1,a&&a.name==e&&i&&i<o.doubleTapInterval&&t.distance<o.doubleTapDistance&&(r.trigger("doubletap",t),s=!0),(!s||o.tapAlways)&&(u.name=e,r.trigger(u.name,t)))}}var n=!1;i.gestures.Tap={name:e,index:100,handler:t,defaults:{tapMaxTime:250,tapMaxDistance:10,tapAlways:!0,doubleTapDistance:20,doubleTapInterval:300}}}("tap"),i.gestures.Touch={name:"touch",index:-1/0,defaults:{preventDefault:!1,preventMouse:!1},handler:function(e,t){return t.options.preventMouse&&e.pointerType==l?void e.stopDetect():(t.options.preventDefault&&e.preventDefault(),void (e.eventType==g&&t.trigger("touch",e)))}},function(e){function t(t,r){switch(t.eventType){case p:n=!1;break;case d:if(t.touches.length<2)return;var i=Math.abs(1-t.scale),s=Math.abs(t.rotation);if(i<r.options.transformMinScale&&s<r.options.transformMinRotation)return;E.current.name=e,n||(r.trigger(e+"start",t),n=!0),r.trigger(e,t),s>r.options.transformMinRotation&&r.trigger("rotate",t),i>r.options.transformMinScale&&(r.trigger("pinch",t),r.trigger("pinch"+(t.scale<1?"in":"out"),t));break;case m:n&&t.changedLength<2&&(r.trigger(e+"end",t),n=!1)}}var n=!1;i.gestures.Transform={name:e,index:45,defaults:{transformMinScale:.01,transformMinRotation:1},handler:t}}("transform"),e.Hammer=i,"undefined"!=typeof module&&module.exports&&(module.exports=i),"function"==typeof define&&define.amd?define(["jquery"],function(t){return r(e.Hammer,t)}):r(e.Hammer,e.jQuery||e.Zepto)}(window);(function(e,t,n){"$:nomunge";function f(e){e=e||location.href;return"#"+e.replace(/^[^#]*#?(.*)$/,"$1")}var r="hashchange",i=document,s,o=e.event.special,u=i.documentMode,a="on"+r in t&&(u===n||u>7);e.fn[r]=function(e){return e?this.bind(r,e):this.trigger(r)};e.fn[r].delay=50;o[r]=e.extend(o[r],{setup:function(){if(a)return!1;e(s.start)},teardown:function(){if(a)return!1;e(s.stop)}});s=function(){function c(){var n=f(),i=l(o);if(n!==o){a(o=n,i);e(t).trigger(r)}else i!==o&&(location.href=location.href.replace(/#.*/,"")+i);s=setTimeout(c,e.fn[r].delay)}var i={},s,o=f(),u=function(e){return e},a=u,l=u;i.start=function(){s||c()};i.stop=function(){s&&clearTimeout(s);s=n};return i}()})(jQuery,this);$.verticalCarousel=function(e,t){var n={onChange:undefined},r=$(document),i=r.find(e),s=i.find("ul"),o=s.find("li"),u=0,a=o.length,f=n.startPane||0,l=450,c=800,h=0,p;n=$.extend(n,t);n.init=function(){n.setPaneDimensions();$(window).on("load resize orientationchange",function(){n.setPaneDimensions()});return n};n.setPaneDimensions=function(){u=i.height();for(var e=0;e<a;e++)o.height(u);s.height(u*a);return n};n.showPane=function(e){var e=Math.max(0,Math.min(e,a-1));f=e;var t=-(100/a*f);n.setContainerOffset(t,!0);typeof n.onChange=="function"&&n.onChange.call(n,f);return n};n.setContainerOffset=function(e,t){s.removeClass("animate");t&&s.addClass("animate");if(Modernizr.csstransforms3d)s.css("transform","translate3d(0,"+e+"%,0) scale3d(1,1,1)");else if(Modernizr.csstransforms)s.css("transform","translate(0,"+e+"%)");else{var n=u*a/100*e;s.css("top",n+"px")}};n.next=function(){return n.showPane(f+1)};n.prev=function(){return n.showPane(f-1)};var d=function(e,t){var r=$(this),i=t,s=(new Date).getTime(),o=s-h,u=l+c,a=r.scrollTop();if(o<u){e.preventDefault();return}i<0?n.next():n.prev();h=s};r.bind("mousewheel DOMMouseScroll MozMousePixelScroll",function(e){e.preventDefault();var t=e.originalEvent.wheelDelta||-e.originalEvent.detail;d(e,t)});var v=function(e){e.gesture.preventDefault();switch(e.type){case"dragup":case"dragdown":var t=-(100/a)*f,r=100/u*e.gesture.deltaY/a;if(f==0&&e.gesture.direction==Hammer.DIRECTION_DOWN||f==a-1&&e.gesture.direction==Hammer.DIRECTION_UP)r*=.4;n.setContainerOffset(r+t);break;case"swipeup":n.next();e.gesture.stopDetect();break;case"swipedown":n.prev();e.gesture.stopDetect();break;case"release":Math.abs(e.gesture.deltaY)>u/8?e.gesture.direction==="down"?n.prev():n.next():n.showPane(f,!0)}};i.hammer({drag_to_lock_target:!0}).on("release dragdown dragup swipeleft swiperight swipeup swipedown",v);return n};$(function(){"use strict";var e=$(document),t=e.find("#mainContent"),n=e.find("#spinner"),r,i,s,o="hidden";$(window).on("load",function(){n.hide();t.fadeIn(700)});var u=function(){var t={settings:{mode:"closed",INTRO_ID:"intro",ABOUT_ID:"about",OPEN_ID:"moreButton",CLOSE_ID:"closeButton",HOME_TAG:"section-type",HOME:"home"}},n=function(){return t}(),r=n.settings,i=e.find("[data-"+r.HOME_TAG+"="+r.HOME+"]"),s=i.find("#"+r.INTRO_ID),o=s.find("#"+r.OPEN_ID),u=i.find("#"+r.ABOUT_ID),a=u.find("#"+r.CLOSE_ID);console.log(i);console.log(s);console.log(o);console.log(u);console.log(a);n.init=function(){console.log("initialized");o.on("click",function(e){e.preventDefault();console.log("open");n.info("open")});a.on("click",function(e){e.preventDefault();console.log("event on");n.info("close")});return n};n.info=function(e){var t=300;if(e==="open"){s.fadeOut(t/2);u.fadeIn(t*3);r.mode="open"}else if(e==="close"){u.fadeOut(t/4);window.setTimeout(function(){s.fadeIn(t)},t);r.mode="closed"}return n};return n},a=function(e){var t={settings:{currentHash:"home",$link:{},onChange:function(){}}},n=function(){return t}(),r=$.extend(n.settings,e);n.checkForChanges=function(){$(window).on("load hashchange",function(){n.handleHash(n.getHash())});return n};n.getHash=function(){var e=window.location.hash.slice(1);return e};n.handleHash=function(e){var t=r.currentHash,e=e;if(e===r.currentHash)return n;e==="setup"||e===""||e===undefined?n.changeHashTo("home"):r.onChange.call(n,e);return n};n.changeHashTo=function(e){r.currentHash=e;e!==undefined&&(window.location.hash=r.currentHash);return n};return n},f=function(t){var n={settings:{mode:"desktop",toggleState:"off",currentHash:"home",section:"home",carousel:undefined,hashManager:undefined,NAV_ID:"navigation",TOG_BUTTON_ID:"toggleButton",MENU_ICON_ID:"menuIcon",NAV_BG_ID:"navBG",LINK_TAG:"link",SECTION_INDEX_TAG:"section-index",SECTION_TYPE_TAG:"section-type",NAV_STATE_TAG:"nav-state",sections:{HOME:"home",UX:"ux",GRAPHICS:"gpx",CODE:"code",LINKS:"links"},NAV_FOCUS:"focused_nav",LINK_FOCUS:"link_icon_focused",HOME_FOCUS:"home_icon_focused",MENU_ICON:"nav_icon_hamburger",CANCEL_ICON:"nav_icon_x"}},r=function(){return n}(),i=$.extend(r.settings,t),s=e.find("#"+i.NAV_ID),u=s.find("[data-"+i.LINK_TAG+"]"),a="",f=e.find("#"+i.TOG_BUTTON_ID),l=f.find("#"+i.MENU_ICON_ID),c=l.siblings(),h=e.find("#"+i.NAV_BG_ID);r.init=function(){s.on("click",function(e){e.preventDefault();var t=$(this);a=t.find(e.target);u=t.children();r.clearFocusedLinks().handleFocus();r.callPane().changeHash().updateMobileGuide();i.mode==="mobile"&&f.trigger("click")});r.setupPage();return r};r.setupPage=function(){if(i.hashManager){var e=i.hashManager,t=e.getHash();r.compareSectionsWith(t)||e.handleHash("setup");e.checkForChanges();t===i.sections.HOME?r.toggleHomeArrow("off"):r.compareSectionsWith(t)&&t!==i.sections.HOME&&r.toggleHomeArrow("on")}return r};r.clearFocusedLinks=function(){u.children().removeClass(i.NAV_FOCUS);return r};r.focusText=function(e){e.addClass(i.NAV_FOCUS);return r};r.handleFocus=function(e){var t=e||a,n=t.parent().attr("href");r.focusText(t);return r};r.callPane=function(){var e,t=a;a.tagName!=="A"&&(t=t.parent());e=t.data(i.SECTION_INDEX_TAG);i.carousel&&i.carousel.showPane(parseInt(e));return r};r.changeHash=function(e){var t=e||a,n=t.parent().attr("href");if(i.hashManager){i.hashManager.changeHashTo(n);i.currentHash=i.hashManager.getHash()}return r};r.triggerLink=function(e){var t=u.children().filter("[data-"+i.LINK_TAG+"="+e+"]");t.trigger("click");return r};r.updateMobileGuide=function(e){var e=e||i.currentHash;c.removeClass().addClass(e+"_mini");return r};r.switchModeTo=function(e){if(i.mode===e)return r;i.mode=e;e==="desktop"||e==="tablet"?r.desktopMode():e==="mobile"?r.mobileMode():r.switchModeTo("desktop")};r.desktopMode=function(){s.removeClass(o);r.navBackground("off");f.addClass(o).off("click");i.mode="desktop";return r};r.mobileMode=function(){s.addClass(o);f.on("click",function(e){e.preventDefault();r.toggleNav()});f.removeClass(o);i.mode="mobile";return r};r.navBackground=function(e){e==="on"?h.removeClass(o):e==="off"&&h.addClass(o);return r};r.toggleNav=function(){var e=f.children("#"+i.MENU_ICON_ID);if(i.toggleState==="off"){s.removeClass(o);r.navBackground("on");e.removeClass().addClass(i.CANCEL_ICON);c.addClass(o);i.toggleState="on"}else if(i.toggleState==="on"){s.addClass(o);r.navBackground("off");e.removeClass().addClass(i.MENU_ICON);c.removeClass(o);i.toggleState="off"}return r};r.updateNav=function(e){var t=u.filter("[data-"+i.SECTION_INDEX_TAG+"="+e+"]").children();r.clearFocusedLinks().handleFocus(t).changeHash(t).updateMobileGuide();return r};r.findIndexFrom=function(e){var t=u.filter("[data-"+i.LINK_TAG+"="+e+"]"),n=t.data(i.SECTION_INDEX_TAG);return n};r.findSectionFrom=function(e){var t=u.filter("[data-"+i.SECTION_INDEX_TAG+"="+e+"]"),n=t.attr("href");return n};r.findLinkFrom=function(e){if(typeof e=="string")var t=u.filter("[data-"+i.SECTION_INDEX_TAG+"="+e+"]");else if(typeof e=="number")var t=u.filter("[data-"+i.SECTION_TYPE_TAG+"="+e+"]");return t};r.compareSectionsWith=function(e){var t=i.sections,n=!1;for(var r in t)if(t[r]===e){n=!0;return n}return n};r.toggleHomeArrow=function(e){var t=u.filter("[data-"+i.LINK_TAG+"="+i.sections.HOME+"]").children();e==="on"?t.removeClass(o):e==="off"&&t.addClass(o);return r};return r};r=f({carousel:$.verticalCarousel("#vertical-carousel",{onChange:function(e){var t=r;t.updateNav(e);var n=t.findSectionFrom(e);t.settings.hashManager.changeHashTo(n);n===t.settings.sections.HOME?t.toggleHomeArrow("off"):t.compareSectionsWith(n)&&n!==t.settings.sections.HOME&&t.toggleHomeArrow("on")}}),hashManager:a({onChange:function(e){var t=e,n=r.findIndexFrom(t);r.settings.carousel.showPane(n)}})});r.settings.carousel.init();r.init();s=u().init();var l=960,c=768,h=300,p=420,d=10,v=l-1,m=c,g=768,y=481,b=480,w=e.find("html"),E=function(e){var e=e||"desktop",t="tablet_size",n="mobile_size",i="mobile_sm_size";switch(e){case"desktop":w.removeClass(t+" "+n+" "+i);r.switchModeTo("desktop");break;case"tablet":w.removeClass(n+" "+i);w.addClass(t);r.switchModeTo("tablet");break;case"mobile":w.removeClass(t+" "+i);w.addClass(n);r.switchModeTo("mobile");break;case"mobile_small":w.removeClass(t+" "+n);w.addClass(i);r.switchModeTo("mobile")}};enquire.register("screen and (min-width: "+v+"px )",{match:function(){E("desktop")}}).register("screen and (min-width: "+m+"px ) and (max-width: "+v+"px )",{match:function(){E("tablet")}}).register("screen and (min-width: "+y+"px ) and (max-width: "+g+"px ) ",{match:function(){E("mobile")}}).register("screen and (max-width: "+b+"px)",{match:function(){E("mobile_small")}})});