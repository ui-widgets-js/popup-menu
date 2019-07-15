const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  entry: './demo/index.js',
  output: {
    path: path.resolve(__dirname, './demo/'),
    filename: 'demo.bundle.js'
  }
};
