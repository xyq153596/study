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

<style lang="scss">
    @import '../../../assets/scss/base.scss';
    .header{
        width:100%;
        height: 40px;
        background-color: #ccc;
        @include test();
    }
</style>
