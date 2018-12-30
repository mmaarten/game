
class Renderer
{
	constructor( game, config )
	{
		var defaults = 
		{
			parent : 'body',
			width  : 800,
			height : 600,
			backgroundColor : 'black',
		};

		config = Object.assign( {}, defaults, config );

		this.parent          = config.parent;
		this.width           = config.width;
		this.height          = config.height;
		this.backgroundColor = config.backgroundColor;

		this.canvas = document.createElement( 'canvas' );
		this.canvas.width  = this.width;
		this.canvas.height = this.height;
		this.canvas.style['background-color'] = this.backgroundColor;
	}

}

module.exports = Renderer;
