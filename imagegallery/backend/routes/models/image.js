const mongoose=require('mongoose');

const image=new mongoose.Schema({
    directory:{type:String , default:""},
    filename:{type:Array ,default:""}
});

module.exports=mongoose.model('image',image);