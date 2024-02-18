import { Component } from '@angular/core';
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
import { StepsDataService } from '../steps-data.service';
import { EMPTY, Subscription, switchMap } from 'rxjs';

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
  modelCode: string = 'S';
  colorCode: string = '';

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

  private subscriptions: Subscription = new Subscription();

  constructor(
    private optionsService: OptionsService,
    private stepsDataService: StepsDataService
  ) {}

  ngOnInit(): void {
    this.stepsDataService.resetStepTwoData();

    this.subscriptions.add(
      this.stepsDataService
        .getStepOneData()
        .pipe(
          switchMap((stepOneData) => {
            if (stepOneData.modelCode === '') {
              // If step 1 is not valid, return an empty observable to stop
              return EMPTY;
            } else {
              this.modelCode = stepOneData.modelCode;
              this.colorCode = stepOneData.selectedColor.code;
              // Get all the car config options from API
              return this.optionsService.getOneByCode(this.modelCode);
            }
          })
        )
        .subscribe({
          next: (result: ModelConfigOptions) => {
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
        })
    );

    // Subscribe to Form changes
    this.subscriptions.add(
      this.configOptionsForm.valueChanges.subscribe((newValues) => {
        const currentConfigId: number = newValues?.configControl ?? -1;
        const currentConfig: Config | undefined =
          this.modelConfigOptions.configs.find(
            (config) => config.id === currentConfigId
          );
        if (!currentConfig) {
          return;
        }
        this.displayedConfig = currentConfig;
        this.stepsDataService.setStepTwoData({
          selectedConfig: currentConfig,
          towHitchOption:
            this.configOptionsForm.value?.towHitchControl ?? false,
          yokeOption:
            this.configOptionsForm.value?.yokeSteeringWheelControl ?? false,
        });
      })
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.subscriptions.unsubscribe();
  }
}
