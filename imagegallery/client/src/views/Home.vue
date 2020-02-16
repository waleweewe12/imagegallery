<template>
  <div class="home">
    <Navbar v-if="$store.getters.username!=''"/>
    <LoginForm v-if="$store.getters.username==''"/>
    <Content v-if="$store.getters.username!=''"/>
    
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm'
import Navbar from '@/components/Navbar'
import Content from '@/components/Content'
//import Pagnigation from '@/components/Pagnigation'

export default {
  name: 'home',
  components: {
    LoginForm,Navbar,Content
  },
  methods:{
    changeusername:function(event){
      this.$store.commit('setusername',event.target.value)
    },
    clearstorage:function(){
      this.$store.commit('clearuser')
      this.$router.replace('/')
    }
  }
}

</script>

<style scoped>
  
</style>

