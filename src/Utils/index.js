
function getDirection( x1, y1, x2, y2 )
{
	var distance = Phaser.Math.Distance.Between( x1, y1, x2, y2 );

	return { 
		x : ( x2 - x1 ) / distance,
		y : ( y2 - y1 ) / distance
	}
}

module.exports = 
{
	getDirection : getDirection,
};
