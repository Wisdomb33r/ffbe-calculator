import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DamageResultsComponent} from './damage-results.component';

xdescribe('DamageResultsComponent', () => {
  let component: DamageResultsComponent;
  let fixture: ComponentFixture<DamageResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DamageResultsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DamageResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
