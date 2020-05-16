import {
    CREATE_TASK_REQUEST,
    CREATE_TASK_SUCCESS,
    CREATE_TASK_FAILURE,
    FETCH_TASK_REQUEST,
    FETCH_TASK_SUCCESS,
    FETCH_TASK_FAILURE,
} from './Action'

const initialState = {
    isRequest: false,
    isSuccess: false,
    msg: "",
    error: "",
    isTaskRequest: false,
    isTaskData: false,
    tasks: [],
    error1: "",

}

const taskReducer = (state = initialState, action) => {

    switch(action.type) {

        case CREATE_TASK_REQUEST:
            return {
                ...state,
                isRequest: true,
            }

        case CREATE_TASK_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                msg: action.data.message
            }

        case CREATE_TASK_FAILURE:
            return {
                ...state,
                error: action.error,
            }

        case FETCH_TASK_REQUEST:
            return {
                ...state,
                isTaskRequest: true,
            }

        case FETCH_TASK_SUCCESS:
            return {
                ...state,
                isTaskData: true,
                tasks: action.data.tasks,

            }

        case FETCH_TASK_FAILURE:
            return {
                ...state,
                error1: action.error
            }

        default:
            return state
    }
}

export default taskReducer;