
function DOMContentLoaded( callback, context )
{
	if( document.readyState === "complete" ) 
	{
  		callback.call( context );
	}
	
	else 
	{
  		document.addEventListener( 'DOMContentLoaded', function()
  		{
  			callback.call( context );
  		}, false);
	}
}

module.exports = DOMContentLoaded;
