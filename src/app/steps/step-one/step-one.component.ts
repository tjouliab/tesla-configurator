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

  constructor(private modelsService: ModelsService) {}

  ngOnInit(): void {
    // Get all the cars informations from API
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
    });
  }
}
