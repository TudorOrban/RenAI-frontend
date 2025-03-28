import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperTaskStateComponent } from './developer-task-state.component';

describe('DeveloperTaskStateComponent', () => {
  let component: DeveloperTaskStateComponent;
  let fixture: ComponentFixture<DeveloperTaskStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeveloperTaskStateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeveloperTaskStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
