import "dotenv/config"
import * as webpack from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import dotenv from "dotenv-webpack"
import "webpack-dev-server"

export type WebpackConfig = {
  mode?: "development" | "production"
  entry?: string
  template?: string
  port?: number
  publicUrl?: string
  outputDir: string
}

const generateWebpackConfig = (config: WebpackConfig) => {
  const {
    mode = process.env.NODE_ENV! as "development" | "production",
    entry = "./src/index.tsx",
    template,
    port = process.env.PORT || 3000,
    publicUrl,
    outputDir,
  } = config

  const dirToServe = outputDir

  const plugins: any = [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new dotenv(),
    new webpack.ProvidePlugin({ process: "process/browser" }),
  ]

  if (template && publicUrl) {
    plugins.push(new HtmlWebpackPlugin({ template, publicUrl }))
  }

  const webpackConfig: webpack.Configuration = {
    mode,
    entry,
    output: {
      path: outputDir,
      filename: "js/[name].bundle.js",
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
          test: /\.(sa|sc|c)ss$/i,
          use: [
            mode === "development"
              ? "style-loader"
              : MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
          ],
        },
      ],
    },
    devServer: {
      static: {
        directory: dirToServe,
      },
      open: true,
      port,
    },
    resolve: {
      extensions: [".tsx", ".jsx", ".ts", ".js"],
    },
    plugins,
  }

  return webpackConfig
}

export { generateWebpackConfig }
