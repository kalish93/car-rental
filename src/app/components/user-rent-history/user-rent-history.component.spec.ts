import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRentHistoryComponent } from './user-rent-history.component';

describe('UserRentHistoryComponent', () => {
  let component: UserRentHistoryComponent;
  let fixture: ComponentFixture<UserRentHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRentHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserRentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
