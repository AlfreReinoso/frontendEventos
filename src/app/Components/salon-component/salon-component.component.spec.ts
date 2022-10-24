import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonComponentComponent } from './salon-component.component';

describe('SalonComponentComponent', () => {
  let component: SalonComponentComponent;
  let fixture: ComponentFixture<SalonComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalonComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalonComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
