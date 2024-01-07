import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAttemptesComponent } from './user-attemptes.component';

describe('UserAttemptesComponent', () => {
  let component: UserAttemptesComponent;
  let fixture: ComponentFixture<UserAttemptesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAttemptesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAttemptesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
