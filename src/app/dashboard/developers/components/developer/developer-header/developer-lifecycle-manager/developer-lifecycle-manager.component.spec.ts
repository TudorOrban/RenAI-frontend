import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperLifecycleManagerComponent } from './developer-lifecycle-manager.component';

describe('DeveloperLifecycleManagerComponent', () => {
  let component: DeveloperLifecycleManagerComponent;
  let fixture: ComponentFixture<DeveloperLifecycleManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeveloperLifecycleManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeveloperLifecycleManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
