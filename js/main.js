//
// @codekit-prepend "plugins.js";


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
	    // data tags data
    	    HOME = 'home',
	    LINKS = 'links',
	    $navLinks = $doc.find( '[' + NAVTAG + ']' );


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
		    section = $doc.find( '['+SECTAG+'='+locClicked+']' );
		//
		//scroll there
		$.scrollTo(section, 900);
		// 
		// highlight nav link
		updateNav( locClicked  );
	    });

	//
	// DONE BY SUNDAY
	// @TODO @Curr
	// find the current section and highlight it on the nav //DONE
	// remove the hashtag issue from the navs ( less jittery ) //DONE 
	// use the onepage scroll
	// seamlessly merge the two plugins 
	// rewrite the code to make it beutifull
	// enquire till the layout is mobile perfect
	// just the project images and descriptions left


	// @carousel
	
	var verticalCarousel = function( element ){ 
	    
	    var VC = this,
	    $doc = $( document ),
	    $element = $doc.find( element ), // div on top of rails
	    $container = $element.children(), // would be rails
	    $panes = $container.filter( 'section' ), // sections
	    paneHeight = 0,
	    paneCount = $panes.length,
	    currentPane = 0;
	    
	    VC.init = function(){ 
		//
		VC.setDimensions();
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
		for ( var i; i<paneCount; i++ ){ 
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
						   paneCount -1 )),
		//
		// 
		currentPane = index;
		// 
		// create the offset value for the container
		// starting at 0
		var offset = -(( 100/paneCount ) * currentPane );
		//
		VC.setContainerOffset( offset, true );
		//
		return VC;
	    };
	    
	    VC.setContainerOffset = function( percent, animate ){ 
		//
		$container.removeClass( "animate" );
		//
		if ( animate ) { 
		    $container.addClass( "animate");
		}
		//
		if(Modernizr.csstransforms3d) {
		    container.css("transform", 
				  "translate3d(0,"+ percent +
				  "%,0) scale3d(1,1,1)");
		} else if(Modernizr.csstransforms) {
		    container.css("transform", 
				  "translate(0,"+ percent +"%)");
		} else {
		    var px = ((pane_width*pane_count) / 100) 
			* percent;
		    //
		    container.css("top", px+"px");
		}
		//
		return VC;
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
		
	    var handleTouch = function( ev ){ 
		//
		// prevent scrolling
		ev.gesture.preventDefault();
		//
		switch( ev.type ){ 
		    //
		case 'swipeup': 
		    //
		    VC.next();
		    // stop detecting gestures
		    ev.gesture.stopDetect();
		    break;
		    //
		case 'swipedown' : 
		    //
		    VC.prev();
		    //
		    // stop detecting gestures
		    ev.gesture.stopDetect();
		    //
		    break;
		};
	    };

	    // activate the carousel event handler
	    $element.hammer({ drag_to_lock_target : true })
	    .on( 'swipeup swipedown', handleTouch );
	    //
	    return VC;
	    //
	};//verticalCarousel


       
	var vertTest = verticalCarousel( '#vertCarousel' );
	vertTest.init();















	// enquire code
	/*
	var $doc = $(document),
	    $introCon = $doc.find( '#introContainer' ),
	    $contentCon = $doc.find( '#contentCon' ),
	    $decorations = $doc.find( '#tear' ),
	    desktopIntro = 'intro_container_desktop',
	    mobileIntro = 'intro_container_mobile',
	    desktopContent = 'content_container_desktop',
	    mobileContent = 'content_container_mobile';
	
	enquire.register("screen and (max-width: 767px)", { 
		//
		match : function(){ 
		    // 
		    // change the intro case node when in mobile size
		    $introCon.addClass( mobileIntro )
			.removeClass( desktopIntro );
		    //
		    // change the content_container's margins
		    $contentCon.addClass( mobileContent )
			.removeClass( desktopContent );
		    //
		    //
		    // hide the decorations
		    $decorations.hide();
		    //
		},unmatch : function(){ 
		    //
		    // change back to the desktop mode
		    $introCon.addClass( desktopIntro )
			.removeClass( mobileIntro );
		    //
		    //
		    $contentCon.addClass( desktopContent )
		      .removeClass( mobileContent );
		    //
		    // show the decorations
		    $decorations.show()
		    //
		}
		//
	    });
	
	
	
	*/
	
	
	
    }); // @end  @annonFunc

