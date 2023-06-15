import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "./App";
import {
    ActionsType,
    AddTodoList,
    ChangeTodoListFilter,
    ChangeTodoListTitle,
    RemoveTodoList,
    todoListsReducer
} from "./todoLists-reducer";

test('correct todoList should be removed', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    const startState: TodoListType[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ];

    const endState = todoListsReducer(startState, RemoveTodoList(todoListId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
});

test('correct todoList should be added', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    const startState: TodoListType[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ];

    const endState = todoListsReducer(startState, AddTodoList('newTodoListTitle'));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe('newTodoListTitle');
    expect(endState[2].filter).toBe('all');
});

test('correct todoList should change its title', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let newTodoListTitle = 'New TodoList';

    const startState: TodoListType[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ];

    const endState = todoListsReducer(startState, ChangeTodoListTitle(todoListId2, newTodoListTitle));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodoListTitle);
});

test('correct todoList should change its filter', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let newFilter: FilterValuesType = 'completed';

    const startState: TodoListType[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ];

    const endState = todoListsReducer(startState, ChangeTodoListFilter(todoListId2, newFilter));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});