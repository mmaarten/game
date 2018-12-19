
window.App = {};

/**
 * Map Editor
 */
(function()
{
	var mapEditor = 
	{
		init : function( map )
		{
			this.map = map;

			// Right mouse click
			window.oncontextmenu = function()
			{
				mapEditor.download( 'map', JSON.stringify( mapEditor.map.tileData ) );

			    return false;
			}

			// Tile change on canvas click
			Game.canvas.addEventListener( 'click', this.handleMapClick );
		},

		download : function( filename, text )
		{
			var element = document.createElement( 'a' );

			element.setAttribute( 'href', 'data:text/plain;charset=utf-8,' + encodeURIComponent( text ) );
			element.setAttribute( 'download', filename );

			element.style.display = 'none';
			document.body.appendChild( element );

			element.click();

			document.body.removeChild( element );
		},

		handleMapClick : function( event )
		{
			var tile = mapEditor.map.getTileAt( event.layerX, event.layerY, true );
			
			var map = 
			{
				0 : 1,
				1 : 0,
			};

			mapEditor.map.setTile( tile.index, map[ tile.type ] );
		}
	}

	App.mapEditor = mapEditor;
})();

(function()
{
	App.scenes = {};

	App.init = function()
	{
		Game.init(
		{
			width  : 32 * 18,
			height : 32 * 13,
		});

		Game.events.addEventListener( 'gameStart' , this.gameStart );
		Game.events.addEventListener( 'gameUpdate', this.gameUpdate );
		Game.events.addEventListener( 'tileRender', this.tileRender );
		Game.events.addEventListener( 'characterRender', this.characterRender );

		for ( var id in this.scenes )
		{
			Game.scenes.addScene( id, this.scenes[ id ] );
		}

		Game.scenes.setCurrentScene( 'scene1' );

		Game.start();
	};

	App.addScene = function( id, options )
	{
		this.scenes[ id ] = options;
	}

	App.tileRender = function( tile, context )
	{
		// Render grid
		context.save();
		context.translate( tile.x, tile.y );
		context.strokeStyle = 'rgba( 0, 0, 0, .1 )';
		context.strokeRect( 0, 0, tile.width, tile.height );
		context.restore();

		// Render tile index
		context.save();
		context.translate( tile.x, tile.y );
		context.textAlign = 'center';
		context.font      = '8px monospace';
		context.fillStyle = 'rgba( 0, 0, 0, .5 )';
		context.fillText( tile.index, tile.width/2, tile.height/2 + 3 );
		context.restore();
	}

	App.characterRender = function( character, context )
	{
		var scene = Game.scenes.currentScene;

		// Render id
		context.save();
		context.translate( character.x, character.y );
		context.textAlign = 'center';
		context.font      = '8px monospace';
		context.fillStyle = 'magenta';
		context.fillText( character.id, character.width/2, -5 );
		context.restore();

		// Render tiles standing on

		if ( scene ) 
		{
			var tiles = scene.map.getTiles( character.x, character.y, character.width, character.height );

			for ( var i in tiles )
			{
				var index = tiles[ i ];
				var tile = scene.map.getTile( index );

				if ( ! tile ) 
				{
					continue;
				}

				context.save();
				context.translate( tile.x, tile.y );
				context.fillStyle = 'rgba( 255, 0,0,.25 )';
				context.fillRect( 0, 0, tile.width, tile.height );
				context.restore();
			}
		}
	}

	App.gameStart = function()
	{
		
	}

	App.gameUpdate = function()
	{
		//console.log( 'gameUpdate' );
	}

	window.onload = function()
	{
		App.init();
	}

})();

/**
 * Scene 1
 */
