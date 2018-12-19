
window.Game = {};

(function()
{
	Game.init = function( options )
	{
		console.log( 'init game' );

		options = Object.assign( {}, this.defaultOptions, options );

		this.parent     = options.parent || document.body;
		this.fps        = options.fps;
		this.keys       = options.keys;
		this.events     = new Game.EventManager();
		this.scenes     = new Game.SceneManager();
		this.interval   = null;
		this.keyPressed = null;

		this.canvas        = document.createElement( 'canvas' );
		this.canvas.width  = options.width;
		this.canvas.height = options.height;

		// Notify
		this.events.dispatchEvent( 'gameInit' );
	};

	Game.defaultOptions =
	{
		parent : null,
		width  : 800,
		heigth : 600,
		fps    : 24,
		keys :
		{
			up    : 90, // z
			right : 68, // d
			down  : 83, // s
			left  : 81, // q
		},
	};

	Game.update = function()
	{
		if ( this.scenes.currentScene ) 
		{
			this.scenes.currentScene.update();
		}

		// Notify
		this.events.dispatchEvent( 'gameUpdate' );
	};

	Game.start = function()
	{
		console.log( 'start game' );

		// Track pressed key

		this.keyPressed = null;

		document.addEventListener( 'keydown', function( event )
		{
			Game.keyPressed = event.keyCode;
		});

		document.addEventListener( 'keyup', function( event )
		{
			Game.keyPressed = null;
		});

		// Set update interval

		this.interval = setInterval( function()
		{
			Game.update();
			
		}, 1000 / this.fps );

		// Notify

		this.events.dispatchEvent( 'gameStart' );

		// Add canvas to DOM

		this.parent.classList.add( 'game' );
		this.parent.appendChild( this.canvas );
	};

})();

/**
 * Utilities
 */
