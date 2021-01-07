import React from 'react'
import Dashboard from './dashboard/dashboard'
import AdminLogin from './AdminLogin/login'
import ContextProvider from '../contexts/context'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
const App =()=>{

  return(<div className="container" >

      <ContextProvider>
        <Router>
          <Route  path="/axdxmxixn/login" exact component ={AdminLogin}  />
          <Route path="/axdxmxixn/dashboard" exact component={Dashboard} />
        </Router>
      </ContextProvider>

  </div>)
}


export default App