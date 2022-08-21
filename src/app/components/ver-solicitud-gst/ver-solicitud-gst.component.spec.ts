import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerSolicitudGstComponent } from './ver-solicitud-gst.component';

describe('VerSolicitudGstComponent', () => {
  let component: VerSolicitudGstComponent;
  let fixture: ComponentFixture<VerSolicitudGstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerSolicitudGstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerSolicitudGstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
