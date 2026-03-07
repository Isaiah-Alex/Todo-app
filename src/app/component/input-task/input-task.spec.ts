import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTask } from './input-task';

describe('InputTask', () => {
  let component: InputTask;
  let fixture: ComponentFixture<InputTask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTask]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputTask);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
