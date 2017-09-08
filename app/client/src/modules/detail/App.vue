<template>
    <div class="index">
        <layout>
            <div slot="header">
                <b>大傻逼头sssss部</b>
            </div>
            <search></search>
            <div slot="main">
                <search></search>
                大傻逼主ssssssssssssssss体
            </div>
            <search></search>
            <div slot="footer">大傻逼sssssss尾部</div>
        </layout>
        
    </div>
</template>

<script>
import layout from '@components/common/layout/app.vue';
import search from '@components/common/search/app.vue';

export default {
    name: 'detail',
    components: {
        layout,
        search
    }
}
</script>

<style lang="scss">
.detail {
    height: 500px;
    background-color: red
}
</style>
