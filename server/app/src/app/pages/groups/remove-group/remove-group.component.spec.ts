import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveGroupComponent } from './remove-group.component';

describe('RemoveGroupComponent', () => {
  let component: RemoveGroupComponent;
  let fixture: ComponentFixture<RemoveGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
