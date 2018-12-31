
var Core = 
{
	DOM     : require( './dom' ),
	Events  : require( './events' ),
	Geom    : require( './geom' ),
	Input   : require( './input' ),
	Loaders : require( './loaders' ),
	Scenes  : require( './scenes' ),
	Sprites : require( './sprites' ),
	Tiles   : require( './tiles' ),
	Game    : require( './Game' ),
};

global.Core = Core;

module.exports = Core;
