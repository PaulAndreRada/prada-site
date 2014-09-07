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
	    //
	    
	    HM.init() = function(){ 
		//
		// check the url for change
		$( window ).on( 'load hashchange', function(){ 
			//
			HM
			//
			.compareHash( HM.grabHash() )
			//
		    });
		    
		//
		return HM
	    };


	    HM.grabHash = function(){ 
		//
		var hashNow = window.location.hash;
		//
		return hashNow;
		//
	    };


	    HM.compareHash = function( newHash ){ 
		//
		var prevHash = s.currentHash,
		newHash =  newHash; 
		//
		// check if the newhash changed is the same as the last
		if( newHash === s.currentHash ){ 
		    //
		    // leave function
		    return HM;
		    //
		} else if( newHash === "" || newHash === undefined ){ 
		    //
		    HM.changeHashTo( 'home' );
		    //
		} else { 
		    //
		    // if the hash is different
		    // call the callback function
		    // with that hash info 
		    onChange.call( HM, s );
		    // 
		};
		return HM;
		//
	    }; 
		
		
	    HM.changeHashTo = function( hash ){ 
		//
		s.currentHash = hash;
		//
		window.location.hash = s.currentHash;
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
		    toggleState : 'on',
		    currentHash : 'home',
		    section : 'home',
		    // carousel Object
		    // NOTE: The nav object controls 
		    // the carousel object
		    carousel : {},
		    //ids
		    NAV_ID : 'navigation',
		    TOG_BUTTON_ID : 'toggleButton',
		    MENU_ICON_ID : 'menuIcon',
		    // Data tags
		    LINK_TAG : 'link',
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
	    $links = $nav.find( '[data-'+s.LINK_TAG+']' ),
	    $linkClicked = '',
	    // Navigation toggle
	    $navToggle =  $doc.find( '#'+s.TOG_BUTTON_ID ),
	    $menuIcon =  $navToggle.find( '#'+s.MENU_ICON_ID ),
	    $guideIcon =  $menuIcon.siblings();

	    // @INIT METHODS ----------------------------------------//
	    

	    // ACTIONS
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
			NAV.callPane()
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
		$(window).on( 'load hashchange' , function(){
			//
			NAV.changeHash()
			//
			.triggerLinkOnHash();
			//
			
		    });
		//
		return NAV;
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
	    
	    
	    NAV.listenToHash = function(){ 
		//
		// click link on hash change
		$(window).on('load hashchange',function(){ 
			//
			
			s.currentHash = window.location.hash.slice(1);
			//
			console.log( 'I hash CHANGE! to' );
			console.log( s.currentHash )
			//
			NAV.triggerLinkOnHash();
		    });
		//
		return NAV;
	    };
	    

	    NAV.setHash = function(){ 
		//
		s.currentHash = window.location.hash.slice(1);
		//
		return NAV;
	    };


	    NAV.changeHash = function( $link ){
		//
		var section;
		//
		console.log( 'hash changed to :'+ section );
		// check for the $link argument
		if ( $link ){ 
		    //
		    // extract that links href for the hash
		    section = $link.parent().attr( 'href' );
		    //
		} else if( !$linkClicked ){ 
		    //
		    // use the default hash
		    section = s.currentHash;
		    //
		} else { 
		    //
		    // use the clicked links href as the hash 
		    section = $linkClicked.parent().attr( 'href' );
		    //
		}
		//
		s.currentHash = section;

		// set the new hash
		document.location.hash = section;
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


	    NAV.triggerLinkOnHash = function(){
		//
		var $section = $links.children().filter( '[data-'+s.LINK_TAG+'='+s.currentHash+']' );
		//
		console.log( 'triggered click' );
		$section.trigger( 'click' );
		//
		return NAV;
		//
	    };

	    
	    NAV.updateMobileGuide = function(){ 
		//
		var section;
		/*
		//
		if ( !$linkClicked ){ 
		    //
		    // use the currentHash @FIX NEED TO CHECK FOR CLICKS!
		    section = s.currentHash;
		    //
		} else {
		    //
		    section = $linkClicked.parent().attr( 'href' );
		    //
		}
		//
		$guideIcon.removeClass().addClass( section + '_mini' );
		*/
		//
		return NAV;
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
	    	    
	    // TOGGLE BUTTON METHODS ----------------------------//
	    	    

	    NAV.toggleNav = function(){ 
		//
		console.log( ' im being toggled!' );
		if ( s.toggleState === 'off' ){ 
		    //
		    console.log( 'toggle state on' );
		    // show the nav
		    $nav.removeClass( HIDDEN );
		    //
		    // change the state
		    s.toggleState = 'on'
		    //
		} else if ( s.toggleState === 'on' ){ 
		    //
		    console.log( 'toggle state off' );
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
		.handleFocus( $link )
		//
		.changeHash( $link )
		//
		.updateMobileGuide();
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

