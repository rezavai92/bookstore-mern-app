import React,{useState,useEffect,useContext} from 'react'
import {Navbar,Nav,Form,Button,FormControl} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Search from '../search/search'
import {Link,Redirect} from 'react-router-dom'
import {context} from '../../../contexts/context'

const Navigation = ()=>{

   const [searchTerm,setSearchTerm] = useState("");
    const[willRedirect,setWillRedirect] = useState(false)
    const [books,setBooks] = useState([]);

    

    const searchHandler   =()=>{

        async function fetchData (){

           setWillRedirect(true)
        }
        fetchData()
    }

    console.log("will redirect to search",willRedirect)
const { cart,saveChangesInSearch} =useContext(context)
    return(<div>


 {willRedirect 
 ? <Redirect to={`/book/search?term=${searchTerm}`} /> : null}
 
 <Navbar bg="dark" variant="dark">
    <Navbar.Brand ><Link to="/" style={{color:"white"}} >Book Corner</Link></Navbar.Brand>
    <Nav className="mr-auto"  >
      <Nav.Link ><Link style={{color:"white"}} to="/authors" >Authors</Link></Nav.Link>
      <Nav.Link ><Link style={{color:"white"}} to="/publishers" > Publishers </Link></Nav.Link>
      
    </Nav>
    <Form inline>
      <FormControl type="text" value={searchTerm}
      onChange={(e)=>{setSearchTerm(e.target.value)}}
      placeholder="Search By Book Name" className="mr-sm-2" />
      <Button variant="outline-info"
      onClick={searchHandler}
      >Search</Button>
    </Form>
    <Nav>
      <Nav.Link>
        Sign In
      </Nav.Link>
      <Nav.Link>
        <Link to="/cart" style={{color:"yellow"}} >
        <FontAwesomeIcon icon={faShoppingCart}/> {cart.length}
          </Link>

      </Nav.Link>
    </Nav>
  </Navbar>
 
    </div>)
}

export default Navigation;