if(process.env.NODE_ENV!=='production'){
    require('dotenv').config()
}

const express=require('express')
const session=require('express-session')
const cors=require('cors')
const bodyparser=require('body-parser')
const port =process.env.PORT || 5000
const app=express()

app.use(bodyparser.json())
app.use(express.json())
app.use(cors())
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:false
}))
app.use('/assets',express.static(__dirname+'/assets'))

const service=require('./routes/api/service')
app.use('/api/service',service)

app.listen(port,()=>{
    console.log(`application start at port ${port}`)
})



