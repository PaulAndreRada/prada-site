
(function( $ ){
    
    $.fn.Boids = function( processing, options ){
	//
	// Dependencies:
	//       Framework : Processing
	//       vars : canvas WIDTH and HEIGHT ( not from processing ) 
	//       functions : mergeObject()
	//
	//
	// define processing
	var p = processing;
	//
	// define the object
	var boid = {
	    settings : {
		state : 'network',
		strokeW : 0.01,
		color :  p.color( 0,0,0,255),
		directionLimit : 1,
		radius  : 12,
		radiusLimit : 1,
		startPos : new p.PVector( p.random( 0,0 ),
					  p.random( 0,0)),
		canvasW : p.WIDTH,
		canvasH : p.HEIGHT,
		// @backgrounds || @BG
		background : { 
		    idea : { 
			color : p.color( 232, 255 ) 
		    },
		    identity : {
			color : p.color( 232, 80 ) 
		    },
		    network : { 
			color : p.color( 232, 4 ) 
		    },
		    fastWire : {
			color : p.color( 232, 4 )
		    }
		}	    
	    }
	},
	//
	// make the object dynamic
	boid = (function(){ return boid; })(),
	// merge the options into the settings
	s = $.extend( boid.settings , options ); 
	//
	var startRange = 25;
	// randomize the start pos for a more organic start
	s.startPos.set( p.random( s.startPos.x - startRange, 
				  s.startPos.x + startRange ),
			p.random( s.startPos.y - startRange,
				  s.startPos.y + startRange) );
	//
	// Save the first past location
	s.pastLocation = new p.PVector( s.startPos.x ,
					s.startPos.y );
	//
	// initiate the future location object
	s.location =new p.PVector();
	//
	s.angle = new p.PVector ( p.random( p.TWO_PI ),
				  p.random( p.TWO_PI ) );
	//
	// definde the direction that will affect the velocity 
	s.direction = new p.PVector( p.random( - s.directionLimit ,
					       s.directionLimit ) ,
				     p.random( - s.directionLimit ,
					       s.directionLimit  ) );
	//
	//
	//
	s.velocity = new p.PVector( p.random( -.02 , -.02 ) ,
				    p.random( -.02 , -.02 ));
	//
	//
	// state the first iteration count
	var firstIterationCount = 1;
	

	boid.handleRender = function( state ){ 
	    //
	    // if no new status gets called proccede with current status
	    if ( !status ) { 
		//
		var state = s.state;
		//
	    };
	    //
	    // handle the rendering of different states
	    switch ( state ) { 
		
	    case 'idea' : 
		//
		boid.renderIdea();
		//
		break;
		
	    case 'identity' : 
		//
		boid.renderIdentity();
		//
		break;
		
	    case 'network' : 
		//
		boid.renderNetwork();
		//
		break;

	    case 'fastWire' : 
		//
		boid.renderFastWire();
		//
		break;

	    default :
		//
		boid.renderIdentity();
		//
	    };
	    
	    return boid;
	    //
	};

	
	boid.rRadius = function(){ 
	    //
	    // if we are still in the initial iteration of this boid
	    if( firstIterationCount > 0 ){ 
		//
		// randomize the radius
		s.radius = p.random( s.radius/1.2 , s.radius );
		//
		// lower the initial iteraction count
		firstIterationCount --;
		//
	    };
	    //
	    return boid;
	};


	boid.renderIdea = function(){
	    //
	    var explosionSpeed = 3;
	    //
	    // set the color
	    p.stroke( s.color );
	    p.strokeWeight( s.strokeW );
	    //
	    // set a random radius for this boid if its the first iteration
	    boid.rRadius();
	    //
	    // Explosion / Ease down
	    // every n  frames ease the radius down to the set limit if the radius 
	    // is still bigger than the radiusLimit
	    if( p.frameCount % explosionSpeed === 0 && s.radius > s.radiusLimit ){
		//
		s.radius = s.radius/2;
		//
	    };
	    //
	    //
	    // set the new velocity
	    s.velocity.set( p.cos( s.angle.x ) * s.radius ,
			    p.sin( s.angle.y ) * s.radius );
	    //
	    // set the location by changing the past location
	    s.location.set( s.pastLocation.x + s.velocity.x,
			    s.pastLocation.y + s.velocity.y );
	    //
	    //
	    // draw the line
	    p.beginShape();
	    p.vertex( s.pastLocation.x, s.pastLocation.y );
	    p.vertex( s.location.x, s.location.y );
	    p.endShape();
	    //
	    //
	    // randomize the direction increment
	    s.direction.set( p.random( 0.01 , 0.1 ),
			     p.random( 0.01 , 0.1 ) );
	    //
	    // update the angles direction
	    s.angle.set ( s.angle.x + s.direction.x ,
			  s.angle.y + s.direction.y );
	    //
	    // save this old location
	    s.pastLocation.set( s.location.x ,
				s.location.y );
	    //
	    //
	    return boid;
	    //
	}; // render



	boid.renderIdentity = function(){
	    //
	    // Ease Down
	    //
            if( p.frameCount%10=== 0 && s.radius > s.radiusLimit ){
                //
                s.radius = s.radius / 2;
            };
	    //
	    // Pulse
	    // every n frames push the radius up
            if( p.frameCount%60 === 0 ){
                //
                s.radius = 6;
                //
            };
            //
            // set the color
            p.stroke( s.color );
            p.strokeWeight( s.strokeW );
            //
            // set the new velocity
            s.velocity.set( p.cos( s.angle.x ) * s.radius ,
                            p.sin( s.angle.y ) * s.radius );
            //
            // set the location by changing the past location
            s.location.set( s.pastLocation.x + s.velocity.x,
                            s.pastLocation.y + s.velocity.y );
            //
            // draw the line
            p.beginShape();
            p.vertex( s.pastLocation.x, s.pastLocation.y );
            p.vertex( s.location.x, s.location.y );
            p.endShape();
            //
            //
            // randomize the direction increment
            s.direction.set( p.random( 0.01 , 0.1 ),
                             p.random( 0.01 , 0.1 ) );
            //
            // update the angles direction
            s.angle.set ( s.angle.x + s.direction.x ,
                          s.angle.y + s.direction.y );
            //
            // save this old location
            s.pastLocation.set( s.location.x ,
                                s.location.y );
            //
	    //
	    return boid;
	    //
	};


	boid.renderNetwork = function(){
	    //
	    s.radius = 4;
	    // Ease down 
	    // every n  frames ease the radius down to the set limit if the radius 
	    // is still bigger than the radiusLimit
	    if ( p.frameCount%8 === 0 && s.radius > s.radiusLimit ){
		//
		s.radius = s.radius/2;
		//
	    }
	    //
	    // set the color
	    p.stroke( s.color );
	    p.strokeWeight( s.strokeW );
	    //
	    // set the new velocity
	    s.velocity.set( p.cos( s.angle.x ) * s.radius ,
			    p.sin( s.angle.y ) * s.radius );
	    //
	    // set the location by changing the past location
	    s.location.set( s.pastLocation.x + s.velocity.x,
			    s.pastLocation.y + s.velocity.y );
	    //
	    // draw the line
	    p.beginShape();
	    p.vertex( s.pastLocation.x, s.pastLocation.y );
	    p.vertex( s.location.x, s.location.y );
	    p.endShape();
	    //
	    //
	    // randomize the direction increment
	    s.direction.set( p.random( 0.01 , 0.1 ),
			     p.random( 0.01 , 0.1 ) );
	    //
	    // update the angles direction
	    s.angle.set ( s.angle.x + s.direction.x ,
			  s.angle.y + s.direction.y );
	    //
	    // save this old location
	    s.pastLocation.set( s.location.x ,
				s.location.y );
	    //
	    //
	    return boid;
	    //
	};




	boid.renderFastWire = function(){
	    //
	    s.radius = 8;
	    // Ease down 
	    // every n  frames ease the radius down to the set limit if the radius 
	    // is still bigger than the radiusLimit
	    if ( p.frameCount%8 === 0 && s.radius > s.radiusLimit ){
		//
		s.radius = s.radius/2;
		//
	    }
	    //
	    // set the color
	    p.stroke( s.color );
	    p.strokeWeight( s.strokeW );
	    //
	    // set the new velocity
	    s.velocity.set( p.cos( s.angle.x ) * s.radius ,
			    p.sin( s.angle.y ) * s.radius );
	    //
	    // set the location by changing the past location
	    s.location.set( s.pastLocation.x + s.velocity.x,
			    s.pastLocation.y + s.velocity.y );
	    //
	    // draw the line
	    p.beginShape();
	    p.vertex( s.pastLocation.x, s.pastLocation.y );
	    p.vertex( s.location.x, s.location.y );
	    p.endShape();
	    //
	    //
	    // randomize the direction increment
	    s.direction.set( p.random( 0.01 , 0.1 ),
			     p.random( 0.01 , 0.1 ) );
	    //
	    // update the angles direction
	    s.angle.set ( s.angle.x + s.direction.x ,
			  s.angle.y + s.direction.y );
	    //
	    // save this old location
	    s.pastLocation.set( s.location.x ,
				s.location.y );
	    //
	    //
	    return boid;
	    //
	};


	return boid;
	//
    };// boid object



}( jQuery )); // anon function