import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

import { ManageChannelUsersComponent } from './manage-channel-users.component';

describe('ManageChannelUsersComponent', () => {
  let component: ManageChannelUsersComponent;
  let fixture: ComponentFixture<ManageChannelUsersComponent>;

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [RouterTestingModule, HttpClientModule, ManageChannelUsersComponent],
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

  fixture = TestBed.createComponent(ManageChannelUsersComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
});

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
