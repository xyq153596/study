<template>
    <div id="index">
        这是首页{{a}}</br>
        参数是:{{b}}
        <vHeader>123</vHeader>
        <Group>
            <Cell title="title" value="value"></Cell>
        </Group>
    </div>
</template>
<script>
import vHeader from '@components/common/header/header.vue'
import { Group, Cell } from 'vux'
export default {
    name: 'index',
    computed: {
        a() {
            return this.$store.state.testa
        }
    },
    components: {
        vHeader,
        Group,
        Cell
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

