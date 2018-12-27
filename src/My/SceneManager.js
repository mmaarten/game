
class SceneManager
{
	constructor( game, scenes )
	{
		this.game   = game;
		this.scenes = {};
		this.scene  = null;

		for ( var i in this.scenes )
		{
			var scene = this.add( this.scenes[ i ] );
		}

		this.game.events.addEventListener( 'ready', this.init, this );
	}

	init()
	{
		
	}

	add( Scene )
	{
		var scene = new Scene();

		this.scenes[ scene.id ] = scene;
	
		return scene;
	}

	update( time, delta )
	{
		if ( this.scene ) 
		{
			this.scene.update( time, delta );
		}
	}
}

module.exports = SceneManager;
