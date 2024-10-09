import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

import { ReadGroupsComponent } from './read-groups.component';

describe('ReadGroupsComponent', () => {
  let component: ReadGroupsComponent;
  let fixture: ComponentFixture<ReadGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadGroupsComponent, RouterTestingModule, HttpClientModule],
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

    fixture = TestBed.createComponent(ReadGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
