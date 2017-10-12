<template>
    <div id="index">
        <vHeader>123</vHeader>
        <Swiper :list="list" :auto="true" :loop="true" @on-index-change="openAlert"></Swiper>
    </div>
</template>
<script>
import vHeader from '@components/common/header/header.vue'
import { Swiper } from 'vux'
export default {
    name: 'index',
    computed: {
        a() {
            return this.$store.state.testa
        }
    },
    components: {
        vHeader,
        Swiper
    },
    data() {
        return {
            b: this.$store.state.id,
            list:[{ url: 'javascript:', img: 'https://static.vux.li/demo/1.jpg', title: '送你一朵fua' }, { url: 'javascript:', img: 'https://static.vux.li/demo/5.jpg', title: '送你一次旅行', fallbackImg: 'https://static.vux.li/demo/3.jpg' }]
        }
    },
    mounted(){

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
        }
    }
}
</script>
<style lang="less">

</style>

