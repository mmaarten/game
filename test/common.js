/**
 * Game
 */
(function( window, document, undefined )
{
	var App = window.App || {};

	var segments = [];

	var characterController = 
	{
		wallSegments : [],

		init : function()
		{
			App.events.addEventListener( 'sceneInit'                  , this.addCharacters );
			App.events.addEventListener( 'sceneInit'                  , this.FOVInit );
			App.events.addEventListener( 'characterAdded'             , this.handleCharacterAdded );
			App.events.addEventListener( 'characterDestinationReached', this.handleCharacterDestinationReached );
			App.events.addEventListener( 'characterTileChange'        , this.handleCharacterTileChange );
			App.events.addEventListener( 'tileChange'                 , this.handleTileChange );
			App.events.addEventListener( 'characterLocationChange'    , this.setCharacterFOV );
			App.events.addEventListener( 'update'                     , this.updateCharactersCanSee );

			App.events.addEventListener( 'characterInFOV', function( otherCharacter, character )
			{
				console.log( 'characterInFOV', otherCharacter, character );
			});

			App.events.addEventListener( 'characterOutFOV', function( otherCharacter, character )
			{
				console.log( 'characterOutFOV', otherCharacter, character );
			});
		},

		/**
		 * Stores a list per character which characters he can see
		 */
		updateCharactersCanSee : function()
		{
			var characters = App.map.characters;

			for ( var i in characters )
			{
				var character = characters[ i ];

				var characterPosition = [ character.x + character.width / 2, character.y + character.height / 2 ];

				for ( var n in characters )
				{
					var otherCharacter = characters[ n ];

					// Skip when same character
					if ( otherCharacter == character || ! otherCharacter.fov.length ) 
					{
						continue;
					}

					var inFOV = VisibilityPolygon.inPolygon( characterPosition, otherCharacter.fov );
					var pos   = character.charactersInFOV.indexOf( otherCharacter );

					if ( inFOV && pos == -1 ) 
					{
						character.charactersInFOV.push( otherCharacter );

						App.events.dispatchEvent( 'characterInFOV', [ otherCharacter, character ] );
					}

					if ( ! inFOV && pos != -1  ) 
					{
						character.charactersInFOV.splice( pos, 1 );

						App.events.dispatchEvent( 'characterOutFOV', [ otherCharacter, character ] );
					}
				}
			}
		},

		/**
		 * Stores 'wall' tiles to generate FOV
		 */
		FOVInit : function()
		{
			var polygons = [];

			for ( var y = 0; y < App.map.height; y++ )
			{
				for ( var x = 0; x < App.map.width; x++ )
				{
					var tile     = App.map.getTileAt( x, y );
					var index    = App.map.getTileIndex( x, y );
					var location = App.map.getTileLocation( index );

					if ( ! tile.collide ) 
					{
						continue;
					}

					var polygon = 
					[
						[ location.x * App.map.tileSize, location.y * App.map.tileSize ],
						[ location.x * App.map.tileSize + App.map.tileSize, location.y * App.map.tileSize ],
						[ location.x * App.map.tileSize + App.map.tileSize, location.y * App.map.tileSize + App.map.tileSize ],
						[ location.x * App.map.tileSize, location.y * App.map.tileSize + App.map.tileSize ],
					];

					polygons.push( polygon );
				}
			}

			characterController.wallSegments = VisibilityPolygon.convertToSegments( polygons );
			characterController.wallSegments = VisibilityPolygon.breakIntersections( characterController.wallSegments );
		},

		addCharacters : function()
		{
			var amount = 20;
			var field = App.map.getField( 1, 1 );

			for ( var i = 0; i < amount; i++ ) 
			{
				var placed = false;

				while ( ! placed )
				{
					var index = App.util.getRandomInteger( 0, App.map.width * App.map.height - 1 );

					if ( index != -1 && field[ index ] !== undefined ) 
					{
						var loc = App.map.getTileLocation( index );

						var character = new App.Character();
						character.setTile( loc.x, loc.y );
						character.movingSpeed = 2;

						App.map.addCharacter( character );

						placed = true;
					}
				}
			}
		},

		/**
		 * Sets character's field of view
		 */
		setCharacterFOV : function( character )
		{
			// library has 360 view
			// Set viewport to limit view.

			var rect = character.getRect();

			var front = 1000;
			var side  = 200;

			var viewportMinCorner = [ character.x, character.y ];
			var viewportMaxCorner = [ character.x, character.y ];

			// Looking left
			if ( character.dirX < 0 ) 
			{
				viewportMinCorner = [ character.x - front, character.y - side ];
				viewportMaxCorner = [ character.x + character.width, character.y + side ];
			}

			// Looking right
			if ( character.dirX > 0 ) 
			{
				viewportMinCorner = [ character.x, character.y - side ];
				viewportMaxCorner = [ character.x + front, character.y + side ];
			}

			// Looking up
			if ( character.dirY < 0 ) 
			{
				viewportMinCorner = [ character.x - side, character.y - front ];
				viewportMaxCorner = [ character.x + side, character.y + character.height ];
			}

			// Looking down
			if ( character.dirY > 0 ) 
			{
				viewportMinCorner = [ character.x - side, character.y ];
				viewportMaxCorner = [ character.x + side, character.y + front ];
			}

			character.fov = VisibilityPolygon.computeViewport( 
				[ character.x + ( character.width / 2 ), 
				character.y + ( character.height / 2 ) ], 
				characterController.wallSegments, 
				viewportMinCorner, 
				viewportMaxCorner );
		},

		handleCharacterTileChange : function( character, tiles )
		{
			//console.log( 'handleCharacterTileChange', character, tiles );

			/*
			console.log( _this.following)

			if ( ! _this.following || character != _this.following ) 
			{
				return;
			}

			var tile = character.getTile();

			var destination = App.map.getTileIndex( tile.x, tile.y );

			_this.setDestination( destination );
			*/
		},

		handleCharacterAdded : function( character )
		{
			//console.log( 'handleCharacterAdded', character );

			character.fov = [];

			if ( character != App.player )
			{
				// Set location
				characterController.setCharacterLocation( character );
			}
			
		},

		handleCharacterDestinationReached : function( character )
		{
			//console.log( 'handleCharacterDestinationReached', character );

			if ( character == App.player ) 
			{
				return;
			}

			// Set new destination
			var timout = App.util.getRandomInteger( 2000, 10000 );

			setTimeout( function()
			{
				characterController.setCharacterLocation( character );
			}, timout );
		},

		handleTileChange : function( tile )
		{
			/*
			// Check if tile is in path

			var pathIndex = _this.path.indexOf( tile );

			if ( pathIndex == -1 || _this.currentNode == pathIndex ) 
			{
				return;
			}

			// Reset path
			if ( _this.path.length ) 
			{
				var destination = _this.path[ _this.path.length - 1 ];

				// TODO : dont trigger destination change
				_this.setDestination( destination );
			}
			*/
		},

		setCharacterLocation( character )
		{
			var i = 0, isSet = false;

			while ( ! isSet && i < 100 )
			{
				index = App.util.getRandomInteger( 0, App.map.width * App.map.height - 1 );
				
				isSet = character.setDestination( index );

				i++;
			}

			return isSet;
		},
	};

	document.addEventListener( 'App.init', function()
	{
		characterController.init();
	});

})( window, document );

