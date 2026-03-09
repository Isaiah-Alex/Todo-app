import { Component, ElementRef, inject, input, signal } from '@angular/core';
import { Icon } from '../icon/icon';
import { CardWrapper } from '../card-wrapper/card-wrapper';
import { TodoService } from '../../services/todo.service';
import { TimeAgoPipe } from '../../utils/time-ago';

@Component({
  selector: 'app-task',
  imports: [Icon, CardWrapper, TimeAgoPipe],
  templateUrl: './task.html',
  styleUrl: './task.scss',
})
export class Task {

  private todoService = inject(TodoService);

  title = input.required<string>();
  description = input<string>();
  isCompleted = input<boolean>(false);
  timestamp = input<Date>(new Date);
  id = input.required<number>();
  isMenuDisplayed = signal<boolean>(false);

  onCheck = (event: Event) => {
    // const checked = (event.target as HTMLInputElement).checked;
    event.preventDefault();
    this.todoService.toggle(this.id());
  }

  onRightCLick(event: MouseEvent) {
    event.preventDefault();
    console.log('clicked me')
  }

  onClick(event: MouseEvent) {
    event.stopPropagation();
    this.isMenuDisplayed.update(val => !val);
    // console.log('clicked')
  }

  closeTab(event: MouseEvent) {
    if (this.isMenuDisplayed()) {
      this.isMenuDisplayed.set(false)
    }
  }
  deleteTask(event: MouseEvent) {
    this.todoService.deleteTodo(this.id())
  }

}
