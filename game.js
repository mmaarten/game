
function getDirection( x1, y1, x2, y2 )
{
	var distance = Phaser.Math.Distance.Between( x1, y1, x2, y2 );

	return { 
		x : ( x2 - x1 ) / distance,
		y : ( y2 - y1 ) / distance
	}
}

var Sprite = new Phaser.Class(
{
	Extends : Phaser.Physics.Arcade.Sprite,

    initialize :

    function constructor( scene, x, y, texture, frame )
    {
    	Phaser.Physics.Arcade.Sprite.call( this, scene, x, y, texture, frame );

    	// Setup sprite for scene
    	this.scene = scene;
    	this.scene.add.existing( this );
    	this.scene.physics.world.enableBody( this, 0 );
    }
});

var Agent = new Phaser.Class(
{
	Extends : Sprite,

    initialize :

    function constructor( scene, x, y, texture, frame )
    {
    	Sprite.call( this, scene, x, y, texture, frame );

    	// Moving direction
		this.dirX = 0;
		this.dirY = 0;

		// Looking direction
		this.lookDirX = 0;
		this.lookDirY = 0;

		this.movingSpeed = 100;
		this.health = 100;

		this.target = null;

		this.textureKey = texture; 
    },

    move : function( dirX, dirY, doLookingDir )
    {
    	this.dirX = dirX;
    	this.dirY = dirY;

    	if ( this.dirX == 0 && this.dirY == 0 ) 
    	{
    		this.setVelocity( 0 );

    		this.anims.stop();

    		return;
    	}

    	this.setVelocity( this.dirX * this.movingSpeed, this.dirY * this.movingSpeed );

    	if ( doLookingDir || doLookingDir === undefined ) 
    	{
    		this.setLookingDirection( this.dirX, this.dirY );
    	}
    },

    moveTo : function( x, y )
    {
    	var dir = getDirection( this.x, this.y, x, y );

    	this.move( dir.x, dir.y );
    },

    setLookingDirection : function( dirX, dirY )
    {
    	this.lookDirX = dirX;
    	this.lookDirY = dirY;

    	if ( Math.round( this.lookDirX ) < 0 ) 
    	{
    		this.anims.play( 'left', true );
    	}

    	else if ( Math.round( this.lookDirX ) > 0 )
	    {
	        this.anims.play( 'right', true );
	    }

	    else if ( Math.round( this.lookDirY ) < 0 )
	    {
	        this.anims.play( 'up', true );
	    }

	    else if ( Math.round( this.lookDirY ) > 0 )
	    {
	        this.anims.play( 'down', true );
	    }

	    else
	    {
	    	this.anims.play( 'down', true );
	    }
    },

    lookAt : function( x, y )
    {
    	var dir = getDirection( this.x, this.y, x, y );

    	this.setLookingDirection( dir.x, dir.y );
    },

    follow: function( target )
    {
        this.target = target;
    },

    stopFollowing: function()
    {
        this.target = null;
    },

    shoot : function()
    {
    	// Get next available bullet
    	var bullet = this.scene.bullets.get();

    	// Check if exists
    	if ( ! bullet ) 
    	{
    		return;
    	}

    	// Reset when already used
		bullet.reset();

    	// Shoot
    	this.scene.sound.play( 'gunshot' );
    	bullet.setPosition( this.x, this.y );
    	bullet.setVelocity( this.lookDirX * bullet.movingSpeed, this.lookDirY * bullet.movingSpeed );
    },

    update: function( time, delta )
    {
        if ( this.target ) 
        {
        	this.moveTo( this.target.x, this.target.y );
        }
    },

    reset : function()
    {
		this.setActive( true );
		this.setVisible( true );

		this.movingSpeed = 100;
		this.health      = 100;
    },

    destroy : function()
    {
    	this.setActive( false );
        this.setVisible( false );

        this.body.stop();
    },
});

var Bullet = new Phaser.Class(
{
	Extends : Sprite,

    initialize :

    function constructor( scene )
    {
    	Sprite.call( this, scene, 0, 0, 'bullet' );

		this.movingSpeed = 500;
		this.lifespan    = 1000;
		this.damage      = 25;
    },

    reset : function()
    {
    	this.lifespan = 1000;

		this.setActive( true);
		this.setVisible( true );
    },

    update: function( time, delta )
    {
        this.lifespan -= delta;

        if ( this.lifespan <= 0 )
        {
            this.destroy();
        }
    },

    destroy: function()
    {
        this.setActive( false );
        this.setVisible( false );

        this.body.stop();
    }
});

