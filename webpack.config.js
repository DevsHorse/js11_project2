/* eslint-disable no-undef */
/* eslint-disable strict */
// eslint-disable-next-line no-undef
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const SRC = path.resolve(__dirname, 'src');
const DEST = path.resolve(__dirname, '.dist');

module.exports = {
	entry: {
		main: './src/index.js'
	},
	output: {
		path: DEST,
		filename: '[name].js',
		publicPath: '/dist'
	},
	devServer: {
		overlay: true,
		contentBase: DEST
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: '/node_modules/'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(SRC, 'index.html'),
			filename: 'index.html',
			chunks: null
		}),
		new CopyWebpackPlugin([
			{ from: path.resolve(SRC, 'css'), to: path.resolve(DEST, 'css') },
			{ from: path.resolve(SRC, 'fonts'), to: path.resolve(DEST, 'fonts') },
			{ from: path.resolve(SRC, 'images'), to: path.resolve(DEST, 'images') }
		])
	]
};

