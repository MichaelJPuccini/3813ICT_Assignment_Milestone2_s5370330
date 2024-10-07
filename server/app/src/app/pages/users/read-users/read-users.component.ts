import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UserService } from '../../../services/user.service';

import { TopMenuComponent } from '../../../components/top-menu/top-menu.component';

@Component({
  selector: 'app-read-users',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TopMenuComponent],
  templateUrl: './read-users.component.html',
  styleUrl: './read-users.component.css'
})
export class ReadUsersComponent {

  users: any[] = []; // Initialize an array to hold users

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.load(); // get data initialization
  }

  load() {
    this.userService.getAll().subscribe((data) => { // Retrieve all users
      this.users = data; // Set the user data
    });
  }

  edit(_id: string) { // Expecting _id to be a string
    this.router.navigate(['/users/update', _id]); // Navigate to Update Product with _id
  }

  delete(_id: string) { // Expecting _id to be a string
    this.router.navigate(['/users/remove', _id]); // Navigate to Remove Product with _id
  }
}
