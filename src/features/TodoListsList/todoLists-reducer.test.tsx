import {
    addTodoList, changeTodoListFilter,
    changeTodoListTitle, FilterValuesType,
    removeTodoList,
    setTodoLists,
    TodoListDomainType,
    todoListsReducer
} from "./todoLists-reducer";
import {v1} from "uuid";

let todoListId1: string;
let todoListId2: string;
let startState: TodoListDomainType[];

beforeEach(() => {
    todoListId1 = v1();
    todoListId2 = v1();
    startState = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ];
})

test('correct todoList should be removed', () => {
    const endState = todoListsReducer(startState, removeTodoList(todoListId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
});

test('correct todoList should be added', () => {
    const newTodoList = {
        id: 'id exist',
        title: 'new todoList'
    };
    const endState = todoListsReducer(startState, addTodoList(newTodoList));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe('new todoList');
});

test('correct todoList should change its title', () => {
    let newTodoListTitle = 'New TodoListTitle';

    const endState = todoListsReducer(startState, changeTodoListTitle(todoListId2, newTodoListTitle));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodoListTitle);
});

test('correct todoList should change its filter', () => {
    let newFilter: FilterValuesType = 'completed';

    const endState = todoListsReducer(startState, changeTodoListFilter(todoListId2, newFilter));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});

test('todoList should be set to the state', () => {

    const endState = todoListsReducer([], setTodoLists(startState));

    expect(endState.length).toBe(2);
});