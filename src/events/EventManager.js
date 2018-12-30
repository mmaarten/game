
class EventManager
{
	constructor()
	{
		this.listeners = {};
	}

	on( type, callback, context )
	{
		if ( this.listeners[ type ] === undefined ) 
		{
			this.listeners[ type ] = [];
		}

		var listener = 
		{
			callback : callback,
			context  : context
		};

		this.listeners[ type ].push( listener );
	}

	trigger( type, args )
	{
		if ( this.listeners[ type ] === undefined ) 
		{
			return;
		}

		for ( var i in this.listeners[ type ] )
		{
			var listener = this.listeners[ type ][ i ];

			listener.callback.apply( listener.context, args );
		}
	}
}

module.exports = EventManager;
