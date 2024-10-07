import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { GroupService } from '../../../services/group.service';
import { UserService } from '../../../services/user.service';
import { ChannelService } from '../../../services/channel.service';
import { ToastService } from '../../../services/toast.service';

import { TopMenuComponent } from '../../../components/top-menu/top-menu.component';

@Component({
  selector: 'app-manage-channel-users',
  standalone: true,
  imports: [CommonModule, TopMenuComponent, RouterModule],
  templateUrl: './manage-channel-users.component.html',
  styleUrl: './manage-channel-users.component.css'
})
export class ManageChannelUsersComponent implements OnInit {
  errorMessage: string = '';
  isAdmin: boolean = false;

  groupId: string = '';
  groupName: string = '';
  group: any = {};

  channel: any = {};
  channelName: string = '';
  channelId: string = '';

  allUsers: any[] = [];
  users: any[] = [];
  nonUsers: any[] = [];
  admins: any[] = [];
  nonAdmins: any[] = [];

  constructor(private route: ActivatedRoute, 
    private groupService: GroupService, 
    private userService: UserService, 
    private channelService: ChannelService, 
    private toastService: ToastService,
    private router: Router) {}

  async ngOnInit(): Promise<void> {
    try {
      await this.getChannelDetails();
      await this.getAllUsers();
      await this.processUsers();

      // Check if the user is an admin
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.isAdmin = this.channel.adminIds.includes(userId);
        this.errorMessage = '';
      } else {
        this.errorMessage = 'You must be an admin to manage users.';
        this.toastService.add('You must be an admin to manage users', 5000, 'error');
      }
    } catch (error) {
      console.error('Error initializing component', error);
      this.errorMessage = 'Error initializing component. Please try again later.';
    } 

  }
  
  async getChannelDetails() {
    // console.log("Processing get group details");
    const channelId = this.route.snapshot.paramMap.get('id')
    if (channelId) {
      try {
        const result = await this.channelService.getById(channelId).toPromise();
        // const result = await this.groupService.getById(groupId);
        this.channel = result;
        this.channelName = this.channel.name;
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
      .filter(user => this.channel.userIds.includes(user._id))
      .map(user => ({ id: user._id, name: user.name }));

    this.nonUsers = this.allUsers
      .filter(user => !this.channel.userIds.includes(user._id))
      .map(user => ({ id: user._id, name: user.name }));

    this.admins = this.allUsers
      .filter(user => this.channel.adminIds.includes(user._id))
      .map(user => ({ id: user._id, name: user.name }));

    this.nonAdmins = this.allUsers
      .filter(user => !this.channel.adminIds.includes(user._id))
      .map(user => ({ id: user._id, name: user.name }));
  }

  async addUser(channelId: string, userId: string) {
    // console.log("Calling Service: Adding user: ", userId);
    try {
      await this.channelService.addUser(this.channel._id, userId).toPromise();
      // console.log("Added user to group: ", userId);
      await this.getChannelDetails();
      await this.processUsers();
      this.toastService.add('User Added', 3000, 'success');
    } catch (error) {
      console.error("Error adding user to group: ", error);
    }
  }

  async removeUser(channelId: string, userId: string) {
    // console.log("Removing user: ", userId);
    try {
      await this.channelService.removeUser(this.channel._id, userId).toPromise();
      // console.log("Added user to group: ", userId);
      await this.getChannelDetails();
      await this.processUsers();
      this.toastService.add('User Removed', 3000, 'success');
    } catch (error) {
      console.error("Error adding user to group: ", error);
    }
  }

  async addAdmin(channelId: string, userId: string) {
    // console.log("Adding admin: ", userId);
    try {
      await this.channelService.addAdmin(this.channel._id, userId).toPromise();
      // console.log("Added user to group: ", userId);
      await this.getChannelDetails();
      await this.processUsers();
      this.toastService.add('Admin Added', 3000, 'success');
    } catch (error) {
      console.error("Error adding user to group: ", error);
    }
  }

  async removeAdmin(channelId: string, userId: string) {
    // console.log("Removing admin: ", userId);
    try {
      await this.channelService.removeAdmin(this.channel._id, userId).toPromise();
      // console.log("Added user to group: ", userId);
      await this.getChannelDetails();
      await this.processUsers();
      this.toastService.add('Admin Removed', 3000, 'success');
    } catch (error) {
      console.error("Error adding user to group: ", error);
    }
  }

}
