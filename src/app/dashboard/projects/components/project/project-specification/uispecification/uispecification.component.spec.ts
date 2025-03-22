import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UISpecificationComponent } from './uispecification.component';

describe('UISpecificationComponent', () => {
  let component: UISpecificationComponent;
  let fixture: ComponentFixture<UISpecificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UISpecificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UISpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
