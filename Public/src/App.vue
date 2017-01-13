<template>

    <div class="jumbotron vertical-center">
            <router-view></router-view>
    </div>

</template>

<script>
    import {Global} from './global.js';
    import Start from './components/Start.vue'

    export default {

        components: {
            startComp: Start
        },
        created(){
            if(!Global.loggedIn) {
                this.$router.push('/welcome/login');
            }else{
                this.$router.push(`/home/${Global.userId}`);
            }
        }
    }
</script>

<style>
    .jumbotron {
        background-image: url(/src/assets/background.jpg);

    }
    .vertical-center {
        min-height: 100%;  /* Fallback for browsers do NOT support vh unit */
        min-height: 100vh; /* These two lines are counted as one :-)       */

        /*display: flex;*/
        /*align-items: center;*/
    }
</style>
