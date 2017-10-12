<template>
    <div id="index">
        <vHeader>123</vHeader>
        <Swiper :list="indexList" :auto="true" :loop="true" @on-index-change="openAlert"></Swiper>
    </div>
</template>
<script>
import { mapActions,mapState } from 'vuex'
import {types_lines} from '@store/store-lines'

import vHeader from '@components/common/header/header.vue'
import { Swiper } from 'vux'

export default {
    name: 'index',
    computed: mapState({
        indexList:state=>state.lines.indexList
    }),
    components: {
        vHeader,
        Swiper
    },
    data() {
        return {
            a:1
        }
    },
    mounted(){  
        this[types_lines.GET_INDEX]();
    },
    methods:{
        openAlert(index){
            this.$vux.alert.show({
            title: '图片位置发生改变,当前:'+index,
            content: 'Do you agree?',
            onShow () {
                console.log('Plugin: I\'m showing')
            },
            onHide () {
                console.log('Plugin: I\'m hiding')
            }
            })
        },
        ...mapActions([types_lines.GET_INDEX])
    }
}
</script>
<style lang="less">

</style>

