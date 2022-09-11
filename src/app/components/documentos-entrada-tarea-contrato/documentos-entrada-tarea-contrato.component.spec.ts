import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosEntradaTareaContratoComponent } from './documentos-entrada-tarea-contrato.component';

describe('DocumentosEntradaTareaContratoComponent', () => {
  let component: DocumentosEntradaTareaContratoComponent;
  let fixture: ComponentFixture<DocumentosEntradaTareaContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentosEntradaTareaContratoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentosEntradaTareaContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
