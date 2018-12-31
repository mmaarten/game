
var Geom = require( '../geom' );

class SpriteSheet
{
	constructor( id, img, config )
	{
		var defaults = 
		{
			frameWidth  : 32,
			frameHeight : 32,
			tileMargin  : 0,
			tilePadding : 0,
		};

		config = Object.assign( {}, defaults, config );

		this.id          = id;
		this.img         = img;
		this.frameWidth  = config.frameWidth;
		this.frameHeight = config.frameHeight;
		this.tileMargin  = config.tileMargin;
		this.tilePadding = config.tilePadding;
	}

	getFrameLocation( index )
	{
		var x = index % Math.floor( this.img.width / this.frameWidth );
		var y = ( index - x ) / Math.floor( this.img.width / this.frameHeight );

		return new Geom.Vector2( x, y );
	}

	getFrame( index )
	{
		var location = this.getFrameLocation( index );

		return {
			x      : location.x * ( this.frameWidth  + this.tilePadding ) + this.tileMargin,
			y      : location.y * ( this.frameHeight + this.tilePadding ) + this.tileMargin,
			width  : this.frameWidth,
			height : this.frameHeight,
		};
	}
}

module.exports = SpriteSheet;
