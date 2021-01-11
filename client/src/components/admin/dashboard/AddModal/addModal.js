import React,{useState,useEffect,useContext,useRef } from 'react'
import axios from 'axios'
import {context} from  '../../../../contexts/context'
import {Modal,Button,Form} from 'react-bootstrap'
import './addModal.css'

const AddModal =(props)=>{

        const langRef = useRef()
        const authRef = useRef()
        const genreRef = useRef()

        const [show, setShow] = useState(true);
        const [bookPhoto,setBookPhoto] = useState("");
        const [files,setFiles] = useState([])
        const [numberBox,setNumberBox] = useState([]);
        const [textBox,setTextBox] = useState([]);
        const [dropdown,setDropDown] = useState([]);
        const [selectedGenre,setSelectedGenre] =  useState(null)
        const[selectedAuthor,setSelectedAuthor] = useState(null)
        const[selectedLanguage,setSelectedLanguage] = useState(null)
        const [selectedPublisher,setSelectedPublisher] = useState(null)
        const [langDropdown,setLangDropdown] = useState([])
        const[genreDropdown,setGenreDropdown] = useState([])
        const[authorDropdown,setAuthorDropdown] = useState([])
        const[publisherDropdown,setPublisherDropdown] = useState([])
        const {adminLoginToken} = useContext(context)
        //console.log(dropdown)
        console.log("genre ref is",genreRef.current )
        useEffect(()=>{

            
            
            props.dropdown.forEach((d)=>{
               // console.log(d)
                if(d==="language"){
                
                   
                    const existingLangDropdown = [...langDropdown];
                  //  console.log("in language, existingdropdownob",dropdownObjList)
                    axios.get("/api/langs/all",{headers:{axdxmxixn:adminLoginToken}}).then((res)=>{

                        const options = res.data.languages.map((o)=>{return{value:o._id,text:o.name}});
                        
                        existingLangDropdown.push( options )
                        setLangDropdown(existingLangDropdown)
                        


                        
                    }).catch((error)=>{

                    })

                }

                else if (d==="author"){

                    
                    const existingAuthDropdown = [...authorDropdown];
                   // console.log("in author, existingdropdownob",dropdownObjList)
                    axios.get("/api/author/all",{headers:{axdxmxixn:adminLoginToken}}).then((res)=>{

                        const options = res.data.authors.map((o)=>{return{value:o._id,text:o.name}});
                        
                        existingAuthDropdown.push(options )
                        setAuthorDropdown(existingAuthDropdown)
                       // console.log("in auth",existingDrodownObjList)

                        
                    }).catch((error)=>{

                    })
                }
                 else if (d==="publisher"){

                    
                    const existingPublisherDropdown = [...publisherDropdown];
                   // console.log("in author, existingdropdownob",dropdownObjList)
                    axios.get("/api/publishers/all",{headers:{axdxmxixn:adminLoginToken}}).then((res)=>{

                        const options = res.data.publishers.map((o)=>{
                            
                            return{value:o._id,text:o.name}});
                        
                        existingPublisherDropdown.push(options )
                        setPublisherDropdown(existingPublisherDropdown)
                       // console.log("in auth",existingDrodownObjList)

                        
                    }).catch((error)=>{
                        throw error;
                    })
                }

                

                else if (d==="genre"){

                    const existingGenreDropdown = [...genreDropdown];
                    //console.log("in genre, existingdropdownob",dropdownObjList)
                    axios.get("/api/genres/all",{headers:{axdxmxixn:adminLoginToken}}).then((res)=>{

                        const options = res.data.genres.map((o)=>{return{value:o._id,text:o.name}});
                        
                        existingGenreDropdown.push( options )
                        setGenreDropdown([...existingGenreDropdown])

                        
                    }).catch((error)=>{

                    })
                }
            })
       
            /// files {images}
            let existingFiles =[...files];

            for (let i =0;i<Number(props.files);i++){

                existingFiles.push("")
            }

            setFiles(existingFiles)

            /// textboxes
            let existingTextBox = [...textBox];

            for(let i=0;i<Number(props.textBox);i++){
                if(props.type==="update"){

                    existingTextBox.push(props.textBoxTexts[i])
                }
                else{
                    existingTextBox.push("")
                }
                
            }

            setTextBox(existingTextBox);

            // number boxes
            let existingNumberBox = [...numberBox];

            for(let i=0;i<Number(props.numberBox);i++){
                
                if(props.type==="update"){

                    existingNumberBox.push(props.numberBoxNumbers[i])
                }
               else { 
                   existingNumberBox.push("") 
                }
            }
           // setBookPhoto(files[0])
            setNumberBox(existingNumberBox);
        },[])

        // handleclose()
        
        const handleClose = () => {
            
            props.addButtonHandler();    
            setShow(false);
        };

        const addHandler =async (type)=>{

            if(props.type==="update"){
                 if (type==="Update Author"){

                    
    
                        try{
                            await axios.put(`/api/author/${props.authorId}`,
                                {name:textBox[0],
                                    genre:selectedGenre,
                                    description:textBox[1],  
                                   language:selectedLanguage },
                                   
                                   {headers:{
                                   axdxmxixn:adminLoginToken
                                   }}
                            )
                                }
    
                            
                        
    
                        catch(error){
                            throw error;
    
                        }
    
                    
                    
                      
                    }


                    else if (type==="Update Book"){


                const data = new FormData();

                data.append("name",textBox[0] );
                data.append("isbn",textBox[1] );
                data.append("description",textBox[2] );
                data.append("availability",textBox[3] );
                data.append("genre",selectedGenre );
                data.append("author",selectedAuthor);
                data.append("page",numberBox[0] );
                data.append("photo",bookPhoto );
                data.append("price",numberBox[1] );
                data.append("publisher",selectedPublisher);
                data.append("language",selectedLanguage);

                try{
                await axios.put(`/api/book/${props.bookId}`,data,

                   {headers:{
                    axdxmxixn : adminLoginToken
                }})

            }
            catch(error){

                throw error;
            }
                    }
      
    
                }
    
                
    

            
            else {

            if(type==="Add Genre"){

                try{
                    await  axios.post('/api/genres',{name:textBox[0]},{headers:{
                        axdxmxixn:adminLoginToken
                    }})
                  }
                  catch(error){
                      throw error;
                  }
            }
            else if (type==="Add Language"){

                try{
                  await  axios.post('/api/langs',{name:textBox[0]},{headers:{
                      axdxmxixn:adminLoginToken
                  }})
                }
                catch(error){
                    throw error;
                }

            }

            else if (type==="Add Author"){

               

                
                try{
                    await  axios.post('/api/author',
                    
                    {name:textBox[0],
                     genre:selectedGenre,
                     description:textBox[1],  
                    language:selectedLanguage }
                    
                    ,{headers:{
                    axdxmxixn:adminLoginToken
                    }}
                    
                    )
                  }
                  catch(error){
                      throw error;
                  }
                
  

            }

            

            

            else if (type==="Add Book"){


                const data = new FormData();

                data.append("name",textBox[0] );
                data.append("isbn",textBox[1] );
                data.append("description",textBox[2] );
                data.append("availability",textBox[3] );
                data.append("genre",selectedGenre );
                data.append("author",selectedAuthor);
                data.append("page",numberBox[0] );
                data.append("photo",files[0] );
                data.append("price",numberBox[1] );
                data.append("publisher",selectedPublisher);
                data.append("language",selectedLanguage);


                try{
                 await axios.post("/api/book",data,

                    {headers:{
                     axdxmxixn : adminLoginToken
                 }})

                
                }

                catch(error){
                    throw error

                }

            }


            else if (type==="Add Publisher"){
                try{
                    await  axios.post('/api/publishers',{name:textBox[0]},{headers:{
                        axdxmxixn:adminLoginToken
                    }})
                  }
                  catch(error){
                      throw error;
                  }
  


            }

            }
        }


        const mappedTextBox = textBox.map((t,index)=>{
            return(<>
                <Form.Label>{props.textBoxLabels[index]}</Form.Label>
                 <Form.Control type="text" 
                 value={t}
                 onChange={(e)=>{
                     
                    let tBox = [...textBox];
                    tBox[index] = e.target.value;
                    setTextBox(tBox);
                
                }} placeholder={ props.textBoxLabels[index] } />
                </>
        )
        })

        const mappedFiles = files.map((file,index)=>{

            return(<>
            <input type="file" id={`photo${index}`}  name={`photo${index}`}  
                onChange={(e)=>{

                let fileBoxes = [...files];
                fileBoxes[index] = e.target.files[0];
                setFiles(fileBoxes);
                
                
            }}  />
            </>)
        })
        const mappedNumberBox = numberBox.map((n,index)=>{
            return (
                 <>
                 <Form.Label>{props.numberBoxLabels[index]}</Form.Label>
                 <Form.Control type="number" 
                 value={n}
                 onChange={(e)=>{
                     
                    let noBox = [...numberBox];
                    noBox[index] = e.target.value;
                    setNumberBox(noBox);
                
                }}  />
                </>
        )
        })

        const mappedAuthorDropdown = authorDropdown.map((d,index)=>{
          //  console.log(d)
            return(<>
            <Form.Label>{props.dropdownLabels[2]} :</Form.Label>
            <select style={{width:"100%"}} onChange={(e)=>{setSelectedAuthor(e.target.value)}} >
            <option>Select Author</option>
                {d.map((o)=>{
                    console.log(o)
                    return(<option value={o.value} >{o.text}</option>)
                })}
            </select>
            </>)
        })

        const mappedGenreDropdown = genreDropdown.map((d,index)=>{
            //  console.log(d)
              return(<>
                <Form.Label>{props.dropdownLabels[1]} : </Form.Label>
              <select style={{width:"100%" }} onChange={(e)=>{setSelectedGenre(e.target.value)}}  >
              <option>Select Genre</option>
                  {d.map((o)=>{
                      
                      return(<option value={o.value} >{o.text}</option>)
                  })}
              </select>
              </>)
          })

          const mappedPublisherDropdown = publisherDropdown.map((d,index)=>{
            //  console.log(d)
              return(<>
                <Form.Label>{props.dropdownLabels[3]} : </Form.Label>
              <select style={{width:"100%" }} 
              onChange={(e)=>{setSelectedPublisher(e.target.value)}}  >
              <option>Select Publisher</option>
                  {d.map((o)=>{
                      
                      return(<option value={o.value} >{o.text}</option>)
                  })}
              </select>
              </>)
          })

         // console.log("selected publisher is",selectedPublisher)

          const mappedLanguageDropdown = langDropdown.map((d,index)=>{
            //  console.log(d)
              return(<>
                <Form.Label>{props.dropdownLabels[0]} : </Form.Label>
              <select style={{width:"100%"}}  onChange={(e)=>{setSelectedLanguage(e.target.value)}}  >

                <option>Select Language</option>
                  {d.map((o)=>{
                      
                      return(<option  value={o.value} >{o.text}</option>)
                  })}
              </select>
              </>)
          })
       
      
        return (
          <>
            
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{props.header}</Modal.Title>
              </Modal.Header>
              <Modal.Body>


              {textBox.length>0?
            
            <div className="textbox-flex" >
                {mappedTextBox}
            </div>
            
            :null}

            {files.length>0? 
            <div>
                {mappedFiles}
            </div>
            :null}


                {props.dropdown.length>0?
                <div>
                    
                    {mappedAuthorDropdown}
                    {mappedGenreDropdown}
                    {mappedLanguageDropdown}
                    {mappedPublisherDropdown}
                </div>
                :null}
            {numberBox.length>0?
            
            <div className="numberbox-flex" >
                {mappedNumberBox}
            </div>
            
            :null}

            


              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={(e)=>{ addHandler(props.header)  ;handleClose()} }>
                  {props.buttonText}
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
      }
      



export default AddModal