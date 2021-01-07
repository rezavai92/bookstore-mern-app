import React,{useState,useEffect} from 'react'
import {Card,Button} from 'react-bootstrap'
import './registerbox.css'
import AddModal from '../AddModal/addModal'
const RegisterBox =(props)=>{

  const [willPopup,setWillPopup] = useState(false)

  const addButtonHandler =()=>{

    setWillPopup(!willPopup);
  }

  return(<div className="register-box">

      <Card style={{width:"100%",backgroundColor:props.bg,color:"white"}} >

        <Card.Body>

        
        <div className="add-btn" onClick={addButtonHandler}  >
        {props.text}
        </div>
          
        </Card.Body>
      </Card>
      {
        willPopup?
        <div>
          <AddModal numberBox={props.numberBox} 
            header={props.text}
            textBox={props.textBox}
            dropdown={props.dropdown}
            textBoxLabels ={props.textBoxLabels}
            numberBoxLabels={props.numberBoxLabels}
            dropdownLabels ={props.dropdownLabels}

          buttonText={props.buttonText} addButtonHandler={addButtonHandler} />
          </div>
        :null
      }

  </div>)
}


export default RegisterBox