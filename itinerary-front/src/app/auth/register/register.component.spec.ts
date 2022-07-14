import { RegisterComponent } from './register.component';
import { FormBuilder } from '@angular/forms';


describe('RegisterComponent', () => {
	let fixture: RegisterComponent;
	let authServiceMock: any;
	let formBuilderMock: FormBuilder;
	let routerMock: any;
	let messageServiceMock: any;

	beforeEach(() => {
		authServiceMock = {
			register: jest.fn()
		};
		formBuilderMock = new FormBuilder();
		routerMock = jest.fn();

		fixture = new RegisterComponent(
      		authServiceMock,
			formBuilderMock,
			routerMock,
      		messageServiceMock
		);
		fixture.ngOnInit();
	});

  describe('Test: ngOnInit', () => {
		it('should initialize registerForm', () => {
			const mockRegisterForm = {
			name: '',
			email: '',
			username: '',
			password: '',
			cpassword: ''
    };
    expect(fixture.registerForm.value).toEqual(mockRegisterForm);
		});
	});

	describe('Test: Register Form', () => {
		it('should invalidate registerForm', () => {
			fixture.registerForm.controls['name'].setValue('');
			fixture.registerForm.controls['email'].setValue('');
			fixture.registerForm.controls['username'].setValue('');
			fixture.registerForm.controls['password'].setValue('');
			fixture.registerForm.controls['cpassword'].setValue('');
			expect(fixture.registerForm.valid).toBeFalsy();
		});

		it('should validate registerForm', () => {
			fixture.registerForm.controls['name'].setValue('haadia');
			fixture.registerForm.controls['email'].setValue('haadia@gmail.com');
			fixture.registerForm.controls['username'].setValue('haadia123');
			fixture.registerForm.controls['password'].setValue('Lahore%123');
			fixture.registerForm.controls['cpassword'].setValue('Lahore%123');
			expect(fixture.registerForm.valid).toBeTruthy();
		});

		it('should invalidate registerForm', () => {
			fixture.registerForm.controls['name'].setValue('haadia');
			fixture.registerForm.controls['email'].setValue('haadia@gmail.com');
			fixture.registerForm.controls['username'].setValue('haadia123');
			fixture.registerForm.controls['password'].setValue('Lahore');
			fixture.registerForm.controls['cpassword'].setValue('Lahore');
			expect(fixture.registerForm.valid).toBeFalsy();
		});

		it('should invalidate registerForm', () => {
			fixture.registerForm.controls['name'].setValue('haadia');
			fixture.registerForm.controls['email'].setValue('haadia@gmail.com');
			fixture.registerForm.controls['username'].setValue('haadia123');
			fixture.registerForm.controls['password'].setValue('Lahore%123');
			fixture.registerForm.controls['cpassword'].setValue('Lahore');
			expect(fixture.registerForm.valid).toBeFalsy();
		});

	});

	describe('Test registerUser', () => {

		it('should register user', () => {
			const mockRegisterForm = {
				name: 'haadia',
				username: 'haadia',
				password: 'Lahore123',
				email: 'haadia@gmail.com'
		};
			const spyregisterUser = jest.spyOn(authServiceMock, 'register').mockReturnValue(true);
			expect(authServiceMock.register(mockRegisterForm)).toBe(true);
			expect(spyregisterUser).toHaveBeenCalledWith(mockRegisterForm);
		});

		it('should not register user', () => {
			const mockRegisterForm = {
				name: '',
				username: '',
				password: '',
				email: ''
		};
			expect(authServiceMock.register).not.toHaveBeenCalled();
		});
		
	});
});
