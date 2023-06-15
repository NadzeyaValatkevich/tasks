import {v1} from "uuid";
import {FilterValuesType, TasksStateType, TodoListType} from "./App";
import {
    ActionsType,
    AddTodoList,
    ChangeTodoListFilter,
    ChangeTodoListTitle,
    RemoveTodoList,
    todoListsReducer
} from "./todoLists-reducer";
import {AddTask, ChangeTaskStatus, ChangeTaskTitle, RemoveTask, tasksReducer} from "./tasks-reducer";

test('correct task should be removed from correct array', () => {

    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        'todoListId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false},
        ]
    };

    const endState = tasksReducer(startState, RemoveTask('todoListId2', '2'));

    expect(endState['todoListId2'].length).toBe(2);
    expect(endState['todoListId1'].length).toBe(3);
    expect(endState['todoListId2'][1].title).toBe('tea');
});

test('correct task should be added to correct array', () => {

    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        'todoListId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false},
        ]
    };

    const endState = tasksReducer(startState, AddTask('todoListId2', 'coffee'));

    expect(endState['todoListId1'].length).toBe(3);
    expect(endState['todoListId2'].length).toBe(4);
    expect(endState['todoListId2'][0].id).toBeDefined();
    expect(endState['todoListId2'][0].title).toBe('coffee');
});

test('status of specified task should be changed', () => {

    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        'todoListId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false},
        ]
    };

    const endState = tasksReducer(startState, ChangeTaskStatus('todoListId2', '2', false));

    expect(endState['todoListId2'][1].isDone).toBeFalsy();
    expect(endState['todoListId1'][1].isDone).toBeTruthy();
});

test('title of specified task should be changed', () => {

    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
        ],
        'todoListId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false},
        ]
    };

    const endState = tasksReducer(startState, ChangeTaskTitle('todoListId2', '2', 'orange'));

    expect(endState['todoListId2'][1].title).toBe('orange');
    expect(endState['todoListId1'][1].title).toBe('JS');
});

test('new array should be added when new todoList is added', () => {
    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todoListId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    };

    const action = AddTodoList('new todoList');

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todoListId1' && k != 'todoListId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
});

test('property with todoListId should be deleted', () => {
    const startState: TasksStateType = {
        'todoListId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todoListId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = RemoveTodoList('todoListId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todoListId2']).not.toBeDefined()
})

