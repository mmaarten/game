
function between( x1, y1, x2, y2 )
{
	var x = x1 - x2;
	var y = y1 - y2;

	return Math.sqrt( x * x + y * y );
}

module.exports = between;
