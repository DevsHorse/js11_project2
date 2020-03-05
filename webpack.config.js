/* eslint-disable no-undef */
/* eslint-disable strict */
// eslint-disable-next-line no-undef
const path = require('path');

module.exports = {
	entry: {
		main: './src/index.js'
	},
	output: {
		path: path.resolve(__dirname, '.dist'),
		filename: '[name].js',
		publicPath: '/dist'
	},
	devServer: {
		overlay: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: '/node_modules/'
			}
		]
	}
};
