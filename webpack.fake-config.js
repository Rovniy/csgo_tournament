const { join } = require('path')

module.exports = {
  resolve: {
    alias: {
      '@': join(__dirname),
      '~': join(__dirname, 'assets')
    }
  }
}
