<template>
    <div>
        <div class="user-details" v-if="!loading">
            <div class="flex">
                <div class="avatar flex-row">
                    <img v-if="user.avatar" :src="user.avatar">
                    <img v-else src=" http://placehold.it/160x220">
                </div>
                <div class="flex ">
                    <div v-if="user" class="user-info flex-row">
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
                    <div v-if="user.address" class="user-address flex-row">
                        <div class="row">
                            <span v-if="user.address.street"><label>Street:&nbsp&nbsp</label> {{user.address.street}}</span>
                        </div>
                        <div class="row">
                            <span v-if="user.address.zip"><label>Zip Code:&nbsp&nbsp</label>{{user.address.zip}}</span>
                        </div>
                        <div class="row">
                            <span v-if="user.address.city"><label>City:&nbsp&nbsp</label>{{user.address.city}}</span>
                        </div>
                        <div class="row">
                            <span v-if="user.address.country"><label>Country:&nbsp&nbsp</label>{{user.address.country}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center">
                <div class="text-center friend-status" v-if="!loading" v-show="!isUser">
                    <button class="btn" v-if="requestStatus === 'send'" @click="sendFriendRequest">send friend request</button>
                    <div v-if="requestStatus === 'accept'">
                        <button class="btn"  @click="acceptFriendRequest">accept friend request</button>
                        <button class="btn decline"  @click="declineFriendRequest">decline</button>
                    </div>
                    <span v-if="requestStatus === 'pending'">{{user.username}} did not accept your friendrequest yet</span>
                    <span v-if="requestStatus === 'friend'"> <i class="fa fa-check" aria-hidden="true"></i>{{user.username}} is your friend</span>
                </div>
            </div>
        </div>
        <div class="post">
            <p class="text-center" v-if="loading">
                <span class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></span>
            </p>
            <div class="post-list">
                <div v-for="post in user.posts">
                    <single-post :post="post" :key="post._id"></single-post>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Singlepost from './SinglePost.vue';
    import {Global} from '../global.js';
    export default{
        components: {
            singlePost: Singlepost
        },
        data: function () {
            return {
                loading: true,
                user: {},
                userId: "",
                requestStatus: ''
            }
        },
        methods: {
            getUser(){
                Global.getUser(this.userId, true)
                    .then((data) => {
                        console.log(data.body);
                        this.user = data.body;
                        this.requestStatus = this.getRequestStatus();
                        this.loading = false;

                    }, (err) => {
                        if (err.status === 401) {
                            console.log(err);
                            this.$router.replace({name: 'login'});
                        }
                        if (err.status === 404) {
                            this.$router.push({name: '404'});
                        }

                    });
            },
            acceptFriendRequest(){
                Global.updateFriendship(this.userId, true)
                    .then((data) => {
                        this.status = 'friend';
                    }, (err) => {
                        console.log(err);
                    })
            },
            declineFriendRequest(){
                Global.updateFriendship(this.userId, false)
                    .then((data) => {
                        this.status = 'send';

                    }, (err) => {
                        console.log(err);
                    })
            },
            sendFriendRequest(){
                Global.sendFriendrequest(this.userId)
                    .then((data) => {
                        this.status = 'pending';
                    }, (err) => {
                        console.log(err);
                    })
            },
            load(){
                this.userId = this.$route.params.id;
                if (!this.userId) {
                    this.userId = Global.userId;
                }
                if (this.userId === Global.userId) {
                    this.$router.push({name: 'history'});
                }
                this.getUser();
            },
            getRequestStatus(){
                let status = 'send';
                Global.friendships.forEach((friendship) => {
                    if (friendship.status === 'PENDING') {
                        if (friendship.userOne === this.user._id && friendship.userTwo === Global.userId) {
                            console.log('accept req')
                            status = 'accept';
                        }
                        if (friendship.userOne === Global.userId && friendship.userTwo === this.user._id) {
                            console.log('pending');
                            status = 'pending'
                        }
                    }
                })
                if (this.userId === Global.userId) {
                    status = 'null';
                }
                if (Global.user.friends.includes(this.user._id)) {
                    status = 'friend';
                }
                return status;
            }
        },
        computed: {
            isUser(){
                return this.userId === Global.userId;
            },
            notFriendsYet(){
                if (this.userId === Global.userId) {
                    return false;
                }
                if (Global.user.friends.includes(this.user._id)) {
                    return false
                }
                return true;
            }
        },
        beforeMount(){
            this.load();
            let self = this;
            document.getElementById('historyRoute').onclick = function () {
                self.load();
                self.$forceUpdate();
            }
        }
    }
</script>

<style scoped>
    .flex {
        display: flex;
        flex-direction: row;
    }

    .flex:nth-child(2) {
        width: 100%;
        margin-right: auto;

    }

    .flex-row:nth-of-type(2) {
        margin-left: 5%;
        margin-right: 5%;
    }

    .user-details {
        width: 100%;
        margin-top: 4vh;
        border-bottom-width: 3px;
        border-bottom-style: solid;
        border-bottom-color: #3333;
        padding-bottom: 2em;
    }

    .avatar {
        margin-right: 5%;
    }

    span {
        font-size: 1.5em;
    }

    .user-info {
        margin-right: auto;
    }

    .btn {
        color: white;
        background-color: #333;
        max-height: 5vh;
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

    .friend-status {
        margin-bottom: 1em;
        margin-top: 1em;
        border-radius: 10px;
        border-color: #333333;
        border-width: 1px;
        border-style: solid;
        width: 50%;
        padding: 1em;
        margin-left: auto;
        margin-right: auto;
    }


</style>

