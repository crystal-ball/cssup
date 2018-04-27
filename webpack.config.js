const CSSUpPlugin = require('./webpack/plugin')

module.exports = {
  mode: 'development',

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{ loader: 'babel-loader' }],
      },
    ],
  },

  plugins: [new CSSUpPlugin()],
}
