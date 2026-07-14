import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const clonedRequest = request.clone({ setHeaders: { Authorization: 'Bearer demo-enterprise-token' } });
  return next(clonedRequest);
};