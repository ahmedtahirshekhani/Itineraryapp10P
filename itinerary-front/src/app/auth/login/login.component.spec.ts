import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Component } from "@angular/core";
import { Routes } from "@angular/router";
import { AuthService } from '../shared/auth.service';
import { of, throwError } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

// mocked AuthService
class MockAuthService {
  login(username: string, password: string) {
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
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ 
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(routes),
        ToastModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService }
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router.initialNavigation();
  });

  afterEach(() => {
    // clear all mock calls and instance properties
    jest.clearAllMocks();
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
    expect(control!.value).toEqual("fahad.shaikh");
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
    expect(control!.value).toEqual("testString");
  });

  it('should navigate to registration', fakeAsync(() => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.goRegister();
    expect(navigateSpy).toHaveBeenCalledWith(['register']);
  }));

  it('should handle successful login attempt', () => {
    // set spies on service
    const serviceSpy = jest.spyOn(authService, 'login').mockReturnValue(
      of({
        message: "Login Successful"
      })
    );
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
    // check if navigation to dashboard occurs
    expect(navigateSpy).toHaveBeenCalledWith(['dashboard']);
  });

  it('should handle failed login attempt', () => {
    // create observable error response
    const error = throwError(() => new Error('Failed login attempt'));
    
    // set spies on service
    const serviceSpy = jest.spyOn(authService, 'login').mockImplementation(() => error);

    // set form values
    component.credentialsForm.setValue({
      "username": "test",
      "password": "test123"
    });

    // trigger form submission
    component.loginUser();

    // verify that service is called with set Form Data
    expect(serviceSpy).toHaveBeenCalledWith("test", "test123");
    
    // verify that the toast message is rendered
    fixture.detectChanges();
    const toastMessage =  fixture.debugElement.query(By.css('.p-toast-message'));
    expect(toastMessage.nativeElement).toBeTruthy();
    expect(toastMessage.nativeElement.classList).toContain("p-toast-message-error");
  });
});
