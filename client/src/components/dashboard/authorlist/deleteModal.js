import React,{useState,useContext} from 'react'
import {Modal,Button} from 'react-bootstrap'
import {context} from '../../../contexts/context'
import axios from 'axios'
const DeleteModal = (props)=>{

    const [show, setShow] = useState(true);
    const {loginToken} = useContext (context)
    const deleteRowHandler =async ()=>{

        try{

           await axios.delete(`/api/author/${props.authorId}`,{headers:{
                axdxmxixn: loginToken
            }} )

        }

        catch(error){

            throw error;
        }

        handleClose()
    }
    const handleClose = () => {
        
        props.deletePopupHandler()
        setShow(false)};
    
  
    return (
      <>

  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure, you want to delete this row?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Back
            </Button>
            <Button variant="primary" onClick={deleteRowHandler}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );

}

export default DeleteModal