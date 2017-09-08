import Vue from 'vue';
import app from './app.vue';

let vm = new Vue({
  el: '#app',
  template: '<app/>',
  components: {
    app
  }
})

// console.log(_.chunk(['a', 'b', 'c', 'd'], 2))