const path = require('path');
const webpack = require('webpack');
const bundleName = 'bundle';

module.exports = {
	entry: [ __dirname + '/src/index.jsx', __dirname + '/ui/sass/main.scss' ],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: `${bundleName}.js`
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [ 
					{ loader: 'babel-loader' }
				]
			},
			{
				test: /\.scss$/,
				exclude: /bower_components/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'sass-loader' }
				]
			},
			{
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' }
				]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					{ loader: 'file-loader' }
				]
			},
			{
			  test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
			  loader: 'url-loader?limit=10000&mimetype=application/font-woff'
			},
			{
			  test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
			  loader: 'url-loader?limit=10000&mimetype=application/font-woff'
			},
			{
			  test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			  loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
			},
			{
			  test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			  loader: 'file-loader'
			},
			{
			  test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
			}
		]
	},
	resolve: {
		modules: [
			path.resolve(__dirname, 'node_modules'),
			path.resolve(__dirname, 'bower_components')
		],
		descriptionFiles: ['package.json', 'bower.json'],
		extensions: ['.js', '.jsx', '.scss']
	},
	plugins: [
		// new webpack.optimize.UglifyJsPlugin({
		// 	output: {
		// 		comments: false
		// 	}
		// })
	]
};