import React,{useState,useEffect,useContext}from 'react'


import {context} from '../../../contexts/context'
import Navigation from '../navigation/navigation'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import Books from '../products/books'
import './home.css'
import { propTypes } from 'react-bootstrap/esm/Image'
const Home =()=>{

  const {cart,countTotal,removeFromCart} = useContext(context);
  
  
  
    return(<div style={{position:"relative"}} >
      <Navigation/>

{/*    
  </Navbar> */}


        <div className="container" >
        <div className="home-books "   >
        <Books></Books>
        </div>

        
        </div>
        <div className="total-cart" >
          <FontAwesomeIcon  icon={faShoppingCart} />
          {countTotal()}
        </div>

        <footer>
            
        </footer>
        </div>) 
}

export default Home