(function()
{
	function getDistance( x1, y1, x2, y2 ) 
	{
		var x = x1 - x2;
		var y = y1 - y2;

        return Math.sqrt( x * x + y * y );
    };

    function getAngle( x1, y1, x2, y2, degrees ) 
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

    function getRandomInteger( min, max ) 
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
 * Scene Manager
 */
(function()
{
	function SceneManager()
	{
		this.scenes = {};
		this.currentScene = null;
	}

	SceneManager.prototype.addScene = function( id, options ) 
	{
		var scene = new Game.Scene( id );

		Object.assign( scene, options );

		this.scenes[ scene.id ] = scene;
	};

	SceneManager.prototype.removeScene = function( id ) 
	{
		delete this.scenes[ id ];
	};

	SceneManager.prototype.setCurrentScene = function( id ) 
	{
		var scene = this.scenes[ id ];

		if ( this.currentScene ) 
		{
			this.currentScene.destroy();
		}

		this.currentScene = scene;
		this.currentScene.init();
	};

	Game.SceneManager = SceneManager;

})();

/**
 * Scene
 */
(function()
{
	function Scene( id )
	{
		this.id = id;;
	}

	Scene.prototype.preload = function() 
	{
		
	};

	Scene.prototype.create = function() 
	{
		
	};

	Scene.prototype.update = function() 
	{
		
	};

	Scene.prototype.destroy = function() 
	{
		
	};

	Game.Scene = Scene;

})();

/**
 * Map
 */
(function()
{
	function Map( options )
	{
		console.log( 'init map' );

		options = Object.assign( {}, Map.defaultOptions, options );

		this.width          = options.width;
		this.height         = options.height;
		this.tileSize       = options.tileSize;
		this.tileData       = options.tileData;
		this.tileProperties = options.tileProperties;
		this.tiles          = {};
		this.characters     = {};
		this.items          = {};

		// Create tiles
		for ( index = 0; index < this.tileData.length; index++ )
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
	}

	Map.prototype.getTiles = function( x, y, width, height )
	{
		var tiles = {};

		for ( var row = y; row <= y + height; row += height )
		{
			for ( var col = x; col <= x + width; col += width )
			{
				var index = this.getTileIndex( col, row, true );

				tiles[ index ] = true;
			}
		}
		
		return Object.keys( tiles );
	}

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
		var current = this.tiles[ index ];
		var loc     = this.getTileLocation( index );
		var options = this.tileProperties[ type ] || {};

		var tile = new Game.Tile();

		tile.x      = loc.x * this.tileSize;
		tile.y      = loc.y * this.tileSize;
		tile.width  = this.tileSize;
		tile.height = this.tileSize;
		tile.type   = type;
		tile.index  = index;

		Object.assign( tile, options );

		this.tiles[ tile.index ] = tile;
		this.tileData[ tile.index ] = tile.type;

		if ( current ) 
		{
			Game.events.dispatchEvent( 'tileChange', [ tile, current ] );
		}

		Game.events.dispatchEvent( 'tileSet', [ tile ] );
	};

	Map.prototype.getTileIndex = function( x, y, translate ) 
	{
		if ( translate )
		{
			x = Math.floor( x / this.tileSize );
			y = Math.floor( y / this.tileSize );
		};

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
			if ( n && ! n.collide && e && ! e.collide ) neighbors.push( ne.index );
			if ( s && ! s.collide && e && ! e.collide ) neighbors.push( se.index );
			if ( s && ! s.collide && w && ! w.collide ) neighbors.push( sw.index );
			if ( n && ! n.collide && w && ! w.collide ) neighbors.push( nw.index );
		};

		return neighbors;
	};

	Map.prototype.getFlowField = function( index ) 
	{
		var frontier = [ index ], visited = { [ index ] : 0 };

		while ( frontier.length )
		{
			var current   = frontier.shift();
			var neighbors = this.getTileNeighbors( current );

			for ( var i in neighbors )
			{
				var next = neighbors[ i ];

				if ( visited[ next ] === undefined ) 
				{
					var tile = this.getTile( next );

					frontier.push( next );
					visited[ next ] = 1 + tile.cost + visited[ current ];
				}
			}
		}

		return visited;
	};

	Map.prototype.getPath = function( a, b, translate ) 
	{
		var field = this.getFlowField( b );

		if ( field[ a ] === undefined || field[ b ] === undefined ) 
		{
			console.warn( 'Unable to find path from ' + a + ' to ' + b + '.' );

			return [];
		}

		var path = [];

		var frontier = [ a ], visited = { [ a ] : true };

		while ( frontier.length )
		{
			var current   = frontier.shift();
			var neighbors = this.getTileNeighbors( current, true );
			var next;

			for ( var i in neighbors )
			{
				var neighbor = neighbors[ i ];

				if ( next === undefined || field[ next ] > field[ neighbor ] ) 
				{
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

		if ( translate ) 
		{
			var _path = [];

			for ( var i in path )
			{
				var index = path[ i ];
				var tile = this.getTile( index );

				_path.push(
				{
					x : tile.x + tile.width / 2,
					y : tile.y + tile.height / 2,
				});
			}

			path = _path;
		}

		return path;
	};

	Map.prototype.addCharacter = function( character, x, y ) 
	{
		var tile = this.getTileAt( x, y );

		character.setLocation( 
			tile.x + ( this.tileSize - character.width ) / 2, 
			tile.y + ( this.tileSize - character.height ) / 2 );

		this.characters[ character.id ] = character;

		Game.events.dispatchEvent( 'characterAdded', [ character ] );
	};

	Map.prototype.removeCharacter = function( id ) 
	{
		var character = this.characters[ id ];

		delete this.characters[ id ];

		Game.events.dispatchEvent( 'characterRemoved', [ character ] );

		return character;
	};

	Map.prototype.addItem = function( item, x, y ) 
	{
		var tile = this.getTileAt( x, y );

		item.setLocation( 
			tile.x + ( this.tileSize - item.width ) / 2, 
			tile.y + ( this.tileSize - item.height ) / 2 );

		this.items[ item.id ] = item;

		Game.events.dispatchEvent( 'itemAdded', [ item ] );
	};

	Map.prototype.removeTtem = function( id ) 
	{
		var item = this.items[ id ];

		delete this.items[ id ];

		Game.events.dispatchEvent( 'itemRemoved', [ item ] );

		return item;
	};

	Map.prototype.update = function() 
	{
		for ( var i in this.items )
		{
			this.items[ i ].update();
		}

		for ( var i in this.characters )
		{
			this.characters[ i ].update();
		}

		this.render();
	};

	Map.prototype.render = function() 
	{
		var context = Game.canvas.getContext( '2d' );

		context.clearRect( 0, 0, Game.canvas.width, Game.canvas.height );

		for ( var i in this.tiles )
		{
			this.tiles[ i ].render();
		}

		for ( var i in this.items )
		{
			this.items[ i ].render();
		}

		for ( var i in this.characters )
		{
			this.characters[ i ].render();
		}
	};

	Game.Map = Map;

})();

/**
 * Tile
 */
(function()
{
	function Tile()
	{
		this.x;
		this.y;
		this.width;
		this.height;
		this.type    = 0;
		this.index   = -1;
		this.collide = false;
		this.cost    = 0;
	}

	Tile.prototype.render = function() 
	{
		var sprite = 
		{
			0 : 'transparent',
			1 : 'gray',
			2 : 'blue',
		};

		var fill = sprite[ this.type ];

		var context = Game.canvas.getContext( '2d' );

		context.save();
		context.translate( this.x, this.y );
		context.fillStyle = fill;
		context.fillRect( 0, 0, this.width, this.height );
		context.restore();

		Game.events.dispatchEvent( 'tileRender', [ this, context ] );
	};

	Game.Tile = Tile;

})();

/**
 * Sprite
 */
(function()
{
	function Sprite( id )
	{
		this.id = id;
		this.x;
		this.y;
		this.width;
		this.height;
		this.dirX = 0;
		this.dirY = 0;
		this.movingSpeed = 8;
	}

	Sprite.prototype.setLocation = function( x, y ) 
	{
		var origin      = { x : this.x, y : this.y };
		var destination = { x : x, y : y };

		Game.events.dispatchEvent( 'itemDestination', [ this, destination ] );

		this.x = destination.x;
		this.y = destination.y;

		Game.events.dispatchEvent( 'itemLocationChange', [ this, origin ] );
	}

	Sprite.prototype.move = function( dirX, dirY ) 
	{
		this.dirX = dirX;
		this.dirY = dirY;

		var x = this.x + this.movingSpeed * this.dirX;
		var y = this.y + this.movingSpeed * this.dirY;

		this.setLocation( x, y );
	}

	Sprite.prototype.moveTo = function( x, y ) 
	{
		var distance = Game.util.getDistance( this.x, this.y, x, y );

		var dirX = ( x - this.x ) / distance;
		var dirY = ( y - this.y ) / distance;

		this.move( dirX, dirY );
	}

	Sprite.prototype.update = function() 
	{
		
	}

	Sprite.prototype.render = function() 
	{
		
	}

	Game.Sprite = Sprite;

})();

/**
 * Character
 */
(function()
{
	function Character( id, type )
	{
		Game.Sprite.call( this, id );

		this.width       = 16;
		this.height      = 16;
		this.type        = type || 1;
		this.lookingDirX = 0;
		this.lookingDirY = 0;
		this.movingSpeed = 3;
		this.path        = [];
		this.pathIndex   = -1;
	}

	Character.prototype = Object.create( Game.Sprite.prototype );
	Character.prototype.constructor = Character;

	Character.prototype.lookAt = function( x, y ) 
	{
		var distance = Game.util.getDistance( this.x, this.y, x, y );

		this.lookingDirX = ( x - this.x ) / distance;
		this.lookingDirY = ( y - this.y ) / distance;

		Game.events.dispatchEvent( 'characterLookingDirectionChange', [ this ] );
	}

	Character.prototype.setPath = function( path ) 
	{
		this.path = this.normalizePath( path );
		this.pathIndex = 0;

		Game.events.dispatchEvent( 'characterPathChange', [ this ] );
	}

	Character.prototype.normalizePath = function( path ) 
	{
		var _path = [];

		for ( var i in path )
		{
			var target = path[ i ];

			_path.push(
			{
				x : target.x - this.width / 2,
				y : target.y - this.height / 2,
			})
		}

		return _path;
	}

	Character.prototype.update = function() 
	{
		var target;

		// Check if path
		if ( this.path.length && this.pathIndex != -1 ) 
		{
			// Set target
			target = this.path[ this.pathIndex ];

			// Check distance to target
			var distance = Game.util.getDistance( this.x, this.y, target.x, target.y );

			// next step is past target
			if ( distance < this.movingSpeed ) 
			{
				// Next target available
				if ( this.pathIndex + 1 < this.path.length - 1 )
				{
					// Set next target
					target = this.path[ ++this.pathIndex ];
				}

				// No next target
				else
				{
					// set location at target
					this.setLocation( target.x, target.y );

					// Reset
					target = null;

					this.path = [];
					this.pathIndex = -1;

					// Notify
					Game.events.dispatchEvent( 'characterDestinationReached', [ this ] );
				}
			}
		}

		// Move to target
		if ( target ) 
		{
			this.lookAt( target.x, target.y )
			this.moveTo( target.x, target.y );
		}
	}

	Character.prototype.render = function() 
	{
		var sprite = 
		{
			1 : 'red',
			2 : 'blue',
		};

		var fill    = sprite[ this.type ];
		var context = Game.canvas.getContext( '2d' );

		/**
		 * Lower body
		 */

		context.save();
		context.translate( this.x + this.width / 2, this.y + this.height / 2 );
		context.rotate( Math.atan2( this.dirY, this.dirX ) );
		context.fillStyle = 'black';
		context.fillRect( - this.width / 2, - this.height / 2, this.width, this.height );
		context.restore();

		/**
		 * Upper body
		 */

		context.save();
		context.translate( this.x + this.width / 2, this.y + this.height / 2 );
		context.rotate( Math.atan2( this.lookingDirY, this.lookingDirX ) );
		context.fillStyle = fill;
		context.fillRect( - this.width / 2, - this.height / 2, this.width, this.height );
		context.restore();

		// Looking indicator
		context.save();
		context.translate( this.x + this.width / 2, this.y + this.height / 2 );
		context.rotate( Math.atan2( this.lookingDirY, this.lookingDirX ) );
		context.fill = 'black';
		context.fillRect( 0, 0, this.width / 2, 1 );
		context.restore();

		Game.events.dispatchEvent( 'characterRender', [ this, context ] );
	};

	Game.Character = Character;

})();
