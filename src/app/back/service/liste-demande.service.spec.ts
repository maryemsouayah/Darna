import { TestBed } from '@angular/core/testing';

import { ListeDemandeService } from './liste-demande.service';

describe('ListeDemandeService', () => {
  let service: ListeDemandeService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListeDemandeService);
  });
  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
