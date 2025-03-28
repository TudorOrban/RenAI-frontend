import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperEnvironmentComponent } from './developer-environment.component';

describe('DeveloperEnvironmentComponent', () => {
  let component: DeveloperEnvironmentComponent;
  let fixture: ComponentFixture<DeveloperEnvironmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeveloperEnvironmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeveloperEnvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
