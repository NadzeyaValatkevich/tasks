import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
};

export type FilterValuesType = 'all' | 'active' | 'completed';

const App = () => {

    const [tasks, setTasks] = useState<TaskType[]>([
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ]
    );

    const [filter, setFilter] = useState<FilterValuesType>('all');

    let tasksForTodoList = tasks;

    if(filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    };

    if(filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    };

    const removeTask = (id: string) => {
        const filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    };

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    };

    const addTask = (title: string) => {
        const task = {id: v1(), title: title, isDone: false};
        const newTasks = [task, ...tasks];
        setTasks(newTasks)
    };

    const changeStatus = (id: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === id ? {...t, isDone: isDone} : t))
    }

    return (
        <div className="App">
            <TodoList title={'What to learn'}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
};

export default App;
