import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { DisplayChannelsListComponent } from './display-channels-list.component';

describe('DisplayChannelsListComponent', () => {
  let component: DisplayChannelsListComponent;
  let fixture: ComponentFixture<DisplayChannelsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayChannelsListComponent, HttpClientModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayChannelsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
