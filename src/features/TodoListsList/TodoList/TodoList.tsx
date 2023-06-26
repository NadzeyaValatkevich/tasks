import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import style from './TodoList.module.css';
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Button} from "../../../common/button/Button";
import {Task} from "./Task/Task";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {fetchTasks} from "../tasks-reducer";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {tasksSelector} from "../../../app/appSelectors";
import {FilterValuesType} from "../todoLists-reducer";

type PropsType = {
    todoListId: string,
    title: string,
    changeFilter: (todoListId: string, value: FilterValuesType) => void,
    addTask: (todoListId: string, title: string) => void,
    removeTask: (todoListId: string, id: string) => void,
    changeStatus: (id: string, isDone: boolean) => void,
    filter: FilterValuesType,
    removeTodoList: (todoListId: string) => void,
    changeTaskTitle: (id: string, newTitle: string) => void,
    changeTodoListTitle: (todoListId: string, newTitle: string) => void
};

export const TodoList = React.memo((props: PropsType) => {
    // debugger
const tasks = useAppSelector(tasksSelector);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTasks(props.todoListId))
    }, []);

    const titleTodo = {
        fontSize: '20px'
    };
    const titleTask = {
        fontSize: '16px'
    };
    const addTask = useCallback((title: string) => {
        props.addTask(props.todoListId, title);
    }, [props.todoListId, props.addTask]);

    const onAllClickHandler = useCallback(() => props.changeFilter(props.todoListId, 'all'),
        [props.changeFilter, props.todoListId]);
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.todoListId, 'active'),
        [props.changeFilter, props.todoListId]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todoListId, 'completed'),
        [props.changeFilter, props.todoListId]);

    const onClickHandler = () => {
        props.removeTodoList(props.todoListId)
    };

    const onChangeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.todoListId, newTitle)
    }, [props.changeTodoListTitle, props.todoListId]);

    // let tasksForTodoList = props.tasks;
    let tasksForTodoList = tasks[props.todoListId];

    if (props.filter === 'active') {
        // tasksForTodoList = props.tasks.filter(t => t.isDone === false)
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
    }
    console.log(tasksForTodoList)
    return (
        <div className={style.todoList}>
            <div className={style.blockTitleTodo}>
                <EditableSpan title={props.title} onChange={onChangeTodolistTitle} style={titleTodo}/>
                <IconButton onClick={onClickHandler}>
                    <Delete/>
                </IconButton>
            </div>
            <AddItemForm addItem={addTask} value={'Title task'}/>
            <div>
                {tasksForTodoList.map(t => {
                    return <Task
                        key={t.id}
                        task={t}
                        todoListId={props.todoListId}
                        styleObj={titleTask}
                        removeTask={props.removeTask}
                        changeTaskTitle={props.changeTaskTitle}
                        changeStatus={props.changeStatus}
                    />
                })
                }
                <div className={style.blockBtn}>
                    <Button onClick={onAllClickHandler} styleBtn={props.filter === 'all' ? 'activeFilter' : ''}
                            title={'All'}/>
                    <Button onClick={onActiveClickHandler} styleBtn={props.filter === 'active' ? 'activeFilter' : ''}
                            title={'Active'}/>
                    <Button onClick={onCompletedClickHandler}
                            styleBtn={props.filter === 'completed' ? 'activeFilter' : ''}
                            title={'Completed'}/>
                </div>
            </div>
        </div>
    )
})