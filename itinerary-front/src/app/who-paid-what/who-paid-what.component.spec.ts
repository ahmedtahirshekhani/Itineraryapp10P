import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoPaidWhatComponent } from './who-paid-what.component';

describe('WhoPaidWhatComponent', () => {
  let component: WhoPaidWhatComponent;
  let fixture: ComponentFixture<WhoPaidWhatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhoPaidWhatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhoPaidWhatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
