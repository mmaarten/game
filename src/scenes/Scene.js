
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
		this.sprites   = [];
	}

	init( game )
	{
		this.game     = game;
		this.loader   = new Loader();
		this.keyboard = new Keyboard();
	}

	addSprite( sprite )
	{
		this.sprites.push( sprite );
	}

	preload()
	{
		
	}

	create()
	{
		
	}

	update( time, delta )
	{
		// Sprites
		for ( var i in this.sprites )
		{
			var sprite = this.sprites[ i ];
		
			sprite.update( time, delta );
		}
	}

	render()
	{
		// Sprites
		for ( var i in this.sprites )
		{
			var sprite = this.sprites[ i ];
		
			sprite.render();
		}
	}

	destroy()
	{
		
	}
}

module.exports = Scene;
