import React, {ChangeEvent, useCallback} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import style from './TodoList.module.css';
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {grey} from "@mui/material/colors";
import {Button} from "./common/button/Button";
import {Task} from "./Task";

type PropsType = {
    todoListId: string,
    title: string,
    tasks: TaskType[],
    removeTask: (todoListId: string, id: string) => void,
    changeFilter: (todoListId: string, value: FilterValuesType) => void,
    addTask: (todoListId: string, title: string) => void,
    changeStatus: (todoListId: string, id: string, isDone: boolean) => void
    filter: FilterValuesType,
    removeTodoList: (todoListId: string) => void,
    changeTaskTitle: (todoListId: string, id: string, newTitle: string) => void,
    changeTodoListTitle: (todoListId: string, newTitle: string) => void
};

export const TodoList = React.memo((props: PropsType) => {
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

    let tasksForTodoList = props.tasks;

    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter(t => t.isDone === false)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter(t => t.isDone === true)
    }

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
                        styleObj={titleTask}/>
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