<template>
    <div class="index">
        <layout>
            <div slot="header"><b>大傻逼头部</b></div>
            <p slot="main">大傻逼主体</p>
            <div slot="footer">大傻逼尾部</div>
        </layout>
    </div>
</template>

<script>
import layout from '@components/common/layout/app.vue';
export default {
    name: 'index',
    components: {
        layout
    }
}
</script>

<style lang="scss">
    .index{
        height: 500px;
        background-color: gray
    }
</style>
