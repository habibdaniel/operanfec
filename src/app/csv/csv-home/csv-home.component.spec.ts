import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvHomeComponent } from './csv-home.component';

describe('CsvHomeComponent', () => {
  let component: CsvHomeComponent;
  let fixture: ComponentFixture<CsvHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsvHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
