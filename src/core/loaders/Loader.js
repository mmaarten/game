
var EventManager = require( './../events/EventManager' );

class Loader extends EventManager
{
	constructor( scene )
	{
		super();

		this.scene = scene;
		this.items = {};
		this.queue = [];
	}

	spriteSheet( key, url, data )
	{
		this.addItem( key, url, data, function( item )
		{
			if ( ! item.isLoaded ) 
			{
				return;
			}

			var config = {};

			if ( item.data.frameWidth !== undefined ) 
			{
				config.frameWidth = item.data.frameWidth;
			}

			if ( item.data.frameHeight !== undefined ) 
			{
				config.frameHeight = item.data.frameHeight;
			}

			if ( item.data.tileMargin !== undefined ) 
			{
				config.tileMargin = item.data.tileMargin;
			}

			if ( item.data.tilePadding !== undefined ) 
			{
				config.tilePadding = item.data.tilePadding;
			}

			this.scene.spriteSheets.add( item.key, item.img, config );

		}, this );
	}

	addItem( key, url, data, complete, context )
	{
		var item = 
		{
			key : key,
			url : url,
			data : data,
			isLoaded : false,
			complete : complete,
			context : context,
		};

		this.items[ item.key ] = item;
	}

	start()
	{
		// Build queue

		this.queue = [];

		for ( var i in this.items )
		{
			var item = this.items[ i ];

			if ( item.isLoaded ) 
			{
				continue;
			}

			this.queue.push( item.key );
		}

		if ( ! this.next() ) 
		{
			this.complete();
		}
	}

	next()
	{
		var key = this.queue.shift();

		if ( key === undefined ) 
		{
			return false;
		};

		var item = this.items[ key ], _this = this;

		item.img = new Image(); 

		item.img.onload = function()
		{
			_this.itemComplete( key );
		};

		item.img.onerror = function()
		{
			_this.itemError( key );
		};
		
		item.img.src = item.url;

		this.items[ key ] = item;

		return true;
	}

	itemComplete( key )
	{
		var item = this.items[ key ];

		item.isLoaded = true;

		this.items[ item.key ] = item;

		item.complete.call( item.context, item );

		if ( ! this.next() ) 
		{
			this.complete();
		}
	}

	itemError( key )
	{
		if ( ! this.next() ) 
		{
			this.complete();
		}
	}

	complete()
	{
		this.queue = [];

		this.trigger( 'complete' );
	}
}

module.exports = Loader;
