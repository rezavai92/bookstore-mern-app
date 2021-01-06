import React from 'react'
import RegisterBox from './Box/registerBox'
import './dashboard.css'

const Dashboard = ()=>{

    return(<div>

        <div className="register-box-flex" >

            <RegisterBox text="Add Author" bg="#568c91" />
            <RegisterBox text="Add Book" bg="#569157" />
            <RegisterBox text="Add Genre" bg="#f5a60a" />
            <RegisterBox text="Add Language" bg="#631010" />
            <RegisterBox text="Add Publisher" bg="#91566c" />

        </div>
    </div>)
}

export default Dashboard;
