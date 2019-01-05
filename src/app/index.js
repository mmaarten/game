
require( './../core' );

var Scenes = require( './scenes' );

let game = new Core.Game(
{
	parent : 'body',
	width  : 32 * 25,
	height : 32 * 18,
	fps    : 30,
	backgroundColor : 'black',
	scenes : [ Scenes.Scene1 ],
	debug  : true,
});
