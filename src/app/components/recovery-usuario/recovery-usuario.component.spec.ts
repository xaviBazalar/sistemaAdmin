import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryUsuarioComponent } from './recovery-usuario.component';

describe('RecoveryUsuarioComponent', () => {
  let component: RecoveryUsuarioComponent;
  let fixture: ComponentFixture<RecoveryUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoveryUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoveryUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
