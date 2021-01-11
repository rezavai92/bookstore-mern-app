import React,{useState,useEffect,useContext}from 'react'
import {context} from '../../../contexts/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import {OverlayTrigger,Button,Tooltip} from 'react-bootstrap'
import axios from 'axios'
import './book.css'


const Book =(props)=>{

    const [bookSrc,setBookSrc] = useState("");



    useEffect(()=>{

    setBookSrc ('data:image/jpeg;base64,'+arrayBufferToBase64(props.book.photo.data.data))
    },[])
    const {arrayBufferToBase64,cart,addToCart,removeFromCart} = useContext(context)


    const renderTooltip =<Tooltip>
    <p>
      {props.book.name}
    </p>
    <p>
    {props.book.author.name}
    </p>
    </Tooltip>

    return(<div className="book" >

      

 <OverlayTrigger
    placement="auto"
    
    delay={{ show: 250, hide: 400 }}
    overlay={renderTooltip}
  >
    <Button variant="dark" style={{height:"100%",width:"100%"}} >

    <img src={bookSrc} width="80%" height="60%" />    
          <p>{props.book.name}</p>  
          <p>{props.book.author.name}</p>
          <p>{props.book.price}</p>
          <Button variant="warning"  className="add-to-cart" onClick={()=>{
            addToCart(props.book)
          }}  >
            
            <FontAwesomeIcon icon={faShoppingCart} size="1x" />
            
            {" "} {" "} Add To Cart
           </Button>


    </Button>

   
  </OverlayTrigger>
 
         
        </div>)
}

export default Book