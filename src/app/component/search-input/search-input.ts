import { Component, computed, inject, input, signal } from '@angular/core';
import { CardWrapper } from '../card-wrapper/card-wrapper';
import { Icon } from '../icon/icon';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-search-input',
  imports: [CardWrapper, Icon],
  templateUrl: './search-input.html',
  styleUrl: './search-input.scss',
})
export class SearchInput {
  private todoService = inject(TodoService);
  
  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.todoService.searchQuery.set(value);
    // console.log(this.todoService.searchQuery())
  }

}