/**
 * Map Editor
 */
(function( window, document, undefined )
{
	function download( filename, text ) 
	{
		var element = document.createElement('a');
		element.setAttribute( 'href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		element.setAttribute( 'download', filename );

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	}

	var App = window.App || {};

	function init()
	{
		App.events.addEventListener( 'sceneInit', sceneInit );
	}

	function sceneInit()
	{
		// Change tile on mouse click
		App.map.canvas.addEventListener( 'mouseup', function( event )
		{
			var x = Math.floor( event.layerX / App.map.tileSize );
			var y = Math.floor( event.layerY / App.map.tileSize );

			var type = App.map.getTileTypeAt( x, y );

			var nextType = type;

			if ( nextType < Object.keys( App.map.tileProperties ).length - 1 ) 
			{
				nextType++;
			}

			else
			{
				nextType = 0;
			}

			App.map.setTileAt( nextType, x, y );
		});

		// Download map on right mouse click
		window.oncontextmenu = function()
		{
			download( 'map', JSON.stringify( App.map.tileData ) );

		    return false;
		}
	}

	//document.addEventListener( 'App.init', init );

})( window, document );
/**
 * Draw guides
 */
(function( window, document, undefined )
{
	var App = window.App || {};

	function init()
	{
		App.events.addEventListener( 'draw', drawGrid );
		//App.events.addEventListener( 'draw', drawCharacterDestination );
		//App.events.addEventListener( 'draw', drawCharacterTiles );
		App.events.addEventListener( 'draw', drawCharacterPath );
		App.events.addEventListener( 'draw', drawCharacterFOV );
	}

	function drawGrid()
	{
		var context = App.map.canvas.getContext( '2d' );

		// Grid

		var color = 'rgba(0, 0, 0, .10)';

		for ( var y = 0; y < App.map.height; y++ )
		{	
			context.save();
			context.beginPath();
			context.moveTo( 0, y * App.map.tileSize );
			context.lineTo( App.map.canvas.width * App.map.tileSize, y * App.map.tileSize );
			context.strokeStyle = color;
			context.stroke();
			context.closePath();
			context.restore();

			for ( var x = 0; x < App.map.width; x++ )
			{
				if ( y == 0 ) 
				{
					context.save();
					context.beginPath();
					context.moveTo( x * App.map.tileSize, 0 );
					context.lineTo( x * App.map.tileSize, App.map.canvas.height * App.map.tileSize );
					context.strokeStyle = color;
					context.stroke();
					context.closePath();
					context.restore();
				}
				
			}
		}
	}

	function drawCharacterDestination()
	{
		var context = App.map.canvas.getContext( '2d' );

		var color = 'purple';

		for ( var i in App.map.characters )
		{
			var character = App.map.characters[ i ];

			if ( ! character.path.length ) 
			{
				continue;
			}

			var destination = character.path[ character.path.length - 1 ];

			var location = App.map.getTileLocation( destination );

			// draw line from character to its destination
			context.save();
			context.beginPath();
			context.moveTo( character.x + character.width / 2, character.y + character.height / 2 );
			context.lineTo( location.x * App.map.tileSize + App.map.tileSize / 2, location.y * App.map.tileSize + App.map.tileSize / 2 );
			context.strokeStyle = color;
			context.stroke();
			context.closePath();
			context.restore();

			// mark destination
			context.save();
			context.beginPath();
			context.arc( location.x * App.map.tileSize + App.map.tileSize / 2, location.y * App.map.tileSize + App.map.tileSize / 2, 3, 0, 2 * Math.PI );
			context.fillStyle = color;
			context.fill();
			context.closePath();
			context.restore();
		}
	}

	function drawCharacterTiles()
	{
		var context = App.map.canvas.getContext( '2d' );

		for ( var i in App.map.characters )
		{
			var character = App.map.characters[ i ];

			var tiles = character.getTiles();

			for ( var i in tiles )
			{
				var tile     = tiles[ i ];
				var location = App.map.getTileLocation( tile );

				context.save();
				context.beginPath();
				context.fillStyle = 'rgba( 255, 0, 0, .25 )';
				context.fillRect( location.x * App.map.tileSize, location.y * App.map.tileSize, App.map.tileSize, App.map.tileSize );
				context.closePath();
				context.restore();
			}
		}
	}

	function drawCharacterPath()
	{
		var color = 'rgba( 0, 0, 0, .25)';

		var context = App.map.canvas.getContext( '2d' );

		for ( var i in App.map.characters )
		{
			var character = App.map.characters[ i ];

			if ( App.player == character ) 
			{
				continue;
			}

			for ( var n = 0; n < character.path.length; n++ )
			{
				var current = App.map.getTileLocation( character.path[ n ] );

				// Mark start and end point
				if ( n == 0 || n == character.path.length - 1 ) 
				{
					context.save();
					context.beginPath();
					context.arc( current.x * App.map.tileSize + App.map.tileSize / 2, current.y * App.map.tileSize + App.map.tileSize / 2, 3, 0, 2 * Math.PI );
					context.fillStyle = color;
					context.fill();
					context.closePath();
					context.restore();
				}
				
				if ( n < character.path.length - 1 )
				{
					var next = App.map.getTileLocation( character.path[ n + 1 ] );

					context.save();
					context.beginPath();
					context.moveTo( current.x * App.map.tileSize + App.map.tileSize / 2, current.y * App.map.tileSize + App.map.tileSize / 2 );
					context.lineTo( next.x * App.map.tileSize + App.map.tileSize / 2, next.y * App.map.tileSize + App.map.tileSize / 2 );
					context.strokeStyle = color;
					context.stroke();
					context.closePath();
					context.restore();
				}
			}
		}
	}

	function drawCharacterFOV()
	{
		var color = 'rgba( 255, 0, 0, .1)';

		var context = App.map.canvas.getContext( '2d' );

		for ( var i in App.map.characters )
		{
			var character = App.map.characters[ i ];
			
			context.save();
			context.beginPath();

			for ( var i = 0; i < character.fov.length; i++ )
			{
				var loc = character.fov[ i ];

				if ( i == 0 ) 
				{
					context.moveTo( loc[0], loc[1] );
				}

				else
				{
					context.lineTo( loc[0], loc[1] );
				}
			}

			context.fillStyle = color;
		    context.fill();
		    context.closePath();
		    context.restore();
		}
	}

	document.addEventListener( 'App.init', init );

})( window, document );
