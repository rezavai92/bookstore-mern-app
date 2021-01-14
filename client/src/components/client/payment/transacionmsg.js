import React,{useState} from 'react'
import {Redirect} from 'react-router-dom'
import {Modal,Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
const Message = (props)=>{


    const [show, setShow] = useState(true);
    const[goBack,setGoBack] = useState(false);
    const[goHome,setGoHome] = useState(false)

  const handleClose = () => { 

    setShow(false); };



  

  return (
    <>
    
    {
        goHome? <Redirect to="/" /> :null
    }
    {
        goBack?<Redirect to="/payment" /> :null
     }
      <Modal show={show} >
        <Modal.Header style={{justifyContent:"center"}} >
          <Modal.Title > <p > {props.msg1}</p> </Modal.Title>
        </Modal.Header>
        <Modal.Body> 
         <div style={{textAlign:"center"}} >
         {props.type==="success"?
        <FontAwesomeIcon  icon={faCheckCircle} size="3x" color="green" />
        :null}
            <p> {props.msg2} </p>
         </div>
       
        </Modal.Body>
        <Modal.Footer style={{justifyContent:"center"}} >

          
          <Button  variant="primary" onClick={()=>{
              
              if(props.type==="success"){

                setGoHome(true)
              }else{
                setGoBack(true)

              };handleClose()}}>
            {props.type==="success"? "Go Home" : "Go Back to Shipping Page" }
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}

export default Message