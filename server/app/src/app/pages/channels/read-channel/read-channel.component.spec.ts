import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { ReadChannelComponent } from './read-channel.component';

describe('ReadChannelComponent', () => {
  let component: ReadChannelComponent;
  let fixture: ComponentFixture<ReadChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ReadChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
