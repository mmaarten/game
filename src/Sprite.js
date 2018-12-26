
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

module.exports = Sprite;