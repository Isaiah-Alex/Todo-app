import { Component, input } from '@angular/core';
import { CardWrapper } from '../card-wrapper/card-wrapper';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-search-input',
  imports: [CardWrapper, Icon],
  templateUrl: './search-input.html',
  styleUrl: './search-input.scss',
})
export class SearchInput {
  
}
