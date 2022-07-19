import { RegisterComponent } from './register.component';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let fixture: ComponentFixture<RegisterComponent>;
  let component: RegisterComponent;
  let authServiceMock: AuthService;
  let routerMock: Router;
  let messageServiceMock: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, HttpClientModule],
    }).compileComponents();
    routerMock = TestBed.inject(Router);
    authServiceMock = TestBed.inject(AuthService);
    routerMock.initialNavigation();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Test: ngOnInit', () => {
    it('should initialize registerForm', () => {
      const mockRegisterForm = {
        name: '',
        email: '',
        username: '',
        password: '',
        cpassword: '',
      };
      expect(component.registerForm.value).toEqual(mockRegisterForm);
    });
  });

  describe('Test: Register Form', () => {
    it('should invalidate registerForm', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      component.registerForm.setValue({
        name: '',
        email: '',
        username: '',
        password: '',
        cpassword: '',
      });
      fixture.detectChanges();
      expect(component.registerForm.valid).toBeFalsy();
      expect(compiled.querySelector('button')?.disabled).toBeTruthy();
    });

    it('should validate registerForm', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      component.registerForm.setValue({
        name: 'haadia',
        email: 'haadia@gmail.com',
        username: 'haadia123',
        password: 'Lahore%123',
        cpassword: 'Lahore%123',
      });
      fixture.detectChanges();
      expect(component.registerForm.valid).toBeTruthy();
      expect(compiled.querySelector('button')?.disabled).toBeFalsy();
    });

    it('should invalidate registerForm', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      component.registerForm.setValue({
        name: 'haadia',
        email: 'haadia@gmail.com',
        username: 'haadia123',
        password: 'Lahore',
        cpassword: 'Lahore',
      });
      fixture.detectChanges();
      expect(component.registerForm.valid).toBeFalsy();
      expect(compiled.querySelector('button')?.disabled).toBeTruthy();
    });

    it('should invalidate registerForm', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      component.registerForm.setValue({
        name: 'haadia',
        email: 'haadia@gmail.com',
        username: 'haadia123',
        password: 'Lahore%123',
        cpassword: 'Lahore',
      });
      fixture.detectChanges();
      expect(component.registerForm.valid).toBeFalsy();
      expect(compiled.querySelector('button')?.disabled).toBeTruthy();
    });
  });

  describe('Test registerUser', () => {
    it('should register user', () => {
      component.registerForm.setValue({
        name: 'haadia',
        email: 'haadia@gmail.com',
        username: 'haadia123',
        password: 'Lahore%123',
        cpassword: 'Lahore%123',
      });
      const spyregisterUser = jest
        .spyOn(authServiceMock, 'registerUser')
        .mockReturnValue(
          of({
            success: true,
            message: 'Registeration Successful',
          })
        );
      const navigateSpy = jest.spyOn(routerMock, 'navigate');
      component.registerUser();
      expect(spyregisterUser).toHaveBeenCalledWith(
        'haadia',
        'haadia123',
        'Lahore%123',
        'haadia@gmail.com'
      );
      expect(navigateSpy).toHaveBeenCalledWith(['login']);
    });

    it('should not register user', () => {
      component.registerForm.setValue({
        name: 'haadia',
        email: 'haadia@gmail.com',
        username: 'haadia123',
        password: 'Lahore',
        cpassword: 'Lahore',
      });
      const error = throwError(() => new Error('Registration Failed'));
      const spyregisterUser = jest
        .spyOn(authServiceMock, 'registerUser')
        .mockImplementation(() => error);
      component.registerUser();
      expect(spyregisterUser).toHaveBeenCalledWith(
        'haadia',
        'haadia123',
        'Lahore',
        'haadia@gmail.com'
      );
    });
  });
});
