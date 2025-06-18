import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Configuration as WebpackConfiguration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import webpack from 'webpack';
import 'dotenv/config';

require('dotenv').config();
interface Configuration extends WebpackConfiguration {
  devServer?: DevServerConfiguration;
}
const config: Configuration = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      { test: /\.(png|jpe?g|gif)$/i, use: ['file-loader'] },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'public/index.html' }),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_OPENWEATHER_API_KEY': JSON.stringify(
        process.env.REACT_APP_OPENWEATHER_API_KEY,
      ),
      'process.env.REACT_APP_IPINFO_TOKEN': JSON.stringify(
        process.env.REACT_APP_IPINFO_TOKEN,
      ),
      'process.env.REACT_APP_YANDEX_MAPS_API_KEY': JSON.stringify(
        process.env.REACT_APP_YANDEX_MAPS_API_KEY,
      ),
    }),
  ],
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'dist'),
      publicPath: '/',
    },
    port: 3000,
    open: true,
  },
};

export default config;
