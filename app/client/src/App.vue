<template>
  <div id="app">
    <transition>
    <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
  //导入全局样式 
  @import "./assets/css/base.less";
  //导入vux全局样式 
  @import '~vux/src/styles/reset.less';
</style>