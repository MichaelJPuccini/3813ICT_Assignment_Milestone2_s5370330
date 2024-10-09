import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

import { ChannelAddComponent } from './channel-add.component';

describe('ChannelAddComponent', () => {
  let component: ChannelAddComponent;
  let fixture: ComponentFixture<ChannelAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelAddComponent, RouterTestingModule, HttpClientModule],
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

    fixture = TestBed.createComponent(ChannelAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
