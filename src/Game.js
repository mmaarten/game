
var EventManager     = require( './events/EventManager' );
var SceneManager     = require( './scenes/SceneManager' );
var DOMContentLoaded = require( './dom/DOMContentLoaded' );
var Keyboard         = require( './input/Keyboard' );

class Game
{
	constructor( config )
	{
		var _this = this;

		var defaults = 
		{
			parent : 'body',
			width  : 800,
			height : 600,
			backgroundColor : 'black',
			fps    : 30,
			scenes : [],
			debug  : false,
		};

		config = Object.assign( {}, defaults, config );

		this.parent          = config.parent;
		this.width           = config.width;
		this.height          = config.height;
		this.backgroundColor = config.backgroundColor;
		this.fps             = config.fps;
		this.debug           = config.debug;

		this.time        = new Date().getTime();
		this.timeElapsed = 0;
		this.timeDelta   = 0;

		this.events = new EventManager();
		this.scenes = new SceneManager( this, config.scenes );

		this.canvas = document.createElement( 'canvas' );
		this.canvas.width  = this.width;
		this.canvas.height = this.height;
		this.canvas.style['background-color'] = this.backgroundColor;

		this.updateInterval = setInterval( function()
		{
			_this.update();

		}, 1000 / this.fps );

		this.events.trigger( 'init' );

		// Check if DOM is ready
		DOMContentLoaded( this.ready, this );
	}

	ready()
	{
		var parent = document.querySelector( this.parent );
		
		parent.appendChild( this.canvas );

		this.events.trigger( 'ready' );
	}

	update()
	{
		// Time
		var prevUpdate = this.timeElapsed;

		this.timeElapsed = new Date().getTime() - this.time;
		this.timeDelta   = this.timeElapsed - prevUpdate;

		// Clear canvas
		var context = this.canvas.getContext( '2d' );
		context.clearRect( 0, 0, this.canvas.width, this.canvas.height );

		// Notify
		this.events.trigger( 'update', [ this.timeElapsed, this.timeDelta ] );
		this.events.trigger( 'render' );
	}
}

module.exports = Game;
