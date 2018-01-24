<template>
  <div id="app">
    服务队渲染{{data}}
    <span @click="go">点我傻逼</span>
  </div>
</template>
<script>
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
  }
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

