const koa = require("koa");
const views = require("koa-views");
const koaStatic = require("koa-static");
const path = require("path");
const route = require("koa-route");
const reactRoute = require("./reactRoute");

// var Router = require("koa-router");

// var router = new Router();

import logger from "koa-logger";
import compress from "koa-compress";
import bodyParser from "koa-bodyparser";
// const app = require("./app.js");
const app = new koa();

app.use(logger());
app.use(compress());
app.use(bodyParser());

app.use(
  views(path.resolve(__dirname, "../dist/server"), { map: { html: "ejs" } })
);

app.use(koaStatic(path.resolve(__dirname, "../dist/client")));

// redirect
// app.use(route.get("/", ctx => ctx.response.redirect("/discover/recommend")));
// app.use(
//   route.get("/discover", ctx => ctx.response.redirect("/discover/recommend"))
// );

app.use(
  route.get("/test", async ctx => {
    ctx.body = "Hello World";
  })
);

// console.log(reactRoute);
app.use(reactRoute);
// app.use(route.get("/", reactRoute));

// api
const discover = require("./controller/discover");
console.log(JSON.stringify(discover));
app.use(route.get("/api/banner", discover.banner));
// app.use(route.get("/api/music", discover.music));
// app.use(route.get("/api/album/*", discover.album));
// app.use(route.get("/api/musicDetail/*", discover.musicDetail));

// const login = require("./controller/login");
// app.use(route.post("/api/login", login.login));

// const account = require("./controller/account");
// app.use(route.post("/api/account", account.account));

const port = 5000;
app.listen(port, () => {
  console.log(" server started, bind port %d", port);
});
