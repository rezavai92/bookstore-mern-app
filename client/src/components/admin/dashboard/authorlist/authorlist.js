import React ,{useState,useEffect,useContext} from 'react'
import {context} from '../../../../contexts/context'
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
//const[selectedAuthorName,setSele] = useState("");
const [selectedAuthor,setSelectedAuthor] = useState(null)
const {adminLoginToken} = useContext(context)
const [edited,setEdited] = useState(false)
console.log("list of authors",authors)
useEffect(()=>{

    async function fetchData (){
        try{

            const response = await axios.get('/api/author/all',{
                headers:{
                    axdxmxixn:adminLoginToken
                }
            } )

            //let foundAuthors = response.data.authors;


          const newAuthors=  response.data.authors.map((author)=>{

            return{
                name:author.name,
                _id:author._id,
                description:author.description,
                genre:author.genre.name,
                language:author.language.name,

            }
          })
            setAuthors(newAuthors)
        }
        catch(error){
            throw error
        }

    }

    fetchData()

},[edited])


const editPopupHandler =(_id,name,description,language,genre)=>{

    setSelectedAuthor({_id,name,description,language,genre});
   
    setWillEditPopup(!willEditPopup)
    async function fetchData (){
        try{

            const response = await axios.get('/api/author/all',{
                headers:{
                    axdxmxixn:adminLoginToken
                }
            } )
            const newAuthors=  response.data.authors.map((author)=>{

                return{
                    name:author.name,
                    _id:author._id,
                    description:author.description,
                    genre:author.genre.name,
                    language:author.language.name,
    
                }
              })
                setAuthors(newAuthors)
            
        }
        catch(error){
            throw error
        }

    }

    fetchData()

    
}

const deletePopupHandler = (_id)=>{

    setSelectedAuthor({_id})
    setWillDeletePopup(!willDeletePopup)

    async function fetchData (){
        try{

            const response = await axios.get('/api/author/all',{
                headers:{
                    axdxmxixn:adminLoginToken
                }
            } )
            const newAuthors=  response.data.authors.map((author)=>{

                return{
                    name:author.name,
                    _id:author._id,
                    description:author.description,
                    genre:author.genre.name,
                    language:author.language.name,
    
                }
              })
                setAuthors(newAuthors)
            
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
                    onClick={()=>{editPopupHandler(author._id,author.name,author.description,author.language,author.genre)}}
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
        authorId={selectedAuthor._id}
        files="0"
        textBoxTexts={[selectedAuthor.name,selectedAuthor.description]}
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
        <DeleteModal authorId={selectedAuthor._id} deletePopupHandler={deletePopupHandler} />
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