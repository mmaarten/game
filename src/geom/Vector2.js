
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
		var x = this.x - x;
		var y = this.y - y;

		return Math.sqrt( x * x + y * y );
	}
}

module.exports = Vector2;
