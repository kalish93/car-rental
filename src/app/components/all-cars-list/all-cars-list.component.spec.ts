import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCarsListComponent } from './all-cars-list.component';

describe('AllCarsListComponent', () => {
  let component: AllCarsListComponent;
  let fixture: ComponentFixture<AllCarsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllCarsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllCarsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
