import async from 'async'
require("babel-polyfill")
import Storage from './storage'
//url, method = 'get', data = {}, headers = { 'Content-Type': 'application/json' }
export default async (config) => {
    if (window.fetch) {//浏览器支持fetch
        let requestConfig = {
            method: config.method || 'get',
            headers: config.headers || {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: config.data || {}
        }

        if (requestConfig.method === 'post') {
            Object.defineProperty(requestConfig, 'body', { value: JSON.stringify(config.data) });
        } else {
            let dataStr = '';
            // for (let [k, v] of Object.entries(requestConfig.data)) {
            //     dataStr += `${k}=${v}&`;
            // }

            // if (dataStr !== '') {
            //     url = url + '?' + dataStr.substr(0, dataStr.lastIndexOf('&'));
            // }
        }

        // header
        // if (Object.keys(config.headers).length !== 0) {
        //     Object.assign(requestConfig.headers, config.headers);
        // }
        try {
            let response = await fetch(config.url, requestConfig);
            // 这里处理的感觉还不是太好
            // token 过期
            if (response.status === 401) {
                // throw new Error('token 过期');
                Storage.clear();
                location.href = '/';
            } else {
                let data;
                switch (requestConfig.headers.Accept) {
                    case 'application/json':
                        data = response.json()
                        break;
                    case 'text/html':
                        data = response.text()
                        break;
                }
                console.log('data', data)
                return data
            }
        } catch (error) {
            console.log('error aaa', error)
            throw new Error(error)
        }
    }

}