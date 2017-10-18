import request from '../util/request'
import config from '../util/config'

const banner = async (ctx, next) => {
    let data = await request(config.banner)
    ctx.body = data
}

const music = async (ctx, next) => {
    let data = await request(config.music)
    ctx.body = data
}

export default { banner, music }