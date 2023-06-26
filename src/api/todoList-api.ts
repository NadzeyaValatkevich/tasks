import axios from "axios";
import {TaskType, TodoListType} from "../features/TodoListsList/TodoListsList";

const instance = axios.create({
    baseURL: "http://localhost:3001/",
});

export const todoListAPI = {
    getTodoLists() {
        return instance.get<TodoListType[]>('todoLists')
    },
    addTodoList(title: string) {
        return instance.post<TodoListType>('todoLists', {title})
    },
    updateTodoListTitle(todoListId: string, title: string) {
        return instance.put<TodoListType>(`todoLists/${todoListId}`, {title})
    },
    removeTodoList(todoListId: string) {
        return instance.delete<{}>(`todoLists/${todoListId}`)
    },
    getTasks(todoListId: string) {
        return instance.get<TaskType[]>(`tasks?todoListId=${todoListId}`)
    },
    addTask(todoListId: string, title: string) {
        return instance.post<TaskType>('tasks', {todoListId, title})
    },
    updateTaskTitle(taskId: string, title: string) {
        return instance.patch<TaskType>(`tasks/${taskId}`, {title})
    },
    updateTaskStatus(taskId: string, isDone: boolean) {
        return instance.patch(`tasks/${taskId}`, {isDone})
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<{}>(`tasks/${taskId}`)
    }
};

