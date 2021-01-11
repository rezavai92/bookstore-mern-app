import React ,{useState,useEffect,useContext} from 'react'
import {context} from '../../../../contexts/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt,faEdit } from '@fortawesome/free-solid-svg-icons'
import AddModal from '../AddModal/addModal'
import DeleteModal from './deletemodal'
import {Button} from 'react-bootstrap'
import axios from 'axios'

const BookList = ()=>{

const [willEditPopup,setWillEditPopup] = useState(false)
const[willDeletePopup,setWillDeletePopup] = useState(false)
const [books,setBooks] = useState([])
//const[selectedAuthorName,setSele] = useState("");
const [selectedBook,setSelectedBook] = useState(null)
const {adminLoginToken,arrayBufferToBase64} = useContext(context)
const [edited,setEdited] = useState(false)
console.log("list of book",books)
useEffect(()=>{

    async function fetchData (){
        try{

            const response = await axios.get('/api/book/all',{
                headers:{
                    axdxmxixn:adminLoginToken
                }
            } )

            //let foundAuthors = response.data.authors;


          const newBooks=  response.data.books.map((book)=>{

            return{
                name:book.name,
                _id:book._id,
                description:book.description,
                isbn:book.isbn,
                availability:book.availability,
                genre:book.genre.name,
                photo: 'data:image/jpeg;base64,'+arrayBufferToBase64(book.photo.data.data),
                language:book.language.name,
                page:book.page,
                price:book.price,
                publisher:book.publisher.name,
                author:book.author.name

            }
          })
            setBooks(newBooks)
        }
        catch(error){
            throw error
        }

    }

    fetchData()

},[edited])


const editPopupHandler =(_id,name,description,language,genre,
    isbn,author,publisher,availability,page,price)=>{

    setSelectedBook({_id,name,description,language,genre,isbn,author,publisher,availability,page,price});
   
    setWillEditPopup(!willEditPopup)
    async function fetchData (){
        try{

            const response = await axios.get('/api/book/all',{
                headers:{
                    axdxmxixn:adminLoginToken
                }
            } )
            const newBooks=  response.data.books.map((book)=>{

                return{
                    name:book.name,
                    _id: book._id,
                    description: book.description,
                    genre:book.genre.name,
                    language:book.language.name,
                    photo: 'data:image/jpeg;base64,'+arrayBufferToBase64(book.photo.data.data),
                    price:book.price,
                    isbn:book.isbn,
                    page:book.page,
                    availability:book.availability,
                    author:book.author.name,
                    publisher:book.publisher.name
    
                }
              })
                setBooks(newBooks)
            
        }
        catch(error){
            throw error
        }

    }

    fetchData()

    
}

const deletePopupHandler = (_id
    )=>{

    setSelectedBook({_id})
    setWillDeletePopup(!willDeletePopup)

    async function fetchData (){
        try{

            const response = await axios.get('/api/book/all',{
                headers:{
                    axdxmxixn:adminLoginToken
                }
            } )
            const newBooks=  response.data.books.map((book)=>{

                return{
                    name:book.name,
                    _id:book._id,
                    description:book.description,
                    genre:book.genre.name,
                    language:book.language.name,
                    isbn:book.isbn,
                    publisher:book.publisher.name,
                    photo: 'data:image/jpeg;base64,'+arrayBufferToBase64(book.photo.data.data),
                    page:book.page,
                    price:book.price,
                    availability:book.availability,
                    author:book.author.name,
    
                }
              })
                setBooks(newBooks)
            
        }
        catch(error){
            throw error
        }

    }

    fetchData()
    
}

const mappedBooks = books.map((book)=>{
    return(
    <tr key={book._id} >
    <td >

        {book.name}
    </td>
    {
        book.photo?<td>
         <img src={book.photo} height="45px" width="50px" />
         
        </td>:null
    }
    <td>{book.author}</td>
    <td>
        {book.isbn}
    </td>
    <td>
        {book.genre}
    </td>
    <td>
        {book.language}
    </td>
    <td>
        {book.description}
    </td>
    <td>
        {book.page}
    </td>
    <td>
        {book.price}
    </td>
    <td>
        {book.publisher}
    </td>
    <td>
        {book.availability}
    </td>
    <td>
        <Button variant="info" style={{padding:"1px",margin:"5px"}}  
        onClick={()=>{editPopupHandler(book._id,book.name,book.description,book.language,book.genre,book.isbn,book.author,book.publisher,book.availability,book.page,book.price)  }}
        ><FontAwesomeIcon icon={faEdit} /></Button>
        <Button variant="danger" style={{padding:"1px"}}  
        
        onClick={()=>{deletePopupHandler(
            book._id)  }}
        ><FontAwesomeIcon icon={faTrashAlt}  /></Button>
    </td>

    </tr>
     )
})

return(


    <div style={{marginTop:"5%"}}>
    <h2>List of Books</h2>
    <div className="author-list" >
    
    {
        willEditPopup?
        <AddModal numberBox="0" 
        header="Update Book"
        files="1"
        type="update"
        bookId={selectedBook._id}
        textBoxTexts={[selectedBook.name,selectedBook.isbn,selectedBook.description,selectedBook.availability]}
        numberBoxNumbers = {
            [selectedBook.price,selectedBook.page]
        }
        buttonText= "Update Book"
         dropdown={["author","genre","language","publisher"]}
         textBoxLabels={["name","isbn","description","availability"]}
         dropdownLabels={["Select Language","Select Genre","Select Author","Select Publisher"]}
         numberBoxLabels={["price","page"]}
        textBox="4"
         numberBox="2"
        text="Update Book" 
        addButtonHandler={editPopupHandler}
        bg="#568c91"
        />
        :null
    }

    {
        willDeletePopup? 
        <DeleteModal bookId={selectedBook._id} deletePopupHandler={deletePopupHandler} />
        :null
    }
    <table className="author-table"   >
        <tr>
            <th>
                Name
            </th>
            <th>
                Photo
            </th>
            <th>
                Author
            </th>
            <th>
                Isbn
            </th>
            <th>
                Genre
            </th>
            <th>
                Language
            </th>
            <th>
                Description
            </th>
            <th>
                Page
            </th>
            <th>
                Price
            </th>

            <th>
                Publisher
            </th>
            <th>
                Availability
            </th>
            <th>
                Options
            </th>
        </tr>
        {mappedBooks}
       
    </table>
</div>

</div>)
}

export default BookList