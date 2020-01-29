import { TestBed } from '@angular/core/testing';

import { ViewportSizingService } from './viewport-sizing.service';

describe('ViewportSizingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewportSizingService = TestBed.get(ViewportSizingService);
    expect(service).toBeTruthy();
  });
});
