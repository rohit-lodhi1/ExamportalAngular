import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizRanksComponent } from './quiz-ranks.component';

describe('QuizRanksComponent', () => {
  let component: QuizRanksComponent;
  let fixture: ComponentFixture<QuizRanksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizRanksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizRanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
