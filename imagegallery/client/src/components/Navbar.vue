<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#" v-on:click='gohome'>Smile Picture Club</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <!--<b-navbar-nav>
                    <b-nav-item href="#">Link</b-nav-item>
                    <b-nav-item href="#" disabled>Disabled</b-nav-item>
                </b-navbar-nav>-->

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-form @submit="submit">
                        <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model='SearchValue'></b-form-input>
                        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                    </b-nav-form>

                    <b-nav-item-dropdown right>
                    <!-- Using 'button-content' slot -->
                        <template slot="button-content"><em>{{$store.getters.username}}</em></template>
                        <!--<b-dropdown-item href="#">Profile</b-dropdown-item>-->
                        <b-dropdown-item href="#" v-on:click="logout">Log Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>

export default {
    data:function(){
        return{
            SearchValue:''
        }
    },
    methods:{
        logout:function(){
            this.$store.commit('clearuser')
            this.$router.replace('/')
        },
        submit:function(evt){
            evt.preventDefault()
            this.$store.commit('setsearch',this.SearchValue)
            this.SearchValue=''  
            this.$router.replace('/Search/'+this.$store.getters.search)
        },
        gohome:function(){
            this.$router.replace('/')
        }
    }
}
</script>
