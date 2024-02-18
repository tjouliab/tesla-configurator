import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StepsDataService } from '../steps/steps-data.service';
import { map, take } from 'rxjs';

export const StepTwoAccessGuard: CanActivateFn = (route, state) => {
  const stepsDataService = inject(StepsDataService);
  const router = inject(Router);

  return stepsDataService.isStepOneDataDefault().pipe(
    take(1),
    map((isDefaultStepOne) => {
      if (isDefaultStepOne) {
        router.navigate(['/step1']);
        return false;
      }
      return true;
    })
  );
};
