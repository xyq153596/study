<template>
  <div id="app">
    服务队渲染{{data}}
    <span @click="go">点我傻逼</span>
    <sb></sb>
  </div>
</template>
<script>
import sb from "./sb.vue";
console.log('傻逼哦哦 哦哦')
export default {
  name: "app",
  computed: {
    data() {
      return this.$store.state.data;
    }
  },
  methods: {
    go() {
      alert("点了");
    }
  },
  components: { sb }
};
</script>
<style>
body {
  background-color: #ccc;
}
#app {
  background-color: #000;
  color: #fff;
}
</style>

