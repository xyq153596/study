<template>
    <div id="index">
        这是首页{{a}}</br>
        参数是:{{b}}
        <vHeader>123</vHeader>
    </div>
</template>
<script>
import vHeader from '@components/common/header/header.vue'
export default {
    name: 'index',
    computed: {
        a() {
            return this.$store.state.testa
        }
    },
    components: {
        vHeader
    },
    data() {
        return {
            b: this.$store.state.id
        }
    }
}
</script>
<style lang="scss">
#index {
    color: red;
}
</style>

