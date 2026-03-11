import { Component, inject, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { Hero } from './component/hero/hero';
import { AddTaskCard } from './component/add-task-card/add-task-card';
import { CardWrapper } from './component/card-wrapper/card-wrapper';
import { SearchInput } from './component/search-input/search-input';
import { Task } from './component/task/task';
import { TodoService } from './services/todo.service';
import { Icon } from './component/icon/icon';

@Component({
  selector: 'app-root',
  imports: [Hero,
    AddTaskCard,
    CardWrapper,
    SearchInput, 
    Task,
    Icon,
    ],  
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private todoService = inject(TodoService);
  todos = this.todoService.todos;
  filteredTodos = this.todoService.filterTodos;
  sortedTodo = this.todoService.sortedTodos;
  protected readonly title = signal('todo-app');

  isDark = this.todoService.isDark;

  changeTheme = this.todoService.changeTheme;


  

}
