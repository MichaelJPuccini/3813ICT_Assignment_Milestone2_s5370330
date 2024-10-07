import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Group {
  _id: string;          // MongoDB ObjectId (kept for existing groups)
  name: string;         // Group name  
  creatorId: string;    // User who created the group
  channelIds: string[]; // Channels that are a part of the group
  adminIds: string[];   // Admins who can manage the group
  userIds: string[];    // Users who are a part of the group
}

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3000/api/groups'; // API URL

  // Get all
  getAll(id: string): Observable<Group[]> {
    // return this.http.get<Group[]>(this.apiUrl);
    return this.http.get<Group[]>(`${this.apiUrl}/mine/${id}`);
  }

  // Get by ID
  getById(id: string): Observable<Group> {
    return this.http.get<Group>(`${this.apiUrl}/${id}`);
  }

  // Add new
  add(group: Omit<Group, '_id'>): Observable<any> { // Omit _id for new users
    return this.http.post(this.apiUrl, group);
  }
  
  // Update by ID
  update(id: string, group: Group): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, group);
  }
  
  // Delete by ID
  delete(id: string): Observable<any> {
    console.log("Deleting group: ", id);
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Add user to group
  addUser(groupId: string, userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/adduser/${groupId}/${userId}`);
  }

  // Remove user from group
  removeUser(groupId: string, userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/removeuser/${groupId}/${userId}`);
  }

  // Add admin to group
  addAdmin(groupId: string, userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/addadmin/${groupId}/${userId}`);
  }

  // Remove admin from group
  removeAdmin(groupId: string, userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/removeadmin/${groupId}/${userId}`);
  }
}
