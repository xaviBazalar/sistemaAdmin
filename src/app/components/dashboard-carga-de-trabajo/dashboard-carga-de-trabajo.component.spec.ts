import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCargaDeTrabajoComponent } from './dashboard-carga-de-trabajo.component';

describe('DashboardCargaDeTrabajoComponent', () => {
  let component: DashboardCargaDeTrabajoComponent;
  let fixture: ComponentFixture<DashboardCargaDeTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCargaDeTrabajoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCargaDeTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
