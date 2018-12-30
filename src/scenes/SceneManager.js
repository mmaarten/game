
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
		this.defaultScene = null;

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

	setScene( id )
	{
		// Destroy current

		if ( this.scene ) 
		{
			this.scene.destroy();
		}

		// Init requested

		this.scene = this.scenes[ id ];

		this.scene.init( this.game );

		this.scene.loader.on( 'complete', function()
		{
			this.scene.create();
		}, this );

		this.scene.preload();
		this.scene.loader.start();
	}

	gameInit()
	{
		// Add scenes
		for ( var i in this.config.scenes )
		{
			this.add( this.config.scenes[ i ] );
		}

		// Get default scene
		for ( var i in this.scenes )
		{
			var scene = this.scenes[ i ];

			if ( scene.isDefault ) 
			{
				this.defaultScene = scene.id;
			}
		}
	}

	gameReady()
	{
		if ( this.defaultScene ) 
		{
			this.setScene( this.defaultScene );
		}
	}

	gameUpdate( time, delta )
	{
		if ( this.scene ) 
		{
			this.scene.update( time, delta );
		}
	}

	gameRender()
	{
		if ( this.scene ) 
		{
			this.scene.render();
		}
	}
}

module.exports = SceneManager;
