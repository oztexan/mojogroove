module.exports = {
  publicPath: '',
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack: config => {
    // Chordpro Loader
    config.module
      .rule('chordpro')
      .test(/\.(pro|cho|chordpro)$/)
      .use('chordpro-loader')
      .loader('./src/ChordProGrammar.js')
      .end()
    // Add another loader
  }
}
