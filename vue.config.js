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
      .loader('./src/ChordProLoader.js')
      .end()
    // Chord Sheet Loader
    config.module
      .rule('chordsheet')
      .test(/\.(txt)$/)
      .use('chordsheet-loader')
      .loader('./src/ChordSheetLoader.js')
      .end()
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
