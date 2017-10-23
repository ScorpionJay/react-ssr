/**
 * encrypt
 */

import CryptoJS from 'crypto-js'
// var CryptoJS = require("crypto-js");

// import JSEncrypt from 'jsencrypt'
import NodeRSA from 'node-rsa'
// console.log('aaaa',JSEncrypt)
// console.log(CryptoJS)
function ency(s) {
    // 生成3des密钥
    const letter = 'abcdefghijkllmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var key = ''
    for (var i = 0; i < 24; i++) {
        key += letter.charAt(parseInt(Math.random() * letter.length, 10))
    }
    // 使用3des加密 通过base64加密  key是密钥字符串
    var base64 = CryptoJS.enc.Utf8.parse(key)
    var encrypted = CryptoJS.TripleDES.encrypt(s, base64, {
        iv: CryptoJS.enc.Utf8.parse('01234567'),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }
    );

    var Dencrypted = CryptoJS.TripleDES.decrypt(encrypted, base64, {
        iv: CryptoJS.enc.Utf8.parse('01234567'),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }
    );
    // // 使用rsa加密密钥
    // var publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDQxIs7OcaCMWQnhp/75UV1j6NQhDOygTL3y+Fw0xhYf8ezLG7mQFr4MSvb4/8prnAni1XfOiV2sqpoLfLvQeMfRrlci9HemL4Xvq1bz3M40DJwWGd9xmsEHJ/4VFl3IXLd65t6/aQ+FTaWcu7WlR63uAOm3/9S7XJA1yHeQmlk/QIDAQAB"
    // // var encrypt = new JSEncrypt()
    // // encrypt.setPublicKey(publicKey)
    // // var rsaKey = encrypt.encrypt(key)
    // // key=base64=null

    // let public_key = insert_str(publicKey, '\n', 64);
    // public_key = '-----BEGIN PUBLIC KEY-----\n' + public_key + '-----END PUBLIC KEY-----';


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

function insert_str(str, insert_str, sn) {
    var newstr = "";
    for (var i = 0; i < str.length; i += sn) {
        var tmp = str.substring(i, i + sn);
        newstr += tmp + insert_str;
    }
    return newstr;
}

export default ency