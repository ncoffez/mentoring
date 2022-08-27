import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleModelsComponent } from './role-models.component';

describe('RoleModelsComponent', () => {
  let component: RoleModelsComponent;
  let fixture: ComponentFixture<RoleModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleModelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
