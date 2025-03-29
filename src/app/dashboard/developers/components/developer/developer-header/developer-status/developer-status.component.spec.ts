import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperStatusComponent } from './developer-status.component';

describe('DeveloperStatusComponent', () => {
  let component: DeveloperStatusComponent;
  let fixture: ComponentFixture<DeveloperStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeveloperStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeveloperStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
