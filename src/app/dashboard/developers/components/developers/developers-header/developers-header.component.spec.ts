import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopersHeaderComponent } from './developers-header.component';

describe('DevelopersHeaderComponent', () => {
  let component: DevelopersHeaderComponent;
  let fixture: ComponentFixture<DevelopersHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevelopersHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevelopersHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
