import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadChannelComponent } from './read-channel.component';

describe('ReadChannelComponent', () => {
  let component: ReadChannelComponent;
  let fixture: ComponentFixture<ReadChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadChannelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
