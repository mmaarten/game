
var Scene     = require( './Scene' );
var TileMap   = require( './../tiles/TileMap' );
var Vector2   = require( './../geom/Vector2' );
var Rectangle = require( './../geom/Rectangle' );
var Agent     = require( './../sprite/Agent' );

class Scene1 extends Scene
{
	constructor()
	{
		super(
		{
			id : 'scene1',
			default : true,
		});
	}	

	preload()
	{
		this.loader.add( 'tiles', 'images/tmw_desert_spacing.png', 
		{
			margin  : 1,
			spacing : 1,
		});

		this.loader.add( 'agent_1', 'images/agent_1.png', 
		{
			frameWidth  : 16,
			frameHeight : 16,
		});

		this.loader.add( 'agent_2', 'images/agent_2.png', 
		{
			frameWidth  : 16,
			frameHeight : 16,
		});
	}

	create()
	{
		// Keyboard

		this.keyboard.createKeys(
		{
			left  : 'q',
			right : 'd',
			up    : 'z',
			down  : 's',
		});

		// Animations

		var anims = [];

		anims.push(
		{
			key       : 'left',
			frames    : [ 6, 7, 8 ],
	        frameRate : 20,
	        repeat    : -1
		});

		anims.push(
		{
			key       : 'right',
			frames    : [ 0, 1, 2 ],
	        frameRate : 20,
	        repeat    : -1
		});

		anims.push(
		{
			key       : 'up',
			frames    : [ 9, 10, 11 ],
	        frameRate : 20,
	        repeat    : -1
		});

		anims.push(
		{
			key       : 'down',
			frames    : [ 3, 4, 5 ],
	        frameRate : 20,
	        repeat    : -1
		});

		// Map

		this.map = new TileMap( this, 
		{
			width    : 25,
			height   : 18,
			tileSize : 32,
			tileData :
			[
				29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,
				29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,
				29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,
				29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,37,29,29,29,29,
				29,29,29,29,29,37,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,
				29,29,29,29,29,29,29,29,29,29,29,29,37,29,29,29,29,29,29,29,29,29,29,29,29,
				29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,
				29,29,37,29,37,29,29,29,29,29,29,29,29,29,37,29,29,29,29,37,29,29,29,29,29,
				29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,
				29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,
				29,29,29,29,29,29,29,29,29,29,37,29,29,29,29,29,29,29,29,29,29,29,29,29,29,
				29,29,29,29,29,29,29,37,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,
				29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,
				29,29,29,29,29,37,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,
				29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,37,29,29,
				29,29,37,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,
				29,29,29,29,29,29,29,29,37,29,29,29,29,29,37,29,29,29,29,29,29,29,29,29,29,
				29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,
			],
			tileProperties : 
			{
				37 : { collide : true },
			},
			tileSheet : 'tiles',
		});

		// Agents
		this.player = new Agent( this, 32 * 2, 32 * 2, 'agent_1', { anims : anims } );
		this.enemy  = new Agent( this, 32 * 3, 32 * 3, 'agent_2', { anims : anims } );

		var _this = this;

		this.game.canvas.addEventListener( 'click', function( event )
		{
			var a    = _this.map.getTileIndex( _this.enemy.position.x, _this.enemy.position.y, true );
			var b    = _this.map.getTileIndex( event.layerX, event.layerY, true );
			var path = _this.map.getPath( a, b, true );

			_this.enemy.setPath( path );
		});
	}

	update( time, delta )
	{
		// Move player

		var direction = new Vector2();

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

		//this.enemy.moveTo( this.player.position.x, this.player.position.y );
		//this.enemy.lookAt( this.player.position.x, this.player.position.y );

		// Agents
		this.player.update( time, delta );
		this.enemy.update( time, delta );
	}

	render()
	{
		// Map
		this.map.render();

		// Agents
		this.player.render();
		this.enemy.render();
	}
}

module.exports = Scene1;
