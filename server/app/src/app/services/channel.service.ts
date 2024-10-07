import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface Channel {
  _id: string;          // MongoDB ObjectId (kept for existing groups)
  groupId: string;      // Group that the channel is a part of
  name: string;         // Channel name  
  creatorId: string;    // User who created the channel
  adminIds: string[];   // Admins who can manage the channel
  userIds: string[];    // Users who are a part of the channel
}

export interface NewChannel {
  groupId: string;      // Group that the channel is a part of
  name: string;         // Channel name  
  creatorId: string;    // User who created the channel
  adminIds: string[];   // Admins who can manage the channel
  userIds: string[];    // Users who are a part of the channel
}


@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3000/api/channels'; // API URL

  // Get all
  getAll(): Observable<Channel[]> {
    return this.http.get<Channel[]>(this.apiUrl);
  }
  
  // Get by Group ID
  // Not the best way to do it, but alas, it is the way I have chosen
  // NO LONGER USED
  // getByGroupId(groupId: string): Observable<Channel[]> {
  //   console.log("Getting channels for group ID:", groupId);
  //   return this.http.get<Channel[]>(this.apiUrl).pipe(
  //     // tap(channels => console.log("All channels:", channels)),
  //     map(channels => channels.filter(channel => channel.groupId === groupId)),
  //     // tap(filteredChannels => console.log("Filtered channels:", filteredChannels))
  //   );
  // }

  getMyChannels(groupId: string, userId: string): Observable<Channel[]> {
    // console.log("Getting channels for user ID:", userId, "in group ID:", groupId);
    return this.http.get<Channel[]>(`${this.apiUrl}/mine/${groupId}/${userId}`);
  }

  // Get by ID
  getById(id: string): Observable<Channel> {
    return this.http.get<Channel>(`${this.apiUrl}/${id}`);
  }
  
  // Add new
  add(channel: Omit<Channel, '_id'>): Observable<any> { // Omit _id for new users
    // console.log('Adding channel:', channel); // Debugging line
    return this.http.post(this.apiUrl, channel);
  }
  
  // Update by ID
  update(id: string, channel: Channel): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, channel);
  }
  
  // Delete by ID
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
    // Add user to group
    addUser(channelId: string, userId: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/adduser/${channelId}/${userId}`);
    }
  
    // Remove user from group
    removeUser(channelId: string, userId: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/removeuser/${channelId}/${userId}`);
    }
  
    // Add admin to group
    addAdmin(channelId: string, userId: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/addadmin/${channelId}/${userId}`);
    }
  
    // Remove admin from group
    removeAdmin(channelId: string, userId: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/removeadmin/${channelId}/${userId}`);
    }
}
