<template>
    <div>
        <div><img alt="Vue logo" src="../assets/momo.png"> </div>       
        <b-form id="login-form" @submit="submit">
            <b-form-group class="form-group" label="username or email" lebel-for="username">
                <b-form-input v-model="login.username" id="username" type="text" required>
                </b-form-input>
                <b-form-invalid-feedback :state="username_validation" >
                    {{$store.getters.error}}
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group class="form-group" label="password" lebel-for="password">
                <b-form-input v-model="login.password" id="password" type="password" required>
                </b-form-input> 
                <b-form-invalid-feedback :state="password_validation" >
                    {{$store.getters.error}}
                </b-form-invalid-feedback>
            </b-form-group>
            <a href="#">ลืมรหัสผ่าน?</a>
            <b-form-checkbox
                id="checkbox-1"
                name="checkbox-1"
                value="accepted"
                unchecked-value="not_accepted"
            >
            จดจำฉันไว้ในระบบ
            </b-form-checkbox>
            <b-form-group>           
                <b-button type="submit" variant="primary" class="submit">เข้าสู่ระบบ</b-button>
                <router-link to='/registration'><b-button variant="danger" class="submit" style="margin-left:10px;">สมัครสมาชิก</b-button> </router-link>
            </b-form-group> 
        </b-form>
      
   </div>
</template>

<script>
export default {
    data:()=>{
        return{
            login:{
                username:'',
                password:''
            }
        }
    },
    name:"LoginForm",
    methods:{
        submit:function(evt){
            evt.preventDefault()
            this.$store.commit('login',this.login)
        }
    },
    computed:{
        username_validation(){
            if(this.$store.getters.error=='no user in database')
                return false
            else
                return true
        },
        password_validation(){
            if(this.$store.getters.error=='password is incorrect')
                return false
            else
                return true
        }
    }
}
</script>

<style scoped>
    #login-form{
        width:20%;
        margin-left:auto;
        margin-right: auto;
    }
    .form-group{
        margin-top:10px;
    }
    .submit{
        float:left;
        margin-top:10px;
    }
    img{
        width:20%;
        margin-left:auto;
        margin-right:auto;
        display: block;
        margin-top:2%;
    }
</style>
