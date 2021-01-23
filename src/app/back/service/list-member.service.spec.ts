import { TestBed } from '@angular/core/testing';

import { ListMemberService } from './list-member.service';

describe('ListMemberService', () => {
  let service: ListMemberService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListMemberService);
  });
  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
