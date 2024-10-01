import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadGroupssComponent } from './read-groupss.component';

describe('ReadGroupssComponent', () => {
  let component: ReadGroupssComponent;
  let fixture: ComponentFixture<ReadGroupssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadGroupssComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadGroupssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
