import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {

  user = {
    name: '',
    image: '',
    password: '',
    email: '',
    role: 'User'   // Default role
  };
  selectedFile: File | null = null;

  errorText = '';

  constructor(private userService: UserService, private router: Router) {}

  add() {
    this.userService.add(this.user)
      .subscribe(() => {
        this.router.navigate(['/users']);
      }, (error) => {
        if (error.status === 413) {
          this.errorText = 'Error: Image size was too large. Please upload a smaller image.';
          return; // Stay on page
        } else {
          console.error('It probably worked, but reported this error. Chrome does this double submitting thing:', error);
          this.router.navigate(['/users']);
        }
      });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // If a file has been chosen
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.image = e.target.result;  // Store the Base64-encoded string in user.image
      };
      reader.readAsDataURL(file);
    } else {
      // If no file was chosen, reset the image
      this.selectedFile = null;
      this.user.image = '';
    }
  }

}
