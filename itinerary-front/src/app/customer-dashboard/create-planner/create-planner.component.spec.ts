import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlannerComponent } from './create-planner.component';

describe('CreatePlannerComponent', () => {
  let component: CreatePlannerComponent;
  let fixture: ComponentFixture<CreatePlannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePlannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
