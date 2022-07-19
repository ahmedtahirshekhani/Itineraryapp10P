import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Routes } from '@angular/router';
import { BootComponent } from './boot.component';
import { Component } from '@angular/core';

// mocked Login component
@Component({
  template: `Login`
})
export class LoginComponent {
}

// routes supplied to RoutingTestingModule
const routes: Routes = [
  { path: 'login', component: LoginComponent }
];

describe('BootComponent', () => {
  let component: BootComponent;
  let fixture: ComponentFixture<BootComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BootComponent ],
      imports: [ RouterTestingModule.withRoutes(routes) ]
    })
    .compileComponents();

    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(BootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login after loading', fakeAsync(() => {
    // setup spies on router
    const navSpy = jest.spyOn(router, 'navigate');

    // invoke ngOnInit hook
    component.ngOnInit();

    // simulate the load time
    tick(5000);

    // check navigation on completion of loading
    expect(component.progressBarValue).toEqual(100);
    expect(navSpy).toHaveBeenCalledWith(['/login']);
  }))
});
