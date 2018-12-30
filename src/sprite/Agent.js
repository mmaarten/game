
var Geom = require( './../geom' );

var Sprite  = require( './Sprite' );

class Agent extends Sprite
{
	constructor( scene, x, y, texture, config )
	{
		var defaults = 
		{
			movingSpeed : 100,
		};

		config = Object.assign( {}, defaults, config );

		super( scene, x, y, texture, config );

		this.movingSpeed = config.movingSpeed;
		this.moveDir     = new Geom.Vector2();
		this.lookDir     = new Geom.Vector2();
		this.path        = [];
		this.pathIndex   = -1;
	}

	move( dirX, dirY )
	{
		this.moveDir.set( dirX, dirY );

		this.setVelocity( this.movingSpeed * this.moveDir.x, this.movingSpeed * this.moveDir.y );
	}

	moveTo( x, y )
	{
		var distance = Geom.getDistance( this.position.x, this.position.y, x, y );

		var dirX = ( x - this.position.x ) / distance;
		var dirY = ( y - this.position.y ) / distance;

		this.move( dirX, dirY );
	}

	look( dirX, dirY )
	{
		this.lookDir.set( dirX, dirY );

		if ( Math.round( this.lookDir.x ) < 0 ) 
		{
			this.anims.play( 'left', this.isMoving() );
		}

		else if ( Math.round( this.lookDir.x ) > 0 ) 
		{
			this.anims.play( 'right', this.isMoving() );
		}

		else if ( Math.round( this.lookDir.y ) < 0 ) 
		{
			this.anims.play( 'up', this.isMoving() );
		}

		else if ( Math.round( this.lookDir.y ) > 0 ) 
		{
			this.anims.play( 'down', this.isMoving() );
		}

		else
		{
			this.anims.play( 'down', this.isMoving() );
		}
	}

	lookAt( x, y )
	{
		var distance = Geom.getDistance( this.position.x, this.position.y, x, y );

		var dirX = ( x - this.position.x ) / distance;
		var dirY = ( y - this.position.y ) / distance;
	
		this.look( dirX, dirY );
	}

	setPath( path )
	{
		this.path = path;
		this.pathIndex = this.path.length ? 0 : -1;
	}

	update( time, delta )
	{
		super.update( time, delta );

		//

		var movingSpeed = ( this.movingSpeed / 1000 ) * delta;

		var target;

		// Walk path

		if ( this.pathIndex != -1 ) 
		{
			var target = this.path[ this.pathIndex ];

			var distance = target.distance( this.position );

			if ( distance < movingSpeed ) 
			{
				if ( this.pathIndex + 1 < this.path.length )
				{
					this.pathIndex++;

					target = this.path[ this.pathIndex ];
				}

				else
				{
					target = null;
					this.setVelocity( 0, 0 );
					this.path = [];
					this.pathIndex = -1;
				}
			}
		}

		if ( target ) 
		{
			this.moveTo( target.x, target.y );
			this.lookAt( target.x, target.y )
		}
	}

	render()
	{
		// Debug
		if ( this.scene.game.debug ) 
		{
			// Path

			var context = this.scene.game.canvas.getContext( '2d' );
			var color   = 'rgba( 0, 0, 0, .25 )';

			for ( var i = 0; i < this.path.length; i++ )
			{
				var node = this.path[ i ];
				var next = this.path[ i + 1 ];

				// Node
				context.save();
				context.translate( node.x, node.y );
				context.beginPath();
				context.arc( 0, 0, 3, 0, 2 * Math.PI );
				context.fillStyle = color;
				context.fill();
				context.closePath();
				context.restore();

				// Direction
				if ( next ) 
				{
					context.save();
					context.translate( node.x, node.y );
					context.beginPath();
					context.moveTo( 0, 0 );
					context.lineTo( next.x - node.x, next.y - node.y )
					context.strokeStyle = color;
					context.stroke();
					context.closePath();
					context.restore();
				}
			}
		}

		//

		super.render();
	}
}

module.exports = Agent;
