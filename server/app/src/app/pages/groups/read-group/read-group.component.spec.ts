import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

import { ReadGroupComponent } from './read-group.component';

describe('ReadGroupComponent', () => {
  let component: ReadGroupComponent;
  let fixture: ComponentFixture<ReadGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadGroupComponent, RouterTestingModule, HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => 'mockValue' // Mock any route parameters if needed
            })
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
