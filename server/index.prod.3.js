const Koa = require("koa");
const logger = require("koa-logger");
const compress = require("koa-compress");
// const views = require("koa-views");
const route = require("koa-route");
const koaStatic = require("koa-static");
const path = require("path");
const app = require("./app.js");
// const reactRoute = require("./reactRoute.js");

// app.use(
//   views(path.resolve(__dirname, "../dist/server"), { map: { html: "ejs" } })
// );

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
