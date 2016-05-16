var path = require('path');

var web3provider = process.env.WEB3_PROVIDER || 'http://localhost:8545';

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	entry: [
		'./index',
	],
	output: {
		path: path.resolve('./static/bundles/'),
		publicPath: '/static/bundles/',
		filename: '[name].js',
	},
	web3Loader: {
		provider: web3provider,
		constructorParams: {
			Chess: []
		}
	},
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				exclude: [/node_modules/, /\.tmp/],
				loader: 'jshint-loader'
			}
		],
		loaders: [
			{
				test: /\.sol$/,
				loaders: ['web3', 'solc']
			},
			{
				test: /\.json$/,
				loaders: ['json']
			},
			{
				test: /\.js$/,
				loaders: ['babel'],
				exclude: /node_modules/,
				include: __dirname
			},
			{
				test: /\.less$/,
				//loaders: ['style', 'css', 'less'], <-- Use this for inline CSS
				loader: ExtractTextPlugin.extract(// <-- Used for separate file CSS
						// activate source maps via loader query
						'css?sourceMap!' +
						'less?sourceMap'
						)
			},
		]
	},
	jshint: {
		emitErrors: true,
		failOnHint: false
	},
	plugins: [
		// extract inline css into separate 'styles.css'
		new ExtractTextPlugin('styles.css')
	]
};
