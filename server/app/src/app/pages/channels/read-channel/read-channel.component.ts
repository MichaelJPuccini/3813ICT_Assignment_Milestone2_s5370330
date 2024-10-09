import { Component, HostListener, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

import { ChannelService } from '../../../services/channel.service';
import { SocketService } from '../../../services/socket.service';
import { ToastService } from '../../../services/toast.service';
import { UserService } from '../../../services/user.service';

import { TopMenuComponent } from '../../../components/top-menu/top-menu.component';

interface Message {
  id: string;
  authorName: string;
  authorImage: string;
  message: string;
  image: string;
}

@Component({
  selector: 'app-read-channel',
  standalone: true,
  imports: [CommonModule, FormsModule, TopMenuComponent, RouterModule],
  templateUrl: './read-channel.component.html',
  styleUrl: './read-channel.component.css'
})
export class ReadChannelComponent implements OnInit {
  private socket: any;
  messagecontent: string = "";
  messages: Message[] = [];
  ioConnection:any;
  imagecontent: string = "";
  selectedFile: File | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef;

  channel: any | undefined;
  channelId: string = "";
  errorMessage: string = '';

  userName: string = 'DefaultUserName';
  userId: string = '';
  userCount: string = '0';
  channelNotice: string = '';

  rooms=[];
  isInRoom=false;

  users: any = [];

  isAdmin: boolean = false;
  isOwner: boolean = false;
  isSuperUser: boolean = false;

  isVideoOpen: boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private channelService: ChannelService,
    private toastService: ToastService,
    private userService: UserService,
    private location: Location,
    private socketService: SocketService
  ) {
  }

  // Called when the user opens the page
  async enteringRoom() {
    await this.getChannelDetails();
    console.log("Joining channel: ", this.channelId);

    const users = await this.userService.getAll().toPromise();
    this.users = users || [];
    console.log("Users: ", users);

    await this.setupUserPermissions();

    // Make the socket connection
    this.initIoConnection();
  }

  // Called when the user clicks on leave channel
  async leavingRoom() {
    // console.log("Leaving channel: ", this.channelId);
    if (this.ioConnection) {
      // Send a leave channel message
      this.socketService.leaveChannel(this.channelId, this.userName);
    }

    // Unsubscribe from the socket connection
    if (this.ioConnection) {
      this.ioConnection.unsubscribe();
      this.ioConnection = null;
    }

    // Route user to the previous page
    console.log("Going back to previous page");
    this.location.back();
  }
  
  // Sets up the user permissions
  async setupUserPermissions() {
    // Check if the user is an admin or SuperAdmin
    const userId = localStorage.getItem('userId');
    this.userId = userId || '';
    this.userName = localStorage.getItem('username') || 'DefaultUserName';
    if (userId) {
      this.isAdmin = this.channel.adminIds.includes(userId);
      if (userId === this.channel.creatorId) {
        this.isOwner = true;
      }
    }
    const userRole = localStorage.getItem('userrole');
    if (userRole === 'SuperUser') {
      this.isSuperUser = true;
      this.isOwner = true; // SuperUser can do what an owner can do
      this.isAdmin = true; // SuperUser can do what an admin can do
    }
  }

  // called when the user opens the page
  async ngOnInit(): Promise<void> {
    console.log("ngOnInit triggered");

    await this.enteringRoom();
  }
  
  // Loads the channel details
  async getChannelDetails() {
    const channelId = this.route.snapshot.paramMap.get('id');
    this.channelId = channelId || '';

    if (channelId) {
      try {
        const result = await this.channelService.getById(channelId).toPromise();
        this.channel = result;
      } catch (error) {
        console.error('Error fetching channel details', error);
        this.errorMessage = 'Error fetching channel. Please try again later.';
      }
    }
  }
  
  // Make the socket connection
  private async initIoConnection(){
    await this.socketService.initSocket();

    // Register to receive messages from the server
    this.ioConnection = await this.socketService.onMessage()
    .subscribe((message:string) => {
      // parse the message
      let parsedMessage = JSON.parse(message);

      // get user from user list
      const user = this.users.find((user: any) => user._id == parsedMessage.id);
      // Add the author name & image to the message
      parsedMessage.authorImage = user.image || '';
      parsedMessage.authorName = user.name || '';
      // console.log("Received message: ", parsedMessage);
      // add new message to the messages array
      this.messages.push(parsedMessage);
    });

    this.ioConnection = await this.socketService.onUserCount()
    .subscribe((message:string) => {
      this.userCount = message;
    });

    this.ioConnection = await this.socketService.onChannelNotice()
    .subscribe((message:string) => {
      this.channelNotice = message;
      this.toastService.add(message, 3000, 'success');
    });

    // console.log("Joining channel: ", this.channelId);
    await this.socketService.joinChannel(this.channelId, this.userName); // Join the channel on the chat server
  }

  // Send a message to the chat server
  chat() {
    // check there is a message to send
    if(this.messagecontent || this.imagecontent){
      // Build the message and send it
      const message = {id: this.userId, message: this.messagecontent, image: this.imagecontent};
      // this.socketService.send(this.messagecontent);
      const stringMessage = JSON.stringify(message);
      this.socketService.send(stringMessage);
      this.messagecontent = '';
      this.imagecontent = '';
      // Clear the file input
      if (this.fileInput) {
        this.fileInput.nativeElement.value = '';
      }
      this.selectedFile = null;
    }else{
      console.log("no message");
    }
  }

  // Called when the user selects a file
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // If a file has been chosen
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagecontent = e.target.result;  // Store the Base64-encoded string in user.image
      };
      reader.readAsDataURL(file);
    } else {
      // If no file was chosen, reset the image
      this.selectedFile = null;
      this.imagecontent = '';
    }
  }

}
