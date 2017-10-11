<template>
  <div class="footer">
      这个是尾部
      <slot></slot>
  </div>
</template>

<script>
export default {
    name:'footer'
}
</script>

<style lang="scss">
    @import '../../../assets/scss/base.scss';
    .footer{
        width:100%;
        height: 40px;
        background-color: #ccc;
        position: fixed;
        bottom: 0;
        left: 0;
    }
</style>
