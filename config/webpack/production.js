/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const environment = require('./environment');

module.exports = environment.toWebpackConfig();
