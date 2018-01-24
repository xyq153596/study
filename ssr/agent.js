const LRU = require('lru-cache')

class Agent {
  constructor() {
    this.microCache = null;
  }
  getCache(url) {
    return this.microCache.get(url);
  }
  setCache(url, val) {
    return this.microCache.set(url, val);
  }
  async start() {
    this.microCache = LRU({
      max: 100,
      maxAge: 5000 // 重要提示：条目在 1 秒后过期。
    })

  }
  async stop() {
    // console.log('agent进程关闭！！！')
  }
}
module.exports = Agent