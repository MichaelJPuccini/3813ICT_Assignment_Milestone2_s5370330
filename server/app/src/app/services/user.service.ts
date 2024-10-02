import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserLogin {
  _id: string;
  name: string;
  password: string;
}

export interface UserDetails {
  _id: string;
  name: string;
  image: string;
}

export interface UserAuthKey {
  key: string;
}

export interface UserFull {
  name: string;
  email: string;
  password: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3000/api/users'; // API URL

  // Get all
  getAll(): Observable<UserDetails[]> {
    return this.http.get<UserDetails[]>(this.apiUrl);
  }

  // Get by ID
  getById(id: string): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${this.apiUrl}/${id}`);
  }

  // Add new
  add(userFull: Omit<UserFull, '_id'>): Observable<any> { // Omit _id for new users
    return this.http.post(this.apiUrl, userFull);
  }
  
  // Update by ID
  update(id: string, userFull: UserFull): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, userFull);
  }
  
  // Delete by ID
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password });
  }

  // Logout with authorization header
  logout(): Observable<any> {
    const token = localStorage.getItem('authToken'); // Retrieve the token from local storage
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers });
  }

}
