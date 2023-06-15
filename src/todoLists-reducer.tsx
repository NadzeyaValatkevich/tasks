import {FilterValuesType, TodoListType} from "./App";
import {v1} from "uuid";

export const todoListsReducer = (state: TodoListType[], action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            const newState = state.filter(tl => tl.id !== action.id);
            return newState;
        case 'ADD-TODOLIST':
            const newTodoListId = v1();
            const newTodoList: TodoListType = {id: newTodoListId, title: action.title, filter: 'all'};
            return [newTodoList, ...state];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);
        default:
            throw new Error("I don't understand this type")
    }
};

export const RemoveTodoList = (todoListId: string): RemoveTodoListActionType => (
    {type: 'REMOVE-TODOLIST', id: todoListId});
export const AddTodoList = (title: string): AddTodoListActionType => (
    {type: 'ADD-TODOLIST', title});
export const ChangeTodoListTitle = (todoListId: string, title: string): ChangeTodoListTitleActionType => (
    {type: 'CHANGE-TODOLIST-TITLE',id:todoListId, title});
export const ChangeTodoListFilter = (todoListId: string, filter: FilterValuesType): ChangeTodoListFilterActionType => (
    {type: 'CHANGE-TODOLIST-FILTER',id:todoListId, filter});

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
};
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST',
    title: string
};
export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
};
export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
};

export type ActionsType = RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType;