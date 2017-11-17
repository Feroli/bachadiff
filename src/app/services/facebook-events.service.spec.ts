import { TestBed, inject } from '@angular/core/testing';

import { FacebookEventsService } from './facebook-events.service';

describe('FacebookEventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacebookEventsService]
    });
  });

  it('should be created', inject([FacebookEventsService], (service: FacebookEventsService) => {
    expect(service).toBeTruthy();
  }));
});
