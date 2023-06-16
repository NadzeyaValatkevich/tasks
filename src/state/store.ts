import {combineReducers} from "redux";
import {legacy_createStore as createStore} from 'redux'
import {tasksReducer} from "../tasks-reducer";
import {todoListsReducer} from "../todoLists-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
});

export const store = createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>
