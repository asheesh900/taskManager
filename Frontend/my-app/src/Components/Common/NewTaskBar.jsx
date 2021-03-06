import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getProjects} from '../../Redux/Projects/Action'
import {Link} from 'react-router-dom'

class NewTaskBar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             projectName: ""
        }

        this.ifMounted = false;
    }

    componentDidMount = () => {
        this.ifMounted = true;
        this.ifMounted && this.props.getProjects()
    }

    componentWillUnmount = () => {
        this.ifMounted = false;
    }

    handleSelect = (e) => {
        this.setState({
            projectName: e.target.value
        })
    }
    
    render() {
        const {projects, isData} = this.props;
        let options = []
        let arr = projects.projects
        for(let i = 0; isData && i < arr.length; i++) {
            options.push(
                <option key = {arr[i].id} value = {arr[i].project_name}>{arr[i].project_name} </option>
            )
        }

        return (
            <div className="projects">
                <div>
                    <span className="proj-search">Previous Tasks</span>
                </div>
                <div>
                    <select onChange = {this.handleSelect} className="proj-select">
                    <option>
                        All active projects
                    </option>
                    {
                        options.map(ele => ele)
                    }
                    </select>
                </div>
                <div>
                    <Link to = {{
                        pathname:"/createTask",
                        state:{data: this.state.projectName}
                    }} ><button onClick = {this.newTask} className="task-btn">New Task</button></Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    projects: state.projectsReducer.projects,
    isData: state.projectsReducer.isData,
})

const mapDispatchToProps = (dispatch) => ({
    getProjects: () => dispatch(getProjects())
})

export default connect(mapStateToProps, mapDispatchToProps) (NewTaskBar)

