import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TopMenuComponent } from '../../../components/top-menu/top-menu.component';

import { UserService } from '../../../services/user.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TopMenuComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // Get the id from Parameters

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      // console.log(id); // Use the id as needed
    });

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
      console.error('Error loading user:', error); // Log any errors
    });
  }

  delete() {
    this.userService.delete(this.user._id).subscribe(() => {
      this.toastService.add('Your Account has been Deleted', 3000, 'success');
      this.router.navigate(['/logout/']);
    });
  }

}
