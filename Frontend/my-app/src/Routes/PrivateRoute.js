import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Route, Redirect} from 'react-router-dom'

function PrivateRoute({component:Component, token, ...rest}) {
    return (
        <Route {...rest} render={()=>{
            if(token){
                return <Component/>
            }
            return <Redirect to='/login'/>
        }}/>
            
    )
}


const mapStateToProps = (state) => ({
    token: state.authReducer.token,
})


export default connect(mapStateToProps, null) (PrivateRoute)

