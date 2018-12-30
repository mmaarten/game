
var EventManager = require( './../events/EventManager.js' );

class Loader extends EventManager
{
	constructor()
	{
		super();

		this.items = {};
		this.queue = [];
	}

	add( key, url, data )
	{
		var item = 
		{
			key : key,
			url : url,
			img : new Image(),
			isLoaded : false,
			data : data || {},
		};

		this.items[ item.key ] = item;
	}

	get( key )
	{
		return this.items[ key ];
	}

	next()
	{
		var item = this.queue[ 0 ], _this = this;

		item.img.onload = function()
		{
			_this.itemComplete( item );
		}

		item.img.onerror = function()
		{
			_this.itemError( item );
		}

		item.img.src = item.url;
	}

	itemComplete( item )
	{
		item.isLoaded = true;

		this.items[ item.key ] = item;

		this.queue.shift();

		if ( this.queue.length ) 
		{
			this.next();
		}

		else
		{
			this.complete();
		}
	}

	itemError( item )
	{
		this.queue.shift();

		if ( this.queue.length ) 
		{
			this.next();
		}

		else
		{
			this.complete();
		}
	}

	complete()
	{
		this.trigger( 'complete' );

		this.queue = [];
	}

	start()
	{
		this.queue = Object.values( this.items );

		if ( this.queue.length ) 
		{
			this.next();
		}

		else
		{
			this.complete();
		}
	}
}

module.exports = Loader;
