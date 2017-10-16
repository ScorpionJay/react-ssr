const request = require('request')

const banner = async (ctx, next) => {
    let data = await requestP('http://localhost:8889/banner')
    ctx.body = data
}

// 封装 Ajax，返回一个 Promise
const requestP = (url) => (
    new Promise(function (resolve, reject) {
        request(url, function (error, response, body) {
            console.log('error:', error);
            if (!error && response.statusCode == 200) {
                resolve(body)
            }
        })
    })
)

export default banner