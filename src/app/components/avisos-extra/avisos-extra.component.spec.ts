import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisosExtraComponent } from './avisos-extra.component';

describe('AvisosExtraComponent', () => {
  let component: AvisosExtraComponent;
  let fixture: ComponentFixture<AvisosExtraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisosExtraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvisosExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
