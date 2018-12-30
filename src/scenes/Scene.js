
var Loader    = require( './../loader/Loader.js' );
var Keyboard  = require( './../input/Keyboard.js' );

class Scene
{
	constructor( config )
	{
		var defaults = 
		{
			id      : '',
			default : false,
		};

		config = Object.assign( {}, defaults, config );

		this.id        = config.id;
		this.isDefault = config.default;
		this.game      = null;
		this.loader    = null;
		this.keyboard  = null;
	}

	init( game )
	{
		this.game     = game;
		this.loader   = new Loader();
		this.keyboard = new Keyboard();
	}

	preload()
	{
		
	}

	create()
	{
		
	}

	update()
	{
		
	}

	render()
	{
		
	}

	destroy()
	{
		
	}
}

module.exports = Scene;
