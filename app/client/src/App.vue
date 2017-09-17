<template>
  <div id="app">
    <router-link to="detail/123">详细页</router-link>
    <router-link to="/">主页</router-link>
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

<style>
.v-enter-active {
  transition: all .3s ease;
}
.v-enter, .v-leave-to
{
  opacity: 0;
}
</style>
