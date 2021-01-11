import React,{useState,useContext} from 'react'
import {Modal,Button} from 'react-bootstrap'
import {context} from '../../../../contexts/context'
import axios from 'axios'
const DeleteModal = (props)=>{

    const [show, setShow] = useState(true);
    const {adminLoginToken} = useContext (context)
    const deleteRowHandler =async ()=>{

        try{

           await axios.delete(`/api/book/${props.bookId}`,{headers:{
                axdxmxixn: adminLoginToken
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