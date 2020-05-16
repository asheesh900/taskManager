import React, { Component } from 'react'
import { connect } from 'react-redux'
import {scheduleTask} from '../../Redux/Tasks/Action'

class CreateTask extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             projectName: "",
             taskName: "",
             startTime: "",
             endTime: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            projectName: this.props.location.data,
            [e.target.name]: e.target.value,

        })
    }

    createTask = async () => {
        let startTime = new Date(this.state.startTime + ":00+0000")
        let endTime = new Date(this.state.endTime + ":00+0000")
        let remainingTimeInMs = endTime.getTime() - startTime.getTime()

        function msToTime(duration) {
            var milliseconds = parseInt((duration % 1000) / 100),
              seconds = Math.floor((duration / 1000) % 60),
              minutes = Math.floor((duration / (1000 * 60)) % 60),
              hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
          
            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
          
            return hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
          }

        const taskDetails = {
            project_name: this.state.projectName,
            task_name: this.state.taskName,
            start_time: this.state.startTime,
            end_time: this.state.endTime,
            remaining_time: (msToTime(remainingTimeInMs))
        }

        const token = this.props.token

        await this.props.scheduleTask(taskDetails, token)
        this.props.history.push("/dashboard")
    }
    
    render() {
        let data = this.props.location.data
        // console.log(data)
        return (
            
            <div className="create-task">
                    <label htmlFor="task-name">Task Name</label>
                    <input onChange = {this.handleChange} name = "taskName" id = "task-name" type="text" placeholder = "Enter you task"/>
                    <label htmlFor="start-time">Start Time</label>
                    <input onChange = {this.handleChange} name = "startTime" id = "start-time" type="datetime-local"/>
                    <label htmlFor="start-time">End Time</label>
                    <input onChange = {this.handleChange} name = "endTime" id = "end-time" type="datetime-local"/>
                    <button onClick = {this.createTask} type = "submit">Create Task</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.authReducer.token,
})

const mapDispatchToProps = (dispatch) => ({
    scheduleTask: (taskDetails, token) => 
    dispatch(scheduleTask(taskDetails, token)),

})

export default connect(mapStateToProps, mapDispatchToProps) (CreateTask)

