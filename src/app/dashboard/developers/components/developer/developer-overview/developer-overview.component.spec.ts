import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperOverviewComponent } from './developer-overview.component';

describe('DeveloperOverviewComponent', () => {
  let component: DeveloperOverviewComponent;
  let fixture: ComponentFixture<DeveloperOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeveloperOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeveloperOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
