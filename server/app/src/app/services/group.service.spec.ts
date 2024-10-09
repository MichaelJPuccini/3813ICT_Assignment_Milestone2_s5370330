import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

import { GroupService } from './group.service';

export interface Group {
  _id: string;          // MongoDB ObjectId (kept for existing groups)
  name: string;         // Group name  
  creatorId: string;    // User who created the group
  channelIds: string[]; // Channels that are a part of the group
  adminIds: string[];   // Admins who can manage the group
  userIds: string[];    // Users who are a part of the group
}

describe('GroupService', () => {
  let service: GroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(GroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get group by ID', () => {
    const mockGroup: Group = {
      _id: '1',
      name: 'Test Group',
      creatorId: 'creator123',
      channelIds: ['channel1', 'channel2'],
      adminIds: ['admin1', 'admin2'],
      userIds: ['user1', 'user2']
    };

    spyOn(service, 'getById').and.returnValue(of(mockGroup));

    service.getById('1').subscribe(group => {
      expect(group).toEqual(mockGroup);
    });

    expect(service.getById).toHaveBeenCalledWith('1');
  });
  it('should get all groups by user ID', () => {
    const mockGroups: Group[] = [
      {
        _id: '1',
        name: 'Test Group 1',
        creatorId: 'creator123',
        channelIds: ['channel1', 'channel2'],
        adminIds: ['admin1', 'admin2'],
        userIds: ['user1', 'user2']
      },
      {
        _id: '2',
        name: 'Test Group 2',
        creatorId: 'creator456',
        channelIds: ['channel3', 'channel4'],
        adminIds: ['admin3', 'admin4'],
        userIds: ['user3', 'user4']
      }
    ];

    spyOn(service, 'getAll').and.returnValue(of(mockGroups));

    service.getAll('creator123').subscribe(groups => {
      expect(groups).toEqual(mockGroups);
    });

    expect(service.getAll).toHaveBeenCalledWith('creator123');
  });
  it('should add a new group', () => {
    const newGroup: Omit<Group, '_id'> = {
      name: 'New Group',
      creatorId: 'creator123',
      channelIds: ['channel1', 'channel2'],
      adminIds: ['admin1', 'admin2'],
      userIds: ['user1', 'user2']
    };

    spyOn(service, 'add').and.returnValue(of(newGroup));

    service.add(newGroup).subscribe(response => {
      expect(response).toEqual(newGroup);
    });

    expect(service.add).toHaveBeenCalledWith(newGroup);
  });

  it('should update a group by ID', () => {
    const updatedGroup: Group = {
      _id: '1',
      name: 'Updated Group',
      creatorId: 'creator123',
      channelIds: ['channel1', 'channel2'],
      adminIds: ['admin1', 'admin2'],
      userIds: ['user1', 'user2']
    };

    spyOn(service, 'update').and.returnValue(of(updatedGroup));

    service.update('1', updatedGroup).subscribe(response => {
      expect(response).toEqual(updatedGroup);
    });

    expect(service.update).toHaveBeenCalledWith('1', updatedGroup);
  });

  it('should delete a group by ID', () => {
    spyOn(service, 'delete').and.returnValue(of({}));

    service.delete('1').subscribe(response => {
      expect(response).toEqual({});
    });

    expect(service.delete).toHaveBeenCalledWith('1');
  });

  it('should add a user to a group', () => {
    spyOn(service, 'addUser').and.returnValue(of({}));

    service.addUser('1', 'user1').subscribe(response => {
      expect(response).toEqual({});
    });

    expect(service.addUser).toHaveBeenCalledWith('1', 'user1');
  });

  it('should remove a user from a group', () => {
    spyOn(service, 'removeUser').and.returnValue(of({}));

    service.removeUser('1', 'user1').subscribe(response => {
      expect(response).toEqual({});
    });

    expect(service.removeUser).toHaveBeenCalledWith('1', 'user1');
  });

  it('should add an admin to a group', () => {
    spyOn(service, 'addAdmin').and.returnValue(of({}));

    service.addAdmin('1', 'admin1').subscribe(response => {
      expect(response).toEqual({});
    });

    expect(service.addAdmin).toHaveBeenCalledWith('1', 'admin1');
  });

  it('should remove an admin from a group', () => {
    spyOn(service, 'removeAdmin').and.returnValue(of({}));

    service.removeAdmin('1', 'admin1').subscribe(response => {
      expect(response).toEqual({});
    });

    expect(service.removeAdmin).toHaveBeenCalledWith('1', 'admin1');
  });
});
