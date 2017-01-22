<template>
    <div class="main-friends">
        <div v-if="!loading">
            <div class="text-center">
                <button class="search-button btn" @click="updateSearchStatus">{{searchButtonText}}</button>
            </div>
            <search-user v-if="searchOpen === 'open'"></search-user>
            <searchResultList v-if="showResultList" :results="searchResults"></searchResultList>
        </div>
        <div class="friends-list" v-if="!loading">
            <div v-if="pendingFriends.length !== 0" class="pending-friends text-center">
                <h2>Pending friend requests: </h2>
                <div v-for="friend in pendingFriends">
                    <single-user :userId="getOtherUser(friend)" :nostatus="false"></single-user>
                </div>
            </div>
            <div class="accepted-friends text-center" v-if="friends.length !== 0">
                <h2>You have {{friendsSize}} {{friendOrFriends}}: </h2>
                <div v-for="friend in friends">
                    <single-user :userId="getOtherUser(friend)" :nostatus="true" :key="friend._id"></single-user>
                </div>
            </div>
            <div v-else>
                <h1>You don't have any friends yet, how about you search for people you might know?</h1>
            </div>
        </div>
        <p class="text-center" v-if="loading">
            <span class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></span>
        </p>
    </div>
</template>

<script>
    import SearchUser from './SearchUser.vue';
    import SearchResultList from './SearchResultList.vue';
    import SingleUser from './SingleUser.vue';
    import {eventBus} from "../main";
    import {Global} from '../global.js';
    export default{
        components: {
            singleUser: SingleUser,
            searchUser: SearchUser,
            searchResultList: SearchResultList
        },
        data: function () {
            return {
                friends: [],
                pendingFriends: [],
                searchOpen: 'closed',
                showResultList: false,
                searchResults: [],
                loading: true
            }
        },
        methods: {
            getOtherUser(friendship){
                if (friendship.userOne === Global.userId) return friendship.userTwo;
                return friendship.userOne;
            },
            updateSearchStatus(){
                if(this.searchOpen === 'closed') {
                    this.searchOpen = 'open';
                    return;
                }
                if(this.searchOpen === 'open'){
                    this.searchOpen = 'closed';
                    return;
                }
                if(this.searchOpen === 'performed') {
                    this.searchOpen = 'closed';
                    this.showResultList = false;
                    return;
                }

            },
            fetchFriends(){
                this.pendingFriends = [];
                this.friends = [];

//                Global.getFriends()
//                    .then((data) => {
//                        console.log(data);
//                        Global.friendships = data.body;
                        Global.friendships.forEach((friendship) => {
                            if (friendship.status === 'PENDING') {
                                this.pendingFriends.push(friendship);
                            } else {
                                this.friends.push(friendship);
                            }
//                        });
//                        console.log(Global.friendships, 'after action');

//                    }, (err) => {
//                        console.log(err)
                    });
                this.loading = false;
            }
        },
        computed: {
            friendsSize(){
                return this.friends.length;
            },
            friendOrFriends(){
                if (this.friends.length === 1) return 'Friend';
                return 'Friends'
            },
            searchButtonText(){
                if (this.searchOpen === 'closed') return 'Search for friends';
                return 'Close'
            }
        },
        created(){
            this.fetchFriends();
            eventBus.$on('searchPerformed', (result) => {
                this.loading = false;
                this.searchResults = result;
                this.searchOpen = 'performed';
                this.showResultList =true;
            });
            eventBus.$on('friendshipActionDone', () => {
                this.fetchFriends();
            });

        }
    }
</script>

<style scoped>
    .main-friends {
        margin-top: 2em;
    }

    .search-button {
        width: 50%;
        margin-bottom: 1em;
        background-color: #333333;
        height: 2.5em;
        color: white;
        font-size: 1.5em
    }

    .friends-list{
        margin-top: 1em;
    }
    span {
        font-size: 4em;
    }
</style>