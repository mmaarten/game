
var Vector2   = require( './../geom/Vector2' );
var Animation = require( './../anims/Animation' );

class Sprite
{
	constructor( scene, x, y, texture, config )
	{
		var defaults = 
		{
			anims : {},
		};

		config = Object.assign( {}, defaults, config );

		this.scene    = scene;
		this.texture  = texture;
		this.sheet    = this.scene.loader.get( this.texture );
		this.width    = this.sheet.data.frameWidth;
		this.height   = this.sheet.data.frameHeight;
		this.anims    = new Animation();
		this.position = new Vector2( x, y );
		this.velocity = new Vector2();

		for ( var i in config.anims )
		{
			this.anims.create( config.anims[ i ] );
		}

		this.scene.addSprite( this );
	}

	setPosition( x, y )
	{
		this.position.set( x, y );
	}

	setVelocity( x, y )
	{
		this.velocity.set( x, y );
	}

	update( time, delta )
	{
		var vx = ( this.velocity.x / 1000 ) * delta;
		var vy = ( this.velocity.y / 1000 ) * delta;

		this.setPosition( this.position.x + vx, this.position.y + vy );

		this.anims.update( time, delta );
	}

	isMoving()
	{
		return this.velocity.x || this.velocity.y;
	}

	render()
	{
		var context = this.scene.game.canvas.getContext( '2d' );

		var frame = this.anims.frame;

		var col = frame % Math.floor( this.sheet.img.width / this.sheet.data.frameWidth );
		var row = ( frame - col ) / Math.floor( this.sheet.img.height / this.sheet.data.frameHeight );

		context.save();
		context.translate( this.position.x, this.position.y );
		context.drawImage( this.sheet.img,
			col * this.sheet.data.frameWidth,
			row * this.sheet.data.frameHeight,
			this.sheet.data.frameWidth,
			this.sheet.data.frameHeight,
			- this.width / 2,
			- this.height / 2,
			this.sheet.data.frameWidth,
			this.sheet.data.frameHeight );
		context.restore();

		// Debug
		if ( this.scene.game.debug ) 
		{
			// Velocity
			context.save();
			context.translate( this.position.x, this.position.y );
			context.beginPath();
			context.moveTo( 0, 0 );
			context.lineTo( this.velocity.x, this.velocity.y );
			context.closePath();
			context.strokeStyle = 'purple';
			context.stroke();
			context.restore();

			// Pedestal
			context.save();
			context.translate( this.position.x, this.position.y );
			context.strokeStyle = 'purple';
			context.strokeRect( - this.width / 2, - this.height / 2, this.width, this.height );
			context.restore();
		}
	}
}

module.exports = Sprite;
