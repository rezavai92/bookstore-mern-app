import React,{useContext,useState} from 'react'
import{Form,Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import {context} from '../../contexts/context'
import './login.css'
const Login = ()=>{

    const [email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const [willRedirect,setWillRedirect] = useState(false)
    const [willShowError,setWillShowError] = useState(false)
    const{confirmAdminLogin,adminLoginToken} = useContext(context)


    const render = ()=>{
        if(adminLoginToken){
        setWillRedirect(true)
        }
    }
    const formSubmitHandler = (e)=>{

        e.preventDefault()

        const postData = async()=>{

            try{

               const loginToken= await axios.post('/api/auth/admin/login',{

                    email,
                    password
                    
                })
                const admin =await axios.get('/api/auth/admin',{
                    headers:{
                        axdxmxixn: loginToken.data.token
                    }
                })
             
                confirmAdminLogin(loginToken.data.token,admin.data.admin._id);
                render()


            }

            catch(error){

                setWillShowError(true)

            }
        }

        postData()
        
        

    }

    return(<div className="login-box" >
        { willShowError ? <div>
            
              <h2>Incorrect email or password</h2>
            </div> :
       <div> <h2 style={{textAlign:"center"}} >Log In</h2>
        <Form onSubmit={formSubmitHandler} >
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} 
                onChange={(e)=>{setEmail(e.target.value)}}
                
                />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" 
                value={password}
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}
            
                placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>
            </div>

            }

                
         {willRedirect? 
         <Redirect to="/axdxmxixn/dashboard" />
         :null}

         
    </div>)

}

export default Login