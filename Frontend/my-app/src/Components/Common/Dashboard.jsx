import React, { Component } from 'react'
import NewTaskBar from './NewTaskBar'
import DisplayTask from './DisplayTask'

export default class Dashboard extends Component {
    
    render() {

        return (
            <div className = "dashboard">
                <NewTaskBar />

                <hr />

                <DisplayTask />
            </div>
        )
    }
}
