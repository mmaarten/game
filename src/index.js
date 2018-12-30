
var App = 
{
	Scenes      : require( './scenes' ),
	GameObjects : require( './gameobjects' ),
};

module.exports = App;

global.App = App;

require( './init' );