
var Tile = require( './Tile' );
var Geom = require( './../geom' );

class TileMap
{
	constructor( scene, config )
	{
		var defaults = 
		{
			width          : undefined,
			height         : undefined,
			tileSize       : 32,
			tileData       : [],
			tileProperties : {},
			tileSheet      : '',
		};

		config = Object.assign( {}, defaults, config );

		this.scene          = scene;
		this.width          = config.width;
		this.height         = config.height;
		this.tileSize       = config.tileSize;
		this.tileData       = config.tileData;
		this.tileProperties = config.tileProperties;
		this.tileSheet      = config.tileSheet;
		this.tiles          = {};

		// Create tiles
		for ( var index = 0; index < this.tileData.length; index++ )
		{
			this.setTile( index, this.tileData[ index ] );
		}
	}

	setTile( index, type )
	{
		var loc   = this.getTileLocation( index );
		var props = this.tileProperties[ type ] || {};

		var tile = new Tile(
			this,
			index,
			loc.x,
			loc.y,
			this.tileSize,
			this.tileSize,
			type,
			props.collide !== undefined ? props.collide : false
		);

		this.tiles[ tile.index ] = tile;
	}

	getTile( index )
	{
		return this.tiles[ index ];
	}

	getTileAt( x, y, translate )
	{
		var index = this.getTileIndex( x, y, translate );

		return this.getTile( index );
	}

	getTileIndex( x, y, translate )
	{
		if ( translate ) 
		{
			x = Math.floor( x / this.tileSize );
			y = Math.floor( y / this.tileSize );
		}

		if ( x < 0 || x >= this.width || y < 0 || y >= this.height ) 
		{
			return -1;
		}

		return this.width * y + x;
	}

	getTileLocation( index )
	{
		var x = index % this.width;
		var y = ( index - x ) / this.width;

		return { x : x, y : y };
	}

	getTileNeighbors( index, diagonal )
	{
		if ( diagonal === undefined ) diagonal = false;

		var loc = this.getTileLocation( index );

		var n  = this.getTileAt( loc.x + 0, loc.y - 1 );
		var ne = this.getTileAt( loc.x + 1, loc.y - 1 );
		var e  = this.getTileAt( loc.x + 1, loc.y + 0 );
		var se = this.getTileAt( loc.x + 1, loc.y + 1 );
		var s  = this.getTileAt( loc.x + 0, loc.y + 1 );
		var sw = this.getTileAt( loc.x - 1, loc.y + 1 );
		var w  = this.getTileAt( loc.x - 1, loc.y + 0 );
		var nw = this.getTileAt( loc.x - 1, loc.y - 1 );

		var neighbors = [];

		if ( n && ! n.collide ) neighbors.push( n.index );
		if ( e && ! e.collide ) neighbors.push( e.index );
		if ( s && ! s.collide ) neighbors.push( s.index );
		if ( w && ! w.collide ) neighbors.push( w.index );

		if ( diagonal ) 
		{
			if ( ne && ! ne.collide && n && ! n.collide && e && ! e.collide ) neighbors.push( ne.index );
			if ( se && ! se.collide && s && ! s.collide && e && ! e.collide ) neighbors.push( se.index );
			if ( sw && ! sw.collide && s && ! s.collide && w && ! w.collide ) neighbors.push( sw.index );
			if ( nw && ! nw.collide && n && ! n.collide && w && ! w.collide ) neighbors.push( nw.index );
		};

		return neighbors;
	}

	getFlowField( index )
	{
		var frontier = [ index ];
		var visited = { [ index ] : 0 };

		while ( frontier.length )
		{
			var current = frontier.shift();

			var neighbors = this.getTileNeighbors( current );

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

	getPath( a, b, translate )
	{
		if ( translate === undefined ) translate = false;

		var field = this.getFlowField( b );

		if ( field[ a ] === undefined || field[ b ] === undefined ) 
		{
			console.warn( 'Unable to find path from ' + a + ' to ' + b + '.' );

			return [];
		}

		var path = [];

		//

		var frontier = [ a ];
		var visited = { [ a ] : true };

		while ( frontier.length )
		{
			var current = frontier.shift();
			var next, cost;

			// Get neighbor with lowest cost
			var neighbors = this.getTileNeighbors( current, true );

			for ( var i in neighbors )
			{
				var neighbor = neighbors[ i ];

				if ( cost === undefined || cost > field[ neighbor ] ) 
				{
					cost = field[ neighbor ];
					next = neighbor;
				}
			}

			if ( next !== undefined && visited[ next ] === undefined ) 
			{
				frontier.push( next );

				visited[ next ] = true;

				path.push( next );
			}
		}

		//

		if ( translate ) 
		{
			return this.translatePath( path );
		}

		return path;
	}

	translatePath( path )
	{
		var translation = [];

		for ( var i in path )
		{
			var index = path[ i ];
			var tile  = this.getTile( index );

			var position = new Geom.Vector2( tile.xPixels + tile.width / 2, tile.yPixels + tile.height / 2 );

			translation.push( position );
		}

		return translation;
	}

	render()
	{
		var sheet   = this.scene.loader.get( this.tileSheet );
		var context = this.scene.game.canvas.getContext( '2d' );

		for ( var i in this.tiles )
		{
			var tile = this.tiles[ i ];

			var index = parseInt( tile.type );
			var col   = index % Math.floor( sheet.img.width / this.tileSize );
			var row   = ( index - col ) / Math.floor( sheet.img.width / this.tileSize );

			context.save();
			context.translate( tile.xPixels, tile.yPixels );
			context.drawImage( sheet.img,
				col * ( tile.width + sheet.data.spacing ) + sheet.data.margin,
				row * ( tile.height + sheet.data.spacing ) + sheet.data.margin,
				tile.width,
				tile.height,
				0,
				0,
				tile.width,
				tile.height );
			context.restore();

			// Debug
			context.save();
			context.translate( tile.xPixels, tile.yPixels );
			context.strokeStyle = 'rgba( 0, 0, 0,.15 )';
			context.strokeRect( 0, 0, tile.width, tile.height );
			context.restore();
		}
	}
}

module.exports = TileMap;
