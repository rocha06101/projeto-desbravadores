import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth';
import { Component, inject } from '@angular/core';
import { InputComponent } from '../../shared/components/input/input';
import { ButtonComponent } from '../../shared/components/button/button';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})


export class Login {

 private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  loading = false;
  error = '';

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  submit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = '';

    const { email, password } = this.form.value;

    this.authService.login(email!, password!)
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/']);
        },
        error: () => {
          this.loading = false;
          this.error = 'Email ou senha inválidos';
        }
      });
      
    }


}
