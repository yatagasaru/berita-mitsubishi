const xray = require('x-ray')()
const fetch = require('../utils/getIndex')

app = {}

app.mmksi = async(src) => {
    src = src === 'news' ? await fetch('https://mitsubishi-motors.co.id/category/news-id') : await fetch('https://mitsubishi-motors.co.id/siaran-pers')
    return new Promise((resolve, reject) => {
        xray(src, {
            res: xray('#slider-archive', {
                title: 'h2.title-secondary_giant',
                tgl: 'label',
                link: 'a@href',
                img: 'img@src',
            }),
            res2: xray('main section div.row:nth-child(3) div.ev-sm-12.ev-md-4.match', [
                {
                    title: 'h3.title-secondary_large',
                    tgl : 'label',
                    link: 'a@href',
                    img: 'img@src'
                }
            ])
        })((err, obj) => {
            if(!obj){
                reject(err)    
            }
            else {
                obj.res.title = obj.res.title.slice(0, -14)
                obj.res2 = obj.res2.map(item => {
                    item.title = item.title.slice(0, -14)
                    return item
                })
                const ret = [obj.res, ...obj.res2]
                resolve(ret)
            }
        })
    })
}

app.ktb = async(src) => {
    src = src === 'news' ? await fetch('https://ktbfuso.co.id/news-list/fuso-update') : await fetch('https://ktbfuso.co.id/news-list/siaran-pers')
    return new Promise((resolve, reject) => {
        xray(src, {
            res: xray('div.main-content .box-ask', [{
                title: '.floating_title',
                tgl: '.floating_date',
                link: 'a@href',
                img: 'img@src',
            }])
        })((err, obj) => {
            if(!obj){
                reject(err)
            }
            else{
                resolve(obj.res)
            }
        })
    })
}

module.exports = app;

