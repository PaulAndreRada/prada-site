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
	    //
	    HIDDEN = 'hidden';

	var Navigation = function( options ){ 
	    //
	    // create the NAV object
	    var that = { 
		settings : { 
		    //
		    mode : 'desktop',
		    toggleState : 'on',
		    // carousel Object
		    // NOTE: The nav object controls 
		    // the carousel object
		    carousel : {},
		    //ids
		    NAV_ID : 'navigation',
		    TOG_BUTTON_ID : 'toggleButton',
		    // Data tags
		    LINK_TAG : 'data-link',
		    SECTION_INDEX_TAG : 'section-index',
		    SECTION_TYPE_TAG : 'section-type',
		    NAV_STATE_TAG : 'nav-state',
		    // link and pane types  
		    HOME : 'home',
		    UX : 'ux',
		    GRAPHICS : 'gpx',
		    CODE : 'code',
		    LINKS : 'links',
		    // style classes
		    NAV_FOCUS : 'focused_nav',
		    LINK_FOCUS : 'link_icon_focused',
		    HOME_FOCUS : 'home_icon_focused',
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
	    $links = $nav.find( '['+s.LINK_TAG +']' ),
	    $linkClicked = '',
	    // Navigation toggle
	    $navToggle =  $doc.find( '#'+s.TOG_BUTTON_ID ),
	    $menuIcon =  $navToggle.find( '#'+s.MENU_ICON_ID ),
	    $guideIcon =  $navToggle.siblings();

	    console.log( $nav );
	    console.log( $links );
	    //console.log( $linkClicked );
	    //console.log( $navToggle );
	    //console.log( $menuIcon );
	    //console.log( $guideIcon );
	    // @INIT METHODS ----------------------------------------//
	    
	    // ACTIONS
	    NAV.init = function(){
		//
		$nav.on( 'click', function(e){ 
			//
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
			NAV.callPane()
			//
			.updateMobileGuide();
			//			
		    });
		//
		return NAV
	    };


	    // SWITCH @MODES
	    NAV.switchModeTo = function( mode ){ 
		//
		// save for later use
		s.mode = mode
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

	    
	    // @MODES ----------------------------------------//

	    NAV.desktopMode = function(){ 
		//
		// show the nav
		$nav.removeClass( HIDDEN );
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
	    

	    NAV.mobileMode = function(){  
		//
		// hide the nav 
		$nav.addClass( HIDDEN );
		//
		// activate the toggle button's click event
		$navToggle.on( 'click', function(){ 
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
		if ( section === s.HOME || section === s.LINKS ){
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
		s.carousel.showPane( parseInt(index) );
		//
		return NAV;
	    };


	    NAV.updateMobileGuide = function(){ 
		//
		var section = $linkClicked.parent().attr( 'href' );
		//
		$guideIcon.addClass( section + '_mini' );
		//
		return NAV;
	    };
	    
	    	    
	    // TOGGLE BUTTON METHODS ----------------------------//
	    	    

	    NAV.toggleNav = function(){ 
		//
		if ( s.toggleState === 'off' ){ 
		    //
		    // show the nav
		    $nav.removeClass( HIDDEN );
		    //
		    // change the state
		    s.toggleState = 'on'
		    //
		} else if ( s.toggleState === 'on' ){ 
		    //
		    // hide the nav
		    $nav.addClass( HIDDEN );
		    //
		    // change the state
		    s.toggleState = 'off';
		}
		//
		return NAV
		//
	    };
	    
	    // Update Nav with numbers ----------------------------//
	    
	    NAV.updateNav = function( sectionIndex ){
		//
		var $link = $links.filter( '[data-'+ s.SECTION_INDEX_TAG +
					   '='+sectionIndex+']' ).children();
		//
		NAV
		//
		.clearFocusedLinks()
		//
		.handleFocus( $link );
		//
		return NAV;
	    };

	    return NAV;
	    //
	}// end NAV 



	// @INIT site objects 
	//
	navigation = Navigation({ 
		//		
		carousel: $.verticalCarousel( '#vertical-carousel',{
			onChange : function( currentPane ){ 
			    //
			    navigation.updateNav( currentPane );
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
	    medMaxWidth = 781,
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
		navigation.switchModeTo( 'desktop'  );
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

