import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StepsDataService } from '../steps/steps-data.service';

export const StepThreeAccessGuard: CanActivateFn = (route, state) => {
  const stepsDataService = inject(StepsDataService);
  const router = inject(Router);

  if (stepsDataService.isStepOneDataDefault()) {
    router.navigate(['/step1']);
    return false;
  }
  if (stepsDataService.isStepTwoDataDefault()) {
    router.navigate(['/step2']);
    return false;
  }
  return true;
};
