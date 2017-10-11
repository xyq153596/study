<template>
  <div id="app">
    <router-link to="/detail">详细页</router-link>
    <router-link to="/serach">搜索页</router-link>
    <router-link to="/test">test</router-link>
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