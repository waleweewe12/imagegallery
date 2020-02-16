<template>
  <div>

    <div class="container">
      <div class="row">
        <Card v-for="n in ($store.getters.source).length"  :key="n"  :cardnumber="n" />
      </div>
    </div>

    <div class="container mt-5">
      <div class="overflow-auto">
        <b-pagination-nav :link-gen="linkGen" :number-of-pages="$store.getters.totalpage" use-router></b-pagination-nav>
      </div>
    </div>

  </div>
</template>

<script>

import Card from './Card'

export default {
    name:'Content',
    components:{
      Card
    },
    data:function(){
      return{
        currentPage: 1,
        cardsource:[]
      }
    },
    methods:{
      changepage:function(){
        this.$router.redirect('/Admin')
      },
      linkGen(pageNum) {
        this.$store.commit('setpage',1)
        return pageNum === 1 ? '?' : `Page/${pageNum}`
      }
    }
}
</script>

<style scoped>

</style>

