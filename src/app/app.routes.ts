import { Routes } from '@angular/router';
import { StepOneComponent } from './steps/step-one/step-one.component';
import { StepTwoComponent } from './steps/step-two/step-two.component';
import { StepThreeComponent } from './steps/step-three/step-three.component';
import { StepTwoAccessGuard } from './guards/step-two-access.guard';
import { StepThreeAccessGuard } from './guards/step-three-access.guard';

export const routes: Routes = [
  { path: 'step1', component: StepOneComponent },
  {
    path: 'step2',
    component: StepTwoComponent,
    canActivate: [StepTwoAccessGuard],
  },
  {
    path: 'step3',
    component: StepThreeComponent,
    canActivate: [StepThreeAccessGuard],
  },
  { path: '', redirectTo: '/step1', pathMatch: 'full' },
  { path: '**', redirectTo: '/step1', pathMatch: 'full' },
];
