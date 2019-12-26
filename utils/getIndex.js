const fetch = require('node-fetch')

module.exports = async(src) => {
    const a = await fetch(src)
    const b = await a.text()
    console.log(b)
    return b
}