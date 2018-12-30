
class Tile
{
	constructor( layer, index, x, y, width, height, type, collide )
	{
		this.layer   = layer;
		this.index   = index;
		this.x       = x;
		this.y       = y;
		this.width   = width;
		this.height  = height;
		this.type    = type;
		this.collide = collide;
		
		this.xPixels = this.x * this.width;
		this.yPixels = this.y * this.height;

		this.data = {};
	}

	render( context )
	{
		var context;
		var img;
		var frameX;
		var frameY;

		context.drawImage( img, 
			frameX, 
			frameY, 
			this.width, 
			this.height, 
			this.xPixels, 
			this.yPixels, 
			this.width, 
			this.height 
		);
	}
}

module.exports = Tile;
