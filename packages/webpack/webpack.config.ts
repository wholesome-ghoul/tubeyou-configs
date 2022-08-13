import "dotenv/config"
import * as path from "path"
import * as webpack from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import "webpack-dev-server"

const mode = process.env.NODE_ENV! as "development" | "production"
const port = process.env.PORT || 3000
const publicUrl = process.env.PUBLIC_URL || "localhost"
const outputDir = process.env.outDir || "dist"
const dirToServe = outputDir

const config: webpack.Configuration = {
  mode,
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, outputDir),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, dirToServe),
    },
    open: true,
    port,
  },
  resolve: {
    extensions: [".tsx", ".jsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      publicUrl,
    }),
    new MiniCssExtractPlugin(),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
}

export default config
