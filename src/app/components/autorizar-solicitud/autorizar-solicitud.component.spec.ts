import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizarSolicitudComponent } from './autorizar-solicitud.component';

describe('AutorizarSolicitudComponent', () => {
  let component: AutorizarSolicitudComponent;
  let fixture: ComponentFixture<AutorizarSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorizarSolicitudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutorizarSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
