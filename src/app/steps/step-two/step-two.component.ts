import { Component, Input } from '@angular/core';
import { OptionsService } from '../../../services/options.service';
import { Config, ModelConfigOptions } from '../../../dto/model-config-options';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';

interface ConfigOptionsFormGroup {
  configControl: FormControl<number | null>;
  towHitchControl?: FormControl<boolean | null>;
  yokeSteeringWheelControl?: FormControl<boolean | null>;
}

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.scss',
})
export class StepTwoComponent {
  @Input()
  modelCode: string = 'S';

  modelConfigOptions: ModelConfigOptions = {
    configs: [],
    towHitch: false,
    yoke: false,
  };

  configOptionsForm: FormGroup<ConfigOptionsFormGroup> =
    new FormGroup<ConfigOptionsFormGroup>({
      configControl: new FormControl<number>(-1, Validators.required),
    });

  displayedConfig: Config = {
    id: -1,
    description: '',
    range: -1,
    speed: -1,
    price: -1,
  };

  constructor(private optionsService: OptionsService) {}

  ngOnInit(): void {
    // Get all the car config options from API
    this.optionsService.getOneByCode(this.modelCode).subscribe({
      next: (result: ModelConfigOptions) => {
        console.log('result', result);
        this.modelConfigOptions = result;

        // Add formControls only if needed
        if (result.towHitch) {
          this.configOptionsForm.addControl(
            'towHitchControl',
            new FormControl<boolean>(false)
          );
        }

        if (result.yoke) {
          this.configOptionsForm.addControl(
            'yokeSteeringWheelControl',
            new FormControl<boolean>(false)
          );
        }
      },
      error: (error) => console.error(error),
    });

    // Subscribe to Form changes
    this.configOptionsForm.valueChanges.subscribe((newValues) => {
      console.log('newValues', newValues);
      const currentConfigId: number = newValues?.configControl ?? -1;
      const currentConfig: Config | undefined =
        this.modelConfigOptions.configs.find(
          (config) => config.id === currentConfigId
        );
      if (!currentConfig) {
        return;
      }
      this.displayedConfig = currentConfig;
    });
  }
}
