import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMediumCardComponent } from './project-medium-card.component';

describe('ProjectMediumCardComponent', () => {
  let component: ProjectMediumCardComponent;
  let fixture: ComponentFixture<ProjectMediumCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectMediumCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectMediumCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
