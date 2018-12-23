
var Sprite = new Phaser.Class(
{
	Extends : Phaser.Physics.Arcade.Sprite,

    initialize :

    function constructor( scene, x, y, texture, frame )
    {
    	Phaser.Physics.Arcade.Sprite.call( this, scene, x, y, texture, frame );

    	this.scene.add.existing( this );
    	this.scene.physics.world.enableBody( this, 0 );

    	this.dirX        = 0;
		this.dirY        = 0;
		this.movingSpeed = 100;
    },

    move : function( dirX, dirY )
    {
    	this.dirX = dirX;
    	this.dirY = dirY;

    	if ( this.dirX == 0 && this.dirY == 0 ) 
    	{
    		this.body.setVelocity( 0 );
    		this.anims.stop();

    		return;
    	}

    	// Update sprite

    	this.body.setVelocityX( this.dirX * this.movingSpeed );
    	this.body.setVelocityY( this.dirY * this.movingSpeed );

    	// Update animation

    	if ( this.dirX < 0 ) 
    	{
    		this.anims.play( 'left', true );
    	}

    	else if ( this.dirX > 0 )
	    {
	        this.anims.play( 'right', true );
	    }

	    else if ( this.dirY < 0 )
	    {
	        this.anims.play( 'up', true );
	    }

	    else if ( this.dirY > 0 )
	    {
	        this.anims.play( 'down', true );
	    }
    },

    moveTo : function( x, y )
    {
    	var distance = Phaser.Math.Distance.Between( this.x, this.y, x, y );

    	var dirX = ( x - this.x ) / distance;
		var dirY = ( y - this.y ) / distance;

    	this.move( dirX, dirY );
    },
});

var Agent = new Phaser.Class(
{
	Extends : Sprite,

    initialize :

    function constructor( scene, x, y, texture, frame )
    {
    	Sprite.call( this, scene, x, y, texture, frame );
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
    		key : 'scene1',
    		active : true,
    	});
    },

    preload : function()
	{
		this.load.image( 'tiles', 'assets/tiles.png' );
		this.load.tilemapCSV( 'map', 'assets/tiles.csv' );
		this.load.image( 'bullet', 'assets/bullet.png' );

		this.load.spritesheet( 'player', 'assets/agent_1.png', 
		{ 
			frameWidth : 16,
			frameHeight: 16,
		});
	},

	create : function()
	{
		this.cursors = this.input.keyboard.createCursorKeys();
		
		/**
		 * Setup Map
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
		 * Setup Animations
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

		this.player = new Agent( this, 16 * 1, 16 * 1, 'player' );

		this.physics.add.collider( this.player, this.layer );

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

		this.cursors = this.input.keyboard.addKeys(
		{
			up    : Phaser.Input.Keyboard.KeyCodes.Z,
			down  : Phaser.Input.Keyboard.KeyCodes.S,
			left  : Phaser.Input.Keyboard.KeyCodes.Q,
			right : Phaser.Input.Keyboard.KeyCodes.D
		});
	},

	update()
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

	    this.player.move( dirX, dirY );

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
	scene : [ MyScene ],
});
