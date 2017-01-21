<template>
    <div>
        <p>Something went wrong</p>
        <router-link :to="{name: 'home'}" active-class="active" exact><a>Go Back!</a></router-link>
    </div>
</template>

<style scoped>
    p {
        font-size: 10vh;
    }

    a {
        font-size: 10vh;
    }
</style>