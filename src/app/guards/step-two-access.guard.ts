import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StepsDataService } from '../steps/steps-data.service';

export const StepTwoAccessGuard: CanActivateFn = (route, state) => {
  const stepsDataService = inject(StepsDataService);
  const router = inject(Router);

  if (stepsDataService.isStepOneDataDefault()) {
    router.navigate(['/step1']);
    return false;
  }
  return true;
};
