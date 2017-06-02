exports.index = function* (ctx) {
  const userId = ctx.params.id;
  ctx.body = yield ctx.model.News.find("${userId}");
  
}