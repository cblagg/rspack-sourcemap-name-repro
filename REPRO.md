Steps to reproduct:

1. `npm i`
2. Run: `CSS_MINIFIER=rspack npm run build`
3. Run: `CSS_MINIFIER=webpack npm run build`
4. Observe .css files in each of `dist/rspack` and `dist/webpack` have differing content but share the same name

This is unexpected when using `[contenthash]` and `realContentHash: true`