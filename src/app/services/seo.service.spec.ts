import { TestBed, inject } from '@angular/core/testing';

import { SEOService } from './seo.service';

describe('SEOService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SEOService]
    });
  });

  it('should be created', inject([SEOService], (service: SEOService) => {
    expect(service).toBeTruthy();
  }));
});
