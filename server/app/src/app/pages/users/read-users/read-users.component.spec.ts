import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

import { ReadUsersComponent } from './read-users.component';

describe('ReadUsersComponent', () => {
  let component: ReadUsersComponent;
  let fixture: ComponentFixture<ReadUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadUsersComponent, RouterTestingModule, HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({})
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { ActivatedRoute } from '@angular/router';
// import { of } from 'rxjs';

// import { ReadUsersComponent } from './read-users.component';

// describe('ReadUsersComponent', () => {
//   let component: ReadUsersComponent;
//   let fixture: ComponentFixture<ReadUsersComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [ReadUsersComponent, RouterTestingModule],
//       providers: [
//         {
//           provide: ActivatedRoute,
//           useValue: {
//             params: of({})
//           }
//         }
//       ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(ReadUsersComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
