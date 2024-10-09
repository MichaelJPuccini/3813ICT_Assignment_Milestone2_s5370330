import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

import { AddChannelComponent } from './add-channel.component';

describe('AddChannelComponent', () => {
  let component: AddChannelComponent;
  let fixture: ComponentFixture<AddChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, AddChannelComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }), // mock params
            snapshot: { paramMap: { get: () => '123' } }, // mock snapshot if needed
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddChannelComponent);
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
// import { HttpClientModule } from '@angular/common/http';

// import { AddChannelComponent } from './add-channel.component';

// describe('AddChannelComponent', () => {
//   let component: AddChannelComponent;
//   let fixture: ComponentFixture<AddChannelComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [AddChannelComponent, RouterTestingModule, HttpClientModule],
//       providers: [
//         {
//           provide: ActivatedRoute,
//           useValue: {
//             paramMap: of({
//               get: (key: string) => 'mockValue' // Mock any route parameters if needed
//             })
//           }
//         }
//       ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(AddChannelComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   // beforeEach(async () => {
//   //   await TestBed.configureTestingModule({
//   //     imports: [AddChannelComponent, RouterTestingModule, HttpClientModule],
//   //     providers: [
//   //       {
//   //         provide: ActivatedRoute,
//   //         useValue: {
//   //           paramMap: of({
//   //             get: (key: string) => ''
//   //           })
//   //         }
//   //       }
//   //     ]
//   //   })
//   //   .compileComponents();

//   //   fixture = TestBed.createComponent(AddChannelComponent);
//   //   component = fixture.componentInstance;
//   //   fixture.detectChanges();
//   // });

//   // beforeEach(async () => {
//   //   await TestBed.configureTestingModule({
//   //     imports: [AddChannelComponent, RouterTestingModule, HttpClientModule],
//   //     providers: [
//   //       {
//   //         provide: ActivatedRoute,
//   //         useValue: {
//   //           params: of({}) // Mock any route parameters if needed
//   //         }
//   //       }
//   //     ]
//   //   })
//   //   .compileComponents();

//   //   fixture = TestBed.createComponent(AddChannelComponent);
//   //   component = fixture.componentInstance;
//   //   fixture.detectChanges();
//   // });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
