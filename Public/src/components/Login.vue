<template>

    <div class="form">
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

                        Global.getUser(Global.userId)
                            .then((data) => {
                                Global.user = data.body;
                                this.$router.push('/home/');
                            }, (err) => {
                                console.log(err);
                            });


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
    .form{
        padding: 1em;
    }

    .err {
        margin-top: 2em;
        background-color: rgba(255, 112, 79, 0.7);
    }
</style>
