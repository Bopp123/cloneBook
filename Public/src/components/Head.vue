<template>
    <div class="head ">

        <div class="text-center">

            <span class="logo glyphicon glyphicon-star" aria-hidden="true"></span>

            <div class="row"><span class="heading"> Welcome to clonebook </span> <button class="btn info"  @click="showInfo"><span
                    class="info glyphicon glyphicon-info-sign" aria-hidden="true"></span>
            </button>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        methods: {
            showInfo(){
                this.$router.push('/info');
            }
        }
    }
</script>

<style scoped>
    .logo {
        margin-top: 5vh;
        font-size: 15vh;

    }
    .btn{
        background-color: rgba(219, 215, 19, 0);
        margin-bottom: 3vh;
    }

    .heading {
        font-weight: bold;
        font-size: 6vh;
    }

    .info {
        font-size: 5vh;
    }

    .info:hover {
        background-color:#333333;
        color: rgba(219, 215, 19, 0.82);
    }

    .vertical-center {

        display: flex;
        align-items: center;
    }

    .head {
        background-color: rgba(219, 215, 19, 0.82);
        min-height: 38vh;
        border-bottom: 5px outset #333;
    }

    .row {
        margin-bottom: 8vh;
    }
</style>