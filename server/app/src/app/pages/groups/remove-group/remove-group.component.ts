import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GroupService } from '../../../services/group.service';

import { TopMenuComponent } from '../../../components/top-menu/top-menu.component';

@Component({
  selector: 'app-remove-group',
  standalone: true,
  imports: [TopMenuComponent, CommonModule, FormsModule],
  templateUrl: './remove-group.component.html',
  styleUrl: './remove-group.component.css'
})
export class RemoveGroupComponent implements OnInit {

  channelName: string = '';
  groupId: string | null = null;
  errorMessage: string = '';

  constructor(
    private groupService: GroupService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.groupId = this.route.snapshot.paramMap.get('id');
  }

  confirmDelete(): void {
    console.log("Delete confirmed: ", this.groupId);
    if (this.groupId) {
      this.groupService.delete(this.groupId).subscribe({
        next: () => {
          this.router.navigate(['/groups']);
        },
        error: (error) => {
          console.error('Error deleting channel', error);
          this.errorMessage = 'Error deleting channel. Please try again later.';
        }
      });
    } else {
      this.errorMessage = 'Please provide a valid channel name.';
    }
  }

}
