const koa = require('koa')
const static = require('koa-static')
const path = require('path')
const app = new koa();
app.use(static(path.join(__dirname)));
app.listen(8000)