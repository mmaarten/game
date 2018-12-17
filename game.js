
window.Game = {};

(function()
{
	Game.init = function( options )
	{
		var defaults = 
		{
			elem         : document.body || null,
			canvasWidth  : 800,
			canvasHeight : 600,
			fps          : 24,
			keys :
			{
				up    : 90, // z
				right : 68, // d
				down  : 83, // s
				left  : 81, // q
			}
		};

		options = Object.assign( {}, defaults, options );

		this.elem       = options.elem;
		this.fps        = options.fps;
		this.keys       = options.keys;
		this.events     = new Game.EventManager();
		this.interval   = null;
		this.keyPressed = null;

		this.canvas = document.createElement( 'canvas' );
		this.canvas.width  = options.canvasWidth;
		this.canvas.height = options.canvasHeight;

		this.events.dispatchEvent( 'gameInit' );
	};

	Game.update = function()
	{
		this.events.dispatchEvent( 'gameUpdate' );
	};

	Game.start = function()
	{
		document.addEventListener( 'keydown', function( event )
		{
			Game.keyPressed = event.keyCode;
		});

		document.addEventListener( 'keyup', function( event )
		{
			Game.keyPressed = null;
		});

		this.interval = setInterval( function()
		{
			Game.update();

		}, 1000 / this.fps );

		this.events.dispatchEvent( 'gameStart' );

		this.elem.classList.add( 'game' );
		this.elem.appendChild( this.canvas );
	};

})();

/**
 * Util
 */
(function()
{
	getDistance = function( x1, y1, x2, y2 ) 
	{
		var x = x1 - x2;
		var y = y1 - y2;

        return Math.sqrt( x * x + y * y );
    };

    getAngle = function( x1, y1, x2, y2, degrees ) 
	{
		var x = x2 - x1;
		var y = y2 - y1;

        var radians = Math.atan2( y, x );

        if ( degrees ) 
        {
        	return radians * 180 / Math.PI;
        }

        return radians;
    };

    function getRandomInteger(min, max) 
    {
	    min = Math.ceil( min );
	    max = Math.floor( max );
    	
    	return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
	}

	Game.util = 
	{
		getDistance      : getDistance,
		getAngle         : getAngle,
		getRandomInteger : getRandomInteger,
	};

})();

/**
 * Event Manager
 */
(function()
{
	function EventManager()
	{
		this.listeners = {};
	}

	EventManager.prototype.addEventListener = function( type, callback ) 
	{
		if ( this.listeners[ type ] === undefined ) 
		{
			this.listeners[ type ] = [];
		}

		this.listeners[ type ].push( callback );
	};

	EventManager.prototype.dispatchEvent = function( type, args ) 
	{
		if ( this.listeners[ type ] === undefined ) 
		{
			return;
		}

		for ( var i in this.listeners[ type ] )
		{
			var callback = this.listeners[ type ][ i ];

			callback.apply( this, args );
		}
	};

	Game.EventManager = EventManager;

})();

/**
 * Rectangle
 */
(function()
{
	function Rectangle( x, y, width, height )
	{
		this.left   = x;
		this.right  = x + width;
		this.top    = y;
		this.bottom = y + height;
	}

	Rectangle.prototype.intersects = function( r ) 
	{
		return ! ( r.left > this.right || 
           r.right < this.left || 
           r.top > this.bottom ||
           r.bottom < this.top );
	};

	Game.Rectangle = Rectangle;

})();

/**
 * Map
 */
