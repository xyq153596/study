<template>
  <div class="layout">
    <mainheader>
        <slot name="header"></slot>
    </mainheader>
    <slot name="main"></slot>
    <mainfooter>
        <slot name="footer"></slot>
    </mainfooter>
  </div>
</template>
<script>
  import mainheader from '@components/common/header/app.vue';
  import mainfooter from '@components/common/footer/app.vue';
  export default {
    name: 'layout',
    components: {
      mainheader,
      mainfooter
    }
  }

</script>
<style lang="scss">


</style>
