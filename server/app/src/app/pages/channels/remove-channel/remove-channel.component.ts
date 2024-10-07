import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GroupService } from '../../../services/group.service';

import { TopMenuComponent } from '../../../components/top-menu/top-menu.component';

@Component({
  selector: 'app-remove-channel',
  standalone: true,
  imports: [TopMenuComponent, CommonModule, FormsModule],
  templateUrl: './remove-channel.component.html',
  styleUrl: './remove-channel.component.css'
})
export class RemoveChannelComponent implements OnInit {

  channelName: string = '';
  groupId: string | null = null;
  errorMessage: string = '';

  constructor(
    private groupService: GroupService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.groupId = this.route.snapshot.paramMap.get('groupId');
  }

  confirmDelete(): void {
    if (this.groupId && this.channelName) {
      this.groupService.delete(this.channelName).subscribe({
        next: () => {
          this.router.navigate(['/groups', this.groupId]);
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
