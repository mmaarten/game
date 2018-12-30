
let game = new Phaser.Game(
{
    type   : Phaser.AUTO,
    width  : 650,
    height : 650 / 800 * 600,
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
    scene : [ App.Scenes.MyScene ],
});
