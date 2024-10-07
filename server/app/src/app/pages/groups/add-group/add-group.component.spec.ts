import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupComponent } from './add-group.component';
import { TopMenuComponent } from '../../../components/top-menu/top-menu.component';

describe('AddGroupComponent', () => {
  let component: AddGroupComponent;
  let fixture: ComponentFixture<AddGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGroupComponent, TopMenuComponent]
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
