import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import { boardReducer } from './reducers/board.reducer.js';
import { userReducer } from "./reducers/user.reducer.js";
import { taskReducer } from './reducers/task.reducer.js';

const rootReducer = combineReducers({
    boardModule: boardReducer,
    userModule: userReducer,
    taskModule: taskReducer,
})



export default createStore(
    rootReducer,
    applyMiddleware(thunk)
)


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
