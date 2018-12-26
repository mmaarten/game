
var App = 
{
	Weapons : require( './Weapons' ),
	Agents  : require( './Agents' ),
	Scenes  : require( './Scenes' ),
};

module.exports = App;

global.App = App;

require( './init' );