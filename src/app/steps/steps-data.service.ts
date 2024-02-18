import { Injectable } from '@angular/core';
import {
  DEFAULT_STEP_ONE_DATA_OUTPUT,
  DEFAULT_STEP_TWO_DATA_OUTPUT,
  StepOneDataOutput,
  StepTwoDataOutput,
} from './steps-data.dto';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StepsDataService {
  private stepOneData: BehaviorSubject<StepOneDataOutput> =
    new BehaviorSubject<StepOneDataOutput>(DEFAULT_STEP_ONE_DATA_OUTPUT);
  private stepTwoData: BehaviorSubject<StepTwoDataOutput> =
    new BehaviorSubject<StepTwoDataOutput>(DEFAULT_STEP_TWO_DATA_OUTPUT);

  // Step One
  setStepOneData(dataOutput: StepOneDataOutput): void {
    this.stepOneData.next(dataOutput);
  }
  getStepOneData(): Observable<StepOneDataOutput> {
    return this.stepOneData.asObservable();
  }
  isStepOneDataDefault(): Observable<boolean> {
    return this.stepOneData.pipe(
      map((data: StepOneDataOutput) => data.modelCode === '')
    );
  }
  resetStepOneData(): void {
    this.stepOneData.next(DEFAULT_STEP_ONE_DATA_OUTPUT);
  }

  // Step Two
  setStepTwoData(dataOutput: StepTwoDataOutput): void {
    this.stepTwoData.next(dataOutput);
  }
  getStepTwoData(): Observable<StepTwoDataOutput> {
    return this.stepTwoData.asObservable();
  }
  isStepTwoDataDefault(): Observable<boolean> {
    return this.stepTwoData.pipe(
      map((data: StepTwoDataOutput) => data.selectedConfig.id === -1)
    );
  }
  resetStepTwoData(): void {
    this.stepTwoData.next(DEFAULT_STEP_TWO_DATA_OUTPUT);
  }
}
