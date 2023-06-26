
import {v1} from "uuid";
import {TasksStateType} from "./TodoListsList";
import {addTask, changeTaskStatus, changeTaskTitle, removeTask, setTasks, tasksReducer} from "./tasks-reducer";
import {addTodoList, FilterValuesType, removeTodoList, setTodoLists} from "./todoLists-reducer";

let startState: TasksStateType;

let todoListId1: string;
let todoListId2: string;

beforeEach(() => {
    // todoListId1 = v1();
    // todoListId2 = v1();

    startState = {
        "todoListId1": [
            {id: "1", title: 'CSS', isDone: false, todoListId:todoListId1},
            {id: "2", title: 'JS', isDone: true, todoListId:todoListId1},
            {id: "3", title: 'React', isDone: false, todoListId:todoListId1},
        ],
        "todoListId2": [
            {id: "11", title: 'bread', isDone: false, todoListId:todoListId2},
            {id: "12", title: 'milk', isDone: true, todoListId:todoListId2},
            {id: "13", title: 'tea', isDone: false, todoListId:todoListId2},
        ]
    }
});

test('correct task should be removed from correct array', () => {
    const endState = tasksReducer(startState, removeTask("todoListId2", "12"));

    expect(endState["todoListId2"].length).toBe(2);
    expect(endState["todoListId1"].length).toBe(3);
    expect(endState["todoListId2"].every(t => t.id !== '12')).toBeTruthy();
});

test('correct task should be added to correct array', () => {
    const task = {
        todoListId: "todoListId2",
        id: v1(),
        title: 'coffee',
        isDone: false
    }
    const endState = tasksReducer(startState, addTask(task));

    expect(endState["todoListId1"].length).toBe(3);
    expect(endState["todoListId2"].length).toBe(4);
    expect(endState["todoListId2"][3].id).toBeDefined();
    expect(endState["todoListId2"][3].title).toBe('coffee');
});

test('status of specified task should be changed', () => {
    const task = {
        todoListId: "todoListId2",
        id: "12",
        title: 'milk',
        isDone: false
    }
    const endState = tasksReducer(startState, changeTaskStatus(task));

    expect(endState["todoListId2"][1].isDone).toBeFalsy();
    expect(endState["todoListId1"][1].isDone).toBeTruthy();
});

test('title of specified task should be changed', () => {
    const task = {
        todoListId: "todoListId2",
        id: "12",
        title: 'sweets',
        isDone: true
    }
    const endState = tasksReducer(startState, changeTaskTitle(task));

    expect(endState["todoListId2"][1].title).toBe('sweets');
    expect(endState["todoListId1"][1].title).toBe('JS');
});

test('new array should be added when new todoList is added', () => {
    const todoList = {
        id: "todoListId3",
        title: 'new todoList',
        filter: 'all' as FilterValuesType
    };
    const action = addTodoList(todoList);

    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != "todoListId1" && k != "todoListId2")
    if (!newKey) {
        throw Error('new key should be added')
    };

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todoListId should be deleted', () => {
    const action = removeTodoList('todoListId2');

    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todoListId2']).not.toBeDefined();
});

test('empty arrays should be added when we set todoLists', () => {
    const action = setTodoLists([
        {id: "1", title: 'What to learn'},
        {id: "2", title: 'What to buy'}
    ]);

    const endState = tasksReducer({}, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState["1"]).toStrictEqual([]);
    expect(endState["2"]).toStrictEqual([]);
});

test('tasks should be added for todoList', () => {
    const action = setTasks(startState["todoListId1"], "todoListId1");

    const endState = tasksReducer({
        "todoListId1": [],
        "todoListId2": [],
    }, action);

    expect(endState["todoListId1"].length).toBe(3);
    expect(endState["todoListId2"].length).toBe(0);
});

