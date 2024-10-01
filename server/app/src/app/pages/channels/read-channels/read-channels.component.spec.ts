import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadChannelsComponent } from './read-channels.component';

describe('ReadChannelsComponent', () => {
  let component: ReadChannelsComponent;
  let fixture: ComponentFixture<ReadChannelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadChannelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
