import React,{useState,useEffect,useContext} from 'react'
import {context} from '../../../contexts/context'
import {Button,ListGroup} from 'react-bootstrap'
import './cart.css'
import { set } from 'js-cookie'
const Cart = ()=>{

    const {total,incrementTotal,decrementTotal,addToCart,removeFromCart,cart,arrayBufferToBase64} = useContext(context);
    const[items,setItems] = useState([]);
    const[shippingTotal,setShippingTotal] = useState(0)
    const[totalNow,setTotalNow] = useState(0)
    const[unitPerItem,setUnitPerItem] = useState({});

    console.log("cart items are",items)
    useEffect(()=>{

        setItems(cart.items)
        setTotalNow(total);

        if(cart.items.length>0){
            setShippingTotal(50)
        }
    
        

        const existingUnitPerItem = Object.assign({},unitPerItem) 
      cart.items.forEach((i)=>{ let id= i._id; let unit=1;
        
        existingUnitPerItem[id]=unit;
        setUnitPerItem(existingUnitPerItem)

      
    } ) 
},[])



    const mappedCartItems = items.map((i,index)=>{
        return(<div className="cart-item" >
                
        <div>
        <img src={ 'data:image/jpeg;base64,'+arrayBufferToBase64(i.photo.data.data)} 
        height="50%" width="90%"
        />
        </div>

        <div>
        <h4>{i.name}</h4>
        <p>{i.author.name}</p>
        <p>{i.publisher.name} </p>
       
        </div>
        <div className="increment-decrement" >

            <div>
                <Button variant="secondary" onClick={()=>{

                    const units =Object.assign({},unitPerItem);
                    units[i._id]++;
                    setUnitPerItem(units);
                    setTotalNow(totalNow+i.price)
                }} >+</Button>
            </div>
            <div>
                <p>{unitPerItem[i._id]}</p>
            </div>
            <div>
                <Button variant="secondary" onClick={()=>{

const units =Object.assign({},unitPerItem);
        units[i._id]--;
        if(units[i._id]<=0){

            alert("cannot be less than one")
        }
        else  {setUnitPerItem(units)
                setTotalNow(totalNow-i.price)
        }

                }}  >-</Button>
            </div>
        </div>
        <div style={{textAlign:"center"}} >
        <h6> Tk {i.price*unitPerItem[i._id]}</h6>
        </div>

    
        
    </div>)
       
    }) 


    return(<div  >



       <div className="cart-items-total-flex " >
           <div className="cart-items" >
               <div style={{backgroundColor:"white",textAlign:"center"}} >
                <h2>My Cart</h2>
               </div>

            {
                mappedCartItems
            }
            </div>
            <div className="total" >
                <div className="total-calculator" >
                    <h3>Checkout</h3>
                <ListGroup>
                <ListGroup.Item> Sub Total :  {totalNow}</ListGroup.Item>
                <ListGroup.Item> Shipping Total :   {shippingTotal}   </ListGroup.Item>
                <ListGroup.Item> Payable Total :{totalNow+shippingTotal}</ListGroup.Item>
                <ListGroup.Item><Button variant="warning" >Go to Shipping Page</Button></ListGroup.Item>
                </ListGroup>

                </div>

            </div>
                    
        </div>
    </div>)

}

export default Cart