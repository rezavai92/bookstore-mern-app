import React ,{useState,useEffect,useContext} from 'react'
import {context} from '../../../contexts/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt,faEdit } from '@fortawesome/free-solid-svg-icons'
import AddModal from '../AddModal/addModal'
import {Button} from 'react-bootstrap'
import axios from 'axios'
import './authorlist.css'
import DeleteModal from './deleteModal'

const AuthorList = ()=>{

const [willEditPopup,setWillEditPopup] = useState(false)
const[willDeletePopup,setWillDeletePopup] = useState(false)
const [authors,setAuthors] = useState([])
const [selectedAuthor,setSelectedAuthor] = useState("")
const {adminLoginToken} = useContext(context)

console.log("list of authors",authors)
useEffect(()=>{

    async function fetchData (){
        try{

            const response = await axios.get('/api/author/all',{
                headers:{
                    axdxmxixn:adminLoginToken
                }
            } )

            setAuthors(response.data.authors)
        }
        catch(error){
            throw error
        }

    }

    fetchData()

},[])


const editPopupHandler =(authorId)=>{
    setSelectedAuthor(authorId)
    setWillEditPopup(!willEditPopup)
}

const deletePopupHandler = (authorId)=>{
    setSelectedAuthor(authorId)
    setWillDeletePopup(!willDeletePopup)
    async function fetchData (){
        try{

            const response = await axios.get('/api/author/all',{
                headers:{
                    axdxmxixn:adminLoginToken
                }
            } )

            setAuthors(response.data.authors)
        }
        catch(error){
            throw error
        }

    }

    fetchData()
    
}

const mappedAuthors = authors.map((author)=>{
    return(
    <tr key={author._id} >
    <td >

        {author.name}
    </td>
    <td>
        {author.genre}
    </td>
    <td>
        {author.language}
    </td>
    <td>
        {author.description}
    </td>
    <td>
                <Button variant="info" style={{padding:"1px",margin:"5px"}} 
                    onClick={()=>{editPopupHandler(author._id)}}
                >
                    <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button variant="danger" style={{padding:"1px"}} 
                    onClick={ ()=>{deletePopupHandler(author._id) }}
                >
                    <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
            </td>
    </tr>
     )
})

return(


    <div style={{marginTop:"5%"}}>
    <h2>List of Authors</h2>
    <div className="author-list" >
    
    {
        willEditPopup?
        <AddModal numberBox="0" 
        header="Update Author"
        type="update"
        buttonText= "Update Author"
         dropdown={["language","genre"]}
         textBoxLabels={["name","description"]}
         dropdownLabels={["Select Language","Select Genre"]}
         numberBoxLabels={[]}
        textBox="2"
         numberBox="0"
        text="Update Author" 
        bg="#568c91"
 addButtonHandler={editPopupHandler} />
        :null
    }

    {
        willDeletePopup? 
        <DeleteModal authorId={selectedAuthor} deletePopupHandler={deletePopupHandler} />
        :null
    }
    <table className="author-table"   >
        <tr>
            <th>
                Name
            </th>
            <th>
                Genre
            </th>
            <th>
                Language
            </th>
            <th>
                description
            </th>
            <th>
                options
            </th>

        </tr>
        {mappedAuthors}
       
    </table>
</div>

</div>)
}

export default AuthorList