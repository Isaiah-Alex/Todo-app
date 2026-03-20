import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-input-task',
  standalone: true,
  imports: [],
  templateUrl: './input-task.html',
  styleUrl: './input-task.scss',
})
export class InputTask {
  private todoService = inject(TodoService);

  inputType = input<string>('text');
  placeholder = input<string>('Enter text...');
  placeholderIcon = input<string>();
  inputId = input<string>();
  value = output<string>();
  isFormCleared = input<boolean>(false);
  inputRef = viewChild<ElementRef>('inputRef');
  inValue = input<string>('');

  onInput = (event: Event) => {
    event.preventDefault();
    const val = (event.target as HTMLInputElement).value;
    this.value.emit(val);
  };
  // isTextarea = computed(() => this.inputType() === 'textarea');

  constructor() {
    effect(() => {
      if (this.isFormCleared()) {
        this.inputRef()!.nativeElement.value = '';
      }
      // else if (this.todoService.tiggerPaste()) {
      //   this.inputRef()!.nativeElement.value = this.taskText();
      // }
    });
  }
}
