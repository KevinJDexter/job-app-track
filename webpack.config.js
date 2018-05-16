module.exports = {
  entry: './server/public/scripts/client.js',
  output: {
    path: `${__dirname}/server/public/dist`,
    filename: 'bundle.js'
  },

  mode: 'development'
}