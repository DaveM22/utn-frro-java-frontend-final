import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorPdfComponent } from './creator-pdf.component';

describe('CreatorPdfComponent', () => {
  let component: CreatorPdfComponent;
  let fixture: ComponentFixture<CreatorPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatorPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatorPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
