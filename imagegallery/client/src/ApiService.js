import axios from 'axios'

class ApiService{
    static register(form){
        const url="http://localhost:5000/api/service/registration"
        axios.post(url,{
            form
        })
    }

    static login(user){
        
        return new Promise(async (resolve,reject)=>{
            try{
                const url="http://localhost:5000/api/service/login"
                const data=await axios.post(url,user)
                resolve(data.data)
            }catch(err){
                reject(err)
            }
        })
    }

    static getuser(token){
        return new Promise(async (resolve,reject)=>{
            try {
                const url="http://localhost:5000/api/service/getuser"
                const user_data=await axios.post(url,{token:token})
                resolve(user_data.data)
            } catch (error) {
                reject(error)
                console.log(error)
            }
        })
    }

    static getimage(){
        return new Promise(async (resolve,reject)=>{
            try {
                const url="http://localhost:5000/api/service/showdirectory"
                const image=await axios.get(url)
                resolve(image) 
            } catch (error) {
                reject(error)
                console.log(error)
            }
        })
    }
}

export default  ApiService