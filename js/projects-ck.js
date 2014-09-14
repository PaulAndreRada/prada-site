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




/* **********************************************
     Begin projects.js
********************************************** */

//
//
// @codekit-prepend "projects-plugins.js";

$(function(){
	'use strict';

	var $doc = $(document),
	    $mainContent = $doc.find( '#mainContent' ),
	    $spinner = $doc.find( '#spinner' ),
	    //
	    HIDDEN = 'hidden',
	    navigation;


	// onLoad fadeIn body
        $(window).on( 'load', function(){
                //
		$spinner.hide();
                //
		$mainContent.fadeIn(700);
                //
		console.log( $spinner );
		console.log( $mainContent );
	    });


	// @nav object
	var Navigation = function(){
	    //
	    var that = {
		settings : {
		    navMode : 'desktop',
		    navState : 'off',
		    //
		    // ids
		    NAV_ID : "navigation",
		    TOG_ID : "navToggle",
		    // classes
		    MENU_CLASS : "menu_icon",
		    CANCEL_CLASS : "cancel_icon"
		},
	    },
	    NAV = (function(){ return that; }()),
	    s = NAV.settings,
	    //
	    // element
	    $nav = $doc.find( '#'+s.NAV_ID ),
	    $toggle = $doc.find( '#'+s.TOG_ID ),
	    $toggleIcon = $toggle.children();

	    NAV.mobileMode = function(){
		//
		// hide nav
		$nav.fadeOut( 200 );
		//
		// show toggle button
		$toggle.removeClass( HIDDEN );
		//
		// set the toggle button's click handler
		$toggle.on( 'click', toggleMobileNav );
		//
		// assure the menu button shows
		$toggleIcon.removeClass().addClass( s.MENU_CLASS );
		//
		// report the mode
		s.navMode = 'mobile';
		//
		return NAV;
	    };


	    NAV.desktopMode = function(){
		//
		if( s.navState  === 'on' ){
		    //
		    NAV.off();
		    //
		}
		//
		// show the nav
		$nav.fadeIn( 200 );
		//
		// set the toggle click event off
		$toggle.off( 'click' );
		//
		// hide the toggle button
		$toggle.addClass( HIDDEN );
		//
		s.navMode = 'desktop';
		//
		return NAV;
	    };


	    var toggleMobileNav = function(e){
		//
		e.preventDefault();
		//
		var speed = 100;
		//
		if( s.navState === 'on' ){
		    //
		    NAV.off( speed );
		    //
		} else if( s.navState === 'off' ){
		    //
		    NAV.on( speed )
		    //
		};
		//
		return NAV;
	    };


	    NAV.on = function( speed ){
		//
		// show the nav
		$nav.fadeIn( speed );
		//
		// Hide the menu icon,
		// Show the Cancel Icon
		$toggleIcon.removeClass().addClass( s.CANCEL_CLASS );
		//
		s.navState = 'on';
		//
		return NAV;
	    };


	    NAV.off = function( speed ){
		//
		// hide the nav
		$nav.fadeOut( speed );
		//
		// Hide the cancel icon,
		// Show the menu icon
		$toggleIcon.removeClass().addClass( s.MENU_CLASS );
		//
		//
		s.navState = 'off';
		//
		return NAV;
	    };



	    return NAV
	    //
	}; // nav object
	//
	//@init
	navigation = Navigation();




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


	/*	var siteMode = function( screenMode ){
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
		//
		break;
	    };
	}
	*/

	// @enquire
	enquire
	    .register("screen and (min-width: "+topMaxWidth+"px )", {
		    //
		    match : function(){
			//
			navigation.desktopMode();
			//
		    }

		})
	    .register("screen and (min-width: "+medMinWidth+
		      "px ) and (max-width: "+medMaxWidth+"px ) ", {
			  //
			  match : function(){
			      //
			      navigation.mobileMode();
			      //
			  }
		      })
	    .register("screen and (max-width: "+botMaxWidth+"px)", {
		    //
		    match: function(){
			//
			navigation.mobileMode();
			//
		    }
		});
    });

