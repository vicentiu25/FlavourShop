import { TestBed } from '@angular/core/testing';

class InterceptorInterceptor {
}

describe('InterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      InterceptorInterceptor
    ]
  }));

  it('should be created', () => {
    const interceptor: InterceptorInterceptor = TestBed.inject(InterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
