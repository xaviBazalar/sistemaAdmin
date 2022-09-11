import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratosGerenciaComponent } from './contratos-gerencia.component';

describe('ContratosGerenciaComponent', () => {
  let component: ContratosGerenciaComponent;
  let fixture: ComponentFixture<ContratosGerenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratosGerenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratosGerenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
