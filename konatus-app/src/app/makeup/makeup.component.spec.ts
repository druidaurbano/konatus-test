import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeupComponent } from './makeup.component';

describe('MakeupComponent', () => {
  let component: MakeupComponent;
  let fixture: ComponentFixture<MakeupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
