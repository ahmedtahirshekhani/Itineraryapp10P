import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Component } from "@angular/core";
import { Routes } from "@angular/router";
import { AuthService } from '../shared/auth.service';
import { of } from 'rxjs';

// mocked AuthService
class MockAuthService {
  login(username: string, password: string) {
    return of({
      success: true,
      message: "Successful Login",
    });
  }

  setLoggedIn(status: boolean) {
  }
}

// mocked RegisterComponent
@Component({
  template: `Register`
})
export class RegisterComponent {
}

// mocked CustomerDashboardComponent
@Component({
  template: `Dashboard`
})
export class CustomerDashboardComponent {
}

// routes supplied to RoutingTestingModule
const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: CustomerDashboardComponent },
];

describe('LoginComponent', () => {
  let component: LoginComponent;
  let router: Router;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ ReactiveFormsModule,  RouterTestingModule.withRoutes(routes) ],
      providers: [{
        provide: AuthService, useClass: MockAuthService
      }]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    service = TestBed.inject(AuthService);

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router.initialNavigation();
  });

  afterEach(() => {
    // restore all mocks to initial states
    jest.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid if form value is invalid', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    component.credentialsForm.setValue({
      "username": "",
      "password": ""
    });
    fixture.detectChanges();
    expect(component.credentialsForm.valid).toBeFalsy();
    expect(compiled.querySelector('button')?.disabled).toBeTruthy();
  });

  it('should be valid if form value is valid', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    component.credentialsForm.setValue({
      "username": "fahad.shaikh",
      "password": "customP@ssword"
    });
    fixture.detectChanges();
    expect(component.credentialsForm.valid).toBeTruthy();
    expect(compiled.querySelector('button')?.disabled).toBeFalsy();
  });

  it('should return username form control', () => {
    component.credentialsForm.setValue({
      "username": "fahad.shaikh",
      "password": ""
    });

    const spy = jest.spyOn(component, 'username', 'get');
    const control = component.username;
    expect(spy).toHaveBeenCalled();
    expect(control).toBeInstanceOf(AbstractControl);
    expect(control.value).toEqual("fahad.shaikh");
  });

  it('should return password form control', () => {
    component.credentialsForm.setValue({
      "username": "",
      "password": "testString"
    });

    const spy = jest.spyOn(component, 'password', 'get');
    const control = component.password;
    expect(spy).toHaveBeenCalled();
    expect(control).toBeInstanceOf(AbstractControl);
    expect(control.value).toEqual("testString");
  });

  it('should clear form values', () => {
    component.credentialsForm.setValue({
      "username": "fahad.shaikh",
      "password": "testString"
    });
    component.clearInput();
    expect(component.password.value).toEqual(null);
    expect(component.username.value).toEqual(null);
  });

  it('should navigate to registration', fakeAsync(() => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.goRegister();
    expect(navigateSpy).toHaveBeenCalledWith(['register']);
  }));

  it('should handle successful login attempt', () => {
    // set spies on service
    const serviceSpy = jest.spyOn(service, 'login');
    const loggedInStausSpy = jest.spyOn(service, 'setLoggedIn');
    const navigateSpy = jest.spyOn(router, 'navigate');

    // set form values
    component.credentialsForm.setValue({
      "username": "fahad.shaikh",
      "password": "L@hore123"
    });
    
    // trigger form submission
    component.loginUser();
    // verify that mockservice is called with formData
    expect(serviceSpy).toHaveBeenCalledWith("fahad.shaikh", "L@hore123");
    // check if loggedInStatus is updated
    expect(loggedInStausSpy).toHaveBeenCalledWith(true);
    // check if navigation to dashboard occurs
    expect(navigateSpy).toHaveBeenCalledWith(['dashboard']);
    // check if fields are reset
    fixture.detectChanges();
    expect(component.password.value).toEqual(null);
    expect(component.username.value).toEqual(null);
  });
});
