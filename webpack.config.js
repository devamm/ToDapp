const path = require('path');

module.exports = {
  entry: [
    '@babel/polyfill',
    './src/index.js'
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
         use: ['style-loader', 'css-loader']
      } 
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'src'),
    filename: 'bundle.js'
  }
};