import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramPrincipalComponent } from './program-principal.component';

describe('ProgramPrincipalComponent', () => {
  let component: ProgramPrincipalComponent;
  let fixture: ComponentFixture<ProgramPrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramPrincipalComponent]
    });
    fixture = TestBed.createComponent(ProgramPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
