import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionprogramsFormComponent } from './asignacionprograms-form.component';

describe('AsignacionprogramsFormComponent', () => {
  let component: AsignacionprogramsFormComponent;
  let fixture: ComponentFixture<AsignacionprogramsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignacionprogramsFormComponent]
    });
    fixture = TestBed.createComponent(AsignacionprogramsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
