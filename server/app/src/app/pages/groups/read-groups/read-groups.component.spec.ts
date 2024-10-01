import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadGroupsComponent } from './read-groups.component';

describe('ReadGroupsComponent', () => {
  let component: ReadGroupsComponent;
  let fixture: ComponentFixture<ReadGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadGroupsComponent]
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
