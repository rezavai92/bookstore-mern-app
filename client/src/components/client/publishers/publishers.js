import React ,{useState,useEffect,useContext} from 'react'
import {context} from '../../../contexts/context'
import {ListGroup} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Loader from '../loader/loader'
import Navigation from '../navigation/navigation'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './publishers'

const Publishers = ()=>{

    const [publishers,setPublishers] = useState([])
    
    useEffect(()=>{


        const getData = async ()=>{

            try{

             const res=   await axios.get('/api/publishers/all');

             setPublishers(res.data.publishers)

            }

            catch(error){

                throw error;

            }

        }

        getData()
    },[])

    const mappedPublishers = publishers.map((publisher)=>{

        return(<div>


        <ListGroup.Item  >
           <Link to={`/publisher/${publisher._id}`}>
           <li> {publisher.name} </li>
           </Link>
        </ListGroup.Item>
        </div>)
    })

    return(<div>

        <Navigation/>

       <div className="container publishers" >

       <div style={{textAlign:"center"}} >
                <h1>
                    List of All Publishers
                </h1>
            </div>
       {publishers.length>0 ? 
        
        <ListGroup style={{listStyleType:"circle"}} >
            <ul  > 
            {mappedPublishers}
            </ul>

        </ListGroup>
        :<Loader></Loader>}
       </div>

    </div>)
}

export default Publishers

