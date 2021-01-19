import React ,{useState,useEffect,useContext} from 'react'
import {context} from '../../../contexts/context'
import {ListGroup,Button} from 'react-bootstrap'
import Navigation from '../navigation/navigation'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faBook,faInfoCircle,faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import Book from '../products/book'
import './author.css'

const Author = ()=>{


    const [author,setAuthor] = useState({});
    const [books,setBooks] = useState([])
    const {countTotal} = useContext(context)

    const path = window.location.pathname;

    const pathsep= path.split("/");

    const id = pathsep[2] ;

    useEffect(()=>{

     axios.get(`/api/authors/${id}`).then((res)=>{

        setAuthor(res.data.author);

        axios.get(`/api/book/author/${res.data.author._id}`).then((res)=>{

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
    

    // const mappedBooks=author.book.map((b)=>{
    //     return(<div>
    //             <p>{b.name}</p>
    //         </div>)
    // })
console.log(author)
 return(<div>

     <Navigation />

     <div className="profile container" >
       <div  >
       <h1 >
             <FontAwesomeIcon icon={faUser} size="2x" />
         </h1>
         <h4>{author.name}</h4>
         <p>
             <FontAwesomeIcon icon={faInfoCircle} />{" "+author.description}</p>
       </div>
       <hr/>
       <h4> <FontAwesomeIcon icon={faBook} /> List of {`${author.name}'s`} Books </h4>
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

     <div className="author-book-list" >

            
     </div>
 </div>)
}

export default Author

