// eslint-disable-next-line no-undef
module.exports = {
  test: /\.(js|ts|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  options: {
    // eslint-disable-next-line no-undef
    formatter: require('eslint-friendly-formatter')
  }
};