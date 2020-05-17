import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getAllTasks} from '../../Redux/Tasks/Action'

class DisplayTask extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             hours: "",
             minutes: "",
             seconds: "",
             isTimer: false,
        }

        this.ifMounted = false;
    }


    componentDidMount = () => {
      this.ifMounted = true;
        if(this.props.isLogin) {
            const token = this.props.token
          this.ifMounted && this.props.getAllTasks(token)
        }
    }

    componentWillUnmount = () => {
      this.ifMounted = false;
    }

    startTimer = async (e) => {
      this.ifMounted = true;
        // console.log(e.target.value)
        let timeArr = e.target.value.split(":")
        let hours = Number(timeArr[0])
        let minutes = Number(timeArr[1])
        let seconds = Number(timeArr[2])
        await this.ifMounted && this.setState({
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            isTimer: true,
            
        })
        
        this.timerId = setInterval(() => {
            this.tick()
        }, 1000)
        
    }

    tick = () => {
        if(this.state.seconds === 0 && this.state.minutes > 0) {
                this.setState({
                    seconds: 60,
                    minutes: this.state.minutes - 1
                })
        }

        if(this.state.minutes === 0 && this.state.hours > 0) {
            this.setState({
                minutes: 60,
                hours: this.state.hours - 1
            })
        }

        if(this.state.seconds > 0) {
            this.setState({
                seconds: this.state.seconds - 1
            })
        }

        if(this.state.seconds === 0 && this.state.minutes === 0 && this.state.hours === 0)
         {
            clearInterval(this.timerID)

         }
    }

    
    
    render() {
        const {tasks} = this.props;
        // console.log(tasks)
        return (
          <>
            {this.state.isTimer ? (
              <>
                <div className="timer">
                  Remaining Time:{" "}
                  <span id="watch">
                    {`${this.state.hours || "00"} hrs : ${
                      this.state.minutes || "00"
                    } mins : ${this.state.seconds || "00"} secs`}{" "}
                  </span>
                </div>
                <hr />
              </>
            ) : null}
            <div className="tasks-main">
              <div className="tasks">
                <div className="task-name">Task Name</div>
                <div>Project Name</div>
                <div>Start</div>
                <div>End</div>
                <div>Allotted Time</div>
                <div>Action</div>
              </div>
              <hr />

              {tasks.length > 0 &&
                tasks.map((task) => {
                  return (
                    <div key={task.task_id}>
                      <div className="tasks-content">
                        <div className="task-name">
                          <span>{task.task_name}</span>
                        </div>
                        <div>{task.project_name} </div>
                        <div>{task.start_time}</div>
                        <div>{task.end_time} </div>
                        <div>{task.remaining_time} </div>
                        <div>
                          <button
                            value={task.remaining_time}
                            onClick={this.startTimer}
                            className="task-btn"
                          >
                            Timer
                          </button>
                        </div>
                      </div>
                      <hr />
                    </div>
                  );
                })}
            </div>
          </>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.authReducer.token,
    isLogin: state.authReducer.isLogin,
    tasks: state.taskReducer.tasks,
    isTaskData: state.taskReducer.isTaskData,


})

const mapDispatchToProps = (dispatch) => ({
    getAllTasks: (token) => 
    dispatch(getAllTasks(token)),
})

export default connect(mapStateToProps, mapDispatchToProps) (DisplayTask)

