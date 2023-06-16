import style from "./TodoList.module.css";
import {Checkbox, IconButton} from "@mui/material";
import {grey} from "@mui/material/colors";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import React, {ChangeEvent, useCallback} from "react";
import {TaskType} from "./App";
import {useDispatch} from "react-redux";
import {ChangeTaskStatus, ChangeTaskTitle, RemoveTask} from "./tasks-reducer";

export type TaskCompPropsType = {
    task: TaskType,
    todoListId: string,
    styleObj: {'fontSize': string}
};

export const Task = React.memo(({task, todoListId, styleObj}: TaskCompPropsType) => {

    const {id, title, isDone} = task
    const dispatch = useDispatch();

    const onClickHandler = () => dispatch(RemoveTask(todoListId, id));
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(ChangeTaskStatus(todoListId, id, newIsDoneValue));
    };
    const onChangeTitleHandler = useCallback((newTitle: string) => {
        dispatch(ChangeTaskTitle(todoListId, id, newTitle));
    }, [todoListId, id]);

    return <div key={id}
                className={isDone ? `${style.isDone} ${style.task}` : style.task}
    >
        <Checkbox onChange={onChangeHandler} checked={isDone} sx={{
            color: grey[800],
            '&.Mui-checked': {
                color: grey[600],
            },
        }}/>
        <EditableSpan title={title} onChange={onChangeTitleHandler} style={styleObj}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
    })