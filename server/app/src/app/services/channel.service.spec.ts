import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ChannelService, Channel, NewChannel } from './channel.service';

describe('ChannelService', () => {
  let service: ChannelService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChannelService]
    });
    service = TestBed.inject(ChannelService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve all channels', () => {
    const dummyChannels: Channel[] = [
      { _id: '1', groupId: 'g1', name: 'Channel 1', creatorId: 'u1', adminIds: [], userIds: [] },
      { _id: '2', groupId: 'g2', name: 'Channel 2', creatorId: 'u2', adminIds: [], userIds: [] }
    ];

    service.getAll().subscribe(channels => {
      expect(channels.length).toBe(2);
      expect(channels).toEqual(dummyChannels);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(dummyChannels);
  });

  it('should retrieve channels by user and group', () => {
    const dummyChannels: Channel[] = [
      { _id: '1', groupId: 'g1', name: 'Channel 1', creatorId: 'u1', adminIds: [], userIds: [] }
    ];

    service.getMyChannels('g1', 'u1').subscribe(channels => {
      expect(channels.length).toBe(1);
      expect(channels).toEqual(dummyChannels);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/mine/g1/u1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyChannels);
  });

  it('should retrieve a channel by ID', () => {
    const dummyChannel: Channel = { _id: '1', groupId: 'g1', name: 'Channel 1', creatorId: 'u1', adminIds: [], userIds: [] };

    service.getById('1').subscribe(channel => {
      expect(channel).toEqual(dummyChannel);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyChannel);
  });

  it('should add a new channel', () => {
    const newChannel: NewChannel = { groupId: 'g1', name: 'Channel 1', creatorId: 'u1', adminIds: [], userIds: [] };

    service.add(newChannel).subscribe(response => {
      expect(response).toEqual(newChannel);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    req.flush(newChannel);
  });

  it('should update a channel by ID', () => {
    const updatedChannel: Channel = { _id: '1', groupId: 'g1', name: 'Updated Channel', creatorId: 'u1', adminIds: [], userIds: [] };

    service.update('1', updatedChannel).subscribe(response => {
      expect(response).toEqual(updatedChannel);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('PATCH');
    req.flush(updatedChannel);
  });

  it('should delete a channel by ID', () => {
    service.delete('1').subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should add a user to a channel', () => {
    service.addUser('1', 'u1').subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/adduser/1/u1`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should remove a user from a channel', () => {
    service.removeUser('1', 'u1').subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/removeuser/1/u1`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should add an admin to a channel', () => {
    service.addAdmin('1', 'u1').subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/addadmin/1/u1`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should remove an admin from a channel', () => {
    service.removeAdmin('1', 'u1').subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/removeadmin/1/u1`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
