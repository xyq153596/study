import Vue from 'vue';
import app from './app.vue';

let vm = new Vue({
  el: '#app',
  template: '<app/>',
  components: {
    app
  }
})
