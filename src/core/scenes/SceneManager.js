
class SceneManager
{
	constructor( game, scenes )
	{
		this.game       = game;
		this.loadScenes = scenes;
		this.scenes     = {};
		this.scene      = null;

		game.events.on( 'init'  , this.init, this );
		game.events.on( 'ready' , this.ready, this );
		game.events.on( 'update', this.update, this );
		game.events.on( 'render', this.render, this );
	}

	init()
	{
		for ( var i in this.loadScenes )
		{
			this.addScene( this.loadScenes[ i ] );
		}
	}

	addScene( Scene )
	{
		var scene = new Scene();

		this.scenes[ scene.id ] = scene;
	}

	setScene( id )
	{
		if ( this.scene ) 
		{
			this.scene.destroy();
		}

		this.scene = this.scenes[ id ];
		this.scene.game = this.game;
		this.scene.preload();
		this.scene.load.on( 'complete', this.scene.create, this.scene );
		this.scene.load.start();
	}

	ready()
	{
		// Get current scene

		var currentScene;

		for ( var i in this.scenes )
		{
			var scene = this.scenes[ i ];

			if ( scene.default ) 
			{
				currentScene = scene.id;
			}
		}

		if ( currentScene === undefined ) 
		{
			var ids = Object.keys( this.scenes );

			if ( ids.length )
			{
				currentScene = ids[ 0 ];
			}
		}

		// Set current scene

		if ( currentScene !== undefined ) 
		{
			this.setScene( currentScene );
		}
	}

	update( time, delta )
	{
		if ( this.scene ) 
		{
			this.scene.update( time, delta );
		}
	}

	render()
	{
		if ( this.scene ) 
		{
			this.scene.render();
		}
	}
}

module.exports = SceneManager;
