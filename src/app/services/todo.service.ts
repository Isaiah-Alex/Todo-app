import { computed, Injectable, signal } from '@angular/core';
import { Itodo } from '../types/todo.types';

const STORAGE_KEY = 'todos';

@Injectable({ providedIn: 'root' })
export class TodoService {
  constructor() {
    document.body.setAttribute('data-theme', this.isDark() ? 'dark' : 'light');
  }

  todos = signal<Itodo[]>(this.loadFromStorage());

  searchQuery = signal<string>('');

  filterTodos = computed(() => {
    return this.todos().filter(
      (todo) =>
        todo.title.toLowerCase().includes(this.searchQuery().toLowerCase()) ||
        todo.description?.toLocaleLowerCase().includes(this.searchQuery().toLowerCase()),
    );
  });

  sortedTodos = computed(() => {
    return this.filterTodos()
      .slice()
      .sort((a, b) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      });
  });

  addTodo(title: string, description: string) {
    this.todos.update((todos) => [
      ...todos,
      {
        id: Date.now(),
        title,
        description,
        isCompleted: false,
        timestamp: new Date(),
      },
    ]);
    this.saveToStorage();
  }

  deleteTodo(id: number) {
    this.todos.update((todos) => todos.filter((todo) => todo.id !== id));
    this.saveToStorage();
  }

  ////////////////////edit todo
  taskEditObject = signal<Itodo | null>(null);
  tiggerPaste = signal<boolean>(false);

  notifyPaste() {
    this.tiggerPaste.set(true);
  }

  getTodoObject(id: number) {
    const task = this.todos().find((task) => task.id === id);
    this.taskEditObject.set(task ? task : null);
    // console.log(this.taskEdit());
  }

  updateTask(id: number, title: string, description?: string) {
    this.todos.update((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              title: title,
              description: description,
            }
          : task,
      ),
    );
  }

  toggle(id: number) {
    this.todos.update((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo)),
    );
    this.saveToStorage();
  }

  private loadFromStorage(): Itodo[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored
      ? JSON.parse(stored).map((todo: Itodo) => ({
          ...todo,
          timestamp: new Date(todo.timestamp),
        }))
      : [];
  }

  private saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos()));
  }

  isDark = signal<boolean>(
    localStorage.getItem('theme') ? localStorage.getItem('theme') === 'dark' : true,
  );

  changeTheme() {
    this.isDark.set(!this.isDark());
    const theme = this.isDark() ? 'dark' : 'light';
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
}
