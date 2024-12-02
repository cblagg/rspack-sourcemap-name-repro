
import rspack from '@rspack/core';
import webpack from 'webpack';
import path from 'node:path';

const BUNDLER = process.argv[1].endsWith('rspack') ?
  'rspack' : 'webpack';

const ENTRY = process.env.ENTRY === 'typed' ?
  'main.typed.ts' :
  'main.any.ts';

export default {
  mode: 'production',

  entry: {
    main: `./src/${ENTRY}`
  },

  output: {
    path: path.join(process.cwd(), 'dist', BUNDLER),
    filename: '[name]-[contenthash]-min.js'
  },

  module: {
    rules: [
      {
        loader: BUNDLER === 'rspack' ? 'builtin:swc-loader' : 'swc-loader',
        options: {
          sync: true,
          sourceMaps: true,
          parseMap: true,
          module: {
            type: 'commonjs',
            ignoreDynamic: true,
          },
          jsc: {
            parser: {
              syntax: 'typescript',
              tsx: true,
              exportDefaultFrom: true,
              exportNamespaceFrom: true,
              dynamicImport: true,
            },
            preserveAllComments: true,
            minify: {
              compress: false,
              mangle: false,
            }
          }
        }
      }
    ]
  },

  plugins: [
    BUNDLER === 'rspack' ?
      new rspack.SourceMapDevToolPlugin({
        append: false,
        filename: '[contenthash]-[file].map[query]',
      }) :
      new webpack.SourceMapDevToolPlugin({
        append: false,
        filename: '[contenthash]-[file].map[query]',
      })
  ]
};