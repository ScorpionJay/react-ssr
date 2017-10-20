import CryptoJS from 'crypto-js'
// var CryptoJS = require("crypto-js");

// import JSEncrypt from 'jsencrypt'
// console.log('aaaa',JSEncrypt)
// console.log(CryptoJS)
function ency(s){
    // 生成3des密钥
    const letter = 'abcdefghijkllmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var key = ''	
    for(var i=0 ;i<24; i++ ){
        key += letter.charAt(parseInt(Math.random()*letter.length, 10))
    }
    // 使用3des加密 通过base64加密  key是密钥字符串
    var base64 =  CryptoJS.enc.Utf8.parse(key)
    key = CryptoJS.enc.Base64.stringify(base64)
    var encrypted = CryptoJS.TripleDES.encrypt(s, base64, {    
	    iv:CryptoJS.enc.Utf8.parse('01234567'),    
	    mode: CryptoJS.mode.CBC,  
	    padding: CryptoJS.pad.Pkcs7}
    );

    // 使用rsa加密密钥
    var publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDQxIs7OcaCMWQnhp/75UV1j6NQhDOygTL3y+Fw0xhYf8ezLG7mQFr4MSvb4/8prnAni1XfOiV2sqpoLfLvQeMfRrlci9HemL4Xvq1bz3M40DJwWGd9xmsEHJ/4VFl3IXLd65t6/aQ+FTaWcu7WlR63uAOm3/9S7XJA1yHeQmlk/QIDAQAB"
    var encrypt = new JSEncrypt()
    encrypt.setPublicKey(publicKey)
    var rsaKey = encrypt.encrypt(key)
	key=base64=null
    return {
    	key:rsaKey,
    	str:encrypted.toString()
    }
}

export default ency