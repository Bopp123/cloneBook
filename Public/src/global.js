import Vue from 'vue';

export const Global = new Vue({
    data: function () {
        return {
           token: "",
            userId: "",
            user: {}

        };
    },
    http: {
        root: '/data',
        headers: {
            Authorization: 'Bearer '+ this.token
        }
    },
    methods: {
        login(user){
          return this.$http.post('login',user);
        },
        postUser(user){
            return this.$http.post('user',user);
        }
    },

    computed: {
        loggedIn: function(){
            return this.userId !== "";
        }
    }
});
