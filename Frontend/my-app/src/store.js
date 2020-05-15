import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './Redux/Authorization/Reducer'
import projectsReducer from './Redux/Projects/Reducer'

const rootReducer = combineReducers({authReducer, projectsReducer, })
const store = createStore(rootReducer,
    compose(applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ))

export default store;