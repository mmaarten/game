
window.App = {};

(function()
{
	App.scenes = {};

	App.init = function()
	{
		for ( var id in App.scenes )
		{
			Game.scenes.addScene( id, App.scenes[ id ] );
		}

		Game.scenes.setCurrentScene( 'scene1' );
		Game.start();
	};

	document.addEventListener( 'gameInit', function()
	{
		App.init();
	});

})();

/**
 * Scene 1
 */
(function()
{
	App.scenes.scene1 = 
	{
		init : function()
		{
			this.map = new Game.Map( 
			{
				width    : 18,
				height   : 15,
				tileSize : 32,
				tileData : 
				[
					2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
					2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
					2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
					2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
					2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2,
					2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
					2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
					2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
					2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
					2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
					2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
					2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
					2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
					2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
					2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
				],
				tileProperties : 
				{
					1 : { collide : false, },
					2 : { collide : true, },
				},
			});

			this.hero = new Game.Character( this.map );
			this.map.addCharacter( this.hero, 1, 1 );
		},

		update : function()
		{
			// Move player

			if ( Game.keys.left == Game.keyPressed ) 
			{
				this.hero.move( -1, 0 );
			}

			else if ( Game.keys.right == Game.keyPressed ) 
			{
				this.hero.move( 1, 0 );
			}

			else if ( Game.keys.up == Game.keyPressed ) 
			{
				this.hero.move( 0, -1 );
			}

			else if ( Game.keys.down == Game.keyPressed ) 
			{
				this.hero.move( 0, 1 );
			}

			else
			{
				this.hero.stop();
			}

			// Render map
			this.map.render();
		},

		destroy : function()
		{
			
		},
	};

})();


