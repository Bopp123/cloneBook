<template>

    <div class=" content start-nav ">

        <ul class=" nav nav-tabs nav-justified">
            <router-link :to="{name: 'login'}" tag="li" active-class="active"><a>Login</a></router-link>
            <router-link :to="{name:'signup'}" tag="li" active-class="active"><a>Sign Up</a></router-link>
        </ul>
        <router-view></router-view>

    </div>
</template>

<script>

    export default {}
</script>

<style scoped>
    div.start-nav {
        width: 50vw;
        margin-bottom: 1em;
        margin-top: -6vh;
        box-shadow: -1px 9px 46px 0px #333333;
        margin-left: auto;
        margin-right: auto;
        max-width: 500px;

    }

    div.content {
        background-color: #fff;
        padding-bottom: 1em;
        margin-bottom: 3em;

    }

    .nav-tabs > li.active > a, .nav-pills > li.active > a:focus, .nav-pills > li.active > a:hover {
        color: #333333;
        background-color: #fff;
    }

    .nav-tabs > li > a:hover {

        color: #fff;
        background-color: #333333;
    }

    .nav-tabs > li.active > a:hover {
        color: #333333;
        background-color: #fff;
    }

    .nav-tabs > li > a {
        color: #fff;
        background-color: #333333;
    }

    .nav-tabs {
        margin-bottom: 2em;
    }


</style>
