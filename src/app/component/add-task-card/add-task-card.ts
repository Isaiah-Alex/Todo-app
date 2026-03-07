import { Component } from '@angular/core';
import { InputTask } from '../input-task/input-task';
import { Btn } from '../btn/btn';
// import { CardWrapper } from '../card-wrapper/card-wrapper';

@Component({
  selector: 'app-add-task-card',
  imports: [InputTask, Btn],
  templateUrl: './add-task-card.html',
  styleUrl: './add-task-card.scss',
})
export class AddTaskCard {

}
