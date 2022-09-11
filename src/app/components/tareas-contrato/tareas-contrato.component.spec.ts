import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasContratoComponent } from './tareas-contrato.component';

describe('TareasContratoComponent', () => {
  let component: TareasContratoComponent;
  let fixture: ComponentFixture<TareasContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TareasContratoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TareasContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
