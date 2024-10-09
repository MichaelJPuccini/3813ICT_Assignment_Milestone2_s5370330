import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

import { UpdateUserComponent } from './update-user.component';

describe('UpdateUserComponent', () => {
  let component: UpdateUserComponent;
  let fixture: ComponentFixture<UpdateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, UpdateUserComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => 'mockValue' // Mock any route parameters needed
            })
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { UpdateUserComponent } from './update-user.component';

// describe('UpdateUserComponent', () => {
//   let component: UpdateUserComponent;
//   let fixture: ComponentFixture<UpdateUserComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [UpdateUserComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(UpdateUserComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
