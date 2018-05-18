module.exports = {
  entry: './server/public/scripts/client.js',
  output: {
    path: `${__dirname}/server/public/dist`,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },

  mode: 'development'
}