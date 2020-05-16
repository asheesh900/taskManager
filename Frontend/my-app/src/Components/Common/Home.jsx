import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Home extends Component {
    render() {
        return (
            <div id="homeImg">
                <div>We value your time.<br/>
                    Schedule you time more effectively.
                </div>
                <Link to = "/dashboard"><button id =  "dash-btn">Dashboard</button></Link>
            </div>
        )
    }
}
