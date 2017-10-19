<template>
  <Swiper :list="data" :auto="true" :loop="true" :show-desc-mask="false" :dots-position="'center'">
  </Swiper>
</template>
<script>
import { Swiper } from 'vux'
export default {
  name: 'mSwiper',
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: { Swiper },
  methods: {

  },
  mounted(){}
}
</script>
<style lang="less">

</style>
