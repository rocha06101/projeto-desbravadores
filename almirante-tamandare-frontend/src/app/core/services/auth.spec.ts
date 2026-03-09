import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { AuthService } from './auth';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(AuthService);
  });

  it('Deve ser criado', () => {
    expect(service).toBeTruthy();
  });
});
