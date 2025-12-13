import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { disabled, Field, form, pattern, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthenticationService } from '../app/auth/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'boat-manager-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule, Field],
})
export class LoginComponent {
  private authService = inject(AuthenticationService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  loginModel = signal<{ user: string; password: string }>({ user: '', password: '' });
  hidePassword = signal(true);
  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.user);
    pattern(schemaPath.user, /^[A-z0-9]+$/);
  });

  togglePasswordVisibility(): void {
    this.hidePassword.update(value => !value);
  }

  login(event?: Event): void {
    event?.preventDefault();
    this.authService.login(this.loginForm.user().value(), this.loginForm.password().value())
      .subscribe((loginSucess) => {
        if (loginSucess) {
          this.router.navigateByUrl('/');
        } else {
          this.loginForm().reset();
          this.snackBar.open('Login failed. Retry please.', 'Close', { duration: 5 * 1000, verticalPosition: 'top'})
        }
      })
  }
}
