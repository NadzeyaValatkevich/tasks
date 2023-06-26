import {AddTodoListActionType, RemoveTodoListActionType, SetTodoListsActionType} from "./todoLists-reducer";
import {AppThunk} from "../../app/store";
import {todoListAPI} from "../../api/todoList-api";
import {TasksStateType, TaskType} from "./TodoListsList";

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {

    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.id)};
        case "ADD-TASK":
            return {...state, [action.task.todoListId]: [...state[action.task.todoListId], action.task]};
        case "CHANGE-TASK-STATUS":
            return {
                ...state, [action.task.todoListId]: state[action.task.todoListId].map(t => t.id === action.task.id ?
                    {...t, isDone: action.task.isDone} : t)
            };
        case "CHANGE-TASK-TITLE":
            return {
                ...state, [action.task.todoListId]: state[action.task.todoListId].map(t => t.id === action.task.id ?
                    {...t, title: action.task.title} : t)
            };
        case 'ADD-TODOLIST':
            return {[action.todoList.id]: [], ...state};
        case 'REMOVE-TODOLIST':
            let newState = {...state};
            delete newState[action.id];
            return state
        case 'SET-TODOLISTS':
            const stateCopy = {...state};
            action.todoLists.forEach(tl => stateCopy[tl.id] = [])
            return stateCopy
        case 'SET-TASKS': {
            const stateCopy = {...state};
            stateCopy[action.todoListId] = action.tasks
            return stateCopy;
        }
        default:
            return state
    }
};

export const removeTask = (todoListId: string, id: string) => ({type: 'REMOVE-TASK', todoListId, id} as const);
export const addTask = (task: TaskType) => ({type: 'ADD-TASK', task} as const);
export const changeTaskStatus = (task: TaskType) => ({type: 'CHANGE-TASK-STATUS', task} as const);
export const changeTaskTitle = (task: TaskType) => ({type: 'CHANGE-TASK-TITLE', task} as const);
export const setTasks = (tasks: TaskType[], todoListId: string) => ({type: 'SET-TASKS', tasks, todoListId} as const);

export const fetchTasks = (todoListId: string): AppThunk => async (dispatch) => {
    try {
        const response = await todoListAPI.getTasks(todoListId);
        dispatch(setTasks(response.data, todoListId))
    } catch {
    }
};
export const addTaskTC = (todoListId: string, title: string): AppThunk => async (dispatch) => {
    try {
        const response = await todoListAPI.addTask(todoListId, title);
        dispatch(addTask(response.data))
    } catch {
    }
};
export const removeTaskTC = (todoListId: string, id: string): AppThunk => async (dispatch) => {
    try {
        const response = await todoListAPI.deleteTask(todoListId, id);
        console.log(response)
        dispatch(removeTask(todoListId, id))
    } catch {
    }
};
export const updateTaskTitleTC = (id: string, newTitle: string): AppThunk => async (dispatch) => {
    try {
        const response = await todoListAPI.updateTaskTitle(id, newTitle);
        dispatch(changeTaskTitle(response.data))
    } catch {
    }
};
export const updateTaskStatusTC = (id: string, isDone: boolean): AppThunk => async (dispatch) => {
    try {
        const response = await todoListAPI.updateTaskStatus(id, isDone);
        dispatch(changeTaskStatus(response.data))
    } catch {
    }
};

export type RemoveTaskActionType = ReturnType<typeof removeTask>;
export type AddTaskActionType = ReturnType<typeof addTask>;
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatus>;
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitle>;
export type SetTasksActionType = ReturnType<typeof setTasks>;

export type TasksActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodoListsActionType
    | SetTasksActionType

