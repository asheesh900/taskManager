import React, { Component } from 'react'
import Navbar from '../Components/Common/Navbar'
import { Switch, Route } from 'react-router-dom'
import LogIn from '../Components/Auth/LogIn'
import Signup from '../Components/Auth/Signup'
import Dashboard from '../Components/Common/Dashboard'
import Home from '../Components/Common/Home'
import CreateTask from '../Components/Common/CreateTask'
import PrivateRoute from "./PrivateRoute"

export default class Routes extends Component {
    render() {
        return (
            <>
                <Navbar />
                <Switch>
                    <Route exact path = "/" component = {Home} />
                    <Route path = "/signup" component = {Signup} />
                    <Route path = "/logIn" component = {LogIn} />
                    <PrivateRoute path = "/dashboard" component = {props => <Dashboard {...props} />} />
                    <Route path = "/createTask" component = {props => <CreateTask {...props}/>} />
                </Switch>
            </>
        )
    }
}
