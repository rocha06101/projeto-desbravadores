import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth';

describe('Auth', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('Deve ser criado', () => {
    expect(service).toBeTruthy();
  });
});
