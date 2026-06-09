import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveaboardsComponent } from './liveaboards.component';

describe('LiveaboardsComponent', () => {
  let component: LiveaboardsComponent;
  let fixture: ComponentFixture<LiveaboardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LiveaboardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LiveaboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