var MyScene = new Phaser.Class(
{
    Extends : Phaser.Scene,

    initialize :

    function constructor()
    {
    	Phaser.Scene.call( this,
    	{
    		key    : 'scene1',
    		active : true,
    	});

    	this.mouse = null;
    },

    preload : function()
	{
		this.load.image( 'tiles', 'assets/tiles.png' );
		this.load.image( 'bullet', 'assets/bullet.png' );

		this.load.tilemapCSV( 'map', 'assets/tiles.csv' );

		this.load.spritesheet( 'player', 'assets/agent_1.png', 
		{ 
			frameWidth : 16,
			frameHeight: 16,
		});

		this.load.spritesheet( 'enemy', 'assets/agent_2.png', 
		{ 
			frameWidth : 16,
			frameHeight: 16,
		});

		this.load.audio( 'gunshot', 'assets/gunshot.mp3', 
		{
        	instances: 1,
    	});
	},

	create : function()
	{
		/**
		 * Keyboard
		 */

		this.cursors = this.input.keyboard.createCursorKeys();

		this.cursors = this.input.keyboard.addKeys(
		{
			up    : Phaser.Input.Keyboard.KeyCodes.Z,
			down  : Phaser.Input.Keyboard.KeyCodes.S,
			left  : Phaser.Input.Keyboard.KeyCodes.Q,
			right : Phaser.Input.Keyboard.KeyCodes.D
		});

		/**
		 * Sounds
		 */

		this.sound.add( 'gunshot' );
		
		/**
		 * Map
		 */

		this.map = this.make.tilemap( 
		{ 
			key        : 'map', 
			tileWidth  : 32, 
			tileHeight : 32,
		});

		this.map.setCollisionBetween( 1, 80 );

		this.tileset = this.map.addTilesetImage( 'tiles', null, 32, 32, 0, 1 );
		this.tileset.setSpacing( 1 );

		this.layer = this.map.createStaticLayer( 0, this.tileset, 0, 0 );

		

		/**
		 * Animations
		 *
		 * TODO : belongs to agent
		 */

	    this.anims.create(
		{
	        key       : 'left',
	        frames    : this.anims.generateFrameNumbers( 'player', { start: 6, end: 8 } ),
	        frameRate : 20,
	        repeat    : -1,
	    });

	    this.anims.create(
	    {
	        key       : 'right',
	        frames    : this.anims.generateFrameNumbers( 'player', { start: 0, end: 2 } ),
	        frameRate : 20,
	        repeat    : -1,
	    });

	    this.anims.create(
	    {
	        key       : 'up',
	        frames    : this.anims.generateFrameNumbers( 'player', { start: 9, end: 11 } ),
	        frameRate : 20,
	        repeat    : -1,
	    });

	    this.anims.create(
	    {
	        key       : 'down',
	        frames    : this.anims.generateFrameNumbers( 'player', { start: 3, end: 5 } ),
	        frameRate : 20,
	        repeat    : -1,
	    });

		/**
		 * Player
		 */

		this.player = new Agent( this, 32 * 1, 32 * 1, 'player' );

		this.input.on( 'pointerdown', function()
		{
			this.player.shoot();
		}, this );

		/**
		 * Enemies
		 */

		this.enemies = this.physics.add.group(
		{
	        classType      : Agent,
	        maxSize        : 1000,
	        runChildUpdate : true,
    	});

    	for ( var i = 0; i < 10; i++ )
	    {
	        this.placeEnemy();
	    }

		/**
		 * Bullets
		 */

		this.bullets = this.physics.add.group(
		{
	        classType      : Bullet,
	        maxSize        : 100,
	        runChildUpdate : true,
    	});

    	/**
		 * Collision detection
		 */

		this.physics.add.collider( this.player, this.layer );
		this.physics.add.collider( this.player, this.enemies );
		this.physics.add.collider( this.enemies, this.layer );
		this.physics.add.collider( this.enemies, this.enemies );

    	this.physics.add.overlap( this.bullets, this.enemies, this.hitEnemy, this.checkBulletVsEnemy, this );

		/**
		 * Setup Camera
		 */

    	this.cameras.main.setBounds( 0, 0, this.layer.width * this.layer.scaleX, this.layer.height * this.layer.scaleY );
    	
    	// Fix: Follow point instead of player (lines are visible)
    	this.cameraTarget = new Phaser.Geom.Point( this.player.x, this.player.y );
		this.cameras.main.startFollow( this.cameraTarget );

		/**
		 * Setup Keys
		 */

		

		var _this = this;

		document.addEventListener( 'mousemove', function( event )
		{
			_this.mouse = new Phaser.Geom.Point( event.layerX, event.layerY );
		});
	},

	checkBulletVsEnemy : function( bullet, enemy )
	{
	    return ( bullet.active && enemy.active );
	},

	hitEnemy : function( bullet, enemy )
	{
		var pushBackDistance = 5;

		// Push back effect
		var dir = getDirection( bullet.x, bullet.y, enemy.x, enemy.y );
		enemy.setPosition( enemy.x + pushBackDistance * dir.x, enemy.y + pushBackDistance * dir.y );

		// decrease health
		enemy.health -= bullet.damage;

		// TODO : decrease moving speed

		if ( enemy.health <= 0 ) 
		{
			enemy.destroy();
		}

	    bullet.destroy();
	},

	placeEnemy : function()
	{
		var enemy = this.enemies.get();

		if ( ! enemy ) 
        {
        	return;
        }

        var field    = new Phaser.Geom.Rectangle( 0, 0, this.layer.width, this.layer.height );
		var position = new Phaser.Math.Vector2();
		
		field.getRandomPoint( position );

        enemy.reset();
        enemy.movingSpeed = 10;
        enemy.setTexture( 'enemy', 0 );
        enemy.setSize( 16, 16 );
       	enemy.setPosition( position.x, position.y );
       	enemy.follow( this.player );
	},

	update : function()
	{
		/**
		 * Player movement
		 */

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

	    this.player.move( dirX, dirY, false );

	    if ( this.mouse ) 
	    {
	    	this.player.lookAt( this.mouse.x + this.cameras.main.scrollX, this.mouse.y + this.cameras.main.scrollY );
	    }

	    /**
		 * Camera
		 */

	    // Update camera position
	    this.cameraTarget.x = Math.floor( this.player.x );
	    this.cameraTarget.y = Math.floor( this.player.y );
	},
});

let game = new Phaser.Game(
{
	type   : Phaser.AUTO,
	width  : 500,
	height : 500,
	roundPixels: true,
	physics: 
	{
        default: 'arcade',
        arcade: 
        {
            gravity: { y: 0 },
            debug: false,
        }
    },
    plugins: 
    {
		scene: [ { key: "NavMeshPlugin", plugin: PhaserNavMeshPlugin, mapping: "navMeshPlugin", start: true } ],
  	},
	scene : [ MyScene ],
});
