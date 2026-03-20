import { Component, effect, inject, input, signal } from '@angular/core';
import { InputTask } from '../input-task/input-task';
import { Btn } from '../btn/btn';
import { MOCK_TODOS } from '../../constants/mock-data';
import { Itodo } from '../../types/todo.types';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-add-task-card',
  imports: [InputTask, Btn],
  templateUrl: './add-task-card.html',
  styleUrl: './add-task-card.scss',
})
export class AddTaskCard {
  private todoService = inject(TodoService);
  isDark = this.todoService.isDark;

  taskTitle = signal<string>('');
  taskDescription = signal<string>('');
  displayText = signal<boolean>(false);
  clearForm = signal<boolean>(false);
  isEditTask = signal<boolean>(false);
  taskId = signal<number | null>(null);

  constructor() {
    effect(() => {
      if (this.todoService.tiggerPaste()) {
        this.pasteTodo();
        this.isEditTask.set(true);
      }
    });
  }

  pasteTodo() {
    const task = this.todoService.taskEditObject();
    this.taskTitle.set(task ? task.title : '');
    this.taskDescription.set(task?.description ?? '');
    this.taskId.set(task ? task.id : null);
    this.todoService.tiggerPaste.set(false);
  }

  updateTask() {
    this.todoService.updateTask(
      this.todoService.taskEditObject()?.id ?? 0,
      this.taskTitle(),
      this.taskDescription(),
    );
    this.taskTitle.set('');
    this.taskDescription.set('');
    this.resetForm();
    this.isEditTask.set(false);
  }

  addTask(event: Event) {
    event.preventDefault();
    if (!this.validateForm()) return;
    if (this.isEditTask()) {
      this.updateTask();
      return;
    }
    this.todoService.addTodo(this.taskTitle(), this.taskDescription());
    this.taskTitle.set('');
    this.taskDescription.set('');
    this.resetForm();
    this.isEditTask.set(false);
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
