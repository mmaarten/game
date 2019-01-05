
var Agent = require( './../sprites/Agent' );

class Scene1 extends Core.Scenes.Scene
{
	constructor()
	{
		super( 'scene_1', true );

		this.player = null;
	}

	preload()
	{
		this.load.spriteSheet( 'tiles', 'images/tmw_desert_spacing.png', 
		{
			frameWidth  : 32,
			frameHeight : 32,
			tileMargin  : 1,
			tilePadding : 1,
		});

		this.load.spriteSheet( 'agent_1', 'images/agent_1.png', 
		{
			frameWidth  : 16,
			frameHeight : 16,
		});
	}

	create()
	{
		var _this = this;

		// Keyboard

		this.keyboard.createKeys(
		{
			left  : 'q',
			right : 'd',
			up    : 'z',
			down  : 's',
		});

		// Map
		
		this.map = new Core.Tiles.TileMap( this, 'tiles', 
		{
			width    : 25,
			height   : 18,
			tileData :
			[
				29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,
				29,29,29,29,29,29,29,29,29,37,37,37,37,37,29,29,29,29,29,29,29,29,29,29,29,
				29,29,29,29,29,29,29,29,29,29,29,29,29,37,29,31,29,29,29,29,29,29,29,29,29,
				29,29,29,29,31,29,29,29,29,29,29,29,29,37,29,29,29,29,29,29,37,29,29,29,29,
				29,29,29,29,29,37,29,29,29,29,29,29,29,37,29,29,29,29,29,29,29,29,29,29,29,
				29,29,29,29,29,29,29,29,29,29,29,29,37,37,29,29,29,29,29,29,29,29,29,29,29,
				29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,
				29,29,37,29,37,29,29,29,29,29,29,29,29,29,37,29,29,29,29,37,29,29,29,29,29,
				29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,
				29,29,29,29,29,29,29,29,29,29,29,29,31,29,29,29,29,29,29,29,29,29,29,29,29,
				29,29,29,29,29,29,29,29,29,29,37,29,29,29,29,29,29,29,31,29,29,29,29,29,29,
				29,29,29,29,29,29,29,37,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,
				29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,
				29,29,29,29,29,37,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,
				29,29,29,29,31,29,29,29,29,29,29,29,31,31,31,29,29,29,29,29,29,29,37,29,29,
				29,29,37,29,29,29,29,29,29,29,29,29,31,29,31,29,29,29,29,29,29,29,29,29,29,
				29,29,29,29,29,29,29,29,37,29,29,29,31,29,31,29,29,29,29,29,29,29,29,29,29,
				29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,
			],
			tileProperties : 
			{
				31 : { collide : true },
				37 : { collide : true },
			},
		});

		// Agents

		this.player = new Agent( this, 16 * 3, 16 * 3, 'agent_1' );

		// Walk path

		this.game.canvas.addEventListener( 'click', function( event )
		{
			var a    = _this.map.getTileIndex( _this.player.position.x, _this.player.position.y, true );
			var b    = _this.map.getTileIndex( event.layerX, event.layerY, true );
			var path = _this.map.getPath( a, b, true );

			_this.player.setPath( path );
		});
	}

