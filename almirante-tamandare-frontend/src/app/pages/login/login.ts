import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InputComponent } from '../../shared/components/input/input';
import { ButtonComponent } from '../../shared/components/button/button';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, InputComponent, ButtonComponent],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

}
