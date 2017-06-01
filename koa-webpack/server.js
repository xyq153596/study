let koa = require('koa');
let app = new koa();
app.use(async function (ctx, next) {
  let start = new Date;
  await next();
  let ms = new Date - start;
  ctx.set('X-Response', '${ms}ms');
});
app.use(ctx => {
  console.log(ctx);
  ctx.body = 'hello,world';
})
app.listen(3000);