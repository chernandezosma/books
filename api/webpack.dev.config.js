const path = require('path')
const nodeExternals = require('webpack-node-externals')
const dotEnv = require('dotenv')
const config = dotEnv.config().parsed
const targetDir = config.DIST_DIR || 'dist'
const sourceDir = config.SOURCE_DIR || 'src'

module.exports = {
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, sourceDir)
  ],
  output: {
    path: path.join(__dirname, targetDir),
    publicPath: '/',
    filename: config.DIST_SCRIPT
  },
  target: 'node',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false,   // if you don"t put this is, __dirname
    __filename: false,  // and __filename return blank or /
  },
  externals: [
    nodeExternals(),
  ], // Need this to avoid error when working with Express
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [],
}