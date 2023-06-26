import {todoListAPI} from "../../api/todoList-api";
import {AppThunk} from "../../app/store";
import {TodoListType} from "./TodoListsList";

const initialState: TodoListDomainType[] = [];

export const todoListsReducer = (state: TodoListDomainType[] = initialState, action: TodoListsActionsType): TodoListDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            return [...state, {...action.todoList, filter: 'all'}];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);
        case 'SET-TODOLISTS':
            return action.todoLists.map(tl => ({...tl, filter: 'all'}))
        default:
            return state
    }
};

export const removeTodoList = (todoListId: string) => ({type: 'REMOVE-TODOLIST', id: todoListId} as const);
export const addTodoList = (todoList: TodoListType) => ({type: 'ADD-TODOLIST', todoList} as const);
export const changeTodoListTitle = (todoListId: string, title: string) => (
    {type: 'CHANGE-TODOLIST-TITLE', id: todoListId, title} as const);
export const changeTodoListFilter = (todoListId: string, filter: FilterValuesType) => (
    {type: 'CHANGE-TODOLIST-FILTER', id: todoListId, filter} as const);
export const setTodoLists = (todoLists: TodoListType[]) => ({type: 'SET-TODOLISTS', todoLists}as const);

export const fetchTodoLists = (): AppThunk => async (dispatch) => {
    try {
        const response = await todoListAPI.getTodoLists();
        dispatch(setTodoLists(response.data))
    } catch {
    }
};
export const addTodoListTC = (title: string): AppThunk => async (dispatch) => {
    try {
        const response = await todoListAPI.addTodoList(title);
        dispatch(addTodoList(response.data))
    } catch {
    }
};
export const removeTodoListTC = (todoListId: string): AppThunk => async (dispatch) => {
    try {
        const response = await todoListAPI.removeTodoList(todoListId);
        dispatch(removeTodoList(todoListId))
    } catch {
    }
};
export const updateTodoListTitleTC = (todoListId: string, title: string): AppThunk => async (dispatch) => {
    try {
        const response = await todoListAPI.updateTodoListTitle(todoListId, title);
        dispatch(changeTodoListTitle(todoListId, title))
    } catch {
    }
};

export type RemoveTodoListActionType = ReturnType<typeof removeTodoList>;
export type AddTodoListActionType = ReturnType<typeof addTodoList>;
export type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitle>;
export type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListFilter>;
export type SetTodoListsActionType = ReturnType<typeof setTodoLists>

export type TodoListsActionsType = RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType
    | SetTodoListsActionType;

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
}