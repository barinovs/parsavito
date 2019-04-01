const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let conf = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'main.js',
    publicPath: 'dist/'
  },
  devServer: {
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // exclude: '/node-modules/'
      },
      {
        test: /\.css$/,
        /*
        use: [
          'style-loader',
          'css-loader'
        ]
        */
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  devtool: 'eval-sourcemap',
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ]
}

module.exports = (env, options) => {
  let production = options.mode === 'production';
  conf.devtool = production ? false : 'eval-sourcemap'
  return conf;
}
