import "dotenv/config"
import * as path from "path"
import * as webpack from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import "webpack-dev-server"

export type WebpackConfig = {
  mode?: "development" | "production"
  entry?: string
  template?: string
  port?: number
  publicUrl?: string
  outputDir?: string
}

const generateWebpackConfig = (config: WebpackConfig) => {
  const {
    mode = process.env.NODE_ENV! as "development" | "production",
    entry = "./src/index.tsx",
    template = "./public/index.html",
    port = process.env.PORT || 3000,
    publicUrl = process.env.PUBLIC_URL || "localhost",
    outputDir = process.env.outDir || "dist",
  } = config

  const dirToServe = outputDir

  const webpackConfig: webpack.Configuration = {
    mode,
    entry,
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
      new HtmlWebpackPlugin({ template, publicUrl }),
      new MiniCssExtractPlugin(),
      new webpack.ProvidePlugin({ process: "process/browser" }),
    ],
  }

  return webpackConfig
}

export { generateWebpackConfig }
