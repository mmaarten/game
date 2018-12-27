
var EventManager = require( './EventManager' );
var SceneManager = require( './SceneManager' );

class Game
{
	static defaults()
	{
		return {
			width  : 800,
			height : 600,
			fps    : 24,
			parent : null,
		};
	}

	constructor( config )
	{
		var _this = this;

		config = Object.assign( {}, Game.defaults(), config );

		this.width  = config.width;
		this.height = config.height;
		this.fps    = config.fps;
		this.parent = config.parent || document.body;

		this.events = new EventManager();
		this.scenes = new SceneManager( this );

		this.canvas = document.createElement( 'canvas' );
		this.canvas.width = this.width;
		this.canvas.height = this.height;

		this.interval = setInterval( function()
		{
			_this.update();
		}, 1000 / this.fps );

		this.parent.appendChild( this.canvas );

		this.events.dispatchEvent( 'ready' );
	}

	update()
	{
		this.scenes.update();

		this.events.dispatchEvent( 'update' );

		this.events.dispatchEvent( 'render' );
	}
}

module.exports = Game;