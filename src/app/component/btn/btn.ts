import { Component, input } from '@angular/core';

@Component({
  selector: 'app-btn',
  standalone: true,
  imports: [],
  templateUrl: './btn.html',
  styleUrl: './btn.scss',
})
export class Btn {
  label = input.required<string>();
  icon = input<string>();
}
