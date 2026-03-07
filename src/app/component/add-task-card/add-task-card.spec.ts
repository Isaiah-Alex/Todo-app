import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskCard } from './add-task-card';

describe('AddTaskCard', () => {
  let component: AddTaskCard;
  let fixture: ComponentFixture<AddTaskCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTaskCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaskCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
