const { environment } = require('@rails/webpacker')
const merge = require('webpack-merge')

//set css-loader options
const CSSLoader = environment.loaders.get('style').use.find(el => el.loader === 'css-loader')
CSSLoader.options = merge(CSSLoader.options, {
  modules: true,
  sourceMap: true,
  localIdentName: '[name]__[local]___[hash:base64:5]'
})

const styleLoader = environment.loaders.get('style').use.find(el => el.loader === 'style-loader')
console.log( environment.loaders.get('style') )

module.exports = environment