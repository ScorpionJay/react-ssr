/**
 * encrypt
 */

import CryptoJS from 'crypto-js'
import NodeRSA from 'node-rsa'

function ency(s) {
    // 生成3des密钥
    const letter = 'abcdefghijkllmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let key = ''
    for (var i = 0; i < 24; i++) {
        key += letter.charAt(parseInt(Math.random() * letter.length, 10))
    }
    // 使用3des加密 通过base64加密  key是密钥字符串
    let base64 = CryptoJS.enc.Utf8.parse(key)
    let encrypted = CryptoJS.TripleDES.encrypt(s, base64, {
        iv: CryptoJS.enc.Utf8.parse('01234567'),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }
    )

    let public_key = `-----BEGIN PUBLIC KEY-----
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCvLRjFx2RtOnBXovcoO62pZ/m+
    fo3r8ziFfxs94DjXDKr7HsmfkSxH4hLJ9duWEBROMyCPeZDzrplBgG0l+WjauWst
    zTK/0kiGOolTJRj7atAMpu1qGFCrIBbtKOTRV3cCOrYrcak5Uflt9rlpqmCiPqd7
    XVgVBucUTBIC8oPrewIDAQAB
    -----END PUBLIC KEY-----`

    let clientKey = new NodeRSA(public_key)
    clientKey.setOptions({ encryptionScheme: 'pkcs1' })
    let rsaKey = clientKey.encrypt(key, 'base64')

    return {
        key: rsaKey,
        str: encrypted.toString()
    }
}

export default ency