(function()
{
	function Map( options )
	{
		options = Object.assign( {}, Map.defaultOptions, options );

		this.width          = options.width;
		this.height         = options.height;
		this.tileSize       = options.tileSize;
		this.tileData       = options.tileData;
		this.tileProperties = options.tileProperties;
		this.tiles          = {};
		this.characters     = [];

		// create tiles
		for (var index = 0; index < this.tileData.length; index++ ) 
		{
			this.setTile( index, this.tileData[ index ] );
		}
	}

	Map.defaultOptions = 
	{
		width    : 0,
		height   : 0,
		tileSize : 32,
		tileData : [],
		tileProperties : {},
	};

	Map.prototype.getTile = function( index ) 
	{
		return this.tiles[ index ];
	};

	Map.prototype.getTileAt = function( x, y, translate ) 
	{
		var index = this.getTileIndex( x, y, translate );

		return this.getTile( index );
	};

	Map.prototype.setTile = function( index, type ) 
	{
		var loc     = this.getTileLocation( index );
		var options = this.tileProperties[ type ] || {};
		var update  = this.tiles[ index ] !== undefined;

		// TODO : make class
		var tile = 
		{
			x       : loc.x * this.tileSize,
			y       : loc.y * this.tileSize,
			width   : this.tileSize,
			height  : this.tileSize,
			collide : false,
			type    : type,
			index   : index,
			render  : function()
			{
				// TODO : sprite not here
				var sprite = 
				{
					1 : 'ivory', // floor
					2 : '#110B11', // wall
				};

				var fill = sprite[ this.type ];

				var context = Game.canvas.getContext( '2d' );

				context.save();
				context.translate( this.x, this.y );
				context.fillStyle = fill;
				context.fillRect( 0, 0, this.width, this.height );
				context.restore();

				Game.events.dispatchEvent( 'tileRender', [ this, context ] );
			},
		};

		Object.assign( tile, options );

		this.tiles[ tile.index ] = tile;
		this.tileData[ tile.index ] = type;

		if ( update ) 
		{
			Game.events.dispatchEvent( 'tileChange', [ tile ] );
		}

		else
		{
			Game.events.dispatchEvent( 'tileSet', [ tile ] );
		}
	};

	Map.prototype.getTileIndex = function( x, y, translate ) 
	{
		if ( translate ) 
		{
			x = Math.floor( x / this.tileSize );
			y = Math.floor( y / this.tileSize );
		}

		return this.width * y + x;
	};

	Map.prototype.getTileLocation = function( index, translate ) 
	{
		var x = index % this.width;
		var y = ( index - x ) / this.width;

		if ( translate ) 
		{
			x *= this.tileSize;
			y *= this.tileSize;
		}

		return { x : x, y : y };
	};

	Map.prototype.getTileNeighbors = function( index, diagonal ) 
	{
		var loc = this.getTileLocation( index );

		var n  = this.getTileAt( loc.x + 0, loc.y - 1 );
		var ne = this.getTileAt( loc.x + 1, loc.y - 1 );
		var e  = this.getTileAt( loc.x + 1, loc.y + 0 );
		var se = this.getTileAt( loc.x + 1, loc.y + 1 );
		var s  = this.getTileAt( loc.x + 0, loc.y + 1 );
		var sw = this.getTileAt( loc.x - 1, loc.y + 1 );
		var w  = this.getTileAt( loc.x - 1, loc.y + 0 );
		var nw = this.getTileAt( loc.x - 1, loc.y - 1 );

		var neighbors = [];

		if ( n && ! n.collide ) neighbors.push( n.index );
		if ( e && ! e.collide ) neighbors.push( e.index );
		if ( s && ! s.collide ) neighbors.push( s.index );
		if ( w && ! w.collide ) neighbors.push( w.index );

		if ( diagonal )
		{
			if ( ne && ! ne.collide && n && ! n.collide && e && ! e.collide ) neighbors.push( ne.index );
			if ( se && ! se.collide && s && ! s.collide && e && ! e.collide ) neighbors.push( se.index );
			if ( sw && ! sw.collide && s && ! s.collide && w && ! w.collide ) neighbors.push( sw.index );
			if ( nw && ! nw.collide && n && ! n.collide && w && ! w.collide ) neighbors.push( nw.index );
		}
	
		return neighbors;
	};

	Map.prototype.getFlowField = function( index ) 
	{
		var frontier = [ index ];
		var visited  = { [ index ] : 0 };
	
		while ( frontier.length )
		{
			var current   = frontier.shift();
			var neighbors = this.getTileNeighbors( current );

			for ( var i in neighbors )
			{
				var next = neighbors[ i ];

				if ( visited[ next ] === undefined ) 
				{
					frontier.push( next );

					visited[ next ] = 1 + visited[ current ];
				}
			}
		}

		return visited;
	};

	Map.prototype.getPath = function( a, b, translate ) 
	{
		var field = this.getFlowField( b );

		// Check if A can reach B

		if ( field[ a ] === undefined || field[ b ] === undefined ) 
		{
			console.warn( 'Unable to find path from ' + a + ' to ' + b + '.' );

			return null;
		}

		// create path

		var frontier = [ a ];
		var visited  = { [ a ] : true };
		var path = [];
	
		while ( frontier.length )
		{
			var current   = frontier.shift();
			var neighbors = this.getTileNeighbors( current, true );

			// Get neighbor with lowest cost

			var next, cost;

			for ( var i in neighbors )
			{
				var neighbor = neighbors[ i ];

				if ( cost === undefined || cost > field[ neighbor ] ) 
				{
					cost = field[ neighbor ];
					next = neighbor;
				}
			}

			if ( next !== undefined && visited[ next ] === undefined ) 
			{
				frontier.push( next );

				visited[ next ] = true;

				path.push( next );
			}
		}

		// convert indexes to locations

		if ( translate ) 
		{
			var _path = [];

			for ( var i in path )
			{
				var tile = this.getTile( path[ i ] );

				// center tile
				_path.push(
				{
					x : tile.x + tile.width / 2,
					y : tile.y + tile.height / 2,
				});
			}

			path = _path;
		}

		//

		return path;
	};

	Map.prototype.addCharacter = function( character, x, y ) 
	{
		// center on tile
		x = x * this.tileSize + this.tileSize / 2;
		y = y * this.tileSize + this.tileSize / 2;

		character.setLocation( x, y );

		this.characters.push( character );

		Game.events.dispatchEvent( 'characterAdded', [ character ] );
	};

	Map.prototype.render = function() 
	{
		for ( var i in this.tiles )
		{
			this.tiles[ i ].render();
		}

		for ( var i in this.characters )
		{
			this.characters[ i ].render();
		}
	};

	Game.Map = Map;

})();

