
import rspack from '@rspack/core';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

const CSS_MINIFIER_OPTION = process.env.CSS_MINIFIER;

export default {
  mode: 'production',

  optimization: {
    minimizer: [
      CSS_MINIFIER_OPTION === 'rspack' && new rspack.LightningCssMinimizerRspackPlugin()
    ].filter(Boolean),
    realContentHash: true
  },

  output: {
    path: `dist/${CSS_MINIFIER_OPTION}`
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: rspack.CssExtractRspackPlugin.loader,
            options: {
              esModule: false,
            }
          },
          {
            loader: 'css-loader',
            options: {
              esModule: false,
              modules: {
                namedExport: false,
                exportLocalsConvention: 'as-is',
                mode: 'global',
                localIdentName: '[hash:base64]',
              },
              url: false,
              importLoaders: 0,
            },
          }
        ],
      },
    ],
  },

  plugins: [
    (CSS_MINIFIER_OPTION === 'webpack') && new CssMinimizerPlugin({
      minimizerOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
    }),

    new rspack.CssExtractRspackPlugin({
      filename: `./[name]-[contenthash]-min.css`,
      chunkFilename: `./[contenthash]-min.css`,
      ignoreOrder: true,
    }),
  ]
};