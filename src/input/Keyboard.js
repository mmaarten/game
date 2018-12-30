
class Keyboard
{
	constructor()
	{
		this.keys = {};
		this.map  = {};

		var _this = this;

		document.addEventListener( 'keydown', function( event )
		{
			if ( _this.map[ event.key ] !== undefined ) 
			{
				var context = _this.map[ event.key ]; 

				_this.keys[ context ].isDown = true;
			}
		});

		document.addEventListener( 'keyup', function( event )
		{
			if ( _this.map[ event.key ] !== undefined ) 
			{
				var context = _this.map[ event.key ]; 

				_this.keys[ context ].isDown = false;
			}
		});
	}

	createKey( context, key )
	{
		this.keys[ context ] = 
		{
			key     : key,
			context : context,
			isDown  : false,
		};

		this.map[ key ] = context;
	}

	createKeys( keys )
	{
		for ( var i in keys )
		{
			this.createKey( i, keys[ i ] );
		}
	}
}

module.exports = Keyboard;
