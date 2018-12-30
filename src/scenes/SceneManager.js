
class SceneManager
{
	constructor( game, scenes )
	{
		this.config = 
		{
			scenes : scenes,
		};

		this.game   = game;
		this.scenes = {};
		this.scene = null; // active scene

		this.game.events.on( 'init' , this.gameInit, this );
		this.game.events.on( 'ready', this.gameReady, this );
		this.game.events.on( 'update', this.gameUpdate, this );
		this.game.events.on( 'render', this.gameRender, this );
	}

	add( Scene )
	{
		var scene = new Scene();

		this.scenes[ scene.id ] = scene;

		return scene;
	}

	gameInit()
	{
		// add scenes
		for ( var i in this.config.scenes )
		{
			this.add( this.config.scenes[ i ] );
		}

		for ( var i in this.scenes )
		{
			var scene = this.scenes[ i ];

			if ( scene.isDefault ) 
			{
				this.scene = scene;
			}
		}
	}

	gameReady()
	{
		if ( ! this.scene ) 
		{
			return;
		}

		this.scene.init( this.game );

		this.scene.loader.on( 'complete', function()
		{
			this.scene.create();
		}, this );

		this.scene.preload();
		this.scene.loader.start();
	}

	gameUpdate()
	{
		if ( ! this.scene ) 
		{
			return;
		}

		this.scene.update( this.game.timeElapsed, this.game.timeDelta );
	}

	gameRender()
	{
		if ( ! this.scene ) 
		{
			return;
		}

		this.scene.render();
	}
}

module.exports = SceneManager;
