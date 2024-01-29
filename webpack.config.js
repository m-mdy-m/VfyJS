const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./index.js",
  output: {
    filename: "vfyjs.browser.js",
    path: path.resolve(__dirname, "dist"),
    library: "vfyjs",
    libraryTarget: "umd",
    globalObject: "this",
  },
  resolve: {
    fallback: {
      fs: false, // Exclude fs module
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  devtool: "source-map",
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
