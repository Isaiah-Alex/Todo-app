import { computed, Injectable, signal } from "@angular/core";
import { Itodo } from "../types/todo.types";

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
            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        });
    });

    addTodo(title: string, description: string) {
        this.todos.update(todos => [
            ...todos,
            {
                id: Date.now(),
                title,
                description,
                isCompleted: false,
                timestamp: new Date(),
            }
        ])
        this.saveToStorage();
    }

    deleteTodo(id: number) {
        this.todos.update(todos => todos.filter(todo => todo.id !== id));
        this.saveToStorage();
    }

    toggle(id: number) {
        this.todos.update(todos => todos.map(todo =>
            todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        ));
        this.saveToStorage();
    }

    private loadFromStorage(): Itodo[] {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored).map((todo: Itodo) => ({
            ...todo,
            timestamp: new Date(todo.timestamp),
        })) : [];
    }

    private saveToStorage() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos()));
    }
}