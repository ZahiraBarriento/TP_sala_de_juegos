import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoJuegosComponent } from './info-juegos.component';

describe('InfoJuegosComponent', () => {
  let component: InfoJuegosComponent;
  let fixture: ComponentFixture<InfoJuegosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoJuegosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoJuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
