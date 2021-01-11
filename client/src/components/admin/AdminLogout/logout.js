import React,{useContext} from 'react' 
import {context} from '../../../contexts/context'
import {Button} from 'react-bootstrap'
const Logout = ()=>{

    const {confirmAdminLogout} = useContext(context)
    return(<div>

        <Button variant="info"  onClick={confirmAdminLogout} >
                Log Out
        </Button>

    </div>)


}

export default Logout