import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitprogramPrincipalComponent } from './unitprogram-principal.component';

describe('UnitprogramPrincipalComponent', () => {
  let component: UnitprogramPrincipalComponent;
  let fixture: ComponentFixture<UnitprogramPrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitprogramPrincipalComponent]
    });
    fixture = TestBed.createComponent(UnitprogramPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
