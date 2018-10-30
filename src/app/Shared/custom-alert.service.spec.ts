import { TestBed, inject } from '@angular/core/testing';

import { CustomAlertService } from './custom-alert.service';

describe('CustomAlertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomAlertService]
    });
  });

  it('should be created', inject([CustomAlertService], (service: CustomAlertService) => {
    expect(service).toBeTruthy();
  }));
});
