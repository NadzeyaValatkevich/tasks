import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string,
    onChange: (newTitle: string) => void
};

export const EditableSpan = (props: EditableSpanPropsType) => {

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
        ? <input value={title} autoFocus onBlur={activateViewMode} onChange={changeTitleHandler}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}
