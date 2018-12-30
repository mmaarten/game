
class Rectangle
{
	constructor( x, y, width, height )
	{
		this.left;
		this.right;
		this.top;
		this.bottom;
		
		this.setPosition( x, y );
		this.setSize( width, height );
	}

	setPosition( x, y )
	{
		this.x = x;
		this.y = y;

		this.update();
	}

	setSize( width, height )
	{
		this.width  = width;
		this.height = height;

		this.update();
	}

	update()
	{
		this.left   = this.x;
		this.right  = this.x + this.width;
		this.top    = this.y;
		this.bottom = this.y + this.height;
	}

	contains( rect )
	{	
		return ! ( rect.left > this.right || 
           rect.right < this.left || 
           rect.top > this.bottom ||
           rect.bottom < this.top );
	}
}

module.exports = Rectangle;
