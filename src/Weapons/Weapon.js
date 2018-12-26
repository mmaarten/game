
var Weapon = new Phaser.Class(
{
    initialize :

    function constructor( scene )
    {
    	this.scene = scene;

    	this.dirX = 0;
    	this.dirY = 0;
    },

    setDirection : function( dirX, dirY )
    {
    	this.dirX = dirX;
    	this.dirY = dirY;
    },

    use : function( agent )
    {
    	
    }
});

module.exports = Weapon;
