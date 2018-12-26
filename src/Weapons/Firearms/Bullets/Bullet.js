
var Sprite = require( './../../../Sprite' );

var Bullet = new Phaser.Class(
{
	Extends : Sprite,

    initialize :

    function constructor( scene, x, y, texture, frame )
    {
    	Sprite.call( this, scene, 0, 0, 'bullets.bullet' );

        this.setSize( 10, 10 );
        this.lifespan = 2000;
        this.damage = 25;
    },

    reset : function()
    {
        this.lifespan = 2000;

        this.setActive( true );
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

module.exports = Bullet;
