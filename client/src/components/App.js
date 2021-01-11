import React from 'react'
import Dashboard from './admin/dashboard/dashboard'
import AdminLogin from './admin/AdminLogin/login'
import ContextProvider from '../contexts/context'
import Cart from '../components/client/cart/cart'
import Home from '../components/client/home/home'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
const App =()=>{

  return(<div className="" >

      <ContextProvider>
        <Router>
          <Route path="/cart" exact component ={Cart} />
          <Route path="/" exact component ={Home} />

          <Route  path="/axdxmxixn/login" exact component ={AdminLogin}  />
          <Route path="/axdxmxixn/dashboard" exact component={Dashboard} />
        </Router>
      </ContextProvider>

  </div>)
}


export default App