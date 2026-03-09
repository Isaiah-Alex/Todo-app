import { Component, inject, signal } from '@angular/core';
import { InputTask } from '../input-task/input-task';
import { Btn } from '../btn/btn';
import { MOCK_TODOS } from '../../constants/mock-data';
import { Itodo } from '../../types/todo.types';
import { TodoService } from '../../services/todo.service';
// import { CardWrapper } from '../card-wrapper/card-wrapper';

@Component({
  selector: 'app-add-task-card',
  imports: [InputTask, Btn],
  templateUrl: './add-task-card.html',
  styleUrl: './add-task-card.scss',
})
export class AddTaskCard {
  private todoService = inject(TodoService);

  // todos = signal(MOCK_TODOS);
  taskTitle = signal<string>('');
  taskDescription = signal<string>('');
  displayText = signal<boolean>(false);
  clearForm = signal<boolean>(false);

  addTask (event: Event) {
    event.preventDefault();
    if (!this.validateForm()) return;
    this.todoService.addTodo(this.taskTitle(), this.taskDescription());
    this.taskTitle.set('');
    this.taskDescription.set('');
    this.resetForm();
  }

  validateForm() {
    if (this.taskTitle() === '') {
      this.displayText.set(true);
      return false;
    } else {
      this.displayText.set(false);
      return true;
    }
  }

  resetForm() {
    this.clearForm.set(true);
    setTimeout(() => this.clearForm.set(false));
  }
}
