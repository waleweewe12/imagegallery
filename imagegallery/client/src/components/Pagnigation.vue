<template>
    <div class="container">
      <b-pagination
        v-model="currentPage"
        :total-rows="9"
        :per-page="perPage"
        aria-controls="my-table"
        style="margin-top:100px;"
      ></b-pagination>
    </div>
</template>

<script>
export default {
    name:'Pagnigation',
    data:function(){
    return{
      perPage: 1,
      currentPage: 1
    }
  },
}
</script>

<style scoped>

</style>