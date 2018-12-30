
var Game   = require( './Game' );
var Scene1 = require( './scenes/Scene1' );

let game = new Game(
{
	width  : 32 * 25,
	height : 32 * 18,
	fps    : 60,
	scenes : [ Scene1 ],
	debug  : true,
});
