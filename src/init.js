
require( './Plugins/UpdatePlugin' );

let game = new Phaser.Game(
{
    type   : Phaser.AUTO,
    width  : 650,
    height : 650 / 800 * 600,
    roundPixels: false,
    physics: 
    {
        default: 'arcade',
        arcade: 
        {
            gravity: { y: 0 },
            debug: false,
        }
    },
    scene : [ App.Scenes.MyScene ],
    plugins: 
    {
        scene: [{ key: 'updatePlugin', plugin: Phaser.Plugins.UpdatePlugin, mapping: 'updates' }]
    }
});
