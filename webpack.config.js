
const path = require( 'path' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );

module.exports =
{
	mode: "development", // "production" | "development" | "none"
  	entry: './src/index.js',
	output: 
	{
		filename: 'main.js',
		path: path.resolve( __dirname, 'dist' ),
	},
	watch: true,
	plugins :
	[
		new CopyWebpackPlugin(
		[
			{ from: 'node_modules/phaser/dist/phaser.min.js*', to: 'js/phaser.min.js' },
		], {} ),
	]
};