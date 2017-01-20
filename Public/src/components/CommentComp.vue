<template>
    <div class="main-comment">
        <div class="flex">
            <router-link :to="{name: 'userView' , params: { id: getUserId }}"><a>
                <div class="flex">
                    <img :src="avatar" class="avatar">
                    <span class="user">{{comment.author.username}}</span>
                </div>
            </a></router-link>
            <div class="text-content "><p>{{comment.content}}</p></div>
            <div class="likes flex">
                <span v-if="!liked" @click="addLike" class="btn-icon glyphicon glyphicon-star"
                      aria-hidden="true"></span>
                <span v-else class="likedIcon glyphicon glyphicon-star" aria-hidden="true"></span>
                <h3 class="likesNumber">{{likesCount}}</h3>
            </div>
        </div>
    </div>
</template>

<script>
    import {Global} from '../global.js';
    export default{
        props: {
            comment: Object
        },
        computed: {

            likesCount(){
                let count = this.comment.likes.length;
                if (count === 0) {
                    return;
                }
                return count;
            },
            avatar(){
                if (!this.comment.author.avatar) return "http://placehold.it/60x60";
                return this.comment.author.avatar;
            },
            liked(){
                return this.comment.likes.includes(Global.userId);
            },
            getUserId(){
                if (this.comment.author._id) return this.comment.author._id;
                return Global.userId;
            }
        },
        methods: {
            addLike(){
                Global.postCommentLike(this.comment._id)
                    .then((data) => {
                        this.comment.likes.push(Global.userId);
                    }, (err) => {
                        console.log(err);
                    })
            }
        }
    }
</script>

<style scoped>
    .main-comment {
        margin-top: 1em;
        margin-bottom: 1em;
        padding: 1em;
    }

    .avatar {
       max-width: 6vh;
        max-height: 6vh;
        margin-top: 5px;
        margin-right: 10px;
    }

    .flex {
        display: flex;
        flex-direction: row;
    }

    .user {
        margin-right: auto;
        font-size: 2.5vh;
        font-weight: bold;
    }

    .btn:focus {
        outline: none;
    }

    .text-content {
        margin-left: 10%;
        margin-right: auto;
        max-width: %;
    }

    p{
        font-size: 2vh;
    }

    .likesNumber {
        margin-left: 10px;
        font-size: 2.5vh;
        margin-top: auto;
        margin-bottom: auto;
    }

    .likes {
        margin-left: 10%;
    }

    a {
        color: #333333;
    }

    a:focus {
        text-decoration: none;
        color: #23527c;
    }

    a:hover {
        text-decoration: none;
        color: #23527c;
    }

    .likedIcon {
        font-size: 4vh;
        color: rgba(219, 215, 19, 0.82);
    }

    .btn-icon {
        font-size: 4vh;
        color: #333333;
    }


</style>