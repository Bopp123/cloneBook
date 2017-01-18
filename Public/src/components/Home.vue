<template>
    <div class="main">
        <div class=" control">
            <div class=" nav">
            <ul class=" nav nav-pills">
                <router-link :to="{name: 'home'}"  exact tag="li" active-class="active"><a>Home</a></router-link>
                <router-link :to="{name: 'history'}" tag="li" active-class="active"><a>History</a></router-link>
                <router-link :to="{name:'friends'}" tag="li" active-class="active"><a>Friends</a></router-link>
            </ul>
            </div>
            <div class=" search">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search for...">
                    <span class="input-group-btn">
                        <button class="btn btn-secondary" type="button">Go!</button>
                    </span>
                </div>
            </div>
            <button class="btn">Logout</button>
        </div>
        <router-view :user="user"></router-view>
    </div>

</template>

<script>
    import {Global} from '../global.js';
    import User from './User.vue';


    export default{
        data: function () {
            return {
                user: {},
            }
        },
        components:{
          userView: User
        },
        methods: {
            fetchUser(userid){
                Global.getUser(userid)
                    .then((user) => {
                        this.user = user;
                        console.log(user);
                    }, (err) => {
                        console.log(err);
                    });
            }
        },
        mounted(){
            this.user = Global.user;
        }
    }
</script>

<style scoped>
    .main{
        margin-top: -65px;
        max-width: 1000px;
    }

    .nav{
       margin-right: auto;

    }
    .search{
        width: 30vw;
        margin-right: 4%;
    }

    .control{
        display: inline-flex;
        flex-direction: row;
        width:100%;

    }

    .nav-pills > li.active > a, .nav-pills > li.active > a:focus, .nav-pills > li.active > a:hover {
        color: #fff;
        background-color: #333333;
        border: 0;
    }

    .nav-pills > li > a:hover {

        color: #fff;
        background-color: #333333;
    }

    .nav-pills > li > a {
        color: #333333;
    }

    .btn-secondary{
        background-color: #333;
        color: white;
    }

    .btn {
        max-width: 80px;
        max-height: 35px;
        color: white;
        background-color: #333;
    }

</style>