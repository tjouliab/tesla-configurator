import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StepsDataService } from '../steps/steps-data.service';
import { map, of, switchMap, take } from 'rxjs';

export const StepThreeAccessGuard: CanActivateFn = (route, state) => {
  const stepsDataService = inject(StepsDataService);
  const router = inject(Router);

  return stepsDataService.isStepOneDataDefault().pipe(
    take(1),
    switchMap((isDefaultStepOne) => {
      if (isDefaultStepOne) {
        router.navigate(['/step1']);
        return of(false);
      }
      return stepsDataService.isStepTwoDataDefault().pipe(
        take(1),
        map((isDefaultStepTwo) => {
          if (isDefaultStepTwo) {
            router.navigate(['/step2']);
            return false;
          }
          return true;
        })
      );
    })
  );
};
