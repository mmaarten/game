
var Agent = require( './../sprites/Agent' );

class Scene1 extends Core.Scenes.Scene
{
	constructor()
	{
		super( 'scene_1', true );
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
				29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,
				29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,31,29,29,29,29,29,29,29,29,29,
				29,29,29,29,31,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,37,29,29,29,29,
				29,29,29,29,29,37,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,
				29,29,29,29,29,29,29,29,29,29,29,29,37,29,29,29,29,29,29,29,29,29,29,29,29,
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
