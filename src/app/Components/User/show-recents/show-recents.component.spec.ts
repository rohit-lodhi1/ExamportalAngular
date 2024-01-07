import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRecentsComponent } from './show-recents.component';

describe('ShowRecentsComponent', () => {
  let component: ShowRecentsComponent;
  let fixture: ComponentFixture<ShowRecentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowRecentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowRecentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
