const { environment } = require('@rails/webpacker')
const merge = require('webpack-merge')

//set style loader options
const CSSLoader = environment.loaders.get('style').use.find(el => el.loader === 'css-loader')
CSSLoader.options = merge(CSSLoader.options, {
  modules: true,
  sourceMap: true,
  localIdentName: '[name]__[local]___[hash:base64:5]'
})

module.exports = environment