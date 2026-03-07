import { Component } from '@angular/core';
import { Icon } from '../icon/icon';
import { CardWrapper } from '../card-wrapper/card-wrapper';

@Component({
  selector: 'app-task',
  imports: [Icon, CardWrapper],
  templateUrl: './task.html',
  styleUrl: './task.scss',
})
export class Task {

}
