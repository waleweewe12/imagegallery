import Vue from 'vue'
import Vuex from 'vuex'
import ApiService from '../ApiService'

Vue.use(Vuex)

export const store=new Vuex.Store({
    state:{
        form:{
            username:"",
            error:""
        },
        source:[],
        search:'',
        page:0
    },
    mutations:{    // mutations ไม่สามารถ return ค่าได้
        login:async function(state,login){
            const result=await ApiService.login(login)
            if(!result.error)
            {
                localStorage.setItem('data_user',result.token)
                let user=await ApiService.getuser(localStorage.getItem('data_user'))
                user=user.authData.username
                state.form.username=user
            }
            else
            {
                state.form.error=result.error
            }
        },
        getuser:async function(state){
            if(localStorage.getItem('data_user'))
            {
                let user=await ApiService.getuser(localStorage.getItem('data_user'))
                user=user.authData.username
                state.form.username=user
            }
        },
        clearuser:function(state){
            localStorage.removeItem('data_user')
            state.form.username=''
        },
        loadsource:async function(state){

            let ImageArray=await ApiService.getimage()
            ImageArray=ImageArray.data
            let sourceArray=new Array()
            for(let j=0;j<ImageArray.length;j++)
            {
                let url='http://localhost:5000/assets/image/'+ImageArray[j].directory+'/'
                for(let i=0;i<ImageArray[j].filename.length;i++)
                {
                    if(ImageArray[j].filename[i]!='Thumbs.db' && ImageArray[j].filename[i]!='cardcover.jpg')
                    {
                        let link=url+ImageArray[j].filename[i]
                        sourceArray.push(link)
                    }
                }
                state.source.push({
                    name:ImageArray[j].directory,
                    source:sourceArray,
                    cardcover:url+'cardcover.jpg',
                    count:0,
                    cardnumber:j+1
                })
                sourceArray=new Array()
            }
        },
        setpage:function(state,page){
            state.page=page
        },
        setsearch:function(state,search){
            //console.log(search)
            state.search=search
        }
    },
    getters:{
        username:state=>state.form.username,
        error:state=>state.form.error,
        source:state=>state.source,
        prev:state=>state.prev,
        getcard:(state)=>(n)=>{
            return state.source[n]
        },
        cardpage:(state)=>(page)=>{
            let min=(page-1)*3
            let max=page*3
            let source=new Array()
            for(let i=0;i<state.source.length;i++)
            {
                if(state.source[i].cardnumber>=min && state.source[i].cardnumber<=max)
                    source.push(state.source[i].cardnumber)
            }
            return source
        },
        page:state=>state.page,
        search:state=>state.search,
        searchArray:(state)=>{
            console.log(state.search)

            let searchArray=new Array()

            for(let i=0;i<state.source.length;i++)
            {
                if(state.source[i].name==state.search)
                {
                    searchArray.push(state.source[i].cardnumber)
                }
            }
            console.log(searchArray)
            return searchArray
        },
        totalpage:(state)=>{
            let n=state.source.length
            if(n%3==0)
                return n/12
            else
                return (n/12)+1
        }
    }
})