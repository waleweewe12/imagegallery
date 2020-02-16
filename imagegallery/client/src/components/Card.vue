<template>
      <div 
      class="card col-md-4 col-lg-3 col-sm-6 mr-4 mt-5" 
      style="width: 18rem;"
      v-if="cardnumber>(($store.getters.page-1)*12) && cardnumber<=($store.getters.page*12)">
        <img v-bind:src="card.cardcover" class="card-img-top" alt="ไม่สามารถโหลดรูปภาพได้" style="height: 200px;">
        <div class="card-body">
            <h5 class="card-title">{{card.name}}</h5>
            <b-button v-bind:id='cardtoggle' variant="primary" @click="togglemodal">แสดงรูปภาพ</b-button>
            <b-modal v-bind:ref='cardmodal' v-bind:title="card.name">
              <img v-bind:src="card.source[card.count]" alt="ไม่สามารถโหลดรูปภาพได้" class="ModalImage" />
              <div slot="modal-footer" slot-scope="{cancel}">
                <button class="btn btn-success" v-on:click="previmg" style="margin-right:20px;">Prev</button>
                <button class="btn btn-danger" v-on:click="nextimg" style="margin-right:100px;">Next</button>
                <button class="btn btn-primary" @click="cancel()">close</button>
              </div>
            </b-modal>
        </div>
    </div>
   
</template>

<script>

export default {
    data:function(){
      return{
        card:this.getcarddeck(),
        cardmodal:'modal'+this.cardnumber,
        cardtoggle:'#toggle'+this.cardnumber
      }
    },
    name:"Card",
    methods:{
      nextimg:function(){
        if(this.card.count<this.card.source.length-1)
          this.card.count++
        else
          this.card.count=0
      },
      previmg:function(){
        if(this.card.count>0)
          this.card.count--
        else
          this.card.count=this.card.source.length-1
      },
      getcarddeck:function(){
        let card=this.$store.getters.getcard(this.cardnumber-1)
        return card
      },
      togglemodal:function(){
        this.$refs[this.cardmodal].toggle(this.cardtoggle)
      }
    },
    props:{
      cardnumber:{
        type:Number
      }
    }
}
</script>

<style scoped>
  .ModalImage{
    width: 100%;
  }
</style>