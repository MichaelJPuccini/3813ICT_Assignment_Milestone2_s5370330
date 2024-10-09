import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ChannelService } from './channel.service';

describe('ChannelService', () => {
  let service: ChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ChannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
