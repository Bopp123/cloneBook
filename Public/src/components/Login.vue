<template>

    <div class="container">
        <div class="form-group">
            <label>Username</label>
            <input v-model="username" type="text" class="form-control" placeholder="Username"
            >
        </div>

        <div class="form-group">
            <label>Password</label>
            <input v-model="password" type="password" class="form-control" placeholder="Password"
            >
        </div>

        <div>
            <button class="btn btn-primary" @click="login">Log in</button>
        </div>
        <div class="err" v-if="error">
           <p>Password or username are not matching the database</p>
            <p>Please try again</p>
        </div>
    </div>


</template>

<script>
    import {Global} from '../global.js';

    export default {

        data: function () {
            return {
                username: "",
                passwod: "",
                error: false
            }
        },
        methods: {
            login(){
                console.log(Global.logedIn);
                let toSend = {
                    username: this.username,
                    password: this.password
                };
                Global.login(toSend)
                    .then((data) => {
                        Global.token = data.body.token;
                        Global.userId = data.body.id;
                        this.$router.push('/home/' + data.body.id);
                    },(err) => {
                        this.error = true;
                    })
            }
        }
    }
</script>

<style scoped>
    input.form-control {
        margin-bottom: 0.5em;
    }
    .btn-primary {
        width: 100%;
        margin-bottom: 1em;
        background-color:#333333;
    }
    .container{
       /*background-color: rgba(255, 238, 211, 0.8);*/
    }
</style>
