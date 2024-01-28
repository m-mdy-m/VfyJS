const path = require('path');

module.exports = {
  mode: 'production', 
  entry: './index.js',
  output: {
    filename: 'vfyjs.browser.js',
    path: path.resolve(__dirname),
    library: 'vfyjs',
    libraryTarget: 'umd',
  },
  resolve: {
    fallback: {
      fs: false,
      path: require.resolve('path-browserify'),
    },
  },
};
