import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoDireitaComponent } from './campo-direita.component';

describe('CampoDireitaComponent', () => {
  let component: CampoDireitaComponent;
  let fixture: ComponentFixture<CampoDireitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampoDireitaComponent ]
    })
    .compileComponents();
    
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampoDireitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
