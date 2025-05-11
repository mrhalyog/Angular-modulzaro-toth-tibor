import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CensoredComponent } from './censored.component';

describe('CensoredComponent', () => {
  let component: CensoredComponent;
  let fixture: ComponentFixture<CensoredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CensoredComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CensoredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
