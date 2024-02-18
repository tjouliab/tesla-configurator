import { Injectable } from '@angular/core';
import {
  DEFAULT_STEP_ONE_DATA_OUTPUT,
  DEFAULT_STEP_TWO_DATA_OUTPUT,
  StepOneDataOutput,
  StepTwoDataOutput,
} from './steps-data.dto';

@Injectable({
  providedIn: 'root',
})
export class StepsDataService {
  private stepOneData: StepOneDataOutput = DEFAULT_STEP_ONE_DATA_OUTPUT;
  private stepTwoData: StepTwoDataOutput = DEFAULT_STEP_TWO_DATA_OUTPUT;

  // Step One
  setStepOneData(dataOutput: StepOneDataOutput): void {
    this.stepOneData = dataOutput;
  }
  getStepOneData(): StepOneDataOutput {
    return this.stepOneData;
  }
  isStepOneDataDefault(): boolean {
    return this.stepOneData.modelCode === '';
  }
  resetStepOneData(): void {
    this.stepOneData = DEFAULT_STEP_ONE_DATA_OUTPUT;
  }

  // Step Two
  setStepTwoData(dataOutput: StepTwoDataOutput): void {
    this.stepTwoData = dataOutput;
  }
  getStepTwoData(): StepTwoDataOutput {
    return this.stepTwoData;
  }
  isStepTwoDataDefault(): boolean {
    return this.stepTwoData.selectedConfig.id === -1;
  }
  resetStepTwoData(): void {
    this.stepTwoData = DEFAULT_STEP_TWO_DATA_OUTPUT;
  }
}
