import React, {ChangeEvent, KeyboardEvent, useState} from "react";

export type AddItemFormPropsType = {
    addItem: (title: string) => void,
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

    return <div>
        <input className={error ? 'error' : ''}
               value={title}
               onChange={onChangeHandler}
               onKeyDown={onKeyDownHandler}
        />
        <button onClick={addItem}>+</button>
        {error && <div className={'error-message'}>{error}</div>}
    </div>
}