import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitprogramFormComponent } from './unitprogram-form.component';

describe('UnitprogramFormComponent', () => {
  let component: UnitprogramFormComponent;
  let fixture: ComponentFixture<UnitprogramFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitprogramFormComponent]
    });
    fixture = TestBed.createComponent(UnitprogramFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
