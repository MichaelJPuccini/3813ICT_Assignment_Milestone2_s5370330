import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UserService } from '../../../services/user.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private userService: UserService, 
    private router: Router, 
    private toastService: ToastService,
  ) {}

  login(): void {
    this.userService.login(this.username, this.password)
      .subscribe({
        next: (response) => {
          this.toastService.add('Login Successful', 3000, 'success');

          this.router.navigate(['/groups']); // Navigate to a different page on successful login
        },
        error: (error) => {
          this.toastService.add('Invalid Username or password', 5000, 'error');
          this.errorMessage = 'Invalid username or password';
        }
      });
  }

}
