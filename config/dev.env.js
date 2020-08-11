'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
// 本地开发的地址
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: '"http://192.168.50.31:32000"'
})
