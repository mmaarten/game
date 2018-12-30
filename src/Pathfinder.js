
class Pathfinder
{
	constructor( width, height, tiles )
	{
		this.width  = width;
		this.height = height;
		this.tiles  = tiles;

		var tiles = 
		[
			1,1,1,1,1,1,1,1,1,1,
			1,0,0,0,0,0,0,0,0,1,
			1,0,0,0,0,0,0,0,0,1,
			1,0,0,0,0,0,0,0,0,1,
			1,0,0,0,0,0,0,0,0,1,
			1,0,0,0,0,0,0,0,0,1,
			1,0,0,0,0,0,0,0,0,1,
			1,0,0,0,0,0,0,0,0,1,
			1,0,0,0,0,0,0,0,0,1,
			1,1,1,1,1,1,1,1,1,1,
		];
	}

	getTile( index )
	{
		return this.tiles[ index ];
	}

	getTileIndex( x, y )
	{
		return this.width * y + x;
	}

	getTileAt( x, y )
	{
		var index = this.getTileIndex( x, y );

		return this.getTile( index );
	}

	getTileLocation( index )
	{
		var x = index % this.width;
		var y = ( index - x ) / this.width;

		return { x : x, y : y };
	}

	getNeighbours( index, diagonal )
	{
		if ( diagonal === undefined ) diagonal = false;

		var loc = this.getTileLocation( index );

		var n  = this.getTileAt( loc.x + 0, loc.y - 1 );
		var ne = this.getTileAt( loc.x + 1, loc.y - 1 );
		var e  = this.getTileAt( loc.x + 1, loc.y + 0 );
		var se = this.getTileAt( loc.x + 1, loc.y - 1 );
		var s  = this.getTileAt( loc.x + 0, loc.y + 1 );
		var sw = this.getTileAt( loc.x - 1, loc.y - 1 );
		var w  = this.getTileAt( loc.x - 1, loc.y + 0 );
		var nw = this.getTileAt( loc.x - 1, loc.y - 1 );

		var neighbors = [];

		if ( ! n ) neighbors.push( n );
		if ( ! e ) neighbors.push( e );
		if ( ! s ) neighbors.push( s );
		if ( ! w ) neighbors.push( w );

		if ( diagonal ) 
		{
			if ( ! ne && ! n && ! e ) neighbors.push( ne );
			if ( ! se && ! s && ! e ) neighbors.push( se );
			if ( ! sw && ! s && ! w ) neighbors.push( sw );
			if ( ! nw && ! n && ! w ) neighbors.push( nw );
		};

		return neighbors;
	}

	getField( index )
	{
		var frontier = [ index ];
		var visited = { [ index ] : 0 };

		while ( frontier.length )
		{
			var current = frontier.shift();

			var neighbors = this.getNeighbours( current );

			for ( var i in neighbors )
			{
				var next = neighbors[ i ];

				if ( visited[ next ] === undefined ) 
				{
					frontier.push( next );

					visited[ next ] = 1 + visited[ current ];
				}
			}
		}

		return visited;
	}

	getPath( a, b )
	{
		
	}
}

module.exports = Pathfinder;
