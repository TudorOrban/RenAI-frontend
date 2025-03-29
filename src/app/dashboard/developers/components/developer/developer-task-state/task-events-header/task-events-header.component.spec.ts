import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEventsHeaderComponent } from './task-events-header.component';

describe('TaskEventsHeaderComponent', () => {
  let component: TaskEventsHeaderComponent;
  let fixture: ComponentFixture<TaskEventsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskEventsHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskEventsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