	update( time, delta )
	{
		// Move player

		if ( ! this.player.path.length ) 
		{
			var direction = new Core.Geom.Vector2( 0, 0 );

			if ( this.keyboard.keys.left.isDown ) 
			{
				direction.x = -1;
			}

			else if ( this.keyboard.keys.right.isDown ) 
			{
				direction.x = 1;
			}

			if ( this.keyboard.keys.up.isDown ) 
			{
				direction.y = -1;
			}

			else if ( this.keyboard.keys.down.isDown ) 
			{
				direction.y = 1;
			}

			this.player.move( direction.x, direction.y );
			this.player.look( direction.x, direction.y );
		}

		this.player.update( time, delta );

		// Collision detection

		var sprite     = this.player;
		var spriteRect = new Core.Geom.Rectangle( sprite.position.x, sprite.position.y, sprite.width, sprite.height );

		for ( var i = 0; i < this.map.tileData.length; i++ )
		{
			var tile     = this.map.tiles[ i ];
			var tileRect = new Core.Geom.Rectangle( tile.xPixels, tile.yPixels, tile.width, tile.height );

			// Check if sprite intersects tile
			if ( ! Core.Geom.Rectangle.intersects( spriteRect, tileRect ) ) 
			{
				continue;
			}

			// Check if tile is walkable
			if ( ! tile.collide ) 
			{
				continue;
			}

			// Find out which axis to check first

			var minX = 0;
   			var minY = 1;

			if ( sprite.velocity.x > sprite.velocity.y )
		    {
		        //  Moving faster horizontally, check X axis first
		        minX = -1;
		    }

		    else if ( sprite.velocity.x < sprite.velocity.y )
		    {
		        //  Moving faster vertically, check Y axis first
		        minY = -1;
		    }

		    if ( sprite.velocity.x !== 0 && sprite.velocity.y !== 0 )
		    {
		        //  Moving in both directions
		        minX = Math.min( Math.abs( spriteRect.left - tileRect.right ), Math.abs( spriteRect.right - tileRect.left ) );
		        minY = Math.min( Math.abs( spriteRect.top - tileRect.bottom ), Math.abs( spriteRect.bottom - tileRect.top ) );
		    }

		    // Reset position

		    var x, y;

		    if ( minX < minY )
    		{
    			x = this.tileCheckX( sprite, tile );

    			// Check if we still intersect

    			spriteRect = new Core.Geom.Rectangle( sprite.position.x, sprite.position.y, sprite.width, sprite.height );

    			if ( Core.Geom.Rectangle.intersects( spriteRect, tileRect ) ) 
				{
					 y = this.tileCheckY( sprite, tile );
				}
    		}

    		else
    		{
    			y = this.tileCheckY( sprite, tile );

    			// Check if we still intersect
    			
    			spriteRect = new Core.Geom.Rectangle( sprite.position.x, sprite.position.y, sprite.width, sprite.height );

    			if ( Core.Geom.Rectangle.intersects( spriteRect, tileRect ) ) 
				{
					x = this.tileCheckX( sprite, tile );
				}
    		}
		}
	}

	tileCheckX( sprite, tile )
	{
		var spriteRect = new Core.Geom.Rectangle( sprite.position.x, sprite.position.y, sprite.width, sprite.height );
		var tileRect   = new Core.Geom.Rectangle( tile.xPixels, tile.yPixels, tile.width, tile.height );

		var x = 0;

		// moving LEFT
		if ( sprite.velocity.x < 0 )
	    {
	        if ( spriteRect.left < tileRect.right )
	        {
	            x = spriteRect.left - tileRect.right;

	            if ( x < -tile.width )
	            {
	                x = 0;
	            }
	        }
	    }

	    // moving RIGHT
	    else if ( sprite.velocity.x > 0 )
	    {
	        if ( spriteRect.right > tileRect.left )
	        {
	            x = spriteRect.right - tileRect.left;

	            if ( x > tile.width )
	            {
	                x = 0;
	            }
	        }
	    }

	    if ( x !== 0 )
	    {
	    	if ( x < 0 )
	    	{
	    		x -= 1;
	    	}

	    	else if ( x > 0 )
	    	{
	    		x += 1;
	    	}

	        sprite.position.x -= x;
	    }

	    return x;
	}

	tileCheckY( sprite, tile )
	{
		var spriteRect = new Core.Geom.Rectangle( sprite.position.x, sprite.position.y, sprite.width, sprite.height );
		var tileRect   = new Core.Geom.Rectangle( tile.xPixels, tile.yPixels, tile.width, tile.height );

		var y = 0;

		// moving UP
		if ( sprite.velocity.y < 0 )
	    {
	        if ( spriteRect.top < tileRect.bottom )
	        {
	            y = spriteRect.top - tileRect.bottom;

	            if ( y < -tile.height )
	            {
	                y = 0;
	            }
	        }
	    }

	    // moving DOWN
	    else if ( sprite.velocity.y > 0 )
	    {
	        if ( spriteRect.bottom > tileRect.top )
	        {
	            y = spriteRect.bottom - tileRect.top;

	            if ( y > tile.height )
	            {
	                y = 0;
	            }
	        }
	    }

	    if ( y !== 0 )
	    {
	    	if ( y < 0 )
	    	{
	    		y -= 1;
	    	}

	    	else if ( y > 0 )
	    	{
	    		y += 1;
	    	}

	        sprite.position.y -= y;
	    }

	    return y;
	}

	render()
	{
		this.map.render();
		this.player.render();
	}

	destroy()
	{
		
	}
}

module.exports = Scene1;
