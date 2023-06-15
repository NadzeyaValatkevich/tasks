import {FilterValuesType, TasksStateType, TodoListType} from "./App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todoLists-reducer";

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)};
        case "ADD-TASK":
            const newTask = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todoListId]: [newTask, ...state[action.todoListId]]};
        case "CHANGE-TASK-STATUS":
            return {
                ...state, [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ?
                    {...t, isDone: action.isDone} : t)
            };
        case "CHANGE-TASK-TITLE":
            return {
                ...state, [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ?
                    {...t, title: action.title} : t)
            };
        case 'ADD-TODOLIST':
            return {
                [action.todoListId]: [],
                ...state
            };
        case 'REMOVE-TODOLIST':
            let newState = {...state};
            delete newState[action.id];
            return newState
        default:
            throw new Error("I don't understand this type")
    }
};

export const RemoveTask = (todoListId: string, taskId: string): RemoveTaskActionType => (
    {type: 'REMOVE-TASK', todoListId, taskId});
export const AddTask = (todoListId: string, title: string): AddTaskActionType => (
    {type: 'ADD-TASK', todoListId, title});
export const ChangeTaskStatus = (todoListId: string, taskId: string, isDone: boolean): ChangeTaskStatusActionType => (
    {type: 'CHANGE-TASK-STATUS', todoListId, taskId, isDone});
export const ChangeTaskTitle = (todoListId: string, taskId: string, title: string): ChangeTaskTitleActionType => (
    {type: 'CHANGE-TASK-TITLE', todoListId, taskId, title});

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todoListId: string,
    taskId: string
};
export type AddTaskActionType = {
    type: 'ADD-TASK',
    todoListId: string,
    title: string
};
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todoListId: string,
    taskId: string
    isDone: boolean
};
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todoListId: string,
    taskId: string
    title: string
};


export type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

