import style from "../TodoList.module.css";
import {Checkbox, IconButton} from "@mui/material";
import {grey} from "@mui/material/colors";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import React, {ChangeEvent, useCallback} from "react";
import {useDispatch} from "react-redux";
import {TaskType} from "../../TodoListsList";

export type TaskCompPropsType = {
    task: TaskType,
    todoListId: string,
    styleObj: {'fontSize': string},
    removeTask: (todoListId: string, id: string) => void,
    changeTaskTitle: (id: string, newTitle: string) => void,
    changeStatus: (id: string, isDone: boolean) => void
};

export const Task = React.memo(({task, todoListId, styleObj, removeTask, changeTaskTitle, changeStatus}: TaskCompPropsType) => {

    const {id, title, isDone} = task
    const dispatch = useDispatch();

    const onClickHandler = useCallback(() => {
        removeTask(todoListId, id);
    }, [todoListId, id]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeStatus(id, newIsDoneValue);
    }, [id]);
    const onChangeTitleHandler = useCallback((newTitle: string) => {
        changeTaskTitle(id, newTitle);
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