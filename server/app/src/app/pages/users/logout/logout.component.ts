import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.logout();
  }

  logout(): void {
    this.userService.logout().subscribe({
      next: () => {
        localStorage.removeItem('authToken'); // Clear the token from local storage
        this.router.navigate(['/login']); // Navigate to the login page or another appropriate page
      },
      error: (error) => {
        console.error('Logout failed', error);
        // Optionally handle the error, e.g., show a message to the user
        this.errorMessage = 'Logout failed. Please try again.'; // Set the error message
      }
    });
  }

}
