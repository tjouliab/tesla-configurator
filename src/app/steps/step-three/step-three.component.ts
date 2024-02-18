import { Component } from '@angular/core';
import { StepsDataService } from '../steps-data.service';
import { Color } from '../../../dto/model-colors-information';
import { Config } from '../../../dto/model-config-options';
import { CommonModule } from '@angular/common';
import { StepOneDataOutput, StepTwoDataOutput } from '../steps-data.dto';

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
    this.stepsDataService.getStepOneData().subscribe({
      next: (result: StepOneDataOutput) => {
        this.modelCode = result.modelCode;
        this.modelDescription = result.modelDescription;
        this.selectedColor = result.selectedColor;
        this.updateTotalCost();
      },
    });

    this.stepsDataService.getStepTwoData().subscribe({
      next: (result: StepTwoDataOutput) => {
        this.selectedConfig = result.selectedConfig;
        this.towHitchOption = result.towHitchOption;
        this.yokeOption = result.yokeOption;
        this.updateTotalCost();
      },
    });
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
