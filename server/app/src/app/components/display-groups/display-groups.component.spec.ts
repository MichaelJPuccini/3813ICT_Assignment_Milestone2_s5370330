import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { DisplayGroupsComponent } from './display-groups.component';

describe('DisplayGroupsComponent', () => {
  let component: DisplayGroupsComponent;
  let fixture: ComponentFixture<DisplayGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayGroupsComponent, HttpClientModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
