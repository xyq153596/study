const Koa = require('koa')
const fs = require('fs')
const path = require('path')
const route = require('koa-route')
const koaStatic = require('koa-static')
const {
  createBundleRenderer
} = require('vue-server-renderer')

const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const template = fs.readFileSync('./index.html', 'utf-8')

const sb = require('./test')

console.log('----new koa----')
class Work {
  constructor(context) {
    this.context = context;
  }

  async start() {
    let agent = await this.context.getProxy('agentServer');
    const server = new Koa();
    const assets = koaStatic(path.join(__dirname));
    const renderer = createBundleRenderer(serverBundle, {
      clientManifest,
      template,
      inject: false,
      runInNewContext: false
    })
    
    function index(ctx, next) {
      let context = {};
      ctx.response.type = 'html';
      const hit = agent.getCache(ctx.request.url);
      return hit.then(res => {
        if (false) {
          ctx.response.body = res;
          return;
        }
        return new Promise((resolve, reject) => {
          renderer.renderToString(context, (err, html) => {
            if (err) {
              console.log(err);
              return;
            }
            ctx.response.body = html;
            agent.setCache(ctx.request.url, html)
            resolve()
          })
        })
      });


    }

    server.use(route.get('/', index));
    server.use(assets);

    server.listen(8080);
  }
}

module.exports = Work;