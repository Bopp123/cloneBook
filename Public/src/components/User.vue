<template>
    <div>
        <div class="flex">
            <div class="avatar">
                <img v-if="user.avatar" src="user.avatar">
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
            <button ref="button" class="btn">Edit</button>
        </div>
        <div v-if="!newpost" class="text-center plus">
            <button @click="showNewPost" class="post-btn">
                <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
            </button>
        </div>
        <div ref="post" v-else>
        <new-post  ></new-post>
        </div>
    </div>

</template>

<script>
    import Newpost from './NewPost.vue';
    import {eventBus} from "../main";
    export default {
        components: {
            newPost: Newpost
        },
        data: function () {
            return {
                newpost: false
            }
        },
        props: {
            user: Object
        },
        methods:{
            showNewPost(){
                this.newpost = true;
            }
        },
        created(){
            eventBus.$on('posted', () => {
                this.newpost = false;
            })
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

    .plus{
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

    .post-btn{
         width: 10vh;
         height: 10vh;
         margin-top: 4vh;
         background-color: white;
         border: 0px;

     }
    .post-btn:focus{
        outline: 0;
    }

    .post-btn:hover{
        width: 10vh;
        height: 10vh;
        margin-top: 4vh;
        background-color: white;
        border: 0px;
        transform: scale(1.1);
    }

    .post-btn>span{
        font-size: 9vh;
    }

</style>