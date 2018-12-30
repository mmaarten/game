
class Vector2
{
	constructor( x, y )
	{
		this.x = x || 0;
		this.y = y || 0;
	}

	set( x, y )
	{	
		this.x = x;
		this.y = y;
	}

	distance( x, y )
	{
		var target;
		
		if ( y !== undefined )
		{
			target = new Vector2( x, y );
		}

		else
		{
			target = x;
		}

		var x = this.x - target.x;
		var y = this.y - target.y;

		return Math.sqrt( x * x + y * y );
	}
}

module.exports = Vector2;
