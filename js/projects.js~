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

