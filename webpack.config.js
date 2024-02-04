const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production", 
  entry: "./index.js",
  output: {
    filename: "vfyjs.bundle.js",
    path: path.resolve(__dirname, "dist"),
    library: "vfyjs",
    libraryTarget: "umd",
    globalObject: "this",
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "LICENSE", to: "LICENSE" },
        { from: "README.md", to: "docs" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
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
  resolve: {
    fallback: {
      fs: false,
      path: require.resolve("path-browserify"),
    },
  },
};
