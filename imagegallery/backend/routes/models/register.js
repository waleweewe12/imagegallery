const mongoose=require('mongoose');

const register=new mongoose.Schema({
    email:{type:String , default:""},
    username:{type:String ,default:""},
    password:{type:String , default:""}
});

module.exports=mongoose.model('register',register);