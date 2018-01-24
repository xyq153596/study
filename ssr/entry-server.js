import {
  createApp
} from './app'
export default context => {
  const {
    app,
    store
  } = createApp()
  return new Promise((resolve, reject) => {
    store.dispatch("getData").then(() => {
      context.state = store.state
      resolve(app);
    })

  })
}