import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChannelService } from '../../../services/channel.service';
import { SocketService } from '../../../services/socket.service';

@Component({
  selector: 'app-read-channel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './read-channel.component.html',
  styleUrl: './read-channel.component.css'
})
export class ReadChannelComponent implements OnInit, OnDestroy {
  private socket: any;
  messagecontent: string = "";
  messages: string[] = [];
  ioConnection:any;

  channel: any | undefined;
  channelId: string = "";
  errorMessage: string = '';

  userName: string = 'DefaultUserName';
  userCount: string = '0';
  channelNotice: string = '';

  rooms=[];
  isInRoom=false;

  constructor(
    private route: ActivatedRoute,
    private channelService: ChannelService,
    private socketService: SocketService
  ) {}

  async ngOnInit(): Promise<void> {
    const channelId = this.route.snapshot.paramMap.get('id');
    this.channelId = channelId || '';
    console.log('Channel ID:', channelId);
    if (channelId) {
      this.channelService.getById(channelId).subscribe({
        next: (channel) => {
          this.channel = channel;
          console.log('Channel fetched', this.channel._id);
        },
        error: (error) => {
          console.error('Error fetching channel', error);
          this.errorMessage = 'Error fetching channel. Please try again later.';
        }
      });
    }

    // Make the socket connection
    this.initIoConnection();
  }
  
  ngOnDestroy(): void {
    this.onLeftPage();
  }
  
  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: Event): void {
    this.onLeftPage();
  }
  
  
  onLeftPage(): void {
    // Clean up the socket connection
    this.socketService.send(this.userName + " has left the channel");
    // this.socketService.disconnect();
  }
  
  // Make the socket connection
  private async initIoConnection(){
    await this.socketService.initSocket();
    this.ioConnection = await this.socketService.onMessage()
    .subscribe((message:string) => {
      // add new message to the messages array
      this.messages.push(message);
    });

    this.ioConnection = await this.socketService.onUserCount()
    .subscribe((message:string) => {
      this.userCount = message;
    });

    this.ioConnection = await this.socketService.onChannelNotice()
    .subscribe((message:string) => {
      this.channelNotice = message;
    });

    console.log("Joining channel: ", this.channelId);
    await this.socketService.joinChannel(this.channelId); // Join the channel on the chat server
    await this.socketService.send(this.userName + " has joined the channel");
  }

  chat() {
    if(this.messagecontent){
      // check there is a message to send
      this.socketService.send(this.messagecontent);
      this.messagecontent = '';
    }else{
      console.log("no message");
    }
  }

}
