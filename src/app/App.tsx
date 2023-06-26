import React, {useEffect} from 'react';
import style from './App.module.css';
import {TodoListsList} from "../features/TodoListsList/TodoListsList";
import {fetchTodoLists} from "../features/TodoListsList/todoLists-reducer";
import {useAppDispatch} from "../hooks/useAppDispatch";


const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTodoLists())
    }, []);

    return (
        <div className={style.app}>
            <div className={style.header}></div>
            <TodoListsList/>
        </div>
    );
};

export default App;
