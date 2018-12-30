
var Weapon = require( './Weapon' );

var Firearm = new Phaser.Class(
{
	Extends : Weapon,

    initialize :

    function constructor( scene, config )
    {
        var defaults = 
        {
            bulletSpeed    : 750,
            useInterval    : 1000, // ms
            rounds         : 10,
            reloadTime     : 1000, // ms
            deviation      : 50,   // pixels
            recoil         : 50,   // pixels
            useSound       : null,
            reloadSound    : null,
            emptySound     : null,
            bullets        : scene.physics.add.group(),
        };

        config = Object.assign( {}, defaults, config );

    	Weapon.call( this, scene );
       
        this.bulletSpeed   = config.bulletSpeed;
        this.useInterval   = config.useInterval;
        this.useSound      = config.useSound;
        this.reloadSound   = config.reloadSound;
        this.emptySound    = config.emptySound;
        this.rounds        = config.rounds;
        this.reloadTime    = config.reloadTime;
        this.deviation     = config.deviation;
        this.recoil        = config.recoil;
        this.bullets       = config.bullets;
        this.roundsLeft    = this.rounds;
        this.isReloading   = false;
        this.reloadTimeout = null;
        this.lastUsed      = null;
    },

    reload : function()
    {
        // Stop when already reloading

        if ( this.isReloading ) 
        {
            return;
        }

        this.isReloading = true;

        // Make sure previous timeout is destroyed

        if ( this.reloadTimeout ) 
        {
            clearTimeout( this.reloadTimeout );

            this.reloadTimeout = null;
        }

        // Play sound

        if ( this.reloadSound ) 
        {
            this.scene.sound.play( this.reloadSound );
        }

        // Set timeout

        var _this = this;

        this.reloadTimeout = setTimeout( function()
        {
            // Reset rounds
            _this.roundsLeft = _this.rounds;

            // Reloading complete
            _this.isReloading = false;

        }, this.reloadTime );
    },

    canUse : function()
    {
        // Check if our 'use' interval is passed.

        var now = new Date();

        if ( ! this.lastUsed ) 
        {
            return true;
        }

        if ( now.getTime() - this.lastUsed.getTime() >= this.useInterval ) 
        {
            return true;
        }

        return false;
    },

    use : function( agent, mode )
    {
        if ( ! this.canUse() && mode != 'single' ) 
        {
            return;
        }

        // Check reloading

        if ( this.isReloading ) 
        {
            return;
        }

        // Check clip size

        if ( this.roundsLeft < 1 ) 
        {
            // Sound

            if ( this.emptySound ) 
            {
                var sound = this.scene.sounds[ this.emptySound ];

                if ( ! sound.isPlaying ) 
                {
                    sound.play();
                }
            }

            return;
        }

        // Get next available bullet

        var bullet = this.bullets.get();

        if ( ! bullet ) 
        {
            console.warn( 'No bullets instances available.' );

            return;
        }

        // Fire bullet
        
        bullet.reset();
        bullet.setPosition( agent.x, agent.y );

        var deviationX = Phaser.Math.Between( - this.deviation, this.deviation );
        var deviationY = Phaser.Math.Between( - this.deviation, this.deviation );

        bullet.setVelocity( this.bulletSpeed * this.dirX + deviationX, this.bulletSpeed * this.dirY + deviationY );

        var recoil = Phaser.Math.Between( - this.recoil, this.recoil );

        agent.setVelocity( -1 * this.dirX + recoil, -1 * this.dirY + recoil );

        if ( this.useSound ) 
        {
            this.scene.sound.play( this.useSound );
        }

        this.roundsLeft--;

        this.lastUsed = new Date();
    }
});

module.exports = Firearm;
