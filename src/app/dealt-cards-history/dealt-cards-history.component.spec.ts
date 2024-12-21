import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealtCardsHistoryComponent } from './dealt-cards-history.component';

describe('DealtCardsHistoryComponent', () => {
  let component: DealtCardsHistoryComponent;
  let fixture: ComponentFixture<DealtCardsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealtCardsHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealtCardsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
