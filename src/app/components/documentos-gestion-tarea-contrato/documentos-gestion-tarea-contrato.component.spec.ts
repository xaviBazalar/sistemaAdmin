import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosGestionTareaContratoComponent } from './documentos-gestion-tarea-contrato.component';

describe('DocumentosGestionTareaContratoComponent', () => {
  let component: DocumentosGestionTareaContratoComponent;
  let fixture: ComponentFixture<DocumentosGestionTareaContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentosGestionTareaContratoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentosGestionTareaContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
