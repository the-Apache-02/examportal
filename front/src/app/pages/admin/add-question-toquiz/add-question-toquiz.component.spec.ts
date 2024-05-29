import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionToquizComponent } from './add-question-toquiz.component';

describe('AddQuestionToquizComponent', () => {
  let component: AddQuestionToquizComponent;
  let fixture: ComponentFixture<AddQuestionToquizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddQuestionToquizComponent]
    });
    fixture = TestBed.createComponent(AddQuestionToquizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
