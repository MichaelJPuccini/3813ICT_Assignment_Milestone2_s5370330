import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { GroupService } from '../../../services/group.service';
import { UserService } from '../../../services/user.service';
import { ToastService } from '../../../services/toast.service';

import { TopMenuComponent } from '../../../components/top-menu/top-menu.component';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, RouterModule, TopMenuComponent],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent implements OnInit {
  errorMessage: string = '';
  isAdmin: boolean = false;
  groupId: string = '';
  groupName: string = '';
  group: any = {};

  allUsers: any[] = [];
  users: any[] = [];
  nonUsers: any[] = [];
  admins: any[] = [];
  nonAdmins: any[] = [];

  constructor(
    private route: ActivatedRoute, 
    private groupService: GroupService, 
    private userService: UserService, 
    private toastService: ToastService, 
    // private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      // Get the group ID from the URL
      // this.groupId = this.route.snapshot.paramMap.get('id') || '';
      await this.getGroupDetails();
      await this.getAllUsers();
      await this.processUsers();

      // Check if the user is an admin
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.isAdmin = this.group.adminIds.includes(userId);
      } else {
        this.errorMessage = 'You must be an admin to manage users.';
      }
    } catch (error) {
      // console.error('Error initializing component', error);
      this.errorMessage = 'Error initializing component. Please try again later.';
    } 
  }
  
  async getGroupDetails() {
    // console.log("Processing get group details");
    const groupId = this.route.snapshot.paramMap.get('id')
    if (groupId) {
      try {
        const result = await this.groupService.getById(groupId).toPromise();
        // const result = await this.groupService.getById(groupId);
        this.group = result;
        this.groupName = this.group.name;
        // console.log("Finished Processing get group details: ", this.group);
      } catch (error) {
        console.error('Error fetching group details', error);
        throw error;
      }
    } else {
      throw new Error('Invalid group ID.');
    }
  }

  async getAllUsers() {
    // console.log("Processing get all users");
    try {
      // this.allUsers = await this.userService.getAll().toPromise();
      const users = await this.userService.getAll().toPromise();
      this.allUsers = users || []; // Handle undefined case by assigning an empty array
  
      // console.log("Finished processing All Users: ", this.allUsers);
    } catch (error) {
      console.error('Error fetching users', error);
      throw error;
    }
  }

  // process the users into group users and non-group users
  async processUsers() {
    // console.log("Processing users");

    this.users = this.allUsers
      .filter(user => this.group.userIds.includes(user._id))
      .map(user => ({ id: user._id, name: user.name }));

    this.nonUsers = this.allUsers
      .filter(user => !this.group.userIds.includes(user._id))
      .map(user => ({ id: user._id, name: user.name }));

    this.admins = this.allUsers
      .filter(user => this.group.adminIds.includes(user._id))
      .map(user => ({ id: user._id, name: user.name }));

    this.nonAdmins = this.allUsers
      .filter(user => !this.group.adminIds.includes(user._id))
      .map(user => ({ id: user._id, name: user.name }));
  }

  async addUser(groupId: string, userId: string) {
    // console.log("Calling Service: Adding user: ", userId);
    try {
      await this.groupService.addUser(this.group._id, userId).toPromise();
      // console.log("Added user to group: ", userId);
      await this.getGroupDetails();
      await this.processUsers();
      this.toastService.add('User Added', 3000, 'success');
    } catch (error) {
      console.error("Error adding user to group: ", error);
    }
  }

  async removeUser(groupId: string, userId: string) {
    // console.log("Removing user: ", userId);
    try {
      await this.groupService.removeUser(this.group._id, userId).toPromise();
      // console.log("Added user to group: ", userId);
      await this.getGroupDetails();
      await this.processUsers();
      this.toastService.add('User Removed', 3000, 'success');
    } catch (error) {
      console.error("Error adding user to group: ", error);
    }
  }

  async addAdmin(groupId: string, userId: string) {
    // console.log("Adding admin: ", userId);
    try {
      await this.groupService.addAdmin(this.group._id, userId).toPromise();
      // console.log("Added user to group: ", userId);
      await this.getGroupDetails();
      await this.processUsers();
      this.toastService.add('Admin Added', 3000, 'success');
    } catch (error) {
      console.error("Error adding user to group: ", error);
    }
  }

  async removeAdmin(groupId: string, userId: string) {
    // console.log("Removing admin: ", userId);
    try {
      await this.groupService.removeAdmin(this.group._id, userId).toPromise();
      // console.log("Added user to group: ", userId);
      await this.getGroupDetails();
      await this.processUsers();
      this.toastService.add('Admin Removed', 3000, 'success');
    } catch (error) {
      console.error("Error adding user to group: ", error);
    }
  }

}
