import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsComponent } from './sections';

describe('Sections', () => {
  let component: SectionsComponent;
  let fixture: ComponentFixture<SectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });
});
