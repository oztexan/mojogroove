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
    // Setlist Loader
    config.module
      .rule('setlist')
      .test(/\.(lst)$/)
      .use('setlist-loader')
      .loader('./src/SetListLoader.js')
      .end()
    // Add another loader
  }
}
