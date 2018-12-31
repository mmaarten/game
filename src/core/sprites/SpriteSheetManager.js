
var SpriteSheet = require( './SpriteSheet' ); 

class SpriteSheetManager
{
	constructor()
	{
		this.sheets = {};
	}

	get( id )
	{
		return this.sheets[ id ];
	}

	add( id, img, config )
	{
		var sheet = new SpriteSheet( id, img, config );

		this.sheets[ sheet.id ] = sheet;
	}
}

module.exports = SpriteSheetManager;
