import { TestBed, inject } from '@angular/core/testing';

import { IdbDataService } from './idb-data.service';

describe('IdbDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IdbDataService]
    });
  });

  it('should be created', inject([IdbDataService], (service: IdbDataService) => {
    expect(service).toBeTruthy();
  }));
});
