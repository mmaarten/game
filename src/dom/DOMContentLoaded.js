
function DOMContentLoaded( callback, context )
{
	if ( document.readyState !== 'loading' ) 
	{
		callback.call( context );

		return;
	}

	document.addEventListener( 'DOMContentLoaded', function()
	{
		callback.call( context )
	});
}

module.exports = DOMContentLoaded;
