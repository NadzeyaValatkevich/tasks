import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
};
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
};
export type TasksStateType = {
    [key: string]: TaskType[]
};

const App = () => {

    const todoListId1 = v1();
    const todoListId2 = v1();

    const [todoLists, setTodoLists] = useState<TodoListType[]>(
        [
            {id: todoListId1, title: 'What to learn', filter: 'all'},
            {id: todoListId2, title: 'What to buy', filter: 'all'},
        ]
    );

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'React book', isDone: true}
        ],
    });

    const removeTask = (todoListId: string, id: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== id)})
    };

    const changeFilter = (todoListId: string, value: FilterValuesType) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: value} : tl))
    };

    const addTask = (todoListId: string, title: string) => {
        const task = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todoListId]: [task, ...tasks[todoListId]]})
    };

    const changeStatus = (todoListId: string, id: string, isDone: boolean) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === id ? {...t, isDone} : t)})
    };

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId));
        delete tasks[todoListId];
        setTasks({...tasks});
    };

    const addTodoList = (title: string) => {
        const newTodoListId = v1();
        const newTodoList:TodoListType = {id: newTodoListId, title, filter: 'all'};
        setTodoLists([newTodoList, ...todoLists]);
        setTasks({...tasks, [newTodoListId]: []});
    };

    const changeTaskTitle = (todoListId: string, id: string, newTitle: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === id ? {...t, title: newTitle} : t)})
    };

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {todoLists.map(tl => {

                let allTodoListTasks = tasks[tl.id];
                let tasksForTodoList = allTodoListTasks;

                if (tl.filter === 'active') {
                    tasksForTodoList = allTodoListTasks.filter(t => t.isDone === false)
                }
                if (tl.filter === 'completed') {
                    tasksForTodoList = allTodoListTasks.filter(t => t.isDone === true)
                }

                return <TodoList key={tl.id}
                                 todoListId={tl.id}
                                 title={tl.title}
                                 tasks={tasksForTodoList}
                                 removeTask={removeTask}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 changeStatus={changeStatus}
                                 filter={tl.filter}
                                 removeTodoList={removeTodoList}
                                 changeTaskTitle={changeTaskTitle}
                />
            })}
        </div>
    );
};

export default App;
