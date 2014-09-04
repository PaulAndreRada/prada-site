//
// Needs some seious cleanup and organizing
//
// @codekit-prepend "plugins.js";
// @codekit-prepend "vertical-carousel.js";


$(function(){
	'use strict';

	var $doc =$(document),
	    // style classes
	    NAV_FOCUS = 'focused_nav',
	    LINK_FOCUS = 'link_icon_focused',
	    HOME_FOCUS = 'home_icon_focused',
	    HIDDEN = 'hidden',
	    // id tags
	    miniGuideIcon = 'navGuideIcon',
	    // data tags
	    NAVTAG = 'data-nav-location',
	    SECTAG = 'data-section',
	    PANETAG = 'data-go-to-pane',
	    NAV_STATE_TAG = 'data-nav-state',
	    // data tags data
	    HOME = 'home',
	    UX = 'ux',
	    GRAPHICS = 'gpx',
	    CODE = 'code',
	    LINKS = 'links',
	    // $elements
	    $navLinks = $doc.find( '[' + NAVTAG + ']' ),
	    $nav = $navLinks.parent(),
	    $navToggle = $doc.find( '#navToggle' ),
	    $miniGuideIcon = $navToggle.find( "#"+miniGuideIcon ),
	    $navIcon = $doc.find( '['+NAV_STATE_TAG+']' );
	    		    
	var unFocusNav = function(){
	    //
	    $navLinks.children().removeClass( NAV_FOCUS )
	    .removeClass( HOME_FOCUS )
	    .removeClass( LINK_FOCUS );
	    //
	    return;
	};


	var updateIcon = function( $icon, section ){
	    //
	    if ( section === data.HOME ){
		//
		$icon.children().addClass( HOME_FOCUS );
		//
	    } else if ( section === LINKS ){
		//
		$icon.children().addClass( LINK_FOCUS );
		//
	    };

	};


	var updateNav = function( section ){
	    //
	    unFocusNav();
	    //
	    var section = section || dataTagsHOME,
	    $navEl = $navLinks.filter('['+ NAVTAG +'='+section+']' );
	    //
	    // check for icons
	    if ( section === HOME || section === LINKS ){
		//
		updateIcon( $navEl, section );
		//
	    } else {
		//
		// unfocus the previous section
		$navLinks.children().removeClass( NAV_FOCUS );
		//
		// Focus on the current section
		$navEl.children().addClass( NAV_FOCUS );
		//
	    };
	    //
	    return;
	    //
	};

	var updateNavToggle = function( section ){ 
	    //
	    // if we only have the index
	    if( typeof section === 'number' ){
		//
		switch( section ){ 
		    //
		case 0: 
		section = HOME;
		break;
		//
		case 1: 
		section = UX;
		break;
		//
		case 2: 
		section = GRAPHICS;
		break;
		//
		case 3: 
		section = CODE;
		break;
		//
		case 4: 
		section = LINKS;
		break;
		}
		//console.log( 'section' );
		//console.log( section );
		//
	    } else {
		//
		var section = section || HOME;
		//
	    };
		$miniGuideIcon.removeClass();
		//
		$miniGuideIcon.addClass( section+'_mini' );
		//		    
	};

	
	var carousel = $.fn.verticalCarousel( "#vertical-carousel" , 
					      updateNavToggle );
	carousel.init();

	
	// Scroll to section on click
	$navLinks.on('click', function(e){
		//
		e.preventDefault();
		//
		// get the element that was clicked
		var $this = $(this),
		    locClicked = $this.attr( NAVTAG ),
		    pane = ($this.attr( PANETAG )) -1,
		    section = $doc.find( '['+SECTAG+'='+locClicked+']' );
		//
		//scroll there
		carousel.showPane( pane );
		//
		// highlight nav link
		updateNav( locClicked  );
		//
		// for @mobile only
		updateNavToggle( locClicked );
	    });
	

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


	var toggleNav = function( navState ){ 
	    
	    var state = state || $navIcon.attr( NAV_STATE_TAG );
	    //
	    if( !$toggleIcon ) {
		var $toggleIcon= $doc.find( '#menuIcon' );
	    }
	    //
	    if( navState === "off" ){ 
		//
		$nav.removeClass( HIDDEN );
		//
		$toggleIcon.attr( NAV_STATE_TAG , "on" ); 
		//
	    } else if ( navState === "on" ){ 
		//
		$nav.addClass( HIDDEN );
		//
		$toggleIcon.attr( NAV_STATE_TAG , "off" );
		//
	    };
	    	    
	};
	

	var toggleNavClick = function( e ){ 
	    //
	    e.preventDefault();
	    //
	    var $this = $(this),
	    $toggleIcon = $this.find( '#menuIcon' ),
	    navState = $toggleIcon.attr( NAV_STATE_TAG ); 
	    //
	    toggleNav( navState );
	};	
	
	
	// mobile Nav Mode
	var mobileNavMode = function( state ){ 
	    //
	    if( state ){ 
		//
		$nav.addClass( HIDDEN );
		//
		$navToggle.on( 'click', toggleNavClick );
		//
		$navLinks.on( 'click' , function(){ 
			//
			toggleNav();
			//
		    });
		//
	    } else { 
		//
		$nav.removeClass( HIDDEN );
		//
		$navToggle.off( 'click' );
		//
		$navLinks.off( 'click' );
		//
	    };
	};


		
	var changeModeTo = function( screenMode ){ 
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
		$nav.removeClass( HIDDEN );
		//
		mobileNavMode( false );
		//
		break;
	    case "tablet": 
		//
		$html.removeClass( mobile 
				   +" "+ mobile_small );
		//
		$html.addClass( tablet );
		//
		mobileNavMode( false );
		//
		break;	    
	    case "mobile": 
		//
		$html.removeClass( tablet 
				   +" "+ mobile_small );
		//
		$html.addClass( mobile );
		//
		mobileNavMode( true );
		//
		break;	    
	    case "mobile_small": 
		//
		$html.removeClass( tablet 
				   +" "+ mobile);
		//
		$html.addClass( mobile_small );
		//
		mobileNavMode( true );
		//
		break;
	    };
	}



	enquire
	    .register("screen and (min-width: "+topMaxWidth+"px )", {
		    //
		    match : function(){
			//
			changeModeTo( 'desktop' );
			//
		    }
		    
		})
	    .register("screen and (min-width: "+topMinWidth+
		      "px ) and (max-width: "+topMaxWidth+"px )", {
			//
			match : function(){
			    //
			    changeModeTo( 'tablet' );
			    //
			}
		    })
	    .register("screen and (min-width: "+medMinWidth+
		      "px ) and (max-width: "+medMaxWidth+"px ) ", {
			    //
			    match : function(){
				//
				changeModeTo( 'mobile' );
				//
			    }
			})
	    .register("screen and (max-width: "+botMaxWidth+"px)", {
				// 
				match: function(){ 
				    //
				changeModeTo( 'mobile_small' );
				//
				}
			    });
    });

