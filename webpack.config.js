const path = require('path');

var commonConfig = {
  devtool: 'inline-source-map',
  mode: 'production',
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
  }
}

var boardhouseConfig = Object.assign({}, commonConfig, {
  entry: './src/main.ts',
  externals: 
  {
    three: 'THREE',
  },
  output: {
    filename: 'boardhouse.bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
});

// var threeConfig = Object.assign({}, commonConfig, {
//   entry: './node_modules/three/src/Three.js',
//   output: {
//     filename: 'three.bundle.js',
//     path: path.resolve(__dirname, 'dist')
//   }
// });

module.exports = [
  boardhouseConfig,
  // threeConfig,
];