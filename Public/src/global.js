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
        }
    },

    computed: {
        logedIn: function(){
            return this.userId !== "";
        }
    }
});
