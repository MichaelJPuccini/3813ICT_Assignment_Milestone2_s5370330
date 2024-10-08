import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

import { ChannelService } from '../../../services/channel.service';
import { ToastService } from '../../../services/toast.service';

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
  channelId: string | null = null;
  errorMessage: string = '';

  constructor(
    private channelService: ChannelService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.channelId = this.route.snapshot.paramMap.get('id');
  }

  confirmDelete(): void {
    if (this.channelId) {
      this.channelService.delete(this.channelId).subscribe({
        next: () => {
          this.toastService.add('Channel Deleted', 3000, 'success');
          // this.location.back(); // Navigate to the previous page
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
