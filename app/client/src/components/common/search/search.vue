<template>
  <div class="sidebar">
      这个是侧边栏
      <slot></slot>
  </div>
</template>

<script>
export default {
    name:'sidebar'
}
</script>

<style lang="less">
    .sidebar{
        width:100%;
        height: 40px;
        background-color: #ccc;
    }
</style>
