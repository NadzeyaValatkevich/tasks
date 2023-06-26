import {AppRootStateType} from "./store";

export const todoListsSelector = (state: AppRootStateType) => state.todoLists;
export const tasksSelector = (state: AppRootStateType) => state.tasks;