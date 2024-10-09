import { Component, HostListener, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChannelService } from '../../../services/channel.service';
import { SocketService } from '../../../services/socket.service';
import { ToastService } from '../../../services/toast.service';
import { UserService } from '../../../services/user.service';

import { TopMenuComponent } from '../../../components/top-menu/top-menu.component';

interface User {
  id: string;
  name: string;
  image: string;
}
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
export class ReadChannelComponent implements OnInit, OnDestroy {
  private socket: any;
  messagecontent: string = "";
  // messages: string[] = [];
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
    private socketService: SocketService
  ) {}

  async ngOnInit(): Promise<void> {
    // console.log("Getting Details");
    await this.getChannelDetails();
    // console.log("Getting Users");
    const users = await this.userService.getAll().toPromise();
    this.users = users || [];
    console.log("Users: ", users);

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

    // Make the socket connection
    this.initIoConnection();
  }
  
  ngOnDestroy(): void {
    // this.onLeftPage(); // This is causing an issue with testing
  }
  
  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: Event): void {
    this.onLeftPage();
  }
  
  async getChannelDetails() {
    const channelId = this.route.snapshot.paramMap.get('id');

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
  
  onLeftPage(): void {
    // Clean up the socket connection
    this.socketService.send(this.userName + " has left the channel");
    // this.socketService.disconnect();
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
      // console.log("User: ", user);
      // Add the author name & image to the message
      parsedMessage.authorImage = user.image || '';
      parsedMessage.authorName = user.name || '';

      // parsedMessage.authorImage = ""; //this.channel.users.find((user: any) => user.id === parsedMessage.id)?.image || '';
      // parsedMessage.authorName = ""; //this.channel.users.find((user: any) => user.id === parsedMessage.id)?.name || '';

      console.log("Received message: ", parsedMessage);
      // add new message to the messages array
      // this.messages.push(message);
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

    console.log("Joining channel: ", this.channelId);
    await this.socketService.joinChannel(this.channelId); // Join the channel on the chat server
    // await this.socketService.send(this.userName + " has joined the channel");
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
