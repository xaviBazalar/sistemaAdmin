import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosSalidaTareaContratoComponent } from './documentos-salida-tarea-contrato.component';

describe('DocumentosSalidaTareaContratoComponent', () => {
  let component: DocumentosSalidaTareaContratoComponent;
  let fixture: ComponentFixture<DocumentosSalidaTareaContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentosSalidaTareaContratoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentosSalidaTareaContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
