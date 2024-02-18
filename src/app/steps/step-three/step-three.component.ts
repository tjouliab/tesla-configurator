import { Component } from '@angular/core';
import { StepsDataService } from '../steps-data.service';
import { Color } from '../../../dto/model-colors-information';
import { Config } from '../../../dto/model-config-options';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-three',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-three.component.html',
  styleUrl: './step-three.component.scss',
})
export class StepThreeComponent {
  modelCode: string = '';
  modelDescription: string = '';
  selectedColor: Color = {
    code: '',
    description: '',
    price: -1,
  };
  selectedConfig: Config = {
    id: -1,
    description: '',
    range: -1,
    speed: -1,
    price: -1,
  };
  towHitchOption: boolean = false;
  yokeOption: boolean = false;

  optionsCost: number = 1000;

  totalCost: number = 0;

  constructor(private stepsDataService: StepsDataService) {}

  ngOnInit(): void {
    if (
      this.stepsDataService.isStepOneDataDefault() ||
      this.stepsDataService.isStepTwoDataDefault()
    ) {
      return;
    }
    const { modelCode, modelDescription, selectedColor } =
      this.stepsDataService.getStepOneData();
    this.modelCode = modelCode;
    this.modelDescription = modelDescription;
    this.selectedColor = selectedColor;

    const { selectedConfig, towHitchOption, yokeOption } =
      this.stepsDataService.getStepTwoData();
    this.selectedConfig = selectedConfig;
    this.towHitchOption = towHitchOption;
    this.yokeOption = yokeOption;

    this.updateTotalCost();
  }

  private updateTotalCost(): void {
    let totalCost: number = 0;

    totalCost += this.selectedConfig.price;
    totalCost += this.selectedColor.price;
    if (this.towHitchOption) {
      totalCost += this.optionsCost;
    }
    if (this.yokeOption) {
      totalCost += this.optionsCost;
    }

    this.totalCost = totalCost;
  }
}
