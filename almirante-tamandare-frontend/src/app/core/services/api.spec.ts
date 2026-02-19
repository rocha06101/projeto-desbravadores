import { TestBed } from '@angular/core/testing';

import { ApiService } from './api';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('Deve ser criado', () => {
    expect(service).toBeTruthy();
    });
});
