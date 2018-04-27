import {
  createApp
} from './app'
export default context => {
  const {
    app,
    store
  } = createApp()
  
  return new Promise((resolve, reject) => {
    console.log('----send----')
    store.dispatch("getData").then(() => {
      context.state = store.state
      resolve(app);
    })

  })
}