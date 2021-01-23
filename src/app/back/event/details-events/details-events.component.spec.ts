import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEventsComponent } from './details-events.component';

describe('DetailsEventsComponent', () => {
  let component: DetailsEventsComponent;
  let fixture: ComponentFixture<DetailsEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
