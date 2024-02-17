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
  colors: Color[] = [];

  modelColorForm = new FormGroup({
    modelSelect: new FormControl('', Validators.required),
    colorSelect: new FormControl('', Validators.required),
  });

  selectedModelCode: string = '';
  selectedColorCode: string = '';

  constructor(private modelsService: ModelsService) {}

  ngOnInit(): void {
    // Get all the car informations from API
    this.modelsService.getAll().subscribe({
      next: (result) => {
        this.allModelInformations = result;

        // Initialize the Form with first car model found
        if (result.length > 0) {
          if (result[0].colors.length > 0) {
            this.selectedModelCode = result[0].code;
            this.selectedColorCode = result[0].colors[0].code;
            this.colors = result[0].colors;

            this.modelColorForm.patchValue({
              modelSelect: this.selectedModelCode,
              colorSelect: this.selectedColorCode,
            });
          }
        }
      },
      error: (error) => console.error(error),
    });

    // Subscribe to Form changes
    this.modelColorForm.valueChanges.subscribe((newValues) => {
      // We need to update the Form only if the car model has changed
      if (this.selectedModelCode === newValues.modelSelect) {
        this.selectedColorCode = newValues?.colorSelect ?? '';
        return;
      }

      const selectedModel = this.allModelInformations.find(
        (modelInfo) => modelInfo.code === newValues.modelSelect
      );

      this.selectedModelCode = selectedModel?.code ?? '';
      this.colors = selectedModel?.colors ?? [];
      this.selectedColorCode = this.colors[0]?.code ?? '';

      // Set emitEvent to false to avoid infinite loops
      this.modelColorForm.patchValue(
        {
          colorSelect: this.colors[0].code,
        },
        { emitEvent: false }
      );
    });
  }
}
