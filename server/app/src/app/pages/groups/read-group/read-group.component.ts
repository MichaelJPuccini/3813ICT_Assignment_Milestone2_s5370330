import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';

import { GroupService } from '../../../services/group.service';

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
  group: any;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private groupService: GroupService, private router: Router) {}

  ngOnInit(): void {
    this.groupId = this.route.snapshot.paramMap.get('id') || '';
    if (this.groupId) {
      this.groupService.getById(this.groupId).subscribe({
        next: (data) => {
          this.group = data;
        },
        error: (error) => {
          console.error('Error fetching group', error);
          this.errorMessage = 'Error fetching group. Please try again later.';
        }
      });
    } else {
      this.errorMessage = 'Invalid group ID.';
    }
  }

}
