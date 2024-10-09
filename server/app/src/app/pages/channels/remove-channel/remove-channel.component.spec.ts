import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { RemoveChannelComponent } from './remove-channel.component';

describe('RemoveChannelComponent', () => {
  let component: RemoveChannelComponent;
  let fixture: ComponentFixture<RemoveChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RemoveChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
