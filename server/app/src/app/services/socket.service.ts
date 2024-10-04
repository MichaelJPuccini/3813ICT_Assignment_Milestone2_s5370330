import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:4200';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket:any;
  constructor() { }

  // Setup connection to socket server
  initSocket() {
    this.socket = io(SERVER_URL);
    return ()=>{this.socket.disconnect();}
  }

  joinChannel(channelId: string) {
    console.log("Socket service joining channel: ", channelId);
    this.socket.emit('joinchannel', channelId);
  }

  leaveChannel(channelId: string) {
    this.socket.emit('leavechannel', channelId);
  }

  // Emit a message to the socket server
  send(message: string) {
    this.socket.emit('message', message);
  }

  // Listen for "message" events from the socket server
  getMessage() {
    return new Observable(observer=>{
      this.socket.on('message', (data:any) => {observer.next(data)});
    });
  }

  // Fixed version that wasn't in the notes
  // Listen for "message" events from the socket server
  onMessage(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('message', (data: string) => {
        observer.next(data);
      });
    });
  }

  // Listen for "message" events from the socket server
  onUserCount(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('usercount', (data: string) => {
        observer.next(data);
      });
    });
  }
  
      // Listen for "message" events from the socket server
  onChannelNotice(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('channelnotice', (data: string) => {
        observer.next(data);
      });
    });
  }

}
