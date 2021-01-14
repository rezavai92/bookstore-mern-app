import React ,{useState,useEffect,useContext} from 'react'
import {context} from '../../../contexts/context'
import {ListGroup,Button} from 'react-bootstrap'
import Navigation from '../navigation/navigation'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faBook,faInfoCircle,faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import Book from '../products/book'


const Publisher = ()=>{


    const [publisher,setpublisher] = useState({});
    const [books,setBooks] = useState([])
    const {countTotal} = useContext(context)

    const path = window.location.pathname;

    const pathsep= path.split("/");

    const id = pathsep[2] ;

    useEffect(()=>{

     axios.get(`/api/publishers/${id}`).then((res)=>{

        setpublisher(res.data.publisher);

        axios.get(`/api/book/publisher/${res.data.publisher._id}`).then((res)=>{

            setBooks(res.data.books);

        }).catch((error)=>{

            throw error;
        })
     }).catch((error)=>{

        throw error

     });

     
     
    },[])

    const mappedBooks =
        books.map((b)=>{
            return(<Book book={b} />)
        })
    

    // const mappedBooks=publisher.book.map((b)=>{
    //     return(<div>
    //             <p>{b.name}</p>
    //         </div>)
    // })
console.log(publisher)
 return(<div>

     <Navigation />

     <div className="profile container" >
       <div  >
       <h1 >
             <FontAwesomeIcon icon={faUser} size="2x" />
         </h1>
         <h4>{publisher.name}</h4>
       {
           publisher.description?
           <p>
           <FontAwesomeIcon icon={faInfoCircle} />{" "+publisher.description}
      </p>
      : null
       }
       </div>
       <hr/>
       <h3> <FontAwesomeIcon icon={faBook} /> List of {`${publisher.name}'s Published`} Books </h3>
        <div className="books-flex" >
          
                {
                    mappedBooks
                }
        </div>
         
        <div className="total-cart" style={{backgroundColor:"#fca903"}}  >
          <FontAwesomeIcon  icon={faShoppingCart}  />
          {countTotal()}
        </div>


     </div>

     <div className="publisher-book-list" >

            
     </div>
 </div>)
}

export default Publisher

