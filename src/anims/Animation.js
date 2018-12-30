
class Animation
{
	constructor()
	{
		this.instances = {},

		this.key   = null;
		this.frame = null;
		this.loop  = true;
	}
		
	create( config )
	{
		var defaults = 
		{
			key       : '',
			frames    : [],
	        frameRate : 20,
	        repeat    : -1,
		};

		var anim = Object.assign( {}, defaults, config );

		this.instances[ anim.key ] = anim;
	}

	play( key, loop )
	{
		if ( loop === undefined ) loop = true;

		var instance = this.instances[ key ];

		if ( key != this.key ) 
		{
			this.key   = key;
			this.frame = instance.frames[0];
		}

		this.loop = loop;
	}

	update( time, delta )
	{
		if ( this.key === null ) 
		{
			return;
		}

		var instance = this.instances[ this.key ];

		var frames = instance.frames;
		var index  = frames.indexOf( this.frame );

		if ( index == -1 ) 
		{
			this.frame = 0;

			return;
		}

		if ( this.loop && index + 1 < frames.length ) 
		{
			index++;
		}

		else
		{
			index = 0;
		}

		this.frame = frames[ index ];
	}
}

module.exports = Animation;
