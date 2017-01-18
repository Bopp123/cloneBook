import Vue from 'vue';

export const Global = new Vue({
    data: {
           token: "",
            userId: "",
            user: {}


    },
    http: {
        root: '/data'
    },
    methods: {
        login(user){
          return this.$http.post('login',user);
        },
        postUser(user){
            return this.$http.post('user',user);
        },
        getUser(userId){
            return this.$http.get(`user/${userId}`, {headers: {'Authorization': `Bearer ${this.token}`}});
        },
        sendPost(formData){
            return this.$http.post(`post`,formData, {headers: {'Authorization': `Bearer ${this.token}`}});
        },
        getPosts(userId){
            return this.$http.get(`user/${userId}/posts`, {headers: {'Authorization': `Bearer ${this.token}`}});
        },
        postLike(postId){
            return this.$http.put(`post/${postId}/like`, null,{headers: {'Authorization': `Bearer ${this.token}`}});
        },
        sendComment(postId, text){
            const toSend = {
                content: text
            };
            return this.$http.post(`comment/${postId}`,toSend, {headers: {'Authorization': `Bearer ${this.token}`}});
        }
    },

    computed: {
        logedIn: function(){
            return this.userId !== "";
        }
    }
});
