<template>
    <div v-if="$store.getters.username!=''">
        <Navbar/>
        <div class="container">
            <!--<div class="row" v-for='cardnum in ($store.getters.source).length' :key='cardnum'>
                <Card v-if='cardnum>min && cardnum<max'  :cardnumber="cardnum" />
            </div>-->
            <div class="row">
                <Card v-for='n in ($store.getters.source).length' :key='n' :cardnumber="n"/>
            </div>
        </div>
        <div class="container fixed-bottom">
            <div class="overflow-auto">
                <b-pagination-nav :link-gen="linkGen" :number-of-pages="$store.getters.totalpage" use-router></b-pagination-nav>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Card from '@/components/Card'

export default {
    name:'Page',
    data:function(){
        return{
            number:parseInt(this.pagenum)
        }
    },
    props:[
        'pagenum'
    ],
    components:{
        Navbar,Card
    },
    methods:{
        loadcardsource:function(){
            
        },
        linkGen(pageNum) {
            this.$store.commit('setpage',parseInt(this.pagenum))
            if(pageNum==1)
                return '/'
            else
                return '/Page/'+pageNum
        }
    }
}
</script>

