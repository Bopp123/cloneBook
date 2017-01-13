<template>
    <div class="container">
        <div class=" text-center content">
            <h1>Welcome to clonebook</h1>
            <h2> This is an attempt to implement a Facebook like webapp with node/express as the backend
                and Vue.js for the frontend</h2>
            <h3>This app has been build by Konstantin Schall</h3>
        </div>
        <div class=" content text-center start-nav">

            <ul class=" nav nav-tabs nav-justified">
                <router-link :to="{name: 'login'}" tag="li" active-class="active"><a>Login</a></router-link>
                <router-link :to="{name:'signup'}" tag="li" active-class="active"><a>Sign Up</a></router-link>
            </ul>
            <router-view></router-view>

        </div>
    </div>
</template>

<script>

    export default {}
</script>

<style scoped>
    div.start-nav {
        margin-bottom: 1em;
    }

    div.content {
        background-color: rgba(255, 238, 211, 0.8);
        padding-bottom: 1em;
        margin-bottom: 3em;
    }

    .nav-tabs > li.active > a, .nav-pills > li.active > a:focus, .nav-pills > li.active > a:hover {
        color: #fff;
        background-color: #333333;
    }

    .nav-tabs > li > a {
        color: #333333;
    }

    .nav-tabs {
        margin-bottom: 2em;
    }


</style>
