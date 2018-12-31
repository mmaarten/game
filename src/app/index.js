
require( './../core' );

var Scenes = require( './scenes' );

let game = new Core.Game(
{
	parent : 'body',
	width  : 25 * 32,
	height : 18 * 32,
	fps    : 30,
	backgroundColor : 'black',
	scenes : [ Scenes.Scene1 ],
	debug  : true,
});
