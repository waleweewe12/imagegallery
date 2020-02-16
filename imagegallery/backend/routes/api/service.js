const express=require('express')
const Router=express.Router()
const mongoose=require('mongoose')
const users=require("../models/register")
const image=require("../models/image")
const bcrypt=require("bcrypt")
const jwt = require('jsonwebtoken')
const multer=require('multer')
const fs=require('fs')

const uri="mongodb+srv://weerapath:"+"weerapath"+"@cluster0-kch9u.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri,{  useNewUrlParser: true , useCreateIndex: true ,useFindAndModify:false});

Router.post('/registration',async (req,res)=>{
    try{
        const salt=await bcrypt.genSalt()
        const hashpassword=await bcrypt.hash(req.body.form.password,salt)
        const Newregister=new users({  
            email:req.body.form.email,
            username:req.body.form.username,
            password:hashpassword
        })
        Newregister.save() 
        .then((result)=>{
            res.status(201).json({
                save:"saved"
            });
        }).catch((err)=>{
            console.log(err)
            res.status(500).json({
                save:"error on save"
            });
        })
    }catch(err){
        console.log(err)
    }
    
})

Router.post('/login',(req,res)=>{
 
    users.findOne().or([{email:req.body.username},{username:req.body.username}])
    .exec()
    .then(async result=>{
        if(await bcrypt.compare(req.body.password,result.password))
        {
                const token=jwt.sign(
                {
                    username:result.username,
                    email:result.email,
                    userId:result._id
                },
                'secret',
                {
                    expiresIn:'24h'
                }
            )
            req.session.user=token
            res.send({
                error:"",
                token:token
            })
        }else{
            res.send({
                error:"password is incorrect",
            })
        }
        
    })
    .catch(err=>{
        console.log(err)
        res.send({
            error:"no user in database"
        })
    })
})

Router.post('/getuser',(req,res)=>{
    jwt.verify(req.body.token,'secret',(err,authData)=>{
        if(err)
        {
            res.sendStatus(403)
        }else{
            res.send({
                message:"Get User",
                authData
            })
        }
    })
})

Router.post('/upload',(req,res)=>{
    var count=0
    let storage=multer.diskStorage({
        destination:function(req,file,cb){
            fs.mkdir('./assets/image/'+req.body.directory,()=>{
                
            })
            cb(null,"./assets/image/"+req.body.directory)
        },
        filename:function(req,file,cb){
            cb(null,file.originalname)
        }
    })
    let upload=multer({storage:storage}).array('image',1000)

    upload(req,res,function(err){
        if(err)
        {
            console.log(err)
            res.end()
        }
        image.find({directory:req.body.directory})
            .exec()
            .then(result=>{
                if(result.length==0)
                {
                    let FileNameArray=new Array()
                    for(let i=0;i<req.files.length;i++)
                    {
                        FileNameArray.push(req.files[i].originalname)
                    }
                    const NewDirectory=new image({
                        directory:req.body.directory,
                        filename:FileNameArray
                    })
                    NewDirectory.save()
                    .catch(err=>{
                        console.log(err)
                    })
                }else{
                    image.findOne({directory:req.body.directory})
                    .exec()
                    .then(result=>{
                        let FileNameArray=new Array()
                        FileNameArray=result.filename
                        for(let i=0;i<req.files.length;i++)
                        {
                            FileNameArray.push(req.files[i].originalname)
                        }
                        image.findOneAndUpdate({directory:req.body.directory},{ $set: { filename: FileNameArray }})
                        .exec()
                        .catch(err=>{
                            console.log(err)
                        })
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                }
            })
            .catch(err=>{
                console.log(err)
            })
    })
})

Router.get('/showdirectory',(req,res)=>{
    image.find()
    .then(result=>{
        res.send(result)
    })
    .catch(err=>{
        console.log(err)
    })
})

/*Router.post('/getuser',verifyToken,(req,res)=>{
    jwt.verify(req.token,process.env.JWT_KEY,(err,authData)=>{
        if(err)
        {
            res.sendStatus(403)
        }else{
            res.send({
                message:"Get User",
                authData
            })
        }
    })
})

function verifyToken(req,res,next){
    const bearerHeader=req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined')
    {
        const bearer=bearerHeader.split(' ');

        const bearerToken=bearer[1]

        req.token=bearerToken

        next()
    }else{
        res.status(403).end()
    }
}*/

module.exports = Router