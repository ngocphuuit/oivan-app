import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperCreateComponent } from './developer-create.component';

describe('DeveloperCreateComponent', () => {
  let component: DeveloperCreateComponent;
  let fixture: ComponentFixture<DeveloperCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeveloperCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
