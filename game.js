
window.Game = {};

/**
 * Main
 */
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
		this.keyPressed = null;
		this.interval   = null;

		this.canvas        = document.createElement( 'canvas' );
		this.canvas.width  = 32 * 20;
		this.canvas.height = 32 * 15; 

		document.dispatchEvent( new CustomEvent( 'Game.init' ) );
	};

	Game.update = function()
	{
		this.events.dispatchEvent( 'gameUpdate' );
	};

	Game.start = function()
	{
		/**
		 * Track pressed key
		 */

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

		this.events.dispatchEvent( 'gameStart' );

		//
		this.elem.classList.add( 'game' );
		this.elem.appendChild( this.canvas );
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
	};

	Rectangle.prototype.intersects = function( r ) 
	{
		 return !( r.left > this.right || 
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
	};

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

		var _this = this;

		Game.events.addEventListener( 'gameUpdate', function()
		{
			_this.update();
		});
	};

	SceneManager.prototype.registerScene = function( className ) 
	{
		var scene = new className();

		this.scenes[ scene.id ] = scene;
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

	SceneManager.prototype.update = function() 
	{
		if ( this.currentScene ) 
		{
			this.currentScene.update();
		}
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
	};

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
	function Map( options )
	{
		var defaults = 
		{
			width : 10,
			height : 10,
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
		this.characters     = {};

		// Create tiles
		for ( var index in this.tileData )
		{
			this.addTile( index, this.tileData[ index ] );
		}
	};

	Map.prototype.render = function() 
	{
		// tiles
		for ( var i in this.tiles )
		{
			this.tiles[i].render();
		}

		// characters
		for ( var i in this.characters )
		{
			this.characters[i].render();
		}
	};

	Map.prototype.addTile = function( index, type ) 
	{
		var loc     = this.getTileLocation( index );
		var options = this.tileProperties[ type ];

		var tile = new Game.Tile();

		tile.x       = loc.x * this.tileSize;
		tile.y       = loc.y * this.tileSize;
		tile.width   = this.tileSize;
		tile.height  = this.tileSize;
		tile.collide = options.collide;
		tile.type    = type;

		this.tiles[ index ] = tile;

		Game.events.dispatchEvent( 'tileAdded', [ tile ] );
	};

	Map.prototype.getTileLocation = function( index ) 
	{
		var x = index % this.width;
		var y = ( index - x ) / this.width;

		return { x : x, y : y };
	};

	Map.prototype.getTile = function( index ) 
	{
		return this.tiles[ index ];
	};

	Map.prototype.getTileAt = function( x, y ) 
	{
		var index = this.getTileIndex( x, y );

		return this.tiles[ index ];
	};

	Map.prototype.getTileIndex = function( x, y ) 
	{
		return this.width * y + x;
	};

	Map.prototype.addCharacter = function( character, x, y ) 
	{
		var cx = x * this.tileSize + ( ( this.tileSize - character.width ) / 2 );
		var cy = y * this.tileSize + ( ( this.tileSize - character.height ) / 2 );

		character.setLocation( cx, cy );

		this.characters[ character.id ] = character;

		Game.events.dispatchEvent( 'characterAdded', [ character ] );
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
		this.collide = false;
	};

	Tile.prototype.render = function() 
	{
		var sprite = 
		{
			1 : '#F7F7FF',
			2 : '#232528',
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

/**
 * Character
 */
(function()
{
	function Character( id, map )
	{
		this.id  = id;
		this.map = map;
		this.x;
		this.y;
		this.width  = 24;
		this.height = 24;
		this.dirX = 0;
		this.dirY = 0;
		this.movingSpeed = 8;
	};

	Character.prototype.setLocation = function( x, y ) 
	{
		this.x = x;
		this.y = y;
	};

	Character.prototype.setDirection = function( dirX, dirY ) 
	{
		this.dirX = dirX;
		this.dirY = dirY;
	};

	Character.prototype.getTile = function( x, y ) 
	{
		if ( x === undefined ) 
		{
			x = this.x;
			y = this.y;
		};

		return { 
			x : Math.floor( x / this.map.tileSize ), 
			y : Math.floor( y / this.map.tileSize ) 
		}
	};

	Character.prototype.getTileIndex = function( x, y ) 
	{
		var tile = this.getTile( x, y );

		return this.map.getTileIndex( tile.x, tile.y );
	};

	Character.prototype.move = function( dirX, dirY ) 
	{
		// set direction
		this.setDirection( dirX, dirY );

		// get destination
		var x = this.x + this.movingSpeed * this.dirX;
		var y = this.y + this.movingSpeed * this.dirY;

		// Collision detection

		var rect = new Game.Rectangle( x, y, this.width, this.height );
		var check = [];

		if ( this.dirX < 0 ) 
		{
			check.push( this.getTileIndex( rect.left, rect.top ) );
			check.push( this.getTileIndex( rect.left, rect.bottom ) );
		}

		if ( this.dirX > 0 ) 
		{
			check.push( this.getTileIndex( rect.right, rect.top ) );
			check.push( this.getTileIndex( rect.right, rect.bottom ) );
		}

		if ( this.dirY < 0 ) 
		{
			check.push( this.getTileIndex( rect.left, rect.top ) );
			check.push( this.getTileIndex( rect.right, rect.top ) );
		}

		if ( this.dirY > 0 ) 
		{
			check.push( this.getTileIndex( rect.left, rect.bottom ) );
			check.push( this.getTileIndex( rect.right, rect.bottom ) );
		}

		var collisions = [];

		for ( var i in check )
		{
			var index = check[ i ];
			var tile = this.map.getTile( index );

			if ( tile && tile.collide ) 
			{
				var r = new Game.Rectangle( tile.x, tile.y, tile.width, tile.height );

				collisions.push( r );
			}
		}

		if ( collisions.length ) 
		{
			var tile = collisions[0];

			if ( this.dirX < 0 ) 
			{
				x = tile.right + 1;
			}

			if ( this.dirX > 0 ) 
			{
				x = tile.left - this.width - 1;
			}

			if ( this.dirY < 0 ) 
			{
				y = tile.bottom + 1;
			}

			if ( this.dirY > 0 ) 
			{
				y = tile.top - this.height - 1;
			}
		}

		// set destination
		this.setLocation( x, y );
	};

	Character.prototype.render = function() 
	{
		var context = Game.canvas.getContext( '2d' );

		// Pedestal
		context.save()
		context.fillStyle = 'red';
		context.fillRect( this.x, this.y, this.width, this.height );
		context.restore();

		// Looking direction

		context.save()
		context.beginPath();

		// left
		if ( this.dirX < 0 ) 
		{
			context.moveTo( this.x + this.width, this.y + this.height );
			context.lineTo( this.x, this.y + this.height / 2 );
			context.lineTo( this.x + this.width, this.y );
		}

		// right
		if ( this.dirX > 0 ) 
		{
			context.moveTo( this.x, this.y + this.height );
			context.lineTo( this.x + this.width, this.y + this.height / 2 );
			context.lineTo( this.x, this.y );
		}

		// up
		if ( this.dirY < 0 ) 
		{
			context.moveTo( this.x, this.y + this.height );
			context.lineTo( this.x + this.width / 2, this.y );
			context.lineTo( this.x + this.width, this.y + this.height );
		}

		// down
		if ( this.dirY > 0 ) 
		{
			context.moveTo( this.x, this.y );
			context.lineTo( this.x + this.width / 2, this.y + this.height );
			context.lineTo( this.x + this.width, this.y );
		}

		context.fillStyle = 'black';
		context.fill();
		context.closePath();
		context.restore()
	};

	Game.Character = Character;

})();
