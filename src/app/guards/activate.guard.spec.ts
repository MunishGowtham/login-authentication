import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ActivateGuard } from './activate.guard';

import { HttpClientModule } from '@angular/common/http';

describe('ActivateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), HttpClientModule],
    });
  });

  it('should ...', inject([ActivateGuard], (guard: ActivateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
