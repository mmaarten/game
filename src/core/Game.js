
var EventManager     = require( './events/EventManager' );
var SceneManager     = require( './scenes/SceneManager' );
var DOMContentLoaded = require( './dom/DOMContentLoaded' );

class Game
{
	constructor( config )
	{
		var defaults = 
		{
			parent : 'body',
			width  : 800,
			height : 600,
			fps    : 30,
			backgroundColor : 'black',
			scenes : [],
			debug  : false,
		};

		config = Object.assign( {}, defaults, config );

		this.parent          = config.parent;
		this.width           = config.width;
		this.height          = config.height;
		this.fps             = config.fps;
		this.backgroundColor = config.backgroundColor;
		this.debug           = config.debug;

		this.events         = new EventManager();
		this.scenes         = new SceneManager( this, config.scenes );
		this.updateInterval = null;
		this.time           = null;
		this.timeElapsed    = 0;
		this.timeDelta      = 0;

		this.canvas = document.createElement( 'canvas' );
		this.canvas.width  = this.width;
		this.canvas.height = this.height;
		this.canvas.style[ 'background-color' ] = this.backgroundColor;

		this.events.trigger( 'init' );

		DOMContentLoaded( this.ready, this );
	}

	ready()
	{
		var _this = this;

		var parent = document.querySelector( this.parent );
		parent.appendChild( this.canvas );

		this.updateInterval = setInterval( function()
		{
			_this.update();

		}, 1000 / this.fps );

		this.events.trigger( 'ready' );
	}

	update()
	{
		var now = new Date().getTime();
		var prevTimeElapsed = this.timeElapsed;

		if ( this.time === null ) 
		{
			this.time = now;
		}

		this.timeElapsed = now - this.time;
		this.timeDelta   = this.timeElapsed - prevTimeElapsed;

		//

		var context = this.canvas.getContext( '2d' );

		context.clearRect( 0, 0, this.canvas.width, this.canvas.height );

		//

		this.events.trigger( 'update', [ this.timeElapsed, this.timeDelta ] );
		this.events.trigger( 'render' );
	}
}

module.exports = Game;
