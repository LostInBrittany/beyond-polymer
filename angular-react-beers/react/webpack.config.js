var webpack = require('webpack');

module.exports = {
  output: {
    path: './dist/',
    filename: '[name].js'
  },
  entry: {
    'beers': ['./src/all.js']
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel-loader?experimental&optional=runtime'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
