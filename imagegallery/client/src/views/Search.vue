<template>
    <div v-if="$store.getters.username!=''">
        <Navbar/>
        <div class="container">
            <div class="row">
                <CardSearch v-for='(n,index) in ($store.getters.source).length' :key='(n,index)' :cardnumber="n" :search='searchwords' :index='index'/>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import CardSearch from '@/components/CardSearch'

export default {
    name:'Search',
    components:{
        Navbar,CardSearch
    },
    props:[
        'searchwords'
    ]
}
</script>