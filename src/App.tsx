import React, {useCallback, useState} from 'react';
import style from './App.module.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {AddTask, ChangeTaskStatus, ChangeTaskTitle, RemoveTask} from "./tasks-reducer";
import {AddTodoList, ChangeTodoListFilter, ChangeTodoListTitle, RemoveTodoList} from "./todoLists-reducer";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
};
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
};
export type TasksStateType = {
    [key: string]: TaskType[]
};

const App = () => {

    const todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();

    const todoListId1 = v1();
    const todoListId2 = v1();

    // const [todoLists, setTodoLists] = useState<TodoListType[]>(
    //     [
    //         {id: todoListId1, title: 'What to learn', filter: 'all'},
    //         {id: todoListId2, title: 'What to buy', filter: 'all'},
    //     ]
    // );

    // const [tasks, setTasks] = useState<TasksStateType>({
    //     [todoListId1]: [
    //         {id: v1(), title: 'HTML&CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: false}
    //     ],
    //     [todoListId2]: [
    //         {id: v1(), title: 'Milk', isDone: false},
    //         {id: v1(), title: 'React book', isDone: true}
    //     ],
    // });

    const removeTask = useCallback((todoListId: string, id: string) => {
        dispatch(RemoveTask(todoListId, id));
    }, []);

    const addTask = useCallback((todoListId: string, title: string) => {
        dispatch(AddTask(todoListId, title));
    }, []);

    const changeStatus = useCallback((todoListId: string, id: string, isDone: boolean) => {
        dispatch(ChangeTaskStatus(todoListId, id, isDone));
    }, []);

    const changeTaskTitle = useCallback((todoListId: string, id: string, newTitle: string) => {
        dispatch(ChangeTaskTitle(todoListId, id, newTitle));
    }, []);

    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(RemoveTodoList(todoListId));
    }, []);

    const addTodoList = useCallback((title: string) => {
        dispatch(AddTodoList(title));
    }, []);

    const changeFilter = useCallback((todoListId: string, value: FilterValuesType) => {
        dispatch(ChangeTodoListFilter(todoListId, value));
    }, []);

    const changeTodoListTitle = useCallback((todoListId: string, newTitle: string) => {
        dispatch(ChangeTodoListTitle(todoListId, newTitle));
    }, []);

    return (
        <div className={style.app}>
            <div className={style.header}></div>
            <div className={style.container}>
                <div className={style.blockForm}>
                    <AddItemForm addItem={addTodoList} value={'Title todoList'}/>
                </div>
                <div className={style.blockTodoLists}>

                    {todoLists.map(tl => {

                        let allTodoListTasks = tasks[tl.id];
                        let tasksForTodoList = allTodoListTasks;

                        return <TodoList key={tl.id}
                                         todoListId={tl.id}
                                         title={tl.title}
                                         tasks={tasksForTodoList}
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
        </div>
    );
};

export default App;
