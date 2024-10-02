import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { GroupService } from '../../services/group.service';


@Component({
  selector: 'app-display-groups',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './display-groups.component.html',
  styleUrl: './display-groups.component.css'
})
export class DisplayGroupsComponent implements OnInit {
  groups: any[] = [];
  errorMessage: string = '';

  constructor(private groupService: GroupService) {}

  ngOnInit(): void {
    const id = localStorage.getItem('userId');
    if (!id) {
      this.errorMessage = 'Please login.';
      return;
    }
    console.log("Fetching groups for user:", id);
    this.groupService.getAll(id).subscribe({
      next: (data) => {
        this.groups = data;
        // console.log('Groups:', this.groups);
      },
      error: (error) => {
        console.error('Error fetching groups', error);
        this.errorMessage = 'Error fetching groups. Please try again later.';
      }
    });
  }
}
