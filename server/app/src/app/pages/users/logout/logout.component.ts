import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UserService } from '../../../services/user.service';
import { ToastService } from '../../../services/toast.service';

import { TopMenuComponent } from '../../../components/top-menu/top-menu.component';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [FormsModule, CommonModule, TopMenuComponent],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  errorMessage: string = '';

  constructor(private userService: UserService, private toastService: ToastService, private router: Router) {}

  ngOnInit(): void {
    this.logout();
  }

  logout(): void {
    localStorage.removeItem('userId'); // Clear the user ID from local storage
    localStorage.removeItem('username'); // Clear the username from local storage
    localStorage.removeItem('userrole'); // Clear the username from local storage

    this.toastService.add('Logout Successful', 5000, 'success');
    this.router.navigate(['/login']); // Navigate to the login page or another appropriate page
  }

}
