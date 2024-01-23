import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionprogramsListComponent } from './asignacionprograms-list.component';

describe('AsignacionprogramsListComponent', () => {
  let component: AsignacionprogramsListComponent;
  let fixture: ComponentFixture<AsignacionprogramsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignacionprogramsListComponent]
    });
    fixture = TestBed.createComponent(AsignacionprogramsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
