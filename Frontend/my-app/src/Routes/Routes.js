import React, { Component } from 'react'
import Navbar from '../Components/Common/Navbar'
import { Switch, Route } from 'react-router-dom'
import LogIn from '../Components/Auth/LogIn'
import Signup from '../Components/Auth/Signup'
import Dashboard from '../Components/Common/Dashboard'
import Home from '../Components/Common/Home'

export default class Routes extends Component {
    render() {
        return (
            <>
                <Navbar />
                <Switch>
                    <Route exact path = "/" component = {Home} />
                    <Route path = "/signup" component = {Signup} />
                    <Route path = "/logIn" component = {LogIn} />
                    <Route path = "/dashboard" component = {props => <Dashboard {...props} />} />
                </Switch>
            </>
        )
    }
}
