/**
 * request
 */

import request from "request";

// 封装request返回一个 Promise
const requestUtil = url =>
  new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(body);
      } else {
        reject();
      }
    });
  });

export default requestUtil;
