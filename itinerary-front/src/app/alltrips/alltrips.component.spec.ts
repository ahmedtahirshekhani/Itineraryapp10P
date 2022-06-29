import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlltripsComponent } from './alltrips.component';

describe('AlltripsComponent', () => {
  let component: AlltripsComponent;
  let fixture: ComponentFixture<AlltripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlltripsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlltripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
