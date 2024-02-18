import { Color } from '../../dto/model-colors-information';
import { Config } from '../../dto/model-config-options';

export interface StepOneDataOutput {
  modelCode: string;
  modelDescription: string;
  selectedColor: Color;
}

export interface StepTwoDataOutput {
  selectedConfig: Config;
  towHitchOption: boolean;
  yokeOption: boolean;
}

export const DEFAULT_STEP_ONE_DATA_OUTPUT: StepOneDataOutput = {
  modelCode: '',
  modelDescription: '',
  selectedColor: {
    code: '',
    description: '',
    price: -1,
  },
};

export const DEFAULT_STEP_TWO_DATA_OUTPUT: StepTwoDataOutput = {
  selectedConfig: {
    id: -1,
    description: '',
    range: -1,
    speed: -1,
    price: -1,
  },
  towHitchOption: false,
  yokeOption: false,
};
