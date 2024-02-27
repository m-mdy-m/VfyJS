const path = require("path");
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
  plugins: [],
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
  optimization: {},
};
