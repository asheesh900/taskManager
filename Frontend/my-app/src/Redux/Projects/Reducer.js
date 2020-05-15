import {
    FETCH_PROJECTS_REQUEST,
    FETCH_PROJECTS_SUCCESS,
    FETCH_PROJECTS_FAILURE,
} from './Action'

const initialState = {
    isRequest: false,
    isData: false,
    projects: [],
    error: ""
}

const projectsReducer = (state = initialState, action) => {
    switch(action.type) {
        
        case FETCH_PROJECTS_REQUEST:
            return {
                ...state,
                isRequest: true
            }
        
        case FETCH_PROJECTS_SUCCESS:
            return {
                ...state,
                isData: true,
                projects: action.data
            }

        case FETCH_PROJECTS_FAILURE:
            return {
                ...state,
                error: action.error
            }

        default:
            return state
    }
}

export default projectsReducer