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
    modelControl: new FormControl('', Validators.required),
    colorControl: new FormControl('', Validators.required),
  });

  selectedModelCode: string = '';
  selectedColorCode: string = '';

  constructor(private modelsService: ModelsService) {}

  ngOnInit(): void {
    // Get all the car informations from API
    this.modelsService.getAll().subscribe({
      next: (result: ModelColorsInformation[]) => {
        this.allModelInformations = result;
      },
      error: (error) => console.error(error),
    });

    // Subscribe to Form changes
    this.modelColorForm.valueChanges.subscribe((newValues) => {
      // We need to update the Form only if the car model has changed
      if (this.selectedModelCode === newValues.modelControl) {
        this.selectedColorCode = newValues?.colorControl ?? '';
        return;
      }

      const selectedModel = this.allModelInformations.find(
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
    });
  }
}
