import React, {createContext,useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
export const context = createContext();


const ContextProvider = (props)=>{



const[loggedInAdminId,setLoggedInAdminId] = useState(null)
const[cart,setCart] = useState({items:[]})
const[total,setTotal] = useState(0)
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

const incrementTotal = (amount)=>{

    setTotal(total+amount)
}
const decrementTotal  = (amount)=>{

    setTotal(total-amount);
}

const addToCart=(item)=>{

const cartItems = [...cart.items];

 const found =cartItems.find((i)=>{return item._id===i._id});

 console.log(found)
 if(found){
    alert("this item is already added to the cart");

 }

 else{
     let existingTotal =total;

     setTotal(existingTotal+item.price);
    setCart({items:cartItems});
    
 }
cartItems.push(item);


}

const removeFromCart =(itemId)=>{

    const cartItems = [...cart.items];

    const filteredItems = cartItems.filter((c)=>{

        return c.id!=itemId;
    })

    setCart({items:filteredItems})


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

    const arrayBufferToBase64=(buffer)=> {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
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

        <context.Provider value={{arrayBufferToBase64,total,cart,addToCart,removeFromCart, loggedInUserId, loginToken,loggedInAdminId,confirmLogin,confirmLogout,
        
        adminLoginToken,incrementTotal,decrementTotal, confirmAdminLogin,confirmAdminLogout
        }} >

            {props.children}
        </context.Provider>
    </div>)
}


export default ContextProvider