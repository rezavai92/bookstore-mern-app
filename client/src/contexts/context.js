import React, {createContext,useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
export const context = createContext();


const ContextProvider = (props)=>{



const[loggedInAdminId,setLoggedInAdminId] = useState(null)
const [token,setToken] =useState("");
const[loggedInUserId,setLoggedInUserId]=useState(null)
const[adminLoginToken,setAdminLoginToken] = useState("")
const[loginToken,setLoginToken] = useState("");
//console.log("from context")


useEffect(()=>{

setAdminLoginToken(Cookies.get("axdxmxixn"))
//setLoggedInUserId(Cookies.get("user"))
},[])

const registerUser = (token)=>{

    setToken(token);

}

const confirmAdminLogin = (token,loggedInAdminId)=>{

    setAdminLoginToken(token);
    setLoggedInAdminId(loggedInAdminId)

}
const confirmAdminLogout = ()=>{
    
    async function fetch (){

        try{
            await axios.get('/api/auth/admin/logout',
           {headers:{
               axdxmxixn :adminLoginToken
           }} 
            )
            setAdminLoginToken(Cookies.get("axdxmxixn"))
            setLoggedInAdminId(Cookies.get("admin"))
            
        }
        catch(err){


        }
    }
    fetch()

    }

    const confirmLogin = (token,loggedInAdminId)=>{

        setAdminLoginToken(token);
        setLoggedInAdminId(loggedInAdminId)
    
    }
    const confirmLogout = ()=>{
        
        async function fetch (){
    
            try{
                await axios.get('/api/auth/logout',
               {headers:{
                   axdxmxixn :loginToken
               }} ,
                )
                setAdminLoginToken(Cookies.get("axdxmxixn"))
                setLoggedInAdminId(Cookies.get("admin"))
                
            }
            catch(err){
    
    
            }
        }
        fetch()
    
        }

    return(<div>

        <context.Provider value={{loggedInUserId, loginToken,loggedInAdminId,confirmLogin,confirmLogout,
        
        adminLoginToken, confirmAdminLogin,confirmAdminLogout
        }} >

            {props.children}
        </context.Provider>
    </div>)
}


export default ContextProvider