import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionFormComponent } from './notificacion-form.component';

describe('NotificacionFormComponent', () => {
  let component: NotificacionFormComponent;
  let fixture: ComponentFixture<NotificacionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificacionFormComponent]
    });
    fixture = TestBed.createComponent(NotificacionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
