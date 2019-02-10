const path = require('path');

module.exports = {
  entry: './src/main.ts',
  mode: 'production',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  externals: {
    three: 'THREE',
  },
  output: {
    filename: 'boardhouse.bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}