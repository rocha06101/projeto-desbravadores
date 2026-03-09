import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InputComponent } from '../../shared/components/input/input';
import { ButtonComponent } from '../../shared/components/button/button';
import { SelectComponent } from '../../shared/components/select/select';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, ButtonComponent, SelectComponent],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = false;
  error = '';

  form = this.fb.nonNullable.group({
    role: ['', Validators.required],
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/),
      ],
    ],
    confirmPassword: ['', Validators.required],
  });

  get passwordMismatch() {
    const { password, confirmPassword } = this.form.getRawValue();
    return !!confirmPassword && password !== confirmPassword;
  }

  submit() {
    if (this.form.invalid || this.passwordMismatch) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue();

    this.loading = true;
    this.error = '';

    this.authService.register(email, password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: () => {
        this.loading = false;
        this.error = 'Não foi possível concluir o cadastro.';
      },
    });
  }
}
