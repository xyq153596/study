<template>
    <div id="detail">
        <div class="loading" v-if="loading">
            Loading...
        </div>
        <div v-if="error" class="error">
            错误...
        </div>
        这个是详细页{{art}}</br>
        id:{{id}}
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'detail',
    computed: {
        id() {
            return 1;
        },
        ...mapState(['art', 'loading', 'error'])
    },
    beforeRouteEnter: (to, from, next) => {
        next(vm => {
            vm.artAsync().then(()=>{
                console.log('成功了')
            });
        })

    },
    watch: {
        $route() {
            this.artAsync();
        }
    },
    methods: {
        ...mapActions(['artAsync'])
    }
}
</script>
<style lang="scss">
#detail {
    width: 100px;
    height: 1000px;
    background-color: #000;
    color: #fff
}
</style>


