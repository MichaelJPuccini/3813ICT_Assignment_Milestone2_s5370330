import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

import { AddChannelComponent } from './add-channel.component';

describe('AddChannelComponent', () => {
  let component: AddChannelComponent;
  let fixture: ComponentFixture<AddChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, AddChannelComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }), // mock params
            snapshot: { paramMap: { get: () => '123' } }, // mock snapshot if needed
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
