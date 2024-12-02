Steps to reproduce:

1. `npm i`
2. Run: `ENTRY=untyped npm run build:webpack`
3. Run: `ENTRY=typed npm run build:webpack`
4. Run: `ENTRY=untyped npm run build`
5. Run: `ENTRY=typed npm run build`
6. Observe `dist/webpack` contains 3 files. Where the sourcemap files are named with the pattern of:
  - `{sourcemaps_content_hash}-{entry_name}-{entry_content_hash}-min.js.map`
7. Observe `dist/rspack` contains only 2 files. Because one is overwritten, due to the entries contenthash being used rather than the sourcemaps content hash, resulting in the pattern:
  - `{entry_content_hash}-{entry_name}-{entry_content_hash}-min.js.map`

When using the `SourceMapDevToolPlugin`, it is expected that the `[contenthash]` in it's configuration of the `filename` refers to the content hash of the sourcemap, not the content hash of the entry asset.