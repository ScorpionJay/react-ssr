/**
 * login controller
 */

import request from '../util/request'
import config from '../util/config'
import NodeRSA from 'node-rsa'
import CryptoJS from 'crypto-js'

const login = async (ctx, next) => {
    console.log('get data', ctx.request.body)
    let data = ctx.request.body
    // need to validate

    // 使用rsa加密密钥
    let privateKey = `-----BEGIN RSA PRIVATE KEY-----
                        MIICXAIBAAKBgQCvLRjFx2RtOnBXovcoO62pZ/m+fo3r8ziFfxs94DjXDKr7Hsmf
                        kSxH4hLJ9duWEBROMyCPeZDzrplBgG0l+WjauWstzTK/0kiGOolTJRj7atAMpu1q
                        GFCrIBbtKOTRV3cCOrYrcak5Uflt9rlpqmCiPqd7XVgVBucUTBIC8oPrewIDAQAB
                        AoGBAJFG1ieYABpx/58+YLk2HQTEXSN1cx++Gx7jVeVP4fO+5sHSO6Yg0FdhDvH8
                        +roN5bkgv50dVXAyWZkv99UpbaGwKoD3q+UKapaI993ZbdI94XtNFG70OrO9cNQ2
                        StIwqXiojZGhY+LDsHcrQKwcPWmLPiSIsOABRcHMCKclWvDRAkEA0/kUQoGICAhC
                        c8R/VJqzkf48hbnt0AUPsOtDvKBcKi0V6SMVf6Y2gU1nQSVtRxjuxHE8rUCpkDIZ
                        Hyb9i53b2QJBANOPeefHc3msBfGqskztSll0U1njgxl7p8FZol8M9yjyl1faIePz
                        GXah1FctscQGCcrEE8Po5jkV5EL+Bo5O0XMCQBcO3DZT0tFU3K2tLVCtt2TlK/47
                        +HONaWSMYwTsyLnJx71hlKAbG4i7O8UpZha6zpZN3xTVmNxXpsXtvtzmIhkCQHsS
                        UzuHpuCYNxkAURs5S3BAoKCBHun7KnrrVu7ujvXuMia0SdTevehqeimA9pHvZVDk
                        wg7M9OkumAx01IGCzosCQGyd0S86S981c/k1z8ZmKfzI0kGEEgb+ukDRle8PsYts
                        C3JeciDYz/RPhGYkdH15w2RwD/xui1nzQGSLJhYSUJk=
                        -----END RSA PRIVATE KEY-----`

    let serverKey = new NodeRSA(privateKey)
    serverKey.setOptions({ encryptionScheme: 'pkcs1' })
    let key = serverKey.decrypt(data.key, 'utf8')
    let base64 = CryptoJS.enc.Utf8.parse(key)
    let Dencrypted = CryptoJS.TripleDES.decrypt(data.str, base64, {
        iv: CryptoJS.enc.Utf8.parse('01234567'),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }
    )
    let pwd =  Dencrypted.toString(CryptoJS.enc.Utf8)
    console.log('解密：',pwd)

    // check pwd


    // jwt
    // let data = await request(config.banner)
    ctx.body = {token:'asdfaf'}
}


export default { login }