<template>
    <div>
        <div class="flex" v-if="!userEdit">
            <div class="avatar">
                <img v-if="user.avatar" :src="user.avatar">
                <img v-else src=" http://placehold.it/160x220">
            </div>
            <div v-if="user" class="user-info">
                <div class="row">
                    <span><label>Username:&nbsp&nbsp</label> {{user.username}}</span>
                </div>
                <div class="row">
                    <span v-if="user.name"><label>Firstname:&nbsp&nbsp</label>{{user.name.firstName}}</span>
                </div>
                <div class="row">
                    <span v-if="user.name"><label>Lastname:&nbsp&nbsp</label>{{user.name.lastName}}</span>
                </div>
                <div class="row">
                    <span><label>Age:&nbsp&nbsp</label>{{user.age}}</span>
                </div>

                <div class="row">
                    <span v-if="user.contact"><label>Email: &nbsp&nbsp</label>{{user.contact.email}}</span>
                </div>


                <div class="row">
                    <span v-if="user.contact"><label>Phonenumber: &nbsp&nbsp</label>{{user.contact.phone}}</span>
                </div>
            </div>
            <button ref="button" class="btn" @click="editUser">Edit</button>
        </div>
        <user-edit-comp v-if="userEdit" :user="user"></user-edit-comp>
        <div class="post">
            <div v-if="!newpost" class="text-center plus">
                <button @click="showNewPost" class="post-btn">
                    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                </button>
            </div>
            <div ref="post" v-else>
                <new-post></new-post>
            </div>
            <p class="text-center" v-if="loading">
                <span class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></span>
            </p>
            <div class="post-list">
                <div v-for="post in posts">
                    <single-post :post="post" :key="post._id"></single-post>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import Newpost from './NewPost.vue';
    import Singlepost from './SinglePost.vue';
    import UserEdit from './UserEdit.vue';
    import {eventBus} from "../main";
    import {Global} from '../global.js';
    export default {
        components: {
            newPost: Newpost,
            singlePost: Singlepost,
            userEditComp: UserEdit,
            userInterval: 0
        },
        data: function () {
            return {
                newpost: false,
                posts: [],
                loading: true,
                userEdit: false
            }
        },
        props: {
            user: Object
        },
        methods: {
            showNewPost(){
                this.newpost = true;
            },
            fetchUserPost(){
                console.log('fetch');
                if (!Global.userId) return;
                Global.getPosts(Global.userId)
                    .then((data) => {
                        this.posts = data.body;
                        this.loading = false;
                    }, (err) => {
                        console.log(err);
                    });
            },
            editUser(){
                this.userEdit = true;
            }
        },
        created(){
            eventBus.$on('posted', (post) => {
                this.loading = false;
                this.posts.unshift(post);
            });

            eventBus.$on('posting', () => {
                console.log("poooosting")
                this.loading = true;
                this.newpost = false;
            });

            eventBus.$on('userSaved', () => {
                this.userEdit = false;
            });

            eventBus.$on('closePost', () => {
                console.log("cloooose")
                this.newpost = false;
            });
            const self = this;
            this.userInterval = setInterval(() => {
                    this.fetchUserPost();
                },
                5000);
        },
        mounted(){
            if (!Global.userId) return;
            this.fetchUserPost();
        },
        beforeDestroy(){
            clearInterval(this.userInterval);
        }
    }
</script>

<style scoped>
    .flex {
        display: flex;
        margin-top: 4vh;
        flex-direction: row;
        width: 100%;
        border-bottom-width: 3px;
        border-bottom-style: solid;
        border-bottom-color: #3333;
        padding-bottom: 2em;
    }

    .plus {
        border-bottom-width: 3px;
        border-bottom-style: solid;
        border-bottom-color: #3333;
        padding-bottom: 2em;
    }

    .avatar {
        margin-right: 10%;
    }

    span {
        font-size: 2.5vh;
    }

    .user-info {
        margin-right: auto;
    }

    .btn {

        max-width: 50px;
        max-height: 30px;
        color: white;
        background-color: #333;
    }

    .post-btn {
        width: 10vh;
        height: 10vh;
        margin-top: 4vh;
        background-color: white;
        border: 0px;

    }

    .post-btn:focus {
        outline: 0;
    }

    .post-btn:hover {
        width: 10vh;
        height: 10vh;
        margin-top: 4vh;
        background-color: white;
        border: 0px;
        transform: scale(1.1);
    }

    .post-btn > span {
        font-size: 9vh;
    }

    .post {
        margin-bottom: 2em;
    }

    .fa-spin {
        font-size: 6em;
        margin-bottom: 2em;
        margin-top: 2em;
    }

    img {
        max-width: 250px;
    }


</style>