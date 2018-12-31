
var Loader             = require( './../loaders/Loader' );
var SpriteSheetManager = require( './../sprites/SpriteSheetManager' );
var Keyboard           = require( './../input/Keyboard' );

class Scene
{
	constructor( id, isDefault )
	{
		if ( isDefault === undefined ) isDefault = false;

		this.id      = id;
		this.default = isDefault;
		this.game;
		
		this.spriteSheets = new SpriteSheetManager();
		this.load         = new Loader( this );
		this.keyboard     = new Keyboard();
	}

	preload()
	{
		
	}

	create()
	{
		
	}

	update( time, delta )
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
