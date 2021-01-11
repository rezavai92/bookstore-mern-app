import React,{useState,useEffect,useContext}from 'react'
import {Navbar,Nav,Form,Button,FormControl} from 'react-bootstrap'
import {context} from '../../../contexts/context'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import Books from '../products/books'
import './home.css'
import { propTypes } from 'react-bootstrap/esm/Image'
const Home =()=>{

  const {cart,total,removeFromCart} = useContext(context);
  
  console.log(cart.items)
  
    return(<div style={{position:"relative"}} >
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
    <Nav>
      <Nav.Link>
        Sign In
      </Nav.Link>
      <Nav.Link>
        <Link to="/cart" style={{color:"yellow"}} >
        <FontAwesomeIcon icon={faShoppingCart}/> {cart.items.length}
          </Link>

      </Nav.Link>
    </Nav>
  </Navbar>

{/*    
  </Navbar> */}


        <div className="container" >
        <div className="home-books "   >
        <Books></Books>
        </div>

        
        </div>
        <div className="total-cart" >
          <FontAwesomeIcon  icon={faShoppingCart} />
          {total}
        </div>

        <footer>
            
        </footer>
        </div>) 
}

export default Home