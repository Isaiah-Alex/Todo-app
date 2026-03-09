import { Itodo } from "../types/todo.types";


export const MOCK_TODOS: Itodo[] = [
    {
        id: 1,
        title: 'Buy groceries',
        description: 'I want to buy garri and milk',
        isCompleted: false,
        timestamp:  new Date(),
    },
    {
        id: 2,
        title: 'Walk the dog',
        description: 'walking bingo to the park',
        isCompleted: true,
        timestamp:  new Date(),
    },
    {
        id: 3,
        title: 'Write code',
        description: 'finish my todo app in angular!',
        isCompleted: false,
        timestamp:  new Date(),
    },
]