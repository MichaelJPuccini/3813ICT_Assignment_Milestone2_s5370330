import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoveGroupComponent } from './remove-group.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('RemoveGroupComponent', () => {
  let component: RemoveGroupComponent;
  let fixture: ComponentFixture<RemoveGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RemoveGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

