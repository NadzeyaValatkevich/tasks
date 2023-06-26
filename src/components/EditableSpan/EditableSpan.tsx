import React, {ChangeEvent, useState} from "react";
import style from './EditableSpan.module.css';

type EditableSpanPropsType = {
    title: string,
    onChange: (newTitle: string) => void,
    style: {fontSize: string}
};

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {

    const [editMode, setEditeMode] = useState(false);
    const [title, setTitle] = useState(props.title)

    const activateEditMode = () => {
        setEditeMode(true);
        setTitle(title)
    };

    const activateViewMode = () => {
        setEditeMode(false);
        props.onChange(title);
    };

    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };

    return editMode
        ? <input value={title} autoFocus onBlur={activateViewMode} onChange={changeTitleHandler} className={style.input}/>
        : <span onDoubleClick={activateEditMode} style={props.style}>{props.title}</span>
})
