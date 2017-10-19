<template>
    <div id="index">
        <vHeader>1253</vHeader>
        <mSwiper v-bind:data="indexList"></mSwiper>
        {{a|filter_chunk}}
    </div>
</template>
<script>

import { mapActions, mapState } from 'vuex'
import { types_lines, typesValue } from '@store/store-lines'
import vHeader from '@components/common/header/header.vue'
import mSwiper from '@components/lines/mSwiper.vue'

export default {
    name: 'index',
    computed: mapState({
        indexList: state => state.lines.indexList
    }),
    components: {
        vHeader,
        mSwiper
    },
    data() {
        return {
            a: [1,2,3,4,5,6,7]
        }
    },
    mounted() {
        /**
         * 获取首页数据
          */
        this[types_lines.GET_INDEX]();
    },
    methods: {
        /**
         * 注册actions
          */
        ...mapActions(typesValue)
    }
}
</script>
<style lang="less">

</style>

