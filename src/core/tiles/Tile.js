
class Tile
{
	constructor( layer, index, frame, x, y, width, height )
	{
		this.layer   = layer;
		this.index   = index;
		this.frame   = frame;
		this.x       = x;
		this.y       = y;
		this.width   = width;
		this.height  = height;
		this.xPixels = this.x * this.width;
		this.yPixels = this.y * this.height;
		this.collide = false;
	}

	render()
	{
		var game      = this.layer.scene.game;
		var tileSheet = this.layer.tileSheet;
		var frame     = tileSheet.getFrame( this.frame );
		var context   = game.canvas.getContext( '2d' );

		context.save();
		context.translate( this.xPixels, this.yPixels );
		context.drawImage( tileSheet.img, frame.x, frame.y, frame.width, frame.height, 0, 0, this.width, this.height );
		context.restore();

		if ( game.debug ) 
		{
			context.save();
			context.translate( this.xPixels, this.yPixels );
			context.strokeStyle = 'rgba( 0, 0, 0, .15 )';
			context.strokeRect( 0, 0, this.width, this.height );
			context.restore();
		}
	}
}

module.exports = Tile;
