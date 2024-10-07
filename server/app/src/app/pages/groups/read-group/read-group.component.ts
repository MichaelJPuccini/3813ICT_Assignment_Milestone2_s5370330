import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';

import { GroupService } from '../../../services/group.service';
import { ToastService } from '../../../services/toast.service';

import { DisplayChannelsListComponent } from '../../../components/display-channels-list/display-channels-list.component';
import { TopMenuComponent } from '../../../components/top-menu/top-menu.component';

@Component({
  selector: 'app-read-group',
  standalone: true,
  imports: [CommonModule, RouterModule, DisplayChannelsListComponent, TopMenuComponent],
  templateUrl: './read-group.component.html',
  styleUrl: './read-group.component.css'
})
export class ReadGroupComponent implements OnInit {
  groupId: string = '';
  group: any = {};
  errorMessage: string = '';

  isAdmin: boolean = false;
  isSuperUser: boolean = false;

  constructor(private route: ActivatedRoute, private groupService: GroupService, private router: Router, private toastService: ToastService) {}

  async ngOnInit(): Promise<void> {
    this.groupId = this.route.snapshot.paramMap.get('id') || '';
    try {
      await this.getGroupDetails();
      // Check if the user is an admin or SuperAdmin
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.isAdmin = this.group.adminIds.includes(userId);
      }
      const userRole = localStorage.getItem('userrole');
      if (userRole === 'SuperUser') {
        this.isSuperUser = true;
        this.isAdmin = true; // SuperAdmin is always an admin
      }
      this.errorMessage = '';
    } catch (error) {
      console.error('Error fetching group', error);
      this.errorMessage = 'Error fetching group or Invalid group ID. Please try again later.';
    }
  }

  async getGroupDetails() {
    console.log("Processing get group details");
    const groupId = this.route.snapshot.paramMap.get('id')
    if (groupId) {
      try {
        const result = await this.groupService.getById(groupId).toPromise();
        // const result = await this.groupService.getById(groupId);
        this.group = result;
        console.log("Finished Processing get group details: ", this.group);
      } catch (error) {
        console.error('Error fetching group details', error);
        throw error;
      }
    } else {
      throw new Error('Invalid group ID.');
    }
  }


}