(function()
{
	function Character( id )
	{
		this.id = id;
		this.x;
		this.y;
		this.width       = 24;
		this.height      = 24;
		this.dirX        = 0;
		this.dirY        = 0;
		this.movingSpeed = 3;
		this.path        = [];
		this.pathIndex   = -1;

		this.target = null;
	}

	Character.prototype.setLocation = function( x, y ) 
	{
		var destination = 
		{
			x : x,
			y : y,
		};

		Game.events.dispatchEvent( 'characterDestination', [ this, destination ] );

		this.x = destination.x;
		this.y = destination.y;
	};

	Character.prototype.setDirection = function( dirX, dirY ) 
	{
		this.dirX = dirX;
		this.dirY = dirY;
	};

	Character.prototype.move = function( dirX, dirY ) 
	{
		this.setDirection( dirX, dirY );

		var x = this.x + this.movingSpeed * this.dirX;
		var y = this.y + this.movingSpeed * this.dirY;

		this.setLocation( x, y );
	};

	Character.prototype.moveTo = function( target ) 
	{
		this.target = target;
	};

	Character.prototype.setPath = function( path ) 
	{
		this.path = path;
		this.pathIndex = 0;
	};

	Character.prototype.update = function() 
	{
		// Check if path
		if ( this.pathIndex != -1 ) 
		{
			// check if target
			if ( this.target ) 
			{
				var distance = Game.util.getDistance( this.x, this.y, this.target.x, this.target.y );

				if ( distance < this.movingSpeed ) 
				{
					// set next target
					if ( this.pathIndex + 1 < this.path.length )
					{
						this.pathIndex++;

						this.target = this.path[ this.pathIndex ];
					}

					// destination reached
					else
					{
						this.setLocation( this.target.x, this.target.y );

						this.path = [];
						this.pathIndex = -1;

						this.target = null;

						Game.events.dispatchEvent( 'characterDestinationReached', [ this ] );
					}
				}
			}

			else
			{
				// set target
				this.target = this.path[ this.pathIndex ];
			}
		}

		if ( this.target ) 
		{
			// direction

			var distance = Game.util.getDistance( this.x, this.y, this.target.x, this.target.y );
			var dirX = ( this.target.x - this.x ) / distance;
			var dirY = ( this.target.y - this.y ) / distance;

			this.setDirection( dirX, dirY );

			// destination

			var x = this.x + this.dirX * this.movingSpeed;
			var y = this.y + this.dirY * this.movingSpeed;

			this.setLocation( x, y );
		}
	};

	Character.prototype.render = function() 
	{
		var context = Game.canvas.getContext( '2d' );

		context.save();
		context.translate( this.x, this.y );
		// look towards direction
		context.rotate( Math.atan2( this.dirY, this.dirX ) );
		// rectangle
		context.fillStyle = 'red';
		context.fillRect( - this.width / 2, - this.height / 2, this.width, this.height );
		// looking direction
		context.beginPath();
		context.moveTo( - this.width / 2, - this.height / 2 );
		context.lineTo( this.width / 2, 0 )
		context.lineTo( - this.width / 2, this.height / 2 );
		context.fillStyle = 'black';
		context.fill();
		context.closePath();
		context.restore();

		Game.events.dispatchEvent( 'characterRender', [ this, context ] );
	};

	Game.Character = Character;

})();
