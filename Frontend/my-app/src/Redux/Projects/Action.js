import axios from 'axios';

// action types

export const FETCH_PROJECTS_REQUEST = "FETCH_PROJECTS_REQUEST";
export const FETCH_PROJECTS_SUCCESS = "FETCH_PROJECTS_SUCCESS";
export const FETCH_PROJECTS_FAILURE = "FETCH_PROJECTS_FAILURE";

// action creators

export const projectsRequest = () => {
    return {
        type: FETCH_PROJECTS_REQUEST
    }
}

export const projectsSuccess = (data) => {
    return {
        type: FETCH_PROJECTS_SUCCESS,
        data: data
    }
}

export const projectsFailure = (error) => {
    return {
        type: FETCH_PROJECTS_FAILURE,
        error: error
    }
}

// action to fetch all the projects

export const getProjects = () => {
    const url = `http://127.0.0.1:5000/projects`
    return dispatch => {
        dispatch(projectsRequest())
        return axios
            .get(url)
            .then(res => dispatch(projectsSuccess(res.data)))
            .catch(err => dispatch(projectsFailure(err)))
    }
}
