import React ,{useState,useEffect,useContext} from 'react'
import {context} from '../../../contexts/context'
import {ListGroup,Button} from 'react-bootstrap'
import Navigation from '../navigation/navigation'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Loader from '../loader/loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Authors = ()=>{

    const [authors,setAuthors] = useState([])
    useEffect(()=>{

       async function fetchData (){

                try{
                  const res= await  axios.get('/api/authors/all');

                  setAuthors(res.data.authors)
                }
                catch(error){

                    throw error;
                }
        }

        fetchData()

    },[])

    

    const mappedAuthors = authors.map((author)=>{return(<div>

        <ListGroup.Item  >
           <Link to={`/author/${author._id}`}>
           <li> {author.name} </li>
           </Link>
        </ListGroup.Item>
    </div>)})
    return(<div  >
        
        <Navigation />
        <div style={{textAlign:"center"}} >
            <h2>
                List of Authors
            </h2>
        </div>
         
        <ListGroup className="container" style={{listStyleType:"circle"}}  >
            <ul>
                {authors.length>0? mappedAuthors :<Loader/> }
            </ul>
            
        </ListGroup>

    </div>)
}

export default Authors

