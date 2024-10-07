import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChannelAddComponent } from '../../../components/channel-add/channel-add.component'; // Adjust the import path as needed

import { TopMenuComponent } from '../../../components/top-menu/top-menu.component';

@Component({
  selector: 'app-add-channel',
  standalone: true,
  imports: [CommonModule, FormsModule, ChannelAddComponent, TopMenuComponent],
  templateUrl: './add-channel.component.html',
  styleUrl: './add-channel.component.css'
})

export class AddChannelComponent implements OnInit {
  @Input() groupId: string = '';

  constructor(
    public route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.groupId = this.route.snapshot.paramMap.get('groupId') || '';
    // Set the creatorId to the current user's ID
  }

}
