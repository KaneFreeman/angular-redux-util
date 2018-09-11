import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { ReduxHttpService } from './redux-http.service';

describe('ReduxHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReduxHttpService],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should be created', inject([ReduxHttpService], (service: ReduxHttpService) => {
    expect(service).toBeTruthy();
  }));
});
