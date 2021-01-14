import React,{useState,useContext} from 'react'
import {Modal,Button} from 'react-bootstrap'
import Message from './transacionmsg'
import {context} from '../../../contexts/context'
import axios from 'axios'
import { set } from 'js-cookie'
const WarningModal = (props)=>{


    const [show, setShow] = useState(true);
    const[willSuccessPopup,setWillSuccessPopup] = useState(false);
    const[willFailurePopup,setWillFailurePopup] = useState(false);
    const {paymentClear} = useContext(context)

  const handleClose = () => { 
    props.popupHandler();  
    setShow(false); };

    console.log(props.paymentObj)

    const paymentHandler =()=>{
        
        async function postData (){

            const {name,phone,bkash,order,total,address} = props.paymentObj;

            try{
                const res= await axios.post("/api/payment",{name,phone,bkash,order,total,address})


                console.log("payment succeesful", res.data.newPayment);
                paymentClear()

                setWillSuccessPopup(true);
                
                

            }

            catch(error){

                setWillFailurePopup(true)
            }

        }

        postData()
    }

  const handleShow = () => setShow(true);

  return (
    <>
    
      {willSuccessPopup? <Message type="success" msg1="You Are Done!" msg2="Payment Successful!" /> : null}
      
      {willFailurePopup? <Message type="failure" msg1="Ooop!" msg2="Payment failed,Try Again!" /> : null}
      
       <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>You are going to make payment!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={()=>{paymentHandler()}}>
            Sure
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );

}

export default WarningModal