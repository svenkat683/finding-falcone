import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindingFalconeComponent } from './finding-falcone.component';

describe('FindingFalconeComponent', () => {
  let component: FindingFalconeComponent;
  let fixture: ComponentFixture<FindingFalconeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindingFalconeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindingFalconeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
