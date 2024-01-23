import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionListComponent } from './notificacion-list.component';

describe('NotificacionListComponent', () => {
  let component: NotificacionListComponent;
  let fixture: ComponentFixture<NotificacionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificacionListComponent]
    });
    fixture = TestBed.createComponent(NotificacionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
