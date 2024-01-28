const path = require("path");

module.exports = {
  mode: "production",
  entry: "./index.js",
  output: {
    filename: "vfyjs.browser.js",
    path: path.resolve(__dirname),
    library: "vfyjs",
    libraryTarget: "umd",
    globalObject: "this",
  },
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      fs: false,
    },
  },
  devtool: "source-map",
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};