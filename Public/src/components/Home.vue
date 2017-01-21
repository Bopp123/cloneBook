<template>
    <div class="main">
        <div class=" control">
            <div class=" nav">
                <ul class=" nav nav-pills">
                    <router-link :to="{name: 'home'}" exact tag="li" active-class="active"><a>Home</a></router-link>
                    <router-link :to="{name: 'history'}" tag="li" active-class="active"><a id="historyRoute">History</a>
                    </router-link>
                    <router-link :to="{name:'friends'}" tag="li" active-class="active"><a>Friends</a></router-link>
                </ul>
            </div>
            <div class=" search">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search for..." v-model="searchText"
                           v-on:input="instantSearch">
                    <span class="input-group-btn">
                        <button class="btn btn-secondary" type="button" @click="performSearch">Go!</button>
                    </span>
                </div>

            </div>
            <button class="btn" @click="logout">Logout</button>
        </div>
        <div v-if="showResults">
            <div class="text-center">
                <button class="btn closeSearch" @click="searched = false">Close</button>
            </div>
            <searchResultList :results="results"></searchResultList>
        </div>
        <router-view :user="user"></router-view>

    </div>

</template>

<script>
    import {Global} from '../global.js';
    import User from './User.vue';
    import SearchResultList from './SearchResultList.vue';


    export default{
        data: function () {
            return {
                user: {},
                searchText: '',
                results: [],
                searched: false
            }
        },
        components: {
            userView: User,
            searchResultList: SearchResultList
        },
        methods: {
            fetchUser(userid){
                Global.getUser(userid)
                    .then((user) => {
                        this.user = user;

                    }, (err) => {
                        console.log(err);
                    });
            },
            performSearch(){
                Global.performSearch(this.searchText)
                    .then((data) => {
                        this.results = data.body;
                        this.searched = true;
                        console.log(data.body);
                    }, (err) => {
                        console.log(err);
                    })
            },
            instantSearch(){
                if (this.searchText.length > 3) {
                    setTimeout(() => {

                        this.performSearch();
                    }, 500);
                }

            },
            logout(){
                Global.logout();
                this.$router.push({name: 'login'});
            }
        },
        computed: {
            showResults(){
                if (this.searched && this.results.length !== 0) return true;
                return false;
            }
        },
        created(){
            this.user = Global.user;
            Global.getFriends()
                .then((data) => {
                    console.log(data.body);
                    Global.friendships = data.body;
                }, (err) => {
                    console.log(err)
                });
        }
    }
</script>

<style scoped>
    .main {
        margin-top: -65px;
        max-width: 1000px;
    }

    .nav {
        margin-right: auto;

    }

    .search {
        width: 30vw;
        margin-right: 4%;
    }

    .control {
        display: inline-flex;
        flex-direction: row;
        width: 100%;

    }

    .nav-pills > li.active > a, .nav-pills > li.active > a:focus, .nav-pills > li.active > a:hover {
        color: #fff;
        background-color: #333333;
        border: 0;
    }

    .nav-pills > li > a:hover {
        background-color: rgba(219, 215, 19, 0);;
        transform: scale(1.1);
    }

    .nav-pills > li > a {
        color: #333333;
    }

    .btn-secondary {
        background-color: #333;
        color: white;
    }

    .btn {
        max-width: 80px;
        max-height: 35px;
        color: white;
        background-color: #333;
        outline: none;
    }

    .closeSearch {
        margin-top: 30px;
        max-width: 100px;
        max-height: 55px;
    }

    .btn:active {
        outline: none;
    }

</style>