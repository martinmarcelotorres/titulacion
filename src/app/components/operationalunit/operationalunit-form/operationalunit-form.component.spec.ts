import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalunitFormComponent } from './operationalunit-form.component';

describe('OperationalunitFormComponent', () => {
  let component: OperationalunitFormComponent;
  let fixture: ComponentFixture<OperationalunitFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperationalunitFormComponent]
    });
    fixture = TestBed.createComponent(OperationalunitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
