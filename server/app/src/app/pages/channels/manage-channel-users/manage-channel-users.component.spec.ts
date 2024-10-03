import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageChannelUsersComponent } from './manage-channel-users.component';

describe('ManageChannelUsersComponent', () => {
  let component: ManageChannelUsersComponent;
  let fixture: ComponentFixture<ManageChannelUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageChannelUsersComponent]
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
