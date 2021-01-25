// eslint-disable-next-line no-undef
module.exports = {
  test: /\.ts$/,
  loader: 'ts-loader',
  options: {
    appendTsSuffixTo: [/\.vue$/]
  }
};