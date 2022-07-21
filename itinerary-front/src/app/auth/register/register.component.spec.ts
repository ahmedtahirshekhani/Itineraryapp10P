import { RegisterComponent } from './register.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let fixture: ComponentFixture<RegisterComponent>;
  let component: RegisterComponent;
  let authServiceMock: AuthService;
  let routerMock: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [RouterTestingModule,
        ReactiveFormsModule,
        HttpClientModule,
        ToastModule,
        NoopAnimationsModule
      ],
      providers: [AuthService]
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
    // jest.restoreAllMocks();
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
    it('should invalidate registerForm - empty fields', () => {
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

    it('should invalidate registerForm - password criteria not satisfied', () => {
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

    it("should invalidate registerForm - passwords don't match", () => {
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
      // setup valid form values
      component.registerForm.setValue({
        name: 'haadia',
        email: 'haadia@gmail.com',
        username: 'haadia123',
        password: 'Lahore%123',
        cpassword: 'Lahore%123',
      });

      // setup spies and mock response on service methods
      const spyRegisterUser = jest
        .spyOn(authServiceMock, 'registerUser')
        .mockReturnValue(
          of({
            success: true
          })
        );
      const navigateSpy = jest.spyOn(routerMock, 'navigate');
     
      // trigger register function
      component.register();

      // verify results
      expect(spyRegisterUser).toHaveBeenCalledWith(
        'haadia',
        'haadia123',
        'Lahore%123',
        'haadia@gmail.com'
      );
      expect(navigateSpy).toHaveBeenCalledWith(['login']);
    });

    it('should not register user', () => {
      // create mock error response
      const error = throwError(() => new Error('Registration Failed'));

      // set up valid form values
      component.registerForm.setValue({
        name: 'haadia',
        email: 'haadia@gmail.com',
        username: 'haadia123',
        password: 'Lahore%123',
        cpassword: 'Lahore%123',
      });
      
      // setup spies and mock responses on service methods
      const spyregisterUser = jest
        .spyOn(authServiceMock, 'registerUser')
        .mockImplementation(() => error);

      // trigger registration
      component.register();

      // verify results
      expect(spyregisterUser).toHaveBeenCalledWith(
        'haadia',
        'haadia123',
        'Lahore%123',
        'haadia@gmail.com'
      );

      // verify that the toast message is rendered
      fixture.detectChanges();
      const toastMessage =  fixture.debugElement.query(By.css('.p-toast-message'));
      expect(toastMessage.nativeElement).toBeTruthy();
      expect(toastMessage.nativeElement.classList).toContain("p-toast-message-error");
    });
  });
});
