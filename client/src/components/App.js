import React from 'react'
import Dashboard from './admin/dashboard/dashboard'
import AdminLogin from './admin/AdminLogin/login'
import ContextProvider from '../contexts/context'
import Payment from '../components/client/payment/payment'
import Cart from '../components/client/cart/cart'
import Home from '../components/client/home/home'
import Authors from '../components/client/authors/authors'
import Subjects from '../components/client/subjects/subjects'
import Author from '../components/client/authors/author'
import Publishers from '../components/client/publishers/publishers'
import Publisher from '../components/client/publishers/publisher'
import Search from '../components/client/search/search'
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
          <Route path="/book/search" exact component={Search} />
          <Route path="/cart" exact component ={Cart} />
          <Route path ="/payment" exact component ={Payment}  />
          <Route path="/" exact component ={Home} />
          <Route path="/author/:id" exact component ={Author} />
          <Route path="/authors" exact component ={Authors} />
       
          <Route path="/publishers" exact component ={Publishers} />
          <Route path="/publisher/:id" exact component ={Publisher} />
          <Route path="/subjects" exact component ={Subjects} />

          <Route  path="/axdxmxixn/login" exact component ={AdminLogin}  />
          <Route path="/axdxmxixn/dashboard" exact component={Dashboard} />
        </Router>
      </ContextProvider>

  </div>)
}


export default App