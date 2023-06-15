import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import style from './TodoList.module.css';
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {grey} from "@mui/material/colors";
import {Button} from "./common/button/Button";

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

export const TodoList = (props: PropsType) => {
    const titleTodo = {
        fontSize: '20px'
    };
    const titleTask = {
        fontSize: '16px'
    };
    const addTask = (title: string) => {
        props.addTask(props.todoListId, title);
    };

    const onAllClickHandler = () => props.changeFilter(props.todoListId, 'all');
    const onActiveClickHandler = () => props.changeFilter(props.todoListId, 'active');
    const onCompletedClickHandler = () => props.changeFilter(props.todoListId, 'completed');

    const onClickHandler = () => {
        props.removeTodoList(props.todoListId)
    };

    const onChangeTodolistTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.todoListId, newTitle)
    };

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
                {props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(props.todoListId, t.id);
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeStatus(props.todoListId, t.id, newIsDoneValue)
                    };
                    const onChangeTitleHandler = (newTitle: string) => {
                        props.changeTaskTitle(props.todoListId, t.id, newTitle);
                    }

                    return <div key={t.id}
                               className={t.isDone ? `${style.isDone} ${style.task}` : style.task}
                    >
                        <Checkbox onChange={onChangeHandler} checked={t.isDone} sx={{
                            color: grey[800],
                            '&.Mui-checked': {
                                color: grey[600],
                            },
                        }}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler} style={titleTask}/>
                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </div>
                })}
            </div>
            <div className={style.blockBtn}>
                <Button onClick={onAllClickHandler} styleBtn={props.filter === 'all' ? 'activeFilter' : ''} title={'All'}/>
                <Button onClick={onActiveClickHandler} styleBtn={props.filter === 'active' ? 'activeFilter' : ''} title={'Active'}/>
                <Button onClick={onCompletedClickHandler} styleBtn={props.filter === 'completed' ? 'activeFilter' : ''} title={'Completed'}/>
            </div>
        </div>
    )
}