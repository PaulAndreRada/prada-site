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
			console.log( e.originalEvent );
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
			console.log( 'mode :' + s.mode );
		    });
		//
		NAV. setupPage();
		//
		return NAV;
	    };

	    
	    NAV.setupPage = function(){ 
		//
		console.log( 'mode :'+ s.mode );

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
		navigation.switchModeTo( 'desktop' );
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

