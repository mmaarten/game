
window.App = {};

(function()
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

	App.init = function()
	{
		this.hero = null;
		this.map  = null;

		Game.init(
		{
			canvasWidth  : 32 * 18,
			canvasHeight : 32 * 15,
			fps          : 24,
		});

		Game.events.addEventListener( 'gameStart' , this.gameStart );
		Game.events.addEventListener( 'gameUpdate', this.gameUpdate );
		
		//Game.events.addEventListener( 'tileRender', this.renderGrid );
		Game.events.addEventListener( 'tileRender', this.renderFlowField );
		//Game.events.addEventListener( 'tileRender', this.renderTileIndex );

		Game.events.addEventListener( 'characterDestination', function( character, destination )
		{
			var rect = new Game.Rectangle( destination.x - character.width / 2, destination.y - character.height / 2, character.width, character.height );

			if ( character.dirX < 0 ) 
			{
				var t1 = App.map.getTileAt( rect.left, rect.top, true );
				var t2 = App.map.getTileAt( rect.left, rect.bottom, true );

				if ( t1 && t1.collide || t2 && t2.collide ) 
				{
					var t = t1 && t1.collide ? t1 : t2;
					var r = new Game.Rectangle( t.x, t.y, t.width, t.height );

					destination.x = r.right + character.width/2 + 1;
				}
			}

			if ( character.dirX > 0 ) 
			{
				var t1 = App.map.getTileAt( rect.right, rect.top, true );
				var t2 = App.map.getTileAt( rect.right, rect.bottom, true );

				if ( t1 && t1.collide || t2 && t2.collide ) 
				{
					var t = t1 && t1.collide ? t1 : t2;
					var r = new Game.Rectangle( t.x, t.y, t.width, t.height );

					destination.x = r.left - character.width/2 - 1;
				}
			}

			if ( character.dirY < 0 ) 
			{
				var t1 = App.map.getTileAt( rect.left, rect.top, true );
				var t2 = App.map.getTileAt( rect.right, rect.top, true );

				if ( t1 && t1.collide || t2 && t2.collide ) 
				{
					var t = t1 && t1.collide ? t1 : t2;
					var r = new Game.Rectangle( t.x, t.y, t.width, t.height );

					destination.y = r.bottom + character.height/2 + 1;
				}
			}

			if ( character.dirY > 0 ) 
			{
				var t1 = App.map.getTileAt( rect.left, rect.bottom, true );
				var t2 = App.map.getTileAt( rect.right, rect.bottom, true );

				if ( t1 && t1.collide || t2 && t2.collide ) 
				{
					var t = t1 && t1.collide ? t1 : t2;
					var r = new Game.Rectangle( t.x, t.y, t.width, t.height );

					destination.y = r.top - character.height/2 - 1;
				}
			}
		});

		Game.events.addEventListener( 'tileChange', function( tile )
		{
			// Update character path
			for ( var i in App.map.characters )
			{
				var character = App.map.characters[ i ];

				if ( character.pathIndex == -1 ) 
				{

				}
			}
		});

		Game.canvas.addEventListener( 'click', function( event )
		{
			var tile = App.map.getTileAt( event.layerX, event.layerY, true );

			if ( tile.type == 2 ) 
			{
				App.map.setTile( tile.index, 1 );
			}

			else
			{
				App.map.setTile( tile.index, 2 );
			}
		});

		/*
		Game.canvas.addEventListener( 'mousemove', function( event )
		{
			var cursor = { x : event.layerX, y: event.layerY };

			var distance = Game.util.getDistance( App.hero.x, App.hero.y, cursor.x, cursor.y );
			var dirX = ( cursor.x - App.hero.x ) / distance;
			var dirY = ( cursor.y - App.hero.y ) / distance;

			App.hero.setDirection( dirX, dirY );
		});
		*/

		window.oncontextmenu = function()
		{
			download( 'map', JSON.stringify( App.map.tileData ) );

			return false;
		};

		Game.events.addEventListener( 'characterAdded', function( character )
		{
			if ( character != App.hero ) 
			{
				App.setCharacterPath( character );
			}
		});

		Game.events.addEventListener( 'characterDestinationReached', function( character )
		{
			if ( character != App.hero ) 
			{
				var delay = Game.util.getRandomInteger( 2000, 10000 );

				setTimeout( function()
				{
					App.setCharacterPath( character );
				}, delay );
			}
			
		});

		Game.start();
	};

	App.setCharacterPath = function( character )
	{
		var a = App.map.getTileIndex( character.x, character.y, true );

		var path, loops = 500;

		while ( ( path === undefined || ( path && ! path.length ) ) && loops )
		{
			var b = Game.util.getRandomInteger( 0, App.map.width * App.map.height );

			var tile = App.map.getTile( b );

			if ( tile && ! tile.collide ) 
			{
				path = App.map.getPath( a, b, true );
			}

			loops--;
		}

		if ( path && path.length ) 
		{
			character.setPath( path );

			return true;
		}

		return false;
	};

	App.gameStart = function()
	{
		// Create map
		App.map = new Game.Map( 
		{
			width    : 18,
			height   : 15,
			tileSize : 32,
			tileData : 
			[
				2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
				2,1,1,2,1,1,1,1,1,1,1,1,1,2,2,2,1,2,
				2,1,1,2,1,1,1,1,2,1,2,2,1,1,1,1,1,2,
				2,1,1,1,1,2,1,1,2,1,1,2,1,1,2,1,1,2,
				2,1,1,2,1,2,1,1,2,1,1,2,1,1,1,2,1,2,
				2,1,1,2,1,1,1,1,2,2,2,1,1,1,1,2,1,2,
				2,1,1,1,1,1,2,1,1,1,1,1,1,1,2,2,1,2,
				2,1,1,1,2,1,2,1,1,1,1,1,1,1,1,1,1,2,
				2,1,1,2,2,1,1,2,1,1,2,2,1,1,1,1,1,2,
				2,1,1,1,1,1,1,1,2,1,1,1,1,2,2,1,1,2,
				2,1,1,2,2,1,1,1,1,1,1,2,1,2,1,2,1,2,
				2,2,1,1,1,1,1,1,1,2,1,2,1,1,1,1,1,2,
				2,2,1,1,2,1,1,1,2,2,1,1,1,1,2,1,1,2,
				2,2,1,1,2,1,1,1,2,2,1,1,1,1,2,1,1,2,
				2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
			],
			tileProperties : 
			{
				1 : { collide : false, },
				2 : { collide : true, },
			},
		});

		// Add characters

		App.hero = new Game.Character( 'hero' );
		App.hero.width = 10;
		App.hero.height = 10;
		App.hero.movingSpeed = 2;
		App.map.addCharacter( App.hero, 2, 2 );

		var amount = 20;

		for (var i = 0; i < amount; i++ ) 
		{
			var character = new Game.Character( 'ai' + ( i + 1 ) );
			character.width = 10;
			character.height = 10;
			character.movingSpeed = 1;

			App.map.addCharacter( character, 2, 2 );
		}
	};

	App.gameUpdate = function()
	{
		// up
		if ( Game.keys.up == Game.keyPressed ) 
		{
			App.hero.move( 0, -1 );
		}

		// right
		else if ( Game.keys.right == Game.keyPressed ) 
		{
			App.hero.move( 1, 0 );
		}

		// down
		else if ( Game.keys.down == Game.keyPressed ) 
		{
			App.hero.move( 0, 1 );
		}

		// left
		else if ( Game.keys.left == Game.keyPressed ) 
		{
			App.hero.move( -1, 0 );
		}

		else
		{
			//App.hero.stop();
		}

		App.hero.update();

		for ( var i in App.map.characters )
		{
			App.map.characters[ i ].update();
		}

		// render map
		App.map.render();
	};

	App.renderGrid = function( tile, context )
	{
		context.save();
		context.translate( tile.x, tile.y );
		context.strokeStyle = 'rgba( 0, 0, 0, .25 )';
		context.strokeRect( 0, 0, tile.width, tile.height );
		context.restore();
	}

	App.renderFlowField = function( tile, context )
	{
		if ( tile.collide ) 
		{
			return;
		}

		var color = 'purple';

		context.save();
		context.translate( tile.x + tile.width / 2, tile.y + tile.height / 2 );
		context.beginPath();
		context.arc( 0, 0, 1, 0, 2 * Math.PI );
		context.closePath();
		context.fillStyle = color;
		context.fill();

		var loc       = App.map.getTileLocation( tile.index );
		var neighbors = App.map.getTileNeighbors( tile.index, true );

		for ( var y = loc.y - 1; y <= loc.y + 1; y++ )
		{
			for ( var x = loc.x - 1; x <= loc.x + 1; x++ )
			{
				var index = App.map.getTileIndex( x, y );
				
				if ( index == tile.index || neighbors.indexOf( index ) == -1 ) 
				{
					continue;
				}

				context.beginPath();
				context.moveTo( 0 , 0 );
				context.lineTo( ( x - loc.x ) * ( tile.width / 2 ), ( y - loc.y ) * ( tile.height / 2 ) );
				context.lineWidth = 0.5;
				context.strokeStyle = color;
				context.stroke();
				context.closePath();
			}
		}

		context.restore();
	}

	App.renderTileIndex = function( tile, context )
	{
		context.save();
		context.translate( tile.x, tile.y );
		context.font = '9px monospace';
		context.fillStyle = 'rgba( 0, 0, 0, .25 )';
		context.fillText( tile.index, 2, 9 );
		context.restore();
	}

	window.onload = function()
	{
		// init app
		App.init();
	};

})();