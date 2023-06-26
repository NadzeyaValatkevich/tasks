import style from "../../app/App.module.css";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {TodoList} from "./TodoList/TodoList";
import React, {useCallback} from "react";
import {addTaskTC, removeTaskTC, updateTaskStatusTC, updateTaskTitleTC} from "./tasks-reducer";
import {
    addTodoListTC,
    changeTodoListFilter,
    FilterValuesType,
    removeTodoListTC,
    updateTodoListTitleTC
} from "./todoLists-reducer";
import {useAppSelector} from "../../hooks/useAppSelector";
import {todoListsSelector} from "../../app/appSelectors";
import {useAppDispatch} from "../../hooks/useAppDispatch";

export type TaskType = {
    todoListId: string
    id: string,
    title: string,
    isDone: boolean
};
export type TodoListType = {
    id: string,
    title: string,
};
export type TasksStateType = {
    [key: string]: TaskType[]
};

type TodoListsListPropsType = {

}
export const TodoListsList = (props: TodoListsListPropsType) => {
    const todoLists = useAppSelector(todoListsSelector);
    const dispatch = useAppDispatch();

    const removeTask = useCallback((todoListId: string, id: string) => {
        dispatch(removeTaskTC(todoListId, id));
    }, [dispatch]);

    const addTask = useCallback((todoListId: string, title: string) => {
        dispatch(addTaskTC(todoListId, title));
    }, [dispatch]);

    const changeStatus = useCallback((id: string, isDone: boolean) => {
        dispatch(updateTaskStatusTC(id, isDone));
    }, []);

    const changeTaskTitle = useCallback((id: string, newTitle: string) => {
        dispatch(updateTaskTitleTC(id, newTitle));
    }, []);
    //
    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoListTC(todoListId));
    }, [dispatch]);

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListTC(title));
    }, [dispatch]);

    const changeFilter = useCallback((todoListId: string, value: FilterValuesType) => {
        dispatch(changeTodoListFilter(todoListId, value));
    }, []);

    const changeTodoListTitle = useCallback((todoListId: string, newTitle: string) => {
        dispatch(updateTodoListTitleTC(todoListId, newTitle));
    }, []);
    return <div className={style.container}>
        <div className={style.blockForm}>
            <AddItemForm addItem={addTodoList} value={'Title todoList'}/>
        </div>
        <div className={style.blockTodoLists}>


            {todoLists.map(tl => {

                // let allTodoListTasks = tasks[tl.id];
                // let tasksForTodoList = allTodoListTasks;

                return <TodoList key={tl.id}
                                 todoListId={tl.id}
                                 title={tl.title}
                    // tasks={tasksForTodoList}
                                 removeTask={removeTask}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 changeStatus={changeStatus}
                                 filter={tl.filter}
                                 removeTodoList={removeTodoList}
                                 changeTaskTitle={changeTaskTitle}
                                 changeTodoListTitle={changeTodoListTitle}
                />
            })}
        </div>
    </div>
}