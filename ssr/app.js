import Vue from 'vue'
import App from './App.vue'
import {
  createStore
} from './store'
// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp() {
  const store = createStore();
  console.log('----new vue----')
  const app = new Vue({
    store,
    // 根实例简单的渲染应用程序组件。
    render: h => h(App)
  })
  return {
    app,
    store
  }
}