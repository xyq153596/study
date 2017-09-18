<template>
    <div id="detail">
        <div class="loading" v-if="loading">
            Loading...
        </div>
        <div v-if="error" class="error">
            错误...
        </div>
        这个是详细页</br>
        数据:{{art}}</br>
        id:{{id}}
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { types_lines } from '@store/mutation-types.js'
export default {
    name: 'detail',
    computed: {
        id() {
            return this.$route.params.id;
        },
        ...mapState({
            art: state => state.lines.art,
            loading: state => state.loading,
            error: state => state.error,
        })
    },
    beforeRouteEnter: (to, from, next) => {
        next(vm => {
            vm.GET_LINES_ART();
        })

    },
    watch: {
        $route() {
            this.GET_LINES_ART();
        }
    },
    methods: {
        ...mapActions([types_lines.GET_ART])
    }
}
</script>
<style lang="scss">
#detail {
    width: 100%;
    height: 1000px;
    background-color: #000;
    color: #fff
}
</style>


