import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getProjects} from '../../Redux/Projects/Action'

class Dashboard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }

    componentDidMount = () => {
        this.props.getProjects()
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
                    <input className="proj-search" placeholder="Search within the projects" />
                </div>
                <div>
                    <select className="proj-select">
                    <option>
                        All active projects
                    </option>
                    {
                        options.map(ele => ele)
                    }
                    </select>
                </div>
                <div>
                    <button className="task-btn">New Task</button>
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

export default connect(mapStateToProps, mapDispatchToProps) (Dashboard)

