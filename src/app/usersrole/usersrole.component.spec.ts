import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersroleComponent } from './usersrole.component';

describe('UsersroleComponent', () => {
  let component: UsersroleComponent;
  let fixture: ComponentFixture<UsersroleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersroleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
