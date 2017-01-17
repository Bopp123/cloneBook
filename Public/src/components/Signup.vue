<template>
    <div class="form">
        <div class="form-group">
            <label>First name</label>
            <input v-model="user.name.firstName" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label>Last name</label>
            <input v-model="user.name.lastName" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label>Username</label>
            <input v-model="user.username" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label>Password</label>
            <input v-model="user.password" type="password" class="form-control">
        </div>
        <div class="form-group">
            <label>Repeat Password</label>
            <input v-model="testPassword" type="password" class="form-control">
        </div>
        <div class="form-group">
            <label>Email</label>
            <input v-model="user.contact.email" type="email" class="form-control">
        </div>
        <div class="form-group">
            <label>Phone</label>
            <input v-model="user.contact.phone" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label>Age</label>
            <input v-model="user.age" type="number" class="form-control">
        </div>
        <div>
            <button class="btn btn-primary" @click="postUser">Create Account</button>
        </div>
        <div class="err" v-if="error">
            <p>Please try again</p>
            <p>{{errorMsg}}</p>
        </div>
</template>

<script>
    import {Global} from '../global.js';
    export default{
        data: function () {
            return {
                user: {
                    username: "",
                    password: "",
                    name: {
                        firstName: "",
                        lastName: ""
                    },
                    age: 0,
                    contact: {
                        email: "",
                        phone: ""
                    }
                },
                testPassword: "",
                error: false,
                errorMsg: {}
            };
        },
        methods: {
            postUser(){
                if (this.user.password !== this.testPassword) {
                    alert('Password is not identical')

                } else {
                    console.log(this.user);
                    Global.postUser(this.user)
                        .then((data) => {
                            this.$router.push('/welcome/login');
                        }, (err) => {
                            console.log(err);
                            this.error= true;
                            this.errorMsg = err.body;
                        });


                }
            }
        }
    }
</script>

<style scoped>
    .err {
        margin-top: 2em;
        background-color: rgba(255, 112, 79, 0.7);
    }
    .btn-primary {
        width: 100%;
        margin-bottom: 1em;
        background-color: #333333;

    }
    .form{
        padding: 1em;
    }
</style>