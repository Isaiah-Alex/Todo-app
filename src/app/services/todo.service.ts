import { computed, Injectable, input, signal } from "@angular/core";
import { Itodo } from "../types/todo.types";
import { MOCK_TODOS } from "../constants/mock-data";


const STORAGE_KEY = 'todos';

@Injectable({ providedIn: 'root' })
export class TodoService {
    todos = signal<Itodo[]>(this.loadFromStorage());

    searchQuery = signal<string>('')

    filterTodos = computed(() => {
        return this.todos().filter(todo => todo.title.toLowerCase().includes(this.searchQuery().toLowerCase()));
    })
    
    sortedTodos = computed(() => {
        return this.filterTodos().slice().sort((a, b) => {
            return Number(a.isCompleted) - Number(b.isCompleted);
    });
    });

    addTodo(title: string, description: string) {
        this.todos.update(todos => [
            ...todos,
            {
                id: todos.length + 1,
                title,
                description,
                isCompleted: false,
                timestamp: new Date(),
            }
        ])
        this.saveToStorage();
    }

    toggle(id: number) {
        this.todos.update(todos => todos.map(todo =>
            todo.id === id ? {
                ...todo, isCompleted: !todo.isCompleted
            } : todo
        ));
        this.saveToStorage();
    }

    private loadFromStorage(): Itodo[] {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    }

    private saveToStorage() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos()));
    }
}

