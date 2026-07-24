import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { ErrorService } from '../services/error.service';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(LoadingService);
  const errorService = inject(ErrorService);
  const key = req.url;

  loading.start(key);

  return next(req).pipe(
    finalize(() => loading.stop(key)),
    catchError((err) => {
      const message =
        err.status === 0
          ? 'Network error. Please check your connection.'
          : err.status === 404
            ? 'Resource not found.'
            : 'Something went wrong. Please try again.';
      errorService.show(message);
      throw err;
    })
  );
};
