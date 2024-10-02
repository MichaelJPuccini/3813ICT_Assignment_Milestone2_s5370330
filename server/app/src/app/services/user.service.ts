import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';

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

  isLoggedIn : boolean = false;
  isSuperAdmin : boolean = false;
  userId : string = '';
  currentUser : any = {};

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
  
  // Login. Get auth token and store it in local storage, 
  // then return the token to the caller
  // Get the UserId and store it in the service
  // Get the User and store it in the service
  // Set the isLoggedIn flag to true
  // login(username: string, password: string): Observable<{ token: string }> {
  //   return this.http.post<{ token: string, userId: string, user: any }>(`${this.apiUrl}/login`, { username, password })
  //     .pipe(
  //       tap(response => {
  //         this.authToken = response.token;
  //         localStorage.setItem('authToken', this.authToken);
  //         this.isLoggedIn = true;

  //         // Get userId and store it in the service


  //         this.userId = response.userId;
  //         this.currentUser = response.user;
  //       }),
  //       tap(response => response.token)
  //     );
  // }

  // Login. Use the username and password to get the user object back
  // login(username: string, password: string): Observable<any> {
  //   return this.http.post<{ user: any }>(`${this.apiUrl}/login`, { username, password })
  //     .pipe(
  //       tap(response => {
  //         this.currentUser = response.user;
  //         // localStorage.setItem('authToken', this.currentUserauthToken);

  //         this.isLoggedIn = true;

  //         console.log("Attempting to get user ID from auth token");
  //       })
  // }

    // Login. Use the username and password to get the user object back
    login(username: string, password: string): Observable<any> {
      return this.http.post<{ user: any }>(`${this.apiUrl}/login`, { username, password })
        .pipe(
          tap(response => {
            this.currentUser = response.user;
            // console.log("User logged in successfully:", this.currentUser);
            this.isLoggedIn = true;

            localStorage.setItem('userId', response.user._id);
            localStorage.setItem('username', response.user.name);
            localStorage.setItem('userrole', response.user.role);

            if (this.currentUser.role === 'SuperAdmin') {
              this.isSuperAdmin = true;
            }

          }),
          tap(response => response.user) // Return the user object to the caller
        );
    }
  
  // login(username: string, password: string): Observable<{ token: string }> {
  //   return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password });
  // }

  // Logout with authorization header
  logout(): Observable<any> {
    const token = localStorage.getItem('authToken'); // Retrieve the token from local storage
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers });
  }

  // Get the user ID from the auth token from /api/users/autotoid
  // getUserIdFromAuth(): Observable<any> {
  //   const token = localStorage.getItem('authToken'); // Retrieve the token from local storage
  //   const headers = new HttpHeaders().set('Authorization', `${token}`);
  //   return this.http.get(`${this.apiUrl}/autotoid`, { headers });
  // }

  // getUserIdFromAuth(): Observable<any> {
  //   const token = localStorage.getItem('authToken'); // Retrieve the token from local storage
  //   const headers = new HttpHeaders().set('Authorization', `${token}`);
  //   return this.http.get<{ userId: string }>(`${this.apiUrl}/autotoid`, { headers })
  //     .pipe(
  //       tap(response => {
  //         this.userId = response.userId; // Store the user ID in this.userId
  //       })
  //     );
  // }

  getUserIdFromAuth(): Observable<string> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<{ userId: string }>(`${this.apiUrl}/authtoid`, { headers })
      .pipe(
        tap(response => {
          this.userId = response.userId;
        }),
        map(response => response.userId)
      );
  }



}
