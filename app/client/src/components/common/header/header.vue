<template>
  <div class="header">
      这个是头部
      <slot></slot>
  </div>
</template>

<script>
export default {
    name:'header'
}
</script>

<style lang="less">
    .header{
        width:100%;
        height: 40px;
        background-color: #ccc;
    }
</style>
