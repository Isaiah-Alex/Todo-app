import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { Hero } from './component/hero/hero';
import { AddTaskCard } from './component/add-task-card/add-task-card';
import { CardWrapper } from './component/card-wrapper/card-wrapper';
import { SearchInput } from './component/search-input/search-input';
import { Icon } from './component/icon/icon';
import { Task } from './component/task/task';

@Component({
  selector: 'app-root',
  imports: [Hero,
    AddTaskCard,
    CardWrapper,
    SearchInput,
    Task
    ],  
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('todo-app');
}
