import React from 'react'
import {Card,Button} from 'react-bootstrap'
import './registerbox.css'
const RegisterBox =(props)=>{

  return(<div className="register-box">

      <Card style={{width:"100%",backgroundColor:props.bg,color:"white"}} >

        <Card.Body>

        
        <div className="add-btn" >
        {props.text}
        </div>
          
        </Card.Body>
      </Card>

  </div>)
}


export default RegisterBox