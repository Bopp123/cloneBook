<template>
    <div>
        <head-comp></head-comp>
        <div class="container">
            <router-view ></router-view>
        </div>
    </div>


</template>

<script>
    import {Global} from './global.js';
    import Head from './components/Head.vue'

    export default {

        components: {
            headComp: Head
        },
        mounted(){
            if (!Global.loggedIn) {
                this.$router.push({name: 'login'});
            } else {
                this.$router.push(`/home`);
            }
        }
    }
</script>

<style>

</style>
