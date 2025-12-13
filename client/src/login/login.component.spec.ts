import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthenticationService } from '../app/auth/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { vi } from 'vitest';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let authService: AuthenticationService;
  let router: Router;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    const mockAuthService = {
      login: vi.fn().mockReturnValue(of(true))
    };
    const mockRouter = {
      navigateByUrl: vi.fn()
    };
    const mockSnackBar = {
      open: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthenticationService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  describe('Template Elements', () => {
    it('should contain the username input', () => {
      const usernameInput = fixture.nativeElement.querySelector('input#username_input');
      expect(usernameInput).toBeTruthy();
    });

    it('should contain the password input', () => {
      const passwordInput = fixture.nativeElement.querySelector('input#password_input');
      expect(passwordInput).toBeTruthy();
    });

    it('should have username input before password input', () => {
      const inputs = fixture.nativeElement.querySelectorAll('input');

      expect(inputs).toHaveLength(2);
      expect(inputs[0].id).toBe('username_input');
      expect(inputs[1].id).toBe('password_input');
    });

    it('should have password input of type password', () => {
      const passwordInput = fixture.nativeElement.querySelector('input#password_input') as HTMLInputElement;
      expect(passwordInput?.type).toBe('password');
    });
  });

  describe('Login Functionality', () => {
    it('should call authService.login with username and password', () => {
      component.loginModel.set({ user: 'testuser', password: 'testpassword' });
      component.login();

      expect(authService.login).toHaveBeenCalledWith('testuser', 'testpassword');
    });

    it('should navigate to home on successful login', () => {
      component.loginModel.set({ user: 'testuser', password: 'testpassword' });
      component.login();

      expect(router.navigateByUrl).toHaveBeenCalledWith('/');
    });

    it('should message on failed login', () => {
      vi.mocked(authService.login).mockReturnValueOnce(of(false));
      component.loginModel.set({ user: 'testuser', password: 'testpassword' });
      component.login();

      expect(snackBar.open).toHaveBeenCalledWith(
        'Login failed. Retry please.',
        'Close',
        { duration: 5000, verticalPosition: 'top' }
      );
    });
  });

  describe('Password Visibility', () => {
    it('should toggle password visibility', () => {
      expect(component.hidePassword()).toBe(true);

      component.togglePasswordVisibility();
      expect(component.hidePassword()).toBe(false);

      component.togglePasswordVisibility();
      expect(component.hidePassword()).toBe(true);
    });
  });
});


