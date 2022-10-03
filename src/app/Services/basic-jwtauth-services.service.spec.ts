import { TestBed } from '@angular/core/testing';

import { BasicJWTAuthServicesService } from './basic-jwtauth-services.service';

describe('BasicJWTAuthServicesService', () => {
  let service: BasicJWTAuthServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicJWTAuthServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
