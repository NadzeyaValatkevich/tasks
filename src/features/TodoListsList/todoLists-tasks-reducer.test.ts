import {tasksReducer} from "./tasks-reducer";
import {addTodoList, FilterValuesType, TodoListDomainType, todoListsReducer} from "./todoLists-reducer";
import {TasksStateType} from "./TodoListsList";

test('ids should be equals', () => {
    const newTodoList = {
        id: 'id exist',
        title: 'new todoList',
        filter: 'all' as FilterValuesType
    };
    const startTasksState: TasksStateType = {};
    const startTodoListsState: TodoListDomainType[] = [];

    const action = addTodoList(newTodoList);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.todoList.id);
    expect(idFromTodoLists).toBe(action.todoList.id);
});