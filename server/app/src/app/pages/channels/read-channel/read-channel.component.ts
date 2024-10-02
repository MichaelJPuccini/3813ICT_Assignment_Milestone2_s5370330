import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ChannelService } from '../../../services/channel.service';

@Component({
  selector: 'app-read-channel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './read-channel.component.html',
  styleUrl: './read-channel.component.css'
})
export class ReadChannelComponent implements OnInit {
  channel: any | undefined;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private channelService: ChannelService
  ) {}

  ngOnInit(): void {
    const channelId = this.route.snapshot.paramMap.get('id');
    if (channelId) {
      this.channelService.getById(channelId).subscribe({
        next: (channel) => {
          this.channel = channel;
        },
        error: (error) => {
          console.error('Error fetching channel', error);
          this.errorMessage = 'Error fetching channel. Please try again later.';
        }
      });
    }
  }

}
