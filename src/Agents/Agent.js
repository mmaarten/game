
var Sprite = require( './../Sprite' );

var Agent = new Phaser.Class(
{
	Extends : Sprite,

    initialize :

    function constructor( scene, config )
    {
        var defaults = 
        {
            x           : undefined,
            y           : undefined,
            texture     : undefined,
            frame       : undefined,
            movingSpeed : 100,
            health      : 100,
            animKeys    : 
            {
                left  : '',
                right : '',
                up    : '',
                down  : '',
                dead  : '',
            },
        };

        this.config = Object.assign( {}, defaults, config );

    	Sprite.call( this, scene, config.x, config.y, config.texture, config.frame );

        this.movingSpeed = this.config.movingSpeed;
        this.health      = this.config.health;
        this.moveDir     = new Phaser.Math.Vector2();
        this.lookDir     = new Phaser.Math.Vector2();
        this.weapons     = {};
        this.weapon      = null;
        this.target      = null;

        this.animKeys = Object.assign( {}, defaults.animKeys, this.config.animKeys );
    },

    addWeapon : function( key, weapon )
    {
        this.weapons[ key ] = weapon;
    },

    removeWeapon : function( key )
    {
        delete this.weapons[ key ];
    },

    setWeapon : function( key )
    {
        this.weapon = this.weapons[ key ];
    },

    unsetWeapon : function( key )
    {
        this.weapon = null;
    },

    useWeapon : function( mode )
    {
        if ( ! this.weapon ) 
        {
            console.warn( 'No weapon set.' );

            return;
        }

        this.weapon.setDirection( this.lookDir.x, this.lookDir.y );
        this.weapon.use( this, mode );
    },

    isMoving : function()
    {
        return this.body.velocity.x || this.body.velocity.y ? true : false;
    },

    move : function( dirX, dirY )
    {
        this.moveDir.set( dirX, dirY );

    	this.setVelocity( this.movingSpeed * this.moveDir.x, this.movingSpeed * this.moveDir.y );
    },

    moveTo : function( x, y )
    {
        var distance = Phaser.Math.Distance.Between( this.x, this.y, x, y );

        var dirX = ( x - this.x ) / distance;
        var dirY = ( y - this.y ) / distance;

        this.move( dirX, dirY );
    },

    look : function( dirX, dirY )
    {
        this.lookDir.set( dirX, dirY );

        if ( Math.round( this.lookDir.x ) < 0 ) 
        {
            this.play( this.animKeys.left, this.isMoving() );
        }

        else if ( Math.round( this.lookDir.x ) > 0 ) 
        {
            this.play( this.animKeys.right, this.isMoving() );
        }

        else if ( Math.round( this.lookDir.y ) < 0 ) 
        {
            this.play( this.animKeys.up, this.isMoving() );
        }

        else if ( Math.round( this.lookDir.y ) > 0 ) 
        {
            this.play( this.animKeys.down, this.isMoving() );
        }

        else
        {
            this.play( this.animKeys.down, this.isMoving() );
        }
    },

    lookAt : function( x, y )
    {
        var distance = Phaser.Math.Distance.Between( this.x, this.y, x, y );

        var dirX = ( x - this.x ) / distance;
        var dirY = ( y - this.y ) / distance;

        this.look( dirX, dirY );
    },

    reset : function()
    {
        this.setActive( true );
        this.setVisible( true );

        this.play( this.animKeys.down );
        
        this.movingSpeed = this.config.movingSpeed;
        this.health      = this.config.health;
    },

    update: function( time, delta )
    {
        
    },

    die : function()
    {
        this.play( this.animKeys.dead );

        this.setActive( false );
        this.body.stop();
    },

    destroy : function()
    {
        this.setActive( false );
        this.setVisible( false );

        this.body.stop();
    },
});

module.exports = Agent;
