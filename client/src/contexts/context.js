import React, {createContext,useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
export const context = createContext();


const ContextProvider = (props)=>{



const[loggedInAdminId,setLoggedInAdminId] = useState(null)
const[cart,setCart] = useState([])

const[searchedBooks,setSearchBooks] = useState([])
const[total,setTotal] = useState(0)
const [token,setToken] =useState("");
const[loggedInUserId,setLoggedInUserId]=useState(null)
const[adminLoginToken,setAdminLoginToken] = useState("")
const[loginToken,setLoginToken] = useState("");
//console.log("from context")


useEffect(()=>{

if(Cookies.get("cartID")){

    
    const cartITemsInStore = JSON.parse(localStorage.getItem("cart-items"));
    console.log(typeof(cartITemsInStore)  )
    setCart(cartITemsInStore )  ;
    console.log(cart)
    
}
else{
    if(localStorage.getItem("cart-items")){
        localStorage.removeItem("cart-items")
    }
}

setAdminLoginToken(Cookies.get("axdxmxixn"))
//setLoggedInUserId(Cookies.get("user"))
},[])

 
const registerUser = (token)=>{

    setToken(token);

}


const saveChangesInSearch= (item)=>{

    setSearchBooks(item)
}

const incrementItem = (itemId)=>{

    const existingItems= [...cart];

   const extItems= existingItems.map((i)=>{if ((i.item._id)===itemId){

        i.number++;
        
    }; return i; });

    setCart(extItems);
    localStorage.setItem("cart-items",JSON.stringify(extItems));
    
}
const decrementItem  = (itemId)=>{

    const existingItems= [...cart];

   const extItems= existingItems.map((i)=>{if ((i.item._id)===itemId){

        i.number--;
        
    }
    return i;
});

    setCart(extItems);
    localStorage.setItem("cart-items",JSON.stringify(extItems));
    
}

const addToCart=(item)=>{

const cartItems = [...cart];

 const found =cartItems.find((i)=>{return item._id===i.item._id});

 console.log(found)
 if(found){
    alert("this item is already added to the cart");

 }

 else{
     
     cartItems.push({item:item,number:1});    
     
    setCart(cartItems);
    console.log(JSON.stringify(cartItems));

    Cookies.set("cartID","sdfg4567gfdh")
    localStorage.setItem("cart-items",JSON.stringify(cartItems));
    
    
    
 }



}

const countTotal = ()=>{

    const net = cart.reduce((a,b)=>{return a+b.item.price*b.number},0);

    return net;
}
const removeFromCart =(itemId)=>{

    const cartItems = [...cart];

    const filteredItems = cartItems.filter((c)=>{

        return c.item._id!=itemId;
    })
    console.log("filtered items",filteredItems)

    setCart(filteredItems);
    localStorage.setItem("cart-items",JSON.stringify(filteredItems)) ;
    if(filteredItems.length===0){
        Cookies.remove("cartID");
        localStorage.removeItem("cart-items")
    }

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
    

    const paymentClear =()=>{
  
        

        setCart([]);
        Cookies.remove("cart-items");
        Cookies.remove("cartID");
        localStorage.removeItem("cart-items")
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

        <context.Provider value={{searchedBooks,paymentClear ,arrayBufferToBase64,countTotal,cart,addToCart,removeFromCart, loggedInUserId, loginToken,loggedInAdminId,confirmLogin,confirmLogout,
        
        adminLoginToken,incrementItem,saveChangesInSearch,decrementItem, confirmAdminLogin,confirmAdminLogout
        }} >

            {props.children}
        </context.Provider>
    </div>)
}


export default ContextProvider