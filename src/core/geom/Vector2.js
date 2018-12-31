
class Vector2
{
	constructor( x, y )
	{
		this.x = x;
		this.y = y;
	}

	set( x, y )
	{
		this.setX( x );
		this.setY( y );
	}

	setX( x )
	{
		this.x = x;
	}

	setY( y )
	{
		this.y = y;
	}

	add( x, y )
	{
		this.addX( x );
		this.addY( y );
	}

	addX( x )
	{
		this.x += x;
	}

	addY( y )
	{
		this.y += y;
	}

	distance( x, y )
	{
		var v;

		if ( y !== undefined ) 
		{
			v = new Vector2( x, y );
		}

		else
		{
			v = x;
		}

		var x = v.x - this.x;
		var y = v.y - this.y;

		return Math.sqrt( x * x + y * y );
	}
}

module.exports = Vector2;
