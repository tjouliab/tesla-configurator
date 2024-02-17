import { Routes } from '@angular/router';
import { StepOneComponent } from './steps/step-one/step-one.component';
import { StepTwoComponent } from './steps/step-two/step-two.component';
import { StepThreeComponent } from './steps/step-three/step-three.component';

export const routes: Routes = [
  { path: 'step1', component: StepOneComponent },
  { path: 'step2', component: StepTwoComponent },
  { path: 'step3', component: StepThreeComponent },
  { path: '', redirectTo: '/step1', pathMatch: 'full' },
];