(function()
{
	var scene = {};

	scene.init = function()
	{
		console.log( 'init scene', this.id );

		var _this = this;

		// Character destination
		Game.events.addEventListener( 'characterDestination', function( character, destination )
		{
			_this.characterCollisionDetection( character, destination );
		});

		// Character added
		Game.events.addEventListener( 'characterAdded', function( character )
		{
			// Set path

			if ( character !== _this.player ) 
			{
				_this.setCharacterPath( character );
			}
		});

		// Character destination reached
		Game.events.addEventListener( 'characterDestinationReached', function( character )
		{
			// Set new path

			if ( character !== _this.player ) 
			{
				setTimeout( function()
				{
					_this.setCharacterPath( character );

				}, Game.util.getRandomInteger( 2000, 10000 ) )
			}
		});

		// Character location change
		Game.events.addEventListener( 'characterLocationChange', function( character, origin )
		{
			// Notify Tile change

			var prev    = _this.map.getTiles( origin.x, origin.y, character.width, character.height );
			var current = _this.map.getTiles( character.x, character.y, character.width, character.height );

			if ( current.join( '|' ) != prev.join( '|' ) ) 
			{
				Game.events.dispatchEvent( 'characterTileChange', character );
			}
		});

		this.player = new Game.Character( 'player', 1 );

		this.map = new Game.Map(
		{
			width : 18,
			height : 13,
			tileSize : 32,
			tileData : 
			[
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
				1,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,1,
				1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,1,
				1,0,0,1,0,0,0,1,0,1,1,1,0,1,0,1,0,1,
				1,0,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,1,
				1,0,0,0,0,0,0,1,1,1,0,1,0,0,0,0,1,1,
				1,0,0,0,0,0,0,0,1,1,0,0,0,1,0,0,0,1,
				1,0,0,0,0,0,0,0,0,1,0,1,1,1,1,0,1,1,
				1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,
				1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,
				1,1,0,1,0,0,0,0,0,0,0,1,0,1,1,1,1,1,
				1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,
				1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
			],
			tileProperties : 
			{
				0 : { collide : false, },
				1 : { collide : true, },
				2 : { collide : false, cost: 99, }
			},
		});

		App.mapEditor.init( this.map );

		/**
		 * Add characters
		 */

		this.map.addCharacter( this.player, 1, 1 );

		var amount = 1;

		for ( var i = 0; i < amount; i++ ) 
		{
			var character = new Game.Character( 'ui' + ( i + 1 ), 2 );
			var tileIndex = this.getRandomLocation();
			var location  = this.map.getTileLocation( tileIndex );
			
			this.map.addCharacter( character, location.x, location.y );
		}

		// Let player look at cursor.
		Game.canvas.addEventListener( 'mousemove', function( event )
		{
			_this.player.lookAt( event.layerX, event.layerY );
		});
	};

	scene.setCharacterPath = function( character )
	{
		var a = this.map.getTileIndex( character.x, character.y, true );
		var b = this.getRandomLocation();

		if ( b === undefined ) 
		{
			return;
		}

		var path = this.map.getPath( a, b, true );

		character.setPath( path );
	}

	scene.getRandomLocation = function()
	{
		var maxLoops = 100;
		var location;

		var loopCount = 0;

		while ( location === undefined && maxLoops > loopCount )
		{
			var index = Game.util.getRandomInteger( 0, this.map.width * this.map.height );
			var tile = this.map.getTile( index );

			if ( tile !== undefined && ! tile.collide ) 
			{
				location = index;
			}

			loopCount++;
		}

		return location;
	}

	scene.characterCollisionDetection = function( character, destination )
	{
		var rect = new Game.Rectangle( destination.x, destination.y, character.width, character.height );
		var check = [];

		if ( character.dirX < 0 ) 
		{
			check.push( this.map.getTileAt( rect.left, rect.top, true ) );
			check.push( this.map.getTileAt( rect.left, rect.bottom, true ) );
		}

		if ( character.dirX > 0 ) 
		{
			check.push( this.map.getTileAt( rect.right, rect.top, true ) );
			check.push( this.map.getTileAt( rect.right, rect.bottom, true ) );
		}

		if ( character.dirY < 0 ) 
		{
			check.push( this.map.getTileAt( rect.left, rect.top, true ) );
			check.push( this.map.getTileAt( rect.right, rect.top, true ) );
		}

		if ( character.dirY > 0 ) 
		{
			check.push( this.map.getTileAt( rect.left, rect.bottom, true ) );
			check.push( this.map.getTileAt( rect.right, rect.bottom, true ) );
		}

		var collisions = [];
		
		for ( var i in check )
		{
			var tile = check[ i ];
			var rect = new Game.Rectangle( tile.x, tile.y, tile.width, tile.height );

			if ( tile.collide ) 
			{
				collisions.push( rect );
			}
		}

		if ( ! collisions.length ) 
		{
			return;
		}

		var tile = collisions[0];

		if ( character.dirX < 0 ) 
		{
			destination.x = tile.right + 1;
		}

		if ( character.dirX > 0 ) 
		{
			destination.x = tile.left - character.width - 1;
		}

		if ( character.dirY < 0 ) 
		{
			destination.y = tile.bottom + 1;
		}

		if ( character.dirY > 0 ) 
		{
			destination.y = tile.top - character.height - 1;
		}
	}

	scene.update = function()
	{
		// up
		if ( Game.keys.up == Game.keyPressed ) 
		{
			this.player.move( 0, -1 );
		}

		// right
		else if ( Game.keys.right == Game.keyPressed ) 
		{
			this.player.move( 1, 0 );
		}

		// down
		else if ( Game.keys.down == Game.keyPressed ) 
		{
			this.player.move( 0, 1 );
		}

		// left
		else if ( Game.keys.left == Game.keyPressed ) 
		{
			this.player.move( -1, 0 );
		}

		else
		{
			//this.player.stop();
		}

		this.map.update();
	};

	scene.destroy = function()
	{
		console.log( 'destroy', this.id );
	};

	App.addScene( 'scene1', scene );

})();
