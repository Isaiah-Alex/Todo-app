import { Component, computed, input } from '@angular/core';
// import { NgClass } from "../../../../node_modules/@angular/common/types/_common_module-chunk";

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
  // isTextarea = computed(() => this.inputType() === 'textarea');
}
