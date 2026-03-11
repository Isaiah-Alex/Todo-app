import { Component, computed, effect, ElementRef, input, output, viewChild } from '@angular/core';

@Component({
  selector: 'app-input-task',
  standalone: true,
  imports: [],
  templateUrl: './input-task.html',
  styleUrl: './input-task.scss',
})
export class InputTask {
  inputType = input<string>('text');
  placeholder = input<string>('Enter text...');
  placeholderIcon = input<string>();
  inputId = input<string>();
  value = output<string>();
  isFormCleared = input<boolean>(false);
  inputRef = viewChild<ElementRef>('inputRef')


  onInput = (event: Event) => {
    event.preventDefault()
    const val = (event.target as HTMLInputElement).value;
    this.value.emit(val);
    
  }
  // isTextarea = computed(() => this.inputType() === 'textarea');

  constructor() {
    effect(() => {
      if (this.isFormCleared()) {
        this.inputRef()!.nativeElement.value = '';
      }
    });
  }

  

}
