
const {send} = require('micro')
const {router, get} = require('micro-fork')
const parser = require('./engine/index')

const indexText = `Mitsubishi news parser v.1.0.0\n
MMKSI : /mmksi, /mmksi/news, /mmksi/pers
KTB : /ktb, /ktb/news, /ktb/pers
`
const index = async(req, res) => send(res, 200, indexText)
const mmksi = async (req, res) => {
    const ret = {
        NEWS : await parser.mmksi('news'),
        PERS : await parser.mmksi('pers')
    }
    send(res, 200, ret)
}

const mmksiMode = async(req, res) => {
    send(res, 200, await parser.mmksi(req.params.mode))
}

const ktb = async(req, res) => {
    const ret = {
        NEWS : await parser.ktb('news'),
        PERS : await parser.ktb('pers')
    }
    send(res, 200, ret)
}

const ktbMode = async(req, res) => {
    send(res, 200, await parser.ktb(req.params.mode))
}


module.exports = router()(
    get('/', index),
    get('/mmksi', mmksi),
    get('/mmksi/:mode', mmksiMode),
    get('/ktb', ktb),
    get('/ktb/:mode', ktbMode)
  )