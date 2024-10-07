import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.css'
})
export class TopMenuComponent implements OnInit {

  menuItems: any = [
    { name: 'Login', link: '/login' },
  ];

  userId: string = "";
  userName: string = "";
  userRole: string = "";

  isSuperUser: boolean = false;

  constructor(private router: Router, private toastService: ToastService) { }

  ngOnInit(): void {
    // Get the user details from the localStorage
    this.userId = localStorage.getItem('userId') || "";
    this.userName = localStorage.getItem('username') || "";
    this.userRole = localStorage.getItem('userrole') || "";
    this.isSuperUser = this.userRole == "SuperUser";
    
    // Check if we're logged in
    if (this.userId === "") {
      this.toastService.add('You need to login to access this page', 5000, 'error');
      this.router.navigate(['/login']); // If they're not logged in, Navigate to the /login page
    }

    if (this.isSuperUser) {
      // If they're a super user, show the SuperUser menu
      this.menuItems = [
        { name: 'Groups', link: '/groups' },
        { name: 'Add Group', link: '/groups/add' },
        { name: 'Manage Users', link: '/users' },
        { name: 'Add User', link: '/users/add' },
        { name: 'Profile', link: '/users/profile' },
        { name: 'Logout', link: '/logout' },
      ];
    } else {
      // If they're not a super user, show the normal menu
      this.menuItems = [
        { name: 'Groups', link: '/groups' },
        { name: 'Profile', link: '/users/profile' },
        { name: 'Logout', link: '/logout' },
    ];}
  
  }
}
