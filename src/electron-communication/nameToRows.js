const fs = require('fs')

module.exports = names => {
  return new Promise((resolver, reject) => {
    try {
      const rows = names.map(name => name)
    } catch(e) {
      reject(e)
    }
  })
}