<template>
    <div>
        <b-form id="Register-form" @submit="onSubmit">
            <h1 style="text-align:center; margin-top:10%;">Registration</h1>
            <b-form-group
            label="Email : "
            label-for="email"
            class="input"
            style="margin-top:10%;"
            >
                <b-form-input
                v-model="form.email"
                id="email"
                type="email"
                required    
                >
                </b-form-input>
            </b-form-group>
            <b-form-group
            label="username : "
            label-for="username"
            class="input"
            >
                <b-form-input
                v-model="form.username"
                id="username"
                type="text"
                required    
                >
                </b-form-input>
            </b-form-group>
            <b-form-group
            label="password : "
            label-for="password"
            class="input"
            >
                <b-form-input
                v-model="form.password"
                id="password"
                type="password"
                required    
                >
                </b-form-input>
            </b-form-group>
            <b-button type="submit" style="width:50%; margin-left:25%; margin-right:25%; margin-bottom:10%;">submit</b-button>
        </b-form>
    </div>
</template>

<script>

import ApiService from '../ApiService'

export default {
    data:()=>{
        return{
            form:{
                email:"",
                username:"",
                password:""
            }
        }
    },
    name:"Registration",
    methods:{
        onSubmit(evt) {
        evt.preventDefault()
        ApiService.register(this.form)
        this.$router.replace('/')
      },
    }
}

</script>

<style scoped>
    #Register-form{
        width:30%;
        margin-left: auto;
        margin-right: auto;
        border:1px solid black;
        border-radius:5px;
        margin-top:3%; 
        background-color:white; 
    }
    .input{
        margin-left:10%;
        margin-right: 10%;
    }
</style>

