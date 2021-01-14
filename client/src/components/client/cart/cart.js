import React,{useState,useEffect,useContext} from 'react'
import {context} from '../../../contexts/context'
import {Button,ListGroup} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Navigation from '../navigation/navigation'
import {Link} from 'react-router-dom'
import './cart.css'
import { set } from 'js-cookie'
const Cart = ()=>{

    const {total,countTotal,incrementItem,decrementItem,addToCart,removeFromCart,cart,arrayBufferToBase64} = useContext(context);
    const[items,setItems] = useState([]);
    const[shippingTotal,setShippingTotal] = useState(0)
    const[totalNow,setTotalNow] = useState(0)
    const[unitPerItem,setUnitPerItem] = useState({});

    console.log("cart",cart)
    console.log("shipping total",shippingTotal)
    useEffect(()=>{

        setItems(cart)
        setTotalNow(countTotal());

        if(cart.length>0){
            setShippingTotal(50)
        }
        else{
            setShippingTotal(0)
        }
    
        

        const existingUnitPerItem = Object.assign({},unitPerItem) 
      cart.forEach((i)=>{ let id= i.item._id; let unit=1;
        
        existingUnitPerItem[id]=unit;
        setUnitPerItem(existingUnitPerItem)

      
    } ) 
},[cart,total])



    const mappedCartItems = items.map((i,index)=>{
       
        return(<div className="cart-item-delete-item" >
            <div className="cart-item" >
                
                <div>
                <img src={ 'data:image/jpeg;base64,'+arrayBufferToBase64(i.item.photo.data.data)} 
                height="50%" width="90%"
                />
                </div>
        
                <div>
                <h4>{i.item.name}</h4>
                <p>{i.item.author.name}</p>
                <p>{i.item.publisher.name} </p>
               
                </div>
                <div className="increment-decrement" >
        
                    <div>
                        <Button variant="secondary" onClick={()=>{
        
                            incrementItem(i.item._id)
                        }} >+</Button>
                    </div>
                    <div>
                        <p>{i.number}</p>
                    </div>
                    <div>
                        <Button variant="secondary" onClick={()=>{
                            if(i.number===1){
        
                                alert("cannot be less than one")
                            }
                           else {
                                decrementItem(i.item._id);
                           }
        
               
                        }}  >-</Button>
                    </div>
                </div>
                <div style={{textAlign:"center"}} >
                <h6> Tk {i.item.price*i.number}</h6>
                </div>
        
            
                
            </div>
            <div className="delete-item" >
                <Button variant="danger"
                onClick={()=>{

                    removeFromCart(i.item._id);
                }}
                ><FontAwesomeIcon icon={faTrashAlt} /></Button>

            </div>

        </div>)

    } )


    return(<div  >


        <Navigation />
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
                <ListGroup.Item><Button variant="warning"
                
                
                > <Link to="/payment" >Go to Shipping Page</Link></Button></ListGroup.Item>
                </ListGroup>

                </div>

            </div>
                    
        </div>
    </div>)

}

export default Cart