import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService, UserDetails, UserFull } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve all users', () => {
    const dummyUsers: UserDetails[] = [
      { _id: '1', name: 'User 1', image: 'image1.png' },
      { _id: '2', name: 'User 2', image: 'image2.png' }
    ];

    service.getAll().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });

  it('should retrieve a user by ID', () => {
    const dummyUser: UserDetails = { _id: '1', name: 'User 1', image: 'image1.png' };

    service.getById('1').subscribe(user => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUser);
  });

  it('should add a new user', () => {
    const newUser: Omit<UserFull, '_id'> = { name: 'User 1', email: 'user1@example.com', password: 'password', image: 'image1.png' };

    service.add(newUser).subscribe(response => {
      expect(response).toEqual(newUser);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    req.flush(newUser);
  });

  it('should update a user by ID', () => {
    const updatedUser: UserFull = { name: 'Updated User', email: 'updated@example.com', password: 'password', image: 'updated.png' };

    service.update('1', updatedUser).subscribe(response => {
      expect(response).toEqual(updatedUser);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('PATCH');
    req.flush(updatedUser);
  });

  it('should delete a user by ID', () => {
    service.delete('1').subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should login a user', () => {
    const dummyResponse = { user: { _id: '1', name: 'User 1', role: 'User' } };

    service.login('username', 'password').subscribe(response => {
      expect(response.user).toEqual(dummyResponse.user);
      expect(service.isLoggedIn).toBeTrue();
      expect(service.currentUser).toEqual(dummyResponse.user);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });

  it('should logout a user', () => {
    localStorage.setItem('authToken', 'dummyToken');

    service.logout().subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/logout`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('dummyToken');
    req.flush({});
  });

  it('should get user ID from auth token', () => {
    const dummyResponse = { userId: '1' };
    localStorage.setItem('authToken', 'dummyToken');

    service.getUserIdFromAuth().subscribe(userId => {
      expect(userId).toBe('1');
      expect(service.userId).toBe('1');
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/authtoid`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer dummyToken');
    req.flush(dummyResponse);
  });
});

// import { TestBed } from '@angular/core/testing';
// import { HttpClientModule } from '@angular/common/http';

// import { UserService } from './user.service';

// describe('UserService', () => {
//   let service: UserService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientModule]
//     });
//     service = TestBed.inject(UserService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   // it('should FAIL to get a user with an incorrect ID', () => {
//   //   service.getAll().subscribe(user => {
//   //     expect(user).toBeTruthy();
//   //   });
//   // });

// });
