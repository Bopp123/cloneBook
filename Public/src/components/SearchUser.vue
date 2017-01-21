<template>
    <div class="main-edit text-center">
        <div class="form text-center">
            <div class="form-group">
                <label>First name</label>
                <input v-model="firstName" type="text" class="form-control">
            </div>
            <div class="form-group">
                <label>Last name</label>
                <input v-model="lastName" type="text" class="form-control">
            </div>
            <div class="form-group">
                <label>Username</label>
                <input v-model="username" type="text" class="form-control">
            </div>
            <div class="form-group">
                <label>Email</label>
                <input v-model="email" type="email" class="form-control">
            </div>
            <div class="form-group">
                <label>Phone</label>
                <input v-model="phone" type="text" class="form-control">
            </div>
            <div class="form-group">
                <label>Street</label>
                <input v-model="street" type="text" class="form-control">
            </div>
            <div class="form-group">
                <label>Zip</label>
                <input v-model="zip" type="text" class="form-control">
            </div>
            <div class="form-group">
                <label>City</label>
                <input v-model="city" type="text" class="form-control">
            </div>
            <div class="form-group">
                <label>Country</label>
                <input v-model="country" type="text" class="form-control">
            </div>
            <div>
                <button class="btn btn-primary" @click="findUser">Search</button>
            </div>
            <div class="err" v-if="error">
                <p>Please try again</p>
                <p>{{errorMsg}}</p>
            </div>
        </div>
</template>

<script>
    import {Global} from '../global.js';
    import {eventBus} from "../main";
    export default{
        data: function () {
            return {
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                phone: '',
                street: '',
                zip: '',
                city: '',
                country: ''
            };
        },
        methods: {
            findUser(){
                Global.findUsers(this.generateQuery())
                    .then((data) => {
                        eventBus.$emit('searchPerformed', data.body);
                    }, (err) => {
                        console.log(err);
                        this.error = true;
                        this.errorMsg = err.body;
                    });


            },
            generateQuery(){
                let query = '?';
                if (this.firstName !== '') query += 'name.firstName=' + this.firstName + '&';
                if (this.lastName !== '') query += 'name.lastName=' + this.lastName + '&';
                if (this.username !== '') query += 'username=' + this.username + '&';
                if (this.email !== '') query += 'contact.email=' + this.email + '&';
                if (this.phone !== '') query += 'contact.phone=' + this.phone + '&';
                if (this.street !== '') query += 'address.street=' + this.street + '&';
                if (this.zip !== '') query += 'address.zip=' + this.zip + '&';
                if (this.city !== '') query += 'address.city=' + this.city + '&';
                if (this.country !== '') query += 'address.country=' + this.country;
                return query;
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
        width: 50%;
        margin-bottom: 1em;
        background-color: #333333;
        height: 5vh;

    }

    .closeBtn {
        background-color: #333333;
        height: 5vh;
        margin-left: 20px;
        margin-bottom: 1em;
        color: white;
    }

    .form {
        padding: 1em;
    }

    .main-edit {
        margin-top: 3em;
        border-bottom-width: 3px;
        border-bottom-style: solid;
        border-bottom-color: #3333;
    }

    input {
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    }
</style>