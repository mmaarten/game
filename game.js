
window.Game = {};

(function()
{
	Game.init = function()
	{
		this.elem = document.body;
		this.fps  = 24;
		this.keys = 
		{
			up    : 90, // z
			right : 68, // d
			down  : 83, // s
			left  : 81, // q
		};

		this.events     = new Game.EventManager();
		this.scenes     = new Game.SceneManager();
		this.interval   = null;
		this.keyPressed = null;

		this.canvas = document.createElement( 'canvas' );
		this.canvas.width  = 32 * 18;
		this.canvas.height = 32 * 15;

		document.dispatchEvent( new CustomEvent( 'gameInit' ) );
	};

	Game.update = function()
	{
		// Update current scene
		if ( this.scenes.currentScene ) 
		{
			this.scenes.currentScene.update();
		}

		// Notify
		this.events.dispatchEvent( 'gameUpdate' );
	};

	Game.start = function()
	{	
		// track key pressed

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

		// Add canvas
		this.elem.classList.add( 'game' );
		this.elem.appendChild( this.canvas );
	};

})();

(function()
{
	function getDistance( x1, y1, x2, y2 )
	{
		var a = x1 - x2;
		var b = y1 - y2;

		return Math.sqrt( a * a + b * b );
	}

	Game.util = 
	{
		getDistance : getDistance,
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

		Game.events.dispatchEvent( 'sceneAdded', [ scene ] );
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
		this.id = id;
	}

	Scene.prototype.init = function() 
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
	/**
	 * Constructor
	 *
	 * @param object options
	 */
	function Map( options )
	{
		var defaults = 
		{
			width    : 0,
			height   : 0,
			tileSize : 32,
			tileData : [],
			tileProperties : {},
		};

		options = Object.assign( {}, defaults, options );

		this.width          = options.width;
		this.height         = options.height;
		this.tileSize       = options.tileSize;
		this.tileData       = options.tileData;
		this.tileProperties = options.tileProperties;
		this.tiles          = {};
		this.characters     = [];

		// Create tiles
		for (var index = 0; index < this.tileData.length; index++ ) 
		{
			this.setTile( index, this.tileData[ index ] );
		}
	}

	/**
	 * Set Tile
	 *
	 * Add tile to map.
	 *
	 * @param integer index
	 * @param mixed type
	 */
	Map.prototype.setTile = function( index, type ) 
	{
		var loc = this.getTileLocation( index );

		var tile = new Game.Tile();

		Object.assign( tile, this.tileProperties[ type ] );

		tile.x      = loc.x * this.tileSize;
		tile.y      = loc.y * this.tileSize;
		tile.width  = this.tileSize;
		tile.height = this.tileSize;
		tile.type   = type;
		tile.index  = index;

		this.tiles[ tile.index ] = tile;

		Game.events.dispatchEvent( 'tileSet', [ tile ] );
	};

	/**
	 * Get Tile
	 *
	 * Get tile instance by index.
	 *
	 * @param integer index
	 * 
	 * @return Game.Tile
	 */
	Map.prototype.getTile = function( index ) 
	{
		return this.tiles[ index ];
	};

	/**
	 * Get Tile At
	 *
	 * Get tile instance by location.
	 *
	 * @param number x Location in pixels or column index.
	 * @param number y Location in pixels or row index.
	 * @param boolean translate Wheter to convert x and y arguments 
	 *                          to row and column indexes.
	 * 
	 * @return Game.Tile
	 */
	Map.prototype.getTileAt = function( x, y, translate ) 
	{
		var index = this.getTileIndex( x, y, translate );

		return this.getTile( index );
	};

	/**
	 * Get Tile Index
	 *
	 * Get tile index by location.
	 *
	 * @param number x Location in pixels or column index.
	 * @param number y Location in pixels or row index.
	 * @param boolean translate Wheter to convert x and y arguments 
	 *                          to row and column indexes.
	 * 
	 * @return integer
	 */
	Map.prototype.getTileIndex = function( x, y, translate ) 
	{
		if ( translate ) 
		{
			x = Math.floor( x / this.tileSize );
			y = Math.floor( y / this.tileSize );
		}

		return this.width * y + x;
	};

	/**
	 * Get Tile Location
	 *
	 * Get tile location by index.
	 *
	 * @param integer index
	 * 
	 * @return Object
	 */
	Map.prototype.getTileLocation = function( index ) 
	{
		var x = index % this.width;
		var y = ( index - x ) / this.width;

		return { x : x, y : y };
	};

	/**
	 * Get Tile neighbors
	 *
	 * Returns a list of tile neighbors indexes.
	 * 'Walls' are excluded.
	 *
	 * @param integer index
	 * 
	 * @return Array
	 */
	Map.prototype.getTileNeighbors = function( index ) 
	{
		var loc = this.getTileLocation( index );
		
		var left   = this.getTileAt( loc.x - 1, loc.y + 0 );
		var right  = this.getTileAt( loc.x + 1, loc.y + 0 );
		var top    = this.getTileAt( loc.x + 0, loc.y - 1 );
		var bottom = this.getTileAt( loc.x + 0, loc.y + 1 );
		
		var neighbors = [];

		if ( left && ! left.collide ) 
		{
			neighbors.push( left.index );
		}

		if ( right && ! right.collide ) 
		{
			neighbors.push( right.index );
		}

		if ( top && ! top.collide ) 
		{
			neighbors.push( top.index );
		}

		if ( bottom && ! bottom.collide ) 
		{
			neighbors.push( bottom.index );
		}

		return neighbors;
	};

	/**
	 * Get Distance Field
	 *
	 * @param integer tileIndex
	 * 
	 * @return Array
	 */
	Map.prototype.getDistanceField = function( tileIndex )
	{
		var frontier = [];
		var visited = {};

		frontier.push( tileIndex );
		visited[ tileIndex ] = 0;

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

	/**
	 * Get Path
	 *
	 * Returns an array of tile indexes representing the path to walk.
	 *
	 * @param integer a Origin tile index
	 * @param integer b Destination tile index
	 * 
	 * @return Array
	 */
	Map.prototype.getPath = function( a, b )
	{
		var field = this.getDistanceField( b );

		// Check if a can reach b

		if ( ! field[ a ] || ! field[ b ] ) 
		{
			return [];
		}

		var path = [];

		// 

		var frontier = [];
		frontier.push( a );

		var visited = {};
		visited[ a ] = true;

		path.push( a );

		while ( frontier.length )
		{
			var current = frontier.shift();

			// Get neighbor with lowest cost

			var tile, cost, next;

			var neighbors = this.getTileNeighbors( current );

			for ( var i in neighbors )
			{
				var neighbor = neighbors[ i ];

				if ( cost === undefined || cost > field[ neighbor ] ) 
				{
					cost = field[ neighbor ];
					next = neighbor;
				}
			}

			if ( next && ! visited[ next ] ) 
			{
				frontier.push( next );
				path.push( next );

				visited[ next ] = true;
			}
		}

		// Add destination

		if ( path.length ) 
		{
			path.push( b );
		}

		return path;
	}

	/**
	 * Add character
	 *
	 * @param Game.Character
	 * @param integer x
	 * @param integer y
	 */
	Map.prototype.addCharacter = function( character, x, y )
	{
		// Center character on tile
		var cx = x * this.tileSize + ( ( this.tileSize - character.width ) / 2 );
		var cy = y * this.tileSize + ( ( this.tileSize - character.height ) / 2 );

		character.setLocation( cx, cy );

		// Add character
		this.characters.push( character );

		// Notify
		Game.events.addEventListener( 'characterAdded', [ character ] );
	};

	/**
	 * Render
	 */
	Map.prototype.render = function() 
	{
		// tiles
		for ( var i in this.tiles )
		{
			this.tiles[ i ].render();
		}

		// characters
		for ( var i in this.characters )
		{
			this.characters[ i ].render();
		}
	};

	Game.Map = Map;

})();

(function()
{
	function Tile()
	{
		this.x;
		this.y;
		this.width;
		this.height;
		this.type;
		this.index;
		this.collide = false;
	}

	Tile.prototype.render = function() 
	{
		var sprite = 
		{
			1 : 'white',
			2 : 'grey',
		};

		var fill = sprite[ this.type ];

		var context = Game.canvas.getContext( '2d' );

		context.save();
		context.fillStyle = fill;
		context.fillRect( this.x, this.y, this.width, this.height );
		context.restore();
	};

	Game.Tile = Tile;

})();

(function()
{
	function Character( map )
	{
		this.map         = map;
		this.x;
		this.y;
		this.width       = 24;
		this.height      = 24;
		this.dirX        = 0;
		this.dirY        = 0;
		this.movingSpeed = 8;
		this.isMoving    = false;
		this.path        = [];
		this.pathIndex   = -1;
	}

	Character.prototype.setLocation = function( x, y ) 
	{
		// Collision detection

		if ( this.isMoving ) 
		{
			var rect = new Game.Rectangle( x, y, this.width, this.height );
			var check = [];

			if ( this.dirX < 0 ) 
			{
				check.push( this.map.getTileAt( rect.left, rect.top, true ) );
				check.push( this.map.getTileAt( rect.left, rect.bottom, true ) );
			}

			if ( this.dirX > 0 ) 
			{
				check.push( this.map.getTileAt( rect.right, rect.top, true ) );
				check.push( this.map.getTileAt( rect.right, rect.bottom, true ) );
			}

			if ( this.dirY < 0 ) 
			{
				check.push( this.map.getTileAt( rect.left, rect.top, true ) );
				check.push( this.map.getTileAt( rect.right, rect.top, true ) );
			}

			if ( this.dirY > 0 ) 
			{
				check.push( this.map.getTileAt( rect.left, rect.bottom, true ) );
				check.push( this.map.getTileAt( rect.right, rect.bottom, true ) );
			}

			var collisions = [];

			for ( var i in check )
			{
				var tile = check[ i ];

				if ( tile && tile.collide ) 
				{
					collisions.push( tile );
				}
			}

			if ( collisions.length ) 
			{
				var tile = collisions[0]; // only need to check 1
				var rect = new Game.Rectangle( tile.x, tile.y, tile.width, tile.height );

				if ( this.dirX < 0 ) 
				{
					x = rect.right + 1;
				}

				if ( this.dirX > 0 ) 
				{
					x = rect.left - this.width - 1;
				}

				if ( this.dirY < 0 ) 
				{
					y = rect.bottom + 1;
				}

				if ( this.dirY > 0 ) 
				{
					y = rect.top - this.height - 1;
				}
			}
		}

		if ( x == this.x && y == this.y ) 
		{
			return;
		}

		this.x = x;
		this.y = y;

		Game.events.dispatchEvent( 'characterLocationChange', [ this ] );
	};

	Character.prototype.setDirection = function( dirX, dirY ) 
	{
		if ( dirX == this.dirX && dirY == this.dirY ) 
		{
			return;
		}

		this.dirX = dirX;
		this.dirY = dirY;

		Game.events.dispatchEvent( 'characterDirectionChange', [ this ] );
	};

	Character.prototype.goto = function( b ) 
	{
		var a = this.map.getTileIndex( this.x, this.y, true );

		this.path = this.map.getPath( a, b );
		this.pathIndex = 0;
	};

	Character.prototype.walkPath = function() 
	{
		if ( ! this.path.length || this.pathIndex == -1 ) 
		{
			return;
		}

		var index = this.path[ this.pathIndex ];
		var tile  = this.map.getTile( index );

		var distance = Game.util.getDistance( this.x, this.y, tile.x, tile.y );

		
	};

	Character.prototype.move = function( dirX, dirY ) 
	{
		this.setDirection( dirX, dirY );

		var x = this.x + this.movingSpeed * this.dirX;
		var y = this.y + this.movingSpeed * this.dirY;

		this.isMoving = true;

		this.setLocation( x, y );
	};

	Character.prototype.stop = function() 
	{
		this.isMoving = false;
	};

	Character.prototype.render = function() 
	{
		var context = Game.canvas.getContext( '2d' );

		context.save();
		context.fillStyle = 'red';
		context.fillRect( this.x, this.y, this.width, this.height );
		context.restore();
	};

	Game.Character = Character;

})();

