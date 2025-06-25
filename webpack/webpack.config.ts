import {resolve} from 'path';
import {Configuration} from 'webpack';

const config: Configuration = {
	entry: './src/index.ts',
	context: resolve(__dirname, '../client'),
	devtool: 'source-map',
	mode: 'development',
	module: {
		rules: [{
			test: /\.ts?$/,
			loader: 'ts-loader',
			exclude: /node_modules/
		}],
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	output: {
		filename: 'index.js',
		path: resolve(__dirname, '../dist'),
	}
};

export default config;
