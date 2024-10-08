import { Component, Input, OnInit } from '@angular/core';
import { ChannelService } from '../../services/channel.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display-channels-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './display-channels-list.component.html',
  styleUrl: './display-channels-list.component.css'
})
export class DisplayChannelsListComponent {
  @Input() groupId: string = '';

  channels: any[] = [];
  errorMessage: string = '';

  constructor(private channelService: ChannelService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    console.log("Group ID: ", this.groupId + " User ID: ", userId);
    if (!userId) {
      this.errorMessage = 'Please login.';
      return;
    }
    // this.channelService.getByGroupId(this.groupId).subscribe({
    // this.channelService.getAll().subscribe({
    this.channelService.getMyChannels(this.groupId, userId).subscribe({
      next: (channels) => {
        console.log("Channels returned: ", channels);
        this.channels = channels;
      },
      error: (error) => {
        console.error('Error fetching channels', error);
        this.errorMessage = 'Error fetching channels. Please try again later.';
      }
    });
  }

}
