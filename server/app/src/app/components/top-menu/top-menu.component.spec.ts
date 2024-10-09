import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TopMenuComponent } from './top-menu.component';
import { ToastService } from '../../services/toast.service';

describe('TopMenuComponent', () => {
  let component: TopMenuComponent;
  let fixture: ComponentFixture<TopMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopMenuComponent, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 123 })
          }
        },
        ToastService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
