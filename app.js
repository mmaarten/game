
window.App = {};

(function()
{
	App.init = function()
	{
		Game.scenes.registerScene( App.Scene1 );

		Game.scenes.setCurrentScene( 'scene1' );

		Game.start();
	};

	document.addEventListener( 'Game.init', function()
	{
		App.init();
	});

})();

/**
 * Scene 1
 */
(function()
{
	function Scene()
	{
		Game.Scene.call( this, 'scene1' );

		this.map  = null;
		this.hero = null;
	};

	Scene.prototype = Object.create( Game.Scene.prototype );
	Scene.prototype.constructor = Scene;

	Scene.prototype.init = function() 
	{
		this.map = new Game.Map( 
		{
			width : 20,
			height : 15,
			tileSize : 32,
			tileData :
			[
				2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
				2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
				2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
				2, 1, 1, 1, 2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
				2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
				2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
				2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
				2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
				2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
				2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
				2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
				2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
				2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
				2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2,
				2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
			],
			tileProperties : 
			{
				1 : { collide : false },
				2 : { collide : true },
			},
		});

		this.hero = new Game.Character( 'hero', this.map );

		this.map.addCharacter( this.hero, 1, 1 );
	};

	Scene.prototype.update = function() 
	{
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
			// this.hero.stop();
		}

		this.map.render();
	};

	Scene.prototype.destroy = function() 
	{
		
	};

	App.Scene1 = Scene;

})();
