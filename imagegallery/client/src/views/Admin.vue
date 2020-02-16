<template>
    <div class="adminform">
        <b-form @submit="onSubmit"  v-if="show">
            <b-form-group
                id="input-group-1"
                label="บันทึกไฟล์ไปยัง :"
                label-for="input-1"
                description="We'll never share your email with anyone else."
            >
                <b-form-input
                    id="input-1"
                    type="text"
                    v-model="directory"
                    required
                    placeholder="Enter Directory"
                >
                </b-form-input>
                
            </b-form-group>
            <b-form-group>
              <label for="cardcover">ใส่รูปภาพปก</label>
              <p><input type="file" @change="onCardCover" id="cardcover" accept="image/*"></p>
            </b-form-group>
            <b-form-group>
              <label for="fileupload">เพิ่มไฟล์</label>
              <p><input type="file" @change="onFileSelected" id="fileupload" multiple accept="image/*"></p>
            </b-form-group>
            
                   
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-progress v-if="value!=100" style='display:block; margin-top:20px;' :value="value" :max="max" show-progress animated></b-progress>
        <p v-if="value==100">upload success!</p>
    </b-form>
   
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name:'Admin',
    data:()=> {
      return {
        show: true,
        file:[],
        directory:'',
        value:0,
        max:100
      }
    },
    methods: {
      onSubmit:function(evt) {
        evt.preventDefault()
        const url="http://localhost:5000/api/service/upload"
        const formdata=new FormData()
        let FileObject={
          directory:this.directory,
          file:this.file
        }
        formdata.append('directory',FileObject.directory)
       
        for(let i=0;i<FileObject.file.length;i++)
        {
          formdata.append("image", FileObject.file[i])
        }
        axios.post(url,formdata,{
            onUploadProgress: (progressEvent) => {
              this.value=(progressEvent.loaded/progressEvent.total)*100
            },
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        this.file=[]
      },
      onFileSelected(event){
        this.value=0
        for(let i=0;i<event.target.files.length;i++)
        {
          let file=event.target.files[i]
          if(file.name.includes('cardcover'))
          {
            let blob = file.slice(0, file.size, file.type);
            let str= 'image'+'-'+Date.now()+'.jpg'
            let cardcover=new File([blob],str, {type: file.type})
            file=cardcover
          }
          this.file.push(file)
        }
      },
      onCardCover(event){
        this.value=0
        for(let i=0;i<event.target.files.length;i++)
        {
          let file=event.target.files[i]
          let blob = file.slice(0, file.size, file.type); 
          let cardcover=new File([blob],'cardcover.jpg', {type: file.type})
          this.file.push(cardcover)
        }
      },
      checkfile:function(){
        let f=document.getElementById('fileupload').files[0]
        console.log(f)
      }
    }
}
</script>

<style scoped>
    .adminform{
        width:60%;
        margin-left:auto;
        margin-right:auto; 
        margin-top:10%; 
    }
</style>