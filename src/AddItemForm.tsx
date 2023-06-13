import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import style from './AddItemForm.module.css';
import {IconButton} from "@mui/material";
import {AddBox} from "@mui/icons-material";

export type AddItemFormPropsType = {
    addItem: (title: string) => void,
    value: string
}

export const AddItemForm = (props: AddItemFormPropsType) => {

    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title);
            setTitle('')
        } else {
            setError('Title is required')
        }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addItem()
        }
    };

    return <div className={style.itemForm}>
        <input className={error ? `${style.itemFormInput} ${style.error}` : style.itemFormInput}
               value={title}
               onChange={onChangeHandler}
               onKeyDown={onKeyDownHandler}
               placeholder={props.value}
        />
        <IconButton onClick={addItem} className={style.itemFormBtn}>
            <AddBox/>
        </IconButton>

        {error && <div className={style.errorMessage}>{error}</div>}
    </div>
}