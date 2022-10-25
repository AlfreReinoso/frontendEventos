import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioComponentComponent } from './servicio-component.component';

describe('ServicioComponentComponent', () => {
  let component: ServicioComponentComponent;
  let fixture: ComponentFixture<ServicioComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicioComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
