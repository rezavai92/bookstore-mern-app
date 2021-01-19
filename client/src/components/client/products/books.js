import React,{useState,useEffect,useContext}from 'react'
import axios from 'axios'
import Book from './book'
import './books.css'
import Loader from '../loader/loader'
const Books =()=>{

    const [books,setBooks] = useState([])
    
    useEffect(()=>{

        async function getBooks(){

            try{

               const  res= await axios.get("/api/book/all");

               setBooks(res.data.books)

            }
            catch(error){
                
                
            }
        }

        getBooks()
    },[])

    const mappedBooks =books.map((b)=>{
        return(<Book
            book={b}
        />)
    })
    return(<div className="books-flex" >

           {books.length>0?
           
           mappedBooks
           : <div style={{ position:"absolute",top:"50%",left:"45%"}} > <Loader /> </div>} 
        
        </div>)
}

export default Books