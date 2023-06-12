import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";

type PropsType = {
    title: string,
    tasks: TaskType[],
    removeTask: (taskId: string) => void,
    changeFilter: (value: FilterValuesType) => void,
    addTask: (title: string) => void,
    changeStatus: (id: string, isDone: boolean) => void
    filter: FilterValuesType
};

export const TodoList = (props: PropsType) => {

    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title);
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
            addTask()
        }
    };

    const onAllClickHandler = () => props.changeFilter('all');
    const onActiveClickHandler = () => props.changeFilter('active');
    const onCompletedClickHandler = () => props.changeFilter('completed');

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input className={error ? 'error' : ''}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id);
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeStatus(t.id, newIsDoneValue)
                    };

                    return <li key={t.id}
                               className={t.isDone ? 'is-done' : ''}
                    >
                        <input type={"checkbox"} checked={t.isDone} onChange={onChangeHandler}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x
                        </button>
                    </li>
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler}
                        className={props.filter === 'all' ? 'active-filter' : ''}>All
                </button>
                <button onClick={onActiveClickHandler}
                        className={props.filter === 'active' ? 'active-filter' : ''}
                >Active
                </button>
                <button onClick={onCompletedClickHandler}
                        className={props.filter === 'completed' ? 'active-filter' : ''}
                >Completed
                </button>
            </div>
        </div>
    )
}