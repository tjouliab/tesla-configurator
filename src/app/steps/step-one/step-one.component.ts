import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ModelsService } from '../../../services/models.service';
import {
  Color,
  ModelColorsInformation,
} from '../../../dto/model-colors-information';
import { StepsDataService } from '../steps-data.service';
import { Subscription } from 'rxjs';

interface ModelColorFormGroup {
  modelControl: FormControl<string | null>;
  colorControl: FormControl<string | null>;
}

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.scss',
})
export class StepOneComponent {
  allModelInformations: ModelColorsInformation[] = [];

  modelColorForm: FormGroup<ModelColorFormGroup> =
    new FormGroup<ModelColorFormGroup>({
      modelControl: new FormControl<string>('', Validators.required),
      colorControl: new FormControl<string>('', Validators.required),
    });

  colors: Color[] = [];
  selectedModelCode: string = '';
  selectedColorCode: string = '';

  private subscriptions: Subscription = new Subscription();

  constructor(
    private modelsService: ModelsService,
    private stepsDataService: StepsDataService
  ) {}

  ngOnInit(): void {
    // Get all the cars informations from API
    this.subscriptions.add(
      this.modelsService.getAll().subscribe({
        next: (result: ModelColorsInformation[]) => {
          this.allModelInformations = result;

          // Reset data stored for step 1 & 2 to default
          this.stepsDataService.resetStepOneData();
          this.stepsDataService.resetStepTwoData();
        },
        error: (error) => console.error(error),
      })
    );

    // Subscribe to Form changes
    this.subscriptions.add(
      this.modelColorForm.valueChanges.subscribe((newValues) => {
        // We need to update the Form only if the car model has changed
        if (this.selectedModelCode === newValues?.modelControl) {
          this.selectedColorCode = newValues?.colorControl ?? '';
        } else {
          const selectedModel: ModelColorsInformation | undefined =
            this.allModelInformations.find(
              (modelInfo) => modelInfo.code === newValues.modelControl
            );

          this.selectedModelCode = selectedModel?.code ?? '';
          this.colors = selectedModel?.colors ?? [];
          this.selectedColorCode = this.colors[0]?.code ?? '';

          // Set emitEvent to false to avoid infinite loops
          this.modelColorForm.patchValue(
            {
              colorControl: this.colors[0].code,
            },
            { emitEvent: false }
          );
        }

        this.setStepData(this.selectedModelCode, this.selectedColorCode);
      })
    );
  }

  private setStepData(modelCode: string, colorCode: string): void {
    const selectedModel: ModelColorsInformation | undefined =
      this.allModelInformations.find(
        (modelInfo) => modelInfo.code === modelCode
      );

    const selectedColor: Color | undefined = this.colors.find(
      (color) => color.code === colorCode
    );

    if (selectedModel && selectedColor) {
      this.stepsDataService.setStepOneData({
        modelCode,
        modelDescription: selectedModel.description,
        selectedColor,
      });
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.subscriptions.unsubscribe();
  }
}
