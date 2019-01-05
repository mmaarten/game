
class Rectangle
{
	static getIntersection( rectA, rectB )
	{
		var output = new Rectangle();

	    if ( Rectangle.intersects( rectA, rectB ) )
	    {
			output.left   = Math.max( rectA.left, rectB.left );
			output.top    = Math.max( rectA.top, rectB.top);
			output.width  = Math.min( rectA.right, rectB.right );
			output.height = Math.min( rectA.bottom, rectB.bottom );
	    }

	    return output;
	}

	static intersects( rectA, rectB )
	{
		return !( rectB.left > rectA.right || 
           rectB.right < rectA.left || 
           rectB.top > rectA.bottom ||
           rectB.bottom < rectA.top );
	}

	constructor( x, y, width, height )
	{
		if ( x === undefined )      x = 0;
        if ( y === undefined )      y = 0;
        if ( width === undefined )  width = 0;
        if ( height === undefined ) height = 0;

		this.left   = x;
		this.right  = x + width;
		this.top    = y;
		this.bottom = y + height;
	}
}

module.exports = Rectangle;
