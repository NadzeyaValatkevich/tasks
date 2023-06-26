import {applyMiddleware, combineReducers} from "redux";
import {legacy_createStore as createStore} from 'redux'
import {TasksActionsType, tasksReducer} from "../features/TodoListsList/tasks-reducer";
import {TodoListsActionsType, todoListsReducer} from "../features/TodoListsList/todoLists-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
});

export type AllActionsType = TodoListsActionsType | TasksActionsType;

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AllActionsType>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootStateType,
    unknown,
    AllActionsType
    >;

// @ts-ignore
window.store = store
