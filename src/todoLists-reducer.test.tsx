import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "./App";
import {
    AddTodoList,
    ChangeTodoListFilter,
    ChangeTodoListTitle,
    RemoveTodoList,
    todoListsReducer
} from "./todoLists-reducer";

let todoListId1: string;
let todoListId2: string;
let startState: TodoListType[];

beforeEach(() => {
    todoListId1 = v1();
    todoListId2 = v1();
    startState = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ];
})

test('correct todoList should be removed', () => {
    const endState = todoListsReducer(startState, RemoveTodoList(todoListId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
});

test('correct todoList should be added', () => {
    const endState = todoListsReducer(startState, AddTodoList('newTodoListTitle'));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe('newTodoListTitle');
    expect(endState[2].filter).toBe('all');
});

test('correct todoList should change its title', () => {
    let newTodoListTitle = 'New TodoList';

    const endState = todoListsReducer(startState, ChangeTodoListTitle(todoListId2, newTodoListTitle));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodoListTitle);
});

test('correct todoList should change its filter', () => {
    let newFilter: FilterValuesType = 'completed';

    const endState = todoListsReducer(startState, ChangeTodoListFilter(todoListId2, newFilter));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});