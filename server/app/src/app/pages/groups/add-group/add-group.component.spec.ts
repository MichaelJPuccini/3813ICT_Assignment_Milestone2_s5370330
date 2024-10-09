import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AddGroupComponent } from './add-group.component';
import { TopMenuComponent } from '../../../components/top-menu/top-menu.component';

describe('AddGroupComponent', () => {
  let component: AddGroupComponent;
  let fixture: ComponentFixture<AddGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, AddGroupComponent, TopMenuComponent],
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

    fixture = TestBed.createComponent(AddGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
