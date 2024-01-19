import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalunitPrincipalComponent } from './operationalunit-principal.component';

describe('OperationalunitPrincipalComponent', () => {
  let component: OperationalunitPrincipalComponent;
  let fixture: ComponentFixture<OperationalunitPrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperationalunitPrincipalComponent]
    });
    fixture = TestBed.createComponent(OperationalunitPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
