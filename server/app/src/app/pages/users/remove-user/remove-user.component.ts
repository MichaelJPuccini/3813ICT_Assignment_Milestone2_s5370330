import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UserService } from '../../../services/user.service';
import { ToastService } from '../../../services/toast.service';

import { TopMenuComponent } from '../../../components/top-menu/top-menu.component';

@Component({
  selector: 'app-remove-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TopMenuComponent],
  templateUrl: './remove-user.component.html',
  styleUrl: './remove-user.component.css'
})
export class RemoveUserComponent {

  user: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // Get the id from Parameters

    if (id) {
      this.load(id); // Load if id is valid
    } else {
      console.error('Product ID is null or invalid, cannot load product.');
    }
  }

  load(id: string) {
    this.userService.getById(id).subscribe((data) => {
      this.user = data;
    }, (error) => {
      console.error('Error loading product:', error); // Log any errors
    });
  }

  delete() {
      this.userService.delete(this.user._id).subscribe(() => {
        this.toastService.add('User Deleted', 3000, 'success');
        this.router.navigate(['/users/']);
    });
  }

  cancel(): void {
    this.toastService.add('Delete Cancelled', 3000, 'success');
    this.router.navigate(['/users']); // Navigate to the users list or another route on cancel
  }

}
