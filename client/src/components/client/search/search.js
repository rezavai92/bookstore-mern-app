import React,{useState,useEffect,useContext} from 'react'
import {context} from '../../../contexts/context'
import{Link,Redirect} from 'react-router-dom'
import Navigation from '../navigation/navigation'
import {Navbar,Nav,Form,Button,FormControl} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import Loader from '../loader/loader'
import axios from 'axios'
import Book from '../products/book'
const Search = (props)=>{

    const [books,setBooks] = useState([]);

    const{cart} = useContext(context)
    
    const[searchTerm,setSearchTerm] = useState("");
    const[willRedirect,setWillRedirect] = useState(false)

    console.log("hello")


    const searchHandler =()=>{

        async function fetchData (){

            
            try{
                const res =await axios.get(`/api/book/search/${searchTerm}`);

                setBooks(res.data.books);

            }

            catch(error){


            }

            
        }
    
        fetchData()

        setWillRedirect(true)

    }
    useEffect(()=>{

        async function fetchData (){

            try{
                const res =await axios.get(`/api/book/search/${window.location.href.split("?")[1].split("=")[1]}`);

                setBooks(res.data.books);
            }

            catch(error){


            }

            
        }
    
        fetchData()

    },[willRedirect])

    const mappedBooks =books.map((b)=>{
        return(<Book
            book={b}
        />)
    })

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
        
        <h4>Search Results</h4>
        
        <div className="books-flex container" >


           {books.length>0 ?
           
           mappedBooks
           : <div style={{ position:"absolute",top:"50%",left:"45%"}} > <Loader /> </div>} 
        
        </div>
    </div>)
}

export default Search