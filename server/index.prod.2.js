const koa = require("koa");
const views = require("koa-views");
const koaStatic = require("koa-static");
const path = require("path");
const route = require("koa-route");
const app = new koa();

// app.use(logger());
// app.use(bodyParser());

// const port = 5000;

// app.use(route)

app.use(async ctx => {
  ctx.body = "Hello World";
});

const port = 5000;

app.listen(port, () => {
  console.log(" server started, bind port %d", port);
});
// console.log(" server started, bind port %d");
