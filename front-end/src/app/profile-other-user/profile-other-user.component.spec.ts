import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOtherUserComponent } from './profile-other-user.component';

describe('ProfileOtherUserComponent', () => {
  let component: ProfileOtherUserComponent;
  let fixture: ComponentFixture<ProfileOtherUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileOtherUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileOtherUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
