import React,{useState,useEffect,useContext,useRef } from 'react'
import axios from 'axios'
import {context} from  '../../../contexts/context'
import {Modal,Button,Form} from 'react-bootstrap'
import './addModal.css'

const AddModal =(props)=>{

        const langRef = useRef()
        const authRef = useRef()
        const genreRef = useRef()

        const [show, setShow] = useState(true);
        const [numberBox,setNumberBox] = useState([]);
        const [textBox,setTextBox] = useState([]);
        const [dropdown,setDropDown] = useState([]);
        const [selectedGenre,setSelectedGenre] =  useState(null)
        const[selectedAuthor,setSelectedAuthor] = useState(null)
        const[selectedLanguage,setSelectedLanguage] = useState(null)
        const [langDropdown,setLangDropdown] = useState([])
        const[genreDropdown,setGenreDropdown] = useState([])
        const[authorDropdown,setAuthorDropdown] = useState([])
        const {loginToken} = useContext(context)
        //console.log(dropdown)
        console.log("genre ref is",genreRef.current )
        useEffect(()=>{

            
            
            props.dropdown.forEach((d)=>{
               // console.log(d)
                if(d==="language"){
                
                   
                    const existingLangDropdown = [...langDropdown];
                  //  console.log("in language, existingdropdownob",dropdownObjList)
                    axios.get("/api/langs/all",{headers:{axdxmxixn:loginToken}}).then((res)=>{

                        const options = res.data.languages.map((o)=>{return{value:o._id,text:o.name}});
                        
                        existingLangDropdown.push( options )
                        setLangDropdown(existingLangDropdown)
                        


                        
                    }).catch((error)=>{

                    })

                }

                else if (d==="author"){

                    
                    const existingAuthDropdown = [...authorDropdown];
                   // console.log("in author, existingdropdownob",dropdownObjList)
                    axios.get("/api/author/all",{headers:{axdxmxixn:loginToken}}).then((res)=>{

                        const options = res.data.authors.map((o)=>{return{value:o._id,text:o.name}});
                        
                        existingAuthDropdown.push(options )
                        setAuthorDropdown(existingAuthDropdown)
                       // console.log("in auth",existingDrodownObjList)

                        
                    }).catch((error)=>{

                    })
                }


                else if (d==="genre"){

                    const existingGenreDropdown = [...genreDropdown];
                    //console.log("in genre, existingdropdownob",dropdownObjList)
                    axios.get("/api/genres/all",{headers:{axdxmxixn:loginToken}}).then((res)=>{

                        const options = res.data.genres.map((o)=>{return{value:o._id,text:o.name}});
                        
                        existingGenreDropdown.push( options )
                        setGenreDropdown([...existingGenreDropdown])

                        
                    }).catch((error)=>{

                    })
                }
            })
       

            let existingTextBox = [...textBox];

            for(let i=0;i<Number(props.textBox);i++){
                existingTextBox.push("")
            }

            setTextBox(existingTextBox);

            let existingNumberBox = [...numberBox];

            for(let i=0;i<Number(props.numberBox);i++){
                existingNumberBox.push("")
            }

            setNumberBox(existingNumberBox);
        },[])

        
        const handleClose = () => {
            
            props.addButtonHandler();    
            setShow(false);
        };

        const addHandler =async (type)=>{


            if(type==="Add Genre"){

                try{
                    await  axios.post('/api/genres',{name:textBox[0]},{headers:{
                        axdxmxixn:loginToken
                    }})
                  }
                  catch(error){
                      throw error;
                  }
            }
            else if (type==="Add Language"){

                try{
                  await  axios.post('/api/langs',{name:textBox[0]},{headers:{
                      axdxmxixn:loginToken
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
                    language:selectedLanguage },{headers:{
                    axdxmxixn:loginToken
                    }})
                  }
                  catch(error){
                      throw error;
                  }
  

            }
            else if (type==="Add Book"){

            }
            else if (type==="Add Publisher"){
                try{
                    await  axios.post('/api/publishers',{name:textBox[0]},{headers:{
                        axdxmxixn:loginToken
                    }})
                  }
                  catch(error){
                      throw error;
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
                      console.log(o)
                      return(<option value={o.value} >{o.text}</option>)
                  })}
              </select>
              </>)
          })

          const mappedLanguageDropdown = langDropdown.map((d,index)=>{
            //  console.log(d)
              return(<>
                <Form.Label>{props.dropdownLabels[0]} : </Form.Label>
              <select style={{width:"100%"}}  onChange={(e)=>{setSelectedLanguage(e.target.value)}}  >

                <option>Select Language</option>
                  {d.map((o)=>{
                      console.log(o)
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


                {props.dropdown.length>0?
                <div>
                    {mappedAuthorDropdown}
                    {mappedGenreDropdown}
                    {mappedLanguageDropdown}
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
                  Add {props.buttonText}
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
      }
      



export default AddModal