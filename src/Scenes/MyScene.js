
var GameObjects = require( './../gameobjects' );
var Utils = require( './../utils' );

var MyScene = new Phaser.Class(
{
    Extends : Phaser.Scene,

    initialize :

    function constructor()
    {
    	Phaser.Scene.call( this,
    	{
    		key    : 'myScene',
    		active : true,
    	});
    },

    preload : function()
	{
		// Map
		this.load.image( 'tiles', 'assets/tmw_desert_spacing.png' );
		this.load.tilemapCSV( 'map', 'assets/map.csv' );

		// Agents

		this.load.spritesheet( 'agents.agent_1', 'assets/agent_1.png', 
		{
			frameWidth : 16,
			frameHeight: 16,
		});

		this.load.spritesheet( 'agents.agent_2', 'assets/agent_2.png', 
		{
			frameWidth : 16,
			frameHeight: 16,
		});

		this.load.spritesheet( 'bullets.default', 'assets/bullet.png', 
		{
			frameWidth : 10,
			frameHeight: 10,
		});

		// Sounds

		this.load.audio( 'gun_shot', 'assets/sounds/gun-shot.mp3', 
		{
        	instances: 1,
    	});

    	this.load.audio( 'gun_reload', 'assets/sounds/gun-reload.mp3', 
		{
        	instances: 1,
    	});

    	this.load.audio( 'gun_empty', 'assets/sounds/gun-empty.mp3', 
		{
        	instances: 1,
    	});

    	this.load.audio( 'gun_shell_fall', 'assets/sounds/gun-shell-fall.mp3', 
		{
        	instances: 1,
    	});

    	this.load.audio( 'uzi_shot', 'assets/sounds/uzi-shot.mp3', 
		{
        	instances: 1,
    	});
	},

	create : function()
	{
		/**
		 * Keyboard keys
		 */

		this.cursors = this.input.keyboard.createCursorKeys();

		this.cursors = this.input.keyboard.addKeys(
		{
			up       : Phaser.Input.Keyboard.KeyCodes.Z,
			down     : Phaser.Input.Keyboard.KeyCodes.S,
			left     : Phaser.Input.Keyboard.KeyCodes.Q,
			right    : Phaser.Input.Keyboard.KeyCodes.D,
			reload   : Phaser.Input.Keyboard.KeyCodes.R,
			weapon_1 : Phaser.Input.Keyboard.KeyCodes.O,
			weapon_2 : Phaser.Input.Keyboard.KeyCodes.P,
		});

		/**
		 * Sounds
		 */

		this.sounds = {};

		[ 'gun_shot', 'gun_reload', 'gun_empty', 'gun_shell_fall', 'uzi_shot' ].forEach( function( key )
		{
			this.sounds[ key ] = this.sound.add( key );
		}, this );

		/**
		 * Map
		 */

		this.map     = this.make.tilemap( { key: 'map', tileWidth: 32, tileHeight: 32 } );
		this.tileset = this.map.addTilesetImage( 'tiles', 'tiles', 32, 32, 1, 1 );
		this.layer   = this.map.createStaticLayer( 0, this.tileset, 0, 0 ); // layer index, tileset, x, y
		this.layer.setCollision( [ 37, 31 ], true );
		
		// Any tile with the collides property set to true (in Tiled) will be set to collide
    	// this.layer.setCollisionByProperty({ collides: true });

		/**
		 * Bullets
		 */

		this.bullets = this.physics.add.group(
		{
	        classType      : GameObjects.Bullet,
	        maxSize        : 1000,
	        runChildUpdate : true,
    	});

	    /**
		 * Agents
		 */

		this.agents = 
		{
			agent_1 : 
			{
				texture     : 'agents.agent_1',
				movingSpeed : 100,
	            health      : 500,
	            animKeys : 
	            {
	                left  : 'agents.agent_1.left',
	                right : 'agents.agent_1.right',
	                up    : 'agents.agent_1.up',
	                down  : 'agents.agent_1.down',
	                dead  : 'agents.agent_1.dead',
	            },
			},

			agent_2 : 
			{
				texture     : 'agents.agent_2',
				movingSpeed : 75,
	            health      : 100,
	            animKeys : 
	            {
	                left  : 'agents.agent_2.left',
	                right : 'agents.agent_2.right',
	                up    : 'agents.agent_2.up',
	                down  : 'agents.agent_2.down',
	                dead  : 'agents.agent_2.dead',
	            },
			},
		};

		// Create animations

		var textures = [ 'agents.agent_1', 'agents.agent_2' ];

		for ( var i in textures )
		{
			var texture = textures[ i ];

			this.anims.create( 
			{
				key       : texture + '.left',
				frames    : this.anims.generateFrameNumbers( texture, { start: 6, end: 8 } ),
		        frameRate : 20,
		        repeat    : -1
			});

			this.anims.create( 
			{
				key       : texture + '.right',
				frames    : this.anims.generateFrameNumbers( texture, { start: 0, end: 2 } ),
		        frameRate : 20,
		        repeat    : -1
			});

			this.anims.create( 
			{
				key       : texture + '.up',
				frames    : this.anims.generateFrameNumbers( texture, { start: 9, end: 11 } ),
		        frameRate : 20,
		        repeat    : -1
			});

			this.anims.create( 
			{
				key       : texture + '.down',
				frames    : this.anims.generateFrameNumbers( texture, { start: 3, end: 5 } ),
		        frameRate : 20,
		        repeat    : -1
			});

			this.anims.create( 
			{
				key       : texture + '.dead',
				frames    : this.anims.generateFrameNumbers( texture, { start: 12, end: 12 } ),
		        frameRate : 20,
		        repeat    : -1
			});
		};

		// Create agents

		this.player = new GameObjects.Agent( this, this.agents.agent_1 );
		this.player.setPosition( 32 * 5, 32 * 10 );
		//this.player.setCollideWorldBounds( true );

		this.enemies = this.physics.add.group();

		var cols = 19, x = 0, y = 0, spacing = 32; 

		for ( var i = 0; i < 100; i++ )
		{
			if ( i % cols === 0 ) 
			{
				x = spacing;
				y += spacing;
			}

			else
			{
				x += spacing;
			}

			var enemy = new GameObjects.Agent( this, this.agents.agent_2 );
			enemy.setPosition( x, y );
			enemy.follow( this.player );

			this.enemies.add( enemy );
		}

		/**
		 * Colliders
		 */

		this.physics.add.collider( this.player , this.layer );
		this.physics.add.collider( this.enemies, this.layer );
		//this.physics.add.collider( this.bullets, this.layer );
		this.physics.add.collider( this.player , this.enemies );
		this.physics.add.collider( this.enemies, this.enemies );

		/**
		 * Collision detection
		 */

		this.physics.add.overlap( this.bullets, this.enemies, this.hitEnemy, this.checkBulletVsEnemy, this );

		/**
		 * Weapons
		 */

		this.weapons = 
		{
			pistol : 
			{
	            useInterval    : 1000, // ms
	            rounds         : 10,
	            bulletTexture  : 'bullets.default',
	            useSound       : 'gun_shot',
	            reloadSound    : 'gun_reload',
	            emptySound     : 'gun_empty',
	            bullets        : this.bullets,
			},

			uzi : 
			{
	            useInterval    : 50, // ms
	            useSound       : 'gun_shot',
	            reloadSound    : 'gun_reload',
	            emptySound     : 'gun_empty',
	            rounds         : 40,
	            bulletTexture  : 'bullets.default',
	            useSound       : 'uzi_shot',
	            reloadSound    : 'gun_reload',
	            emptySound     : 'gun_empty',
	            bullets        : this.bullets,
			},
		};

		this.player.addWeapon( 1, new GameObjects.Firearm( this, this.weapons.pistol ) );
		this.player.addWeapon( 2, new GameObjects.Firearm( this, this.weapons.uzi ) );
		this.player.setWeapon( 1 );

		this.input.keyboard.on( 'keydown', function( event )
		{
			if ( this.cursors.reload.keyCode == event.keyCode ) 
			{
				this.player.weapon.reload();
			}

			else if ( this.cursors.weapon_1.keyCode == event.keyCode ) 
			{
				this.player.setWeapon( 1 );
			}

			else if ( this.cursors.weapon_2.keyCode == event.keyCode ) 
			{
				this.player.setWeapon( 2 );
			}
			
		}, this );

		/**
		 * Camera
		 */

		this.cameras.main.setBounds( 0, 0, this.map.widthInPixels, this.map.heightInPixels );
    	this.cameras.main.startFollow( this.player );

    	var help = this.add.text(16, 16, 'ZQSD keys to move.', 
    	{
	        fontSize: '18px',
	        fill: '#ffffff'
    	});
	},

	checkBulletVsEnemy : function( bullet, enemy )
	{
	    return ( bullet.active && enemy.active );
	},

	hitEnemy : function( bullet, enemy )
	{
		var recoil = 5;

		// Push back effect
		var dir = Utils.getDirection( bullet.x, bullet.y, enemy.x, enemy.y );
		
		enemy.setPosition( enemy.x + recoil * dir.x, enemy.y + recoil * dir.y );
		//enemy.lookAt( bullet.x, bullet.y );

		// decrease health
		enemy.health -= bullet.damage;

		// TODO : decrease moving speed

		if ( enemy.health <= 0 ) 
		{
			enemy.die();
		}

	    bullet.destroy();
	},

	update : function( time, delta )
	{
		this.enemies.children.iterate( function( enemy )
		{
			enemy.update( time, delta )
		}, this );

		/**
		 * Player
		 */

		// Move

		var dirX = 0, dirY = 0;

	    if ( this.cursors.left.isDown )
	    {
	    	dirX = -1;
	    }

	    else if ( this.cursors.right.isDown )
	    {
			dirX = 1;
	    }

	    if ( this.cursors.up.isDown )
	    {
	        dirY = -1;
	    }

	    else if ( this.cursors.down.isDown )
	    {
	        dirY = 1;
	    }

	    this.player.move( dirX, dirY );

		// Look at mouse

	    this.player.lookAt( this.input.mousePointer.worldX, this.input.mousePointer.worldY );

	    // Shoot

	    if ( this.input.mousePointer.justDown )
	    {
	    	this.player.useWeapon( 'single' );
	    }

	    else if ( this.input.mousePointer.isDown ) 
	    {
	    	this.player.useWeapon();
	    }
	},
});

module.exports = MyScene;
