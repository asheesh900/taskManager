import axios from 'axios'

// action type

export const CREATE_TASK_REQUEST = "CREATE_TASK_REQUEST";
export const CREATE_TASK_SUCCESS = "CREATE_TASK_SUCCESS";
export const CREATE_TASK_FAILURE = "CREATE_TASK_FAILURE";

// action creators

export const postRequest = () => {
    return {
        type: CREATE_TASK_REQUEST,
    }
}

export const postSuccess = (data) => {
    return {
        type: CREATE_TASK_SUCCESS,
        data: data,
    }
}

export const postFailure = (error) => {
    return {
        type: CREATE_TASK_FAILURE,
        error: error,
    }
}

// action to post the data

export const scheduleTask = (taskDetails, token) => {
    const url = `http://127.0.0.1:5000/create`
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    return dispatch => {
        dispatch(postRequest())
        return axios
            .post(url, taskDetails, {
                headers: headers
            })
            .then(res => {
                alert(res.data.message)
                dispatch(postSuccess(res.data))
            })
            .catch(err => dispatch(postFailure(err)))
    }
}

// action types

export const FETCH_TASK_REQUEST = "FETCH_TASK_REQUEST";
export const FETCH_TASK_SUCCESS = "FETCH_TASK_SUCCESS";
export const FETCH_TASK_FAILURE = "FETCH_TASK_FAILURE";

// action creators

export const getRequest = () => {
    return {
        type: FETCH_TASK_REQUEST,
    }
}

export const getSuccess = (data) => {
    return {
        type: FETCH_TASK_SUCCESS,
        data: data,
    }
}

export const getFailure = (error) => {
    return {
        type: FETCH_TASK_FAILURE,
        error: error,
    }
}


// action to get all tasks of a user

export const getAllTasks = (token) => {
    const url = `http://127.0.0.1:5000/tasks`
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }

    return dispatch => {
        dispatch(getRequest())
        return axios
            .get(url, {
                headers: headers
            })
            .then(res => {
                console.log(res.data)
                dispatch(getSuccess(res.data))
            })
            .catch(err => dispatch(getFailure(err)))
    }
}