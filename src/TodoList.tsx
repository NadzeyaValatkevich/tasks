import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import style from './TodoList.module.css';

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
            <EditableSpan title={props.title} onChange={onChangeTodolistTitle}/>
            <button onClick={onClickHandler}>x</button>
            <AddItemForm addItem={addTask} value={'Title task'}/>
            <ul>
                {props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(props.todoListId, t.id);
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeStatus(props.todoListId, t.id, newIsDoneValue)
                    };
                    const onChangeTitleHandler = (newTitle: string) => {
                        props.changeTaskTitle(props.todoListId, t.id, newTitle);
                    }

                    return <li key={t.id}
                               className={t.isDone ? style.isDone : ''}
                    >
                        <input type={"checkbox"} checked={t.isDone} onChange={onChangeHandler}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <button onClick={onClickHandler}>x
                        </button>
                    </li>
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler}
                        className={props.filter === 'all' ? style.activeFilter : ''}>All
                </button>
                <button onClick={onActiveClickHandler}
                        className={props.filter === 'active' ? style.activeFilter : ''}
                >Active
                </button>
                <button onClick={onCompletedClickHandler}
                        className={props.filter === 'completed' ? style.activeFilter : ''}
                >Completed
                </button>
            </div>
        </div>
    )
}