(function( window, document, undefined )
{
	"use strict";

	var App = {};

	App.init = function()
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

		this.elem.classList.add( 'game' );

		this.events = new EventManager();

		this.scenes = {};

		/**
		 * Track pressed key
		 */

		this.keyPressed = null;

		document.addEventListener( 'keydown', function( event )
		{
			App.keyPressed = event.keyCode;
		});

		document.addEventListener( 'keyup', function( event )
		{
			App.keyPressed = null;
		});

		/**
		 * Setup update interval
		 */

		this.interval = setInterval( function()
		{
			App.update();

		}, 1000 / this.fps );

		/**
		 * Notify init
		 */

		document.dispatchEvent( new CustomEvent( 'App.init' ) );

		/**
		 * Setup game
		 */

		this.map = new Map(
		{
			width : 25,
			height : 30,
			tileSize : 32,
			canvasWidth : 800,
			canvasHeight : 600,
			tileData : 
			[
				2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
				2,1,1,2,1,1,1,2,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
				2,1,1,1,1,2,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,
				2,2,1,2,2,2,2,2,1,2,1,1,1,1,2,2,2,1,2,2,2,1,1,1,2,
				2,1,1,1,1,1,1,2,1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,2,
				2,2,2,2,1,2,2,2,2,2,1,1,1,1,2,1,2,1,2,1,2,1,1,1,2,
				2,1,1,1,1,2,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
				2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1,2,1,2,1,2,1,1,1,2,
				2,2,2,2,1,2,2,1,2,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,2,
				2,1,1,1,1,2,1,1,1,2,1,1,1,1,2,2,2,1,2,2,2,1,1,1,2,
				2,1,2,2,1,2,1,2,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,
				2,1,2,2,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
				2,1,1,1,1,2,1,2,1,2,1,1,1,2,2,2,2,2,2,1,2,2,2,2,2,
				2,1,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,1,1,1,1,1,1,1,2,
				2,2,1,1,1,2,2,2,2,2,2,2,1,2,2,2,2,2,1,2,2,2,1,2,2,
				2,2,1,1,1,2,1,1,1,2,1,2,1,2,1,1,1,1,1,1,1,2,1,2,2,
				2,1,1,2,1,1,1,2,1,2,1,1,1,1,1,1,2,1,1,1,1,1,1,1,2,
				2,1,1,1,1,2,1,1,1,2,1,1,1,1,1,1,2,1,1,1,1,1,1,2,2,
				2,2,1,2,2,2,2,2,1,2,1,1,1,1,2,2,2,1,2,2,2,1,1,1,2,
				2,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,2,1,1,1,2,1,1,2,2,
				2,2,2,2,1,2,2,2,2,2,1,1,1,1,2,1,2,1,2,1,2,1,1,1,2,
				2,1,1,2,1,2,1,1,1,2,2,1,2,2,2,1,1,1,1,1,1,1,1,2,2,
				2,2,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,2,1,2,1,1,1,2,
				2,2,1,2,2,2,2,1,2,2,1,1,1,1,2,1,2,2,2,2,2,1,1,2,2,
				2,1,1,1,1,2,1,1,1,2,1,1,1,1,2,2,2,1,2,1,2,1,1,1,2,
				2,1,2,2,1,2,2,2,1,2,1,1,1,1,2,1,1,1,1,1,1,1,1,2,2,
				2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1,1,1,1,2,2,1,1,1,2,
				2,1,1,2,1,2,1,2,2,2,1,1,2,2,1,2,1,2,1,2,1,1,1,2,2,
				2,1,1,1,1,2,1,1,1,2,1,1,1,2,1,1,1,1,1,2,1,1,1,1,2,
				2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
			],
			tileProperties : 
			{
				1 : { color: '#CDD1C4', collide : false }, // floor
				2 : { color: '#30323D', collide : true },  // wall
				3 : { color: '#5EB1BF', collide : false }, // water
			},
			characterData : 
			[
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,
				0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			],
			characterProperties : 
			{
				1 : { color: 'blue' },
				2 : { color: 'red' },
			}
		});

		
		this.player = new Character();
		this.player.color = '#E3170A';
		this.player.setTile( 11, 7 );
		

		this.map.addCharacter( this.player );
		

		this.elem.appendChild( this.map.canvas );

		this.events.dispatchEvent( 'sceneInit' );
	}

	App.createScene = function( id, options )
	{
		var scene = new Scene( id, options );

		return scene;
	}

	App.addScene = function( scene )
	{
		this.scenes[ scene.id ] = scene;
	}

	App.setScene = function( id )
	{
		if ( this.currentScene ) 
		{
			this.currentScene.deactivate();
		}

		this.currentScene = this.scenes[ id ];

		this.currentScene.activate();
	}

	App.update = function()
	{
		// up
		if ( this.keys.up == this.keyPressed ) 
		{
			this.player.move( 0, -1 );
		}

		// right
		else if ( this.keys.right == this.keyPressed ) 
		{
			this.player.move( 1, 0 );
		}

		// down
		else if ( this.keys.down == this.keyPressed ) 
		{
			this.player.move( 0, 1 );
		}

		// left
		else if ( this.keys.left == this.keyPressed ) 
		{
			this.player.move( -1, 0 );
		}

		else
		{
			this.player.stop();
		}
		
		this.map.update();

		this.events.dispatchEvent( 'update' );

		this.map.draw();
	};

	function Scene( id, options )
	{
		this.id = id;
	}

	Scene.prototype.update = function() 
	{
		
	};

	Scene.prototype.draw = function() 
	{
		
	};

	Scene.prototype.activate = function() 
	{
		
	};

	Scene.prototype.deactivate = function() 
	{
		
	};

	/**
	 * Utilities
	 * ---------------------------------------------------------------
	 */

	var Util = {};

	Util.getDistance = function( ax, ay, bx, by ) 
	{
        return Math.sqrt( Math.pow( ax - bx, 2 ) + Math.pow( ay - by, 2 ) );
    };

    Util.getRandomInteger = function( min, max ) 
	{
        return parseInt( ( Math.random() * ( max - min + 1 ) ), 10 ) + min;
    };

	/**
	 * EventManager
	 * ---------------------------------------------------------------
	 */

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

	/**
	 * Map
	 * ---------------------------------------------------------------
	 */

	function Map( options )
	{
		/**
		 * Options
		 */

		this.width          = options.width;
		this.height         = options.height;
		this.tileSize       = options.tileSize;
		this.tileData       = options.tileData;
		this.tileProperties = options.tileProperties;
		
		this.characterData       = options.characterData;
		this.characterProperties = options.characterProperties;
		this.characters          = [];

		/**
		 * Setup canvas
		 */

		this.canvas        = document.createElement( 'canvas' );
		this.canvas.width  = options.canvasWidth;
		this.canvas.height = options.canvasHeight;
	}

	Map.prototype.addCharacter = function( character )
	{
		this.characters.push( character );

		App.events.dispatchEvent( 'characterAdded', [ character ] );
	}
 	
 	/**
 	 * Get Path
 	 *
 	 * @param integer $a Origin tile index
 	 * @param integer $b Destination tile index
 	 */
	Map.prototype.getPath = function( a, b )
	{
		var field = this.getField( b );

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

	// https://www.redblobgames.com/pathfinding/tower-defense/
	Map.prototype.getField = function( x, y )
	{
		var index = x;

		if ( y !== undefined ) 
		{
			index = this.getTileIndex( x, y );
		}

		var frontier = [];

		frontier.push( index );

		var visited = {};
		visited[ index ] = 0;

		while ( frontier.length )
		{
			var current = frontier.shift();

			var neighbors = this.getTileNeighbors( current );

			for ( var i in neighbors )
			{
				var next = neighbors[ i ];

				if ( ! visited[ next ] ) 
				{
					frontier.push( next );

					visited[ next ] = 1 + visited[ current ];
				}
			}
		}

		return visited;
	};

	Map.prototype.getTileLocation = function( index ) 
	{
		var x = index % this.width;
		var y = ( index - x ) / this.width;

		return { x : x, y : y };
	};

	Map.prototype.getTileIndex = function( x, y ) 
	{
		var index = this.width * y + x;

		return index >= 0 && index < this.tileData.length ? index : -1;
	};

	Map.prototype.getTileType = function( index ) 
	{
		return index != -1 ? this.tileData[ index ] : null;
	};

	Map.prototype.getTileTypeAt = function( x, y ) 
	{
		var index = this.getTileIndex( x, y );

		return index != -1 ? this.getTileType( index ) : null;
	};

	Map.prototype.getTile = function( index ) 
	{
		var type = this.getTileType( index );

		if ( type !== null && this.tileProperties[ type ] ) 
		{
			return this.tileProperties[ type ];
		}

		return null;
	};

	Map.prototype.getTileAt = function( x, y ) 
	{
		var index = this.getTileIndex( x, y );

		return index != -1 ? this.getTile( index ) : null;
	};

	Map.prototype.setTile = function( index, type ) 
	{
		this.tileData[ index ] = type;

		App.events.dispatchEvent( 'tileChange', [ index ] );
	};

	Map.prototype.setTileAt = function( type, x, y ) 
	{
		var index = this.getTileIndex( x, y );

		this.setTile( index, type );
	};

	Map.prototype.getTileNeighbors = function( index ) 
	{
		var location = this.getTileLocation( index );

		var neighbors = [], neighbor;

		var top    = this.getTileIndex( location.x + 0, location.y - 1 );
		var right  = this.getTileIndex( location.x + 1, location.y + 0 );
		var bottom = this.getTileIndex( location.x + 0, location.y + 1 );
		var left   = this.getTileIndex( location.x - 1, location.y + 0 );

		// top
		if ( ( neighbor = this.getTile( top ) ) && ! neighbor.collide ) 
		{
			neighbors.push( top );
		}

		// right
		if ( ( neighbor = this.getTile( right ) ) && ! neighbor.collide ) 
		{
			neighbors.push( right );
		}

		// bottom
		if ( ( neighbor = this.getTile( bottom ) ) && ! neighbor.collide ) 
		{
			neighbors.push( bottom );
		}

		// left
		if ( ( neighbor = this.getTile( left ) ) && ! neighbor.collide ) 
		{
			neighbors.push( left );
		}

		return neighbors;
	};

	Map.prototype.draw = function() 
	{
		var camera = 
		{
			x : App.player.x,
			y : App.player.y,
		};

		var context = this.canvas.getContext( '2d' );

		context.save();

		// Empty canvas
		context.clearRect( 0, 0, this.canvas.width, this.canvas.height );

		/**
		 * Center on camera
		 */

		// Make sure camera stays inside map boundaries

		var xMin = this.canvas.width / 2 - this.tileSize / 2;
		var xMax = this.width * this.tileSize - this.tileSize - xMin;

		var yMin = this.canvas.height / 2 - this.tileSize / 2;
		var yMax = this.height * this.tileSize - this.tileSize - yMin;

		if ( camera.x < xMin ) 
		{
			camera.x = xMin;
		}

		else if ( camera.x > xMax )
		{
			camera.x = xMax;
		}

		if ( camera.y < yMin ) 
		{
			camera.y = yMin;
		}

		else if ( camera.y > yMax )
		{
			camera.y = yMax;
		}

		// Center

		var camX = camera.x - ( this.canvas.width / 2 ) + ( this.tileSize / 2 );
        var camY = camera.y - ( this.canvas.height / 2 ) + ( this.tileSize / 2 );

        context.translate( -camX, -camY );

		/**
		 * Render tiles around camera position
		 */
		
		var camXTile = Math.floor( camera.x / this.tileSize );
		var camYTile = Math.floor( camera.y / this.tileSize );

		var canvasXTiles  = Math.ceil( this.canvas.width / this.tileSize ) + 3;
		var canvasYTiles  = Math.ceil( this.canvas.height / this.tileSize ) + 3;

		var xStart = camXTile - Math.ceil( canvasXTiles / 2 );
		var xEnd   = camXTile + Math.ceil( canvasXTiles / 2 );
		var yStart = camYTile - Math.ceil( canvasXTiles / 2 );
		var yEnd   = camYTile + Math.ceil( canvasXTiles / 2 );

		// draw tiles
		for ( var y = yStart; y < yEnd; y++ )
		{
			for ( var x = xStart; x < xEnd; x++ )
			{
				var tile = this.getTileAt( x, y );

				if ( tile !== null ) 
				{
					this.drawTile( x, y );
				}
			}
		}

		// draw characters
		for ( var i in this.characters )
		{
			this.characters[ i ].draw();
		}

		App.events.dispatchEvent( 'draw' );

		context.restore();
	};

	Map.prototype.update = function() 
	{
		for ( var i in this.characters )
		{
			this.characters[ i ].walkPath();
		}
	};
	
	Map.prototype.drawTile = function( x, y ) 
	{
		var tile = this.getTileAt( x, y );

		if ( tile === null ) 
		{
			return;
		}

		var context = this.canvas.getContext( '2d' );

		context.fillStyle = tile.color;
		context.fillRect( x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize );
	};

	/**
	 * Character
	 * ---------------------------------------------------------------
	 */

	function Character()
	{
		this.x;
		this.y;

		this.width  = App.map.tileSize * 0.75;
		this.height = App.map.tileSize * 0.75;

		this.movingSpeed = 3;
		this.movingIndex = 0;
		this.isMoving = false;

		this.dirX = 0;
		this.dirY = 0;

		this.path = [];
		this.currentNode = null;

		this.charactersInFOV = [];

		this.color = '#D81E5B';
	}

	Character.prototype.setLocation = function( x, y ) 
	{
		var prevX = this.x;
		var prevY = this.y;

		var prevTiles = this.getTiles();

		this.x = x;
		this.y = y;

		var tiles = this.getTiles();

		// notify change
		if ( this.x != prevX || this.y != prevY )
		{
			App.events.dispatchEvent( 'characterLocationChange', [ this, prevX, prevY ] );
		}
		
		// notify tile change
		if ( prevTiles.join('|') != tiles.join('|') )
		{
			App.events.dispatchEvent( 'characterTileChange', [ this, tiles, prevTiles ] );
		}
	};

	/**
	 * Get tiles character is standing on
	 */
	Character.prototype.getTiles = function() 
	{
		var rect = this.getRect(), tiles = [];

		// Get tiles standing on
		tiles.push( this.getTile( rect.left, rect.top ) );
		tiles.push( this.getTile( rect.left, rect.bottom ) );
		tiles.push( this.getTile( rect.right, rect.top ) );
		tiles.push( this.getTile( rect.right, rect.bottom ) );
		tiles.push( this.getTile( rect.left, rect.top ) );
		tiles.push( this.getTile( rect.right, rect.top ) );
		tiles.push( this.getTile( rect.left, rect.bottom ) );
		tiles.push( this.getTile( rect.right, rect.bottom ) );
	
		// remove duplicates

		var _tiles = {};

		for ( var i in tiles )
		{
			var tile = tiles[ i ];
			var index = App.map.getTileIndex( tile.x, tile.y );

			_tiles[ index ] = tile; 
		}

		tiles = Object.keys( _tiles );

		//

		return tiles;
	}

	Character.prototype.getTileIndex = function() 
	{
		var tile = this.getTile();

		return App.map.getTileIndex( tile.x, tile.y );
	};

	Character.prototype.getTile = function( x, y ) 
	{
		var offsetX = 0;
		var offsetY = 0;

		if ( x === undefined ) 
		{
			x = this.x;
			y = this.y;

			// center
			offsetX = this.width / 2;
			offsetY = this.height / 2;
		}

		x = Math.floor( ( x + offsetX ) / App.map.tileSize );
		y = Math.floor( ( y + offsetY ) / App.map.tileSize );

		return { x : x, y : y };
	};

	Character.prototype.setTile = function( x, y ) 
	{
		// Center on tile
		var cx = x * App.map.tileSize + ( ( App.map.tileSize - this.width ) / 2 );
		var cy = y * App.map.tileSize + ( ( App.map.tileSize - this.height ) / 2 );

		this.setLocation( cx, cy );
	};

	Character.prototype.setDestination = function( tileIndex ) 
	{
		// TODO : notify when destination not found or not reachable

		this.path = App.map.getPath( this.getTileIndex(), tileIndex );

		if ( this.path.length ) 
		{
			this.currentNode = 0;

			// TODO : check if change
			App.events.dispatchEvent( 'characterDestinationChange', [ this ] );

			return true;
		}

		this.currentNode = null;

		this.isMoving = false;
		
		return false;
	};

	Character.prototype.setDirection = function( dirX, dirY ) 
	{
		this.dirX = dirX;
		this.dirY = dirY;
	};

	Character.prototype.getRect = function( x, y ) 
	{
		if ( x === undefined ) 
		{
			x = this.x;
			y = this.y;
		}

		var rect = 
		{
			top    : y,
			right  : x + this.width,
			bottom : y + this.height,
			left   : x
		};

		return rect;
	};

	Character.prototype.move = function( dirX, dirY ) 
	{
		if ( this.currentNode != null ) 
		{
			return;
		}

		// Set looking direction
		this.setDirection( dirX, dirY );

		// Get destination
		var x = this.x + this.movingSpeed * this.dirX;
		var y = this.y + this.movingSpeed * this.dirY;

		/**
		 * Collision detection
		 */

		// Get destination tiles

		var rect = this.getRect( x, y ), check = [];

		// going left
		if ( this.dirX < 0 ) 
		{
			check.push( this.getTile( rect.left, rect.top ) );
			check.push( this.getTile( rect.left, rect.bottom ) );
		}

		// going right
		if ( this.dirX > 0 ) 
		{
			check.push( this.getTile( rect.right, rect.top ) );
			check.push( this.getTile( rect.right, rect.bottom ) );
		}

		// going up
		if ( this.dirY < 0 ) 
		{
			check.push( this.getTile( rect.left, rect.top ) );
			check.push( this.getTile( rect.right, rect.top ) );
		}

		// going down
		if ( this.dirY > 0 ) 
		{
			check.push( this.getTile( rect.left, rect.bottom ) );
			check.push( this.getTile( rect.right, rect.bottom ) );
		}

		// Get none walkable tiles

		var collisions = [];

		for ( var i in check )
		{
			var tile = check[ i ];
			var props = App.map.getTileAt( tile.x, tile.y );

			if ( props && props.collide ) 
			{
				collisions.push( tile );
			}
		}

		// reset destination

		if ( collisions.length ) 
		{
			var tile = collisions[0];

			// going left
			if ( this.dirX < 0 ) 
			{
				x = tile.x * App.map.tileSize + App.map.tileSize + 1;
			}

			// going right
			if ( this.dirX > 0 ) 
			{
				x = tile.x * App.map.tileSize - this.width - 1;
			}

			// going up
			if ( this.dirY < 0 ) 
			{
				y = tile.y * App.map.tileSize + App.map.tileSize + 1;
			}

			// going down
			if ( this.dirY > 0 ) 
			{
				y = tile.y * App.map.tileSize - this.height - 1;
			}
		}

		/**
		 * set destination
		 */

		this.setLocation( x, y );

		this.isMoving = true;

	};

	Character.prototype.stop = function() 
	{
		this.isMoving = false;
	};

    Character.prototype.walkPath = function()
    {
    	if ( this.currentNode == null ) 
		{
			this.isMoving = false;

			return;
		}

		var tileIndex = this.path[ this.currentNode ];
		var target = App.map.getTileLocation( tileIndex );

		// Set pixels
		var targetX = target.x * App.map.tileSize + ( ( App.map.tileSize - this.width ) / 2 );
		var targetY = target.y * App.map.tileSize + ( ( App.map.tileSize - this.height ) / 2 );

		// Get destination

		var dirX = ( targetX - this.x );
		var dirY = ( targetY - this.y );

		var distance = Util.getDistance( this.x, this.y, targetX, targetY );

		if ( distance ) 
		{
			dirX /= distance;
			dirY /= distance;
		}

		var x = this.x + dirX * this.movingSpeed;
		var y = this.y + dirY * this.movingSpeed;
		
		// Check if last tile
		if ( this.currentNode == this.path.length - 1 ) 
		{
			// Make sure character does not move past tile

			// going left
			if ( dirX < 0 && targetX > x ) 
			{
				x = targetX;
			}

			// going right
			if ( dirX > 0 && targetX < x ) 
			{
				x = targetX;
			}

			// going up
			if ( dirY < 0 && targetY > y ) 
			{
				y = targetY;
			}

			// going down
			if ( dirY > 0 && targetY < y ) 
			{
				y = targetY;
			}
		}

		/**
		 * Set looking direction
		 */

		var _x = Math.abs( targetX - x );
		var _y = Math.abs( targetY - y );

		if ( _x > _y ) 
		{
			// going left
			if ( this.x > x ) 
			{
				this.setDirection( -1, 0 );
			}

			// going right
			if ( this.x < x ) 
			{
				this.setDirection( 1, 0 );
			}
		}

		else
		{
			// going up
			if ( this.y > y ) 
			{
				this.setDirection( 0, -1 );
			}

			// going down
			if ( this.y < y ) 
			{
				this.setDirection( 0, 1 );
			}
		}

		// Set destination
		this.setLocation( x, y );

		this.isMoving = true;

		// 

		if ( distance <= 1 ) 
		{
			if ( this.currentNode < this.path.length - 1 ) 
            {
                this.currentNode += 1;
            }

            else
            {
            	this.currentNode = null;
            	this.path = [];

            	this.isMoving = false;

            	App.events.dispatchEvent( 'characterDestinationReached', [ this ] );
            }
        }
    }
    
	Character.prototype.draw = function() 
	{
		var context = App.map.canvas.getContext( '2d' );

		/**
		 * Pedestal
		 */

		context.save()
		context.beginPath();
		context.fillStyle = this.color;
		context.fillRect( this.x, this.y, this.width, this.height );
		context.closePath();

		/**
		 * Looking direction
		 */

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

	App.util      = Util;
	App.Character = Character;

	window.App = App;

})( window, document );

(function()
{
	var App = window.App || {};

	function Rectangle(left, top, width, height){
		this.left = left || 0;
		this.top = top || 0;
        this.width = width || 0;
		this.height = height || 0;
		this.right = this.left + this.width;
		this.bottom = this.top + this.height;
	}
	
	Rectangle.prototype.set = function(left, top, /*optional*/width, /*optional*/height){
		this.left = left;
        this.top = top;
        this.width = width || this.width;
        this.height = height || this.height
        this.right = (this.left + this.width);
        this.bottom = (this.top + this.height);
	}
	
	Rectangle.prototype.within = function(r) {
		return (r.left <= this.left && 
				r.right >= this.right &&
				r.top <= this.top && 
				r.bottom >= this.bottom);
	}		
	
	Rectangle.prototype.overlaps = function(r) {
		return (this.left < r.right && 
				r.left < this.right && 
				this.top < r.bottom &&
				r.top < this.bottom);
	}

	App.Rectangle = Rectangle;

})();