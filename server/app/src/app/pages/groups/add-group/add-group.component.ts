import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { GroupService } from '../../../services/group.service';
import { ToastService } from '../../../services/toast.service';

import { TopMenuComponent } from '../../../components/top-menu/top-menu.component';

@Component({
  selector: 'app-add-group',
  standalone: true,
  imports: [FormsModule, CommonModule, TopMenuComponent],
  templateUrl: './add-group.component.html',
  styleUrl: './add-group.component.css'
})
export class AddGroupComponent {
  groupName: string = '';
  errorMessage: string = '';

  constructor(private groupService: GroupService, private toastService: ToastService, private router: Router) {}

  // When the user clicks the 'Add Group' button
  addGroup(): void {
    if (this.groupName.trim()) {

      const userId = localStorage.getItem('userId') || "";
      const newGroup = {
        name: this.groupName,
        creatorId: userId,
        channelIds: [],
        adminIds: [userId],
        userIds: [userId]
      };

      this.groupService.add(newGroup).subscribe({
        next: () => {
          this.toastService.add('New Group Created', 3000, 'success');
          this.router.navigate(['/groups']); // Navigate to the groups list page on successful addition
        },
        error: (error) => {
          console.error('Error adding group', error);
          this.toastService.add('Error Adding group' + error, 5000, 'error');
          this.errorMessage = 'Error adding group. Please try again later.';
        }
      });
    } else {
      this.toastService.add('A group name is required', 5000, 'error');
      this.errorMessage = 'Group name is required.';
    }
  }
}
