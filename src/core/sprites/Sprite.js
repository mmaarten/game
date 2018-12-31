
var Geom = require( '../geom' );  

class Sprite
{
	constructor( scene, x, y, texture, frame )
	{
		this.scene    = scene;
		this.texture  = texture;
		this.frame    = frame || 0;
		this.position = new Geom.Vector2( x, y );
		this.velocity = new Geom.Vector2( 0, 0 );
		this.width    = 24;
		this.height   = 24;

		this.sheet = this.scene.spriteSheets.get( this.texture );

		if ( this.sheet )
		{
			this.width  = this.sheet.frameWidth;
			this.height = this.sheet.frameHeight;
		}
	}

	setPosition( x, y )
	{
		this.position.set( x, y );
	}

	setVelocity( x, y )
	{
		this.velocity.set( x, y );
	}

	setVelocityX( x )
	{
		this.velocity.setX( x );
	}

	setVelocityY( y )
	{
		this.velocity.setY( y );
	}

	update( time, delta )
	{
		var x = ( this.velocity.x / 1000 ) * delta;
		var y = ( this.velocity.y / 1000 ) * delta;

		this.position.add( x, y );
	}

	render()
	{
		if ( ! this.sheet ) 
		{
			return;
		}

		var frame = this.sheet.getFrame( this.frame );

		var context = this.scene.game.canvas.getContext( '2d' );

		context.save();
		context.translate( this.position.x, this.position.y );
		context.drawImage( this.sheet.img, frame.x, frame.y, frame.width, frame.height, -this.width / 2, -this.height / 2, this.width, this.height );
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
