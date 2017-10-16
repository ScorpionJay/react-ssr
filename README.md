# react技术栈

## how to run

~~~
npm i 
npm run dev

npm run build

npm run start
~~~


## 服务器渲染 SSR (Server-Side Rendering)

 ### 什么是SSR
	
   通常我们使用react，浏览器下载最小的html页面，内容通过js去填充。
   使用SSR，初始化的内容在服务器生成，浏览器下载已经有内容的html页面，更新内容在浏览器客服端。

 ### SSR解决了什么
- SEO  
- 提高性能
- 同构

#### SEO
 除了google，其他的搜索引擎不能爬取js
 
#### 性能
 初始化渲染在服务器，提高了性能，因为浏览器初次加载，需要下载很多js，但是响应浏览器需要更多的时间，生成更多的内容，相对来说，可以忽略这点。服务器需要做js缓存。

#### 同构
 浏览器和node跑的是同一份代码，react-router和服务器的路由需要相同。


## 搭建项目
- react
- react-router
- redux
- webpack2
- koa2

### [koa2](https://koajs.com/)

~~~js
const Koa = require('koa');
const app = new Koa();

app.use(ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
~~~

~~~
mkdir react-ssr & cd react-ssr
npm init

npm i koa --save 
~~~


使用es6
babel-polyfill

index.js
~~~
require('babel-polyfill')

require('babel-register')({
    presets: ['es2015', 'react', 'stage-3'],
    plugins: ['add-module-exports']
})


const app = require('./app.js')

app.use(ctx => {
  ctx.body = 'Hello World'
});

const port = 3000

app.listen(port,()=>{
	console.log('server started, bind port %d',port)
});
~~~
app.js
~~~
import Koa from 'koa'

const app = new Koa()

export default app
~~~
koa-views
ejs 模版
koa-logger 日志


nodemon 修改nodejs代码需要重启，使用nodemon可以监控代码修改了自动重启。

react提供挂了renderToString的方法



### react
~~~html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test</title>
</head>
<body>
	test
	<div class="root" data-reactroot="" data-reactid="1" data-react-checksum="-1133046379">test</div>
</body>
</html>
~~~


client项目可以单独



### 服务器渲染图片

使用asset-require-hook钩子
https://github.com/aribouius/asset-require-hook




## 时序图
![时序图](http://odyv5xg88.bkt.clouddn.com/react-ssr.png)

## REF
http://andrewhfarmer.com/server-side-render/