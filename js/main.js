//
// @codekit-prepend "plugins.js";
// @codekit-prepend "vertical-carousel.js";

	//
	// DONE BY SUNDAY
	// @TODO @Curr
	// find the current section and highlight it on the nav //DONE
	// remove the hashtag issue from the navs ( less jittery ) //DONE
	// MAKE Vertical carousel plugin //DONE BITCHES!
	// seamlessly merge the two plugins // MINE DINT NEED THE OTHER
	// rewrite the code to make it beutifull - later
	// enquire till the layout is mobile perfect
	// just the project images and descriptions left

$(function(){
	'use strict';

	var $doc =$(document),
	    // style classes
	    NAV_FOCUS = 'focused_nav',
	    LINK_FOCUS = 'link_icon_focused',
	    HOME_FOCUS = 'home_icon_focused',
	    // data tags
	    NAVTAG = 'data-nav-location',
	    SECTAG = 'data-section',
	    PANETAG = 'data-go-to-pane',
	    // data tags data
    	    HOME = 'home',
	    LINKS = 'links',
	    $navLinks = $doc.find( '[' + NAVTAG + ']' );

	var carousel = $.fn.verticalCarousel( "#vertical-carousel" );
	carousel.init();

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
	    if ( section === HOME ){
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
	    var section = section || HOME,
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
	    };
	    //
	    return;
	    //
	};


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
		$html.removeClass( tablet +" "+ mobile +" "+ mobile_small );
		//
		console.log( screenMode );
		break;
	    case "tablet": 
		//
		$html.removeClass( mobile +" "+ mobile_small );
		//
		$html.addClass( tablet );
		//
		console.log( screenMode );
		break;	    
	    case "mobile": 
		//
		$html.removeClass( tablet +" "+ mobile_small );
		//
		$html.addClass( mobile );
		//
		console.log( screenMode );
		break;	    
	    case "mobile_small": 
		//
		$html.removeClass( tablet +" "+ mobile);
		//
		$html.addClass( mobile_small );
		//
		console.log( screenMode );
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
		    
		}).register("screen and (min-width: "+topMinWidth+"px ) and (max-width: "+topMaxWidth+"px )", {
			//
			match : function(){
			    //
			    changeModeTo( 'tablet' );
			    //
			}
		    }).register("screen and (min-width: "+medMinWidth+"px ) and (max-width: "+medMaxWidth+"px ) ", {
			    //
			    match : function(){
				//
				changeModeTo( 'mobile' );
				//
			    }
			}).register("screen and (max-width: "+botMaxWidth+"px)", {
				// 
				match: function(){ 
				    //
				changeModeTo( 'mobile_small' );
				//
				}
			    });
    });

