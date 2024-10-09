import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TopMenuComponent } from '../../../components/top-menu/top-menu.component';

import { UserService } from '../../../services/user.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TopMenuComponent, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: any;
  userId: string = '';
  imagecontent: string = "";
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    // Get the userId from the localStorage
    this.userId = localStorage.getItem('userId') || '';


    if (this.userId) {
      this.load(this.userId);
    } else {
      console.log('Product ID is null or invalid, cannot load product.');
    }
  }

  load(id: string) {
    this.userService.getById(id).subscribe((data) => {
      this.user = data;
    }, (error) => {
      console.log('Error loading user:', error); // Log any errors
    });
  }

  delete() {
    this.userService.delete(this.user._id).subscribe(() => {
      this.toastService.add('Your Account has been Deleted', 3000, 'success');
      this.router.navigate(['/logout/']);
    });
  }

  updateImage() {
    // If there's an imagecontent, update the user's image
    if (this.imagecontent) {
      this.user.image = this.imagecontent;
    }

    // Use the user service to update the image
    this.userService.update(this.userId, this.user).subscribe((data) => {
      this.toastService.add('Your Image has been updated', 3000, 'success');
    }, (error) => {
      console.error('Error updating image:', error); // Log any errors
      this.toastService.add('Error updating image', 3000, 'error');
    });
  }

  // Called when the user selects a file
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // If a file has been chosen
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagecontent = e.target.result;  // Store the Base64-encoded string in user.image
      };
      reader.readAsDataURL(file);
    } else {
      // If no file was chosen, reset the image
      this.selectedFile = null;
      this.imagecontent = '';
    }
  }

    
}
