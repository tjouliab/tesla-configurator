export interface ModelConfigOptions {
  configs: Config[];
  towHitch: boolean;
  yoke: boolean;
}

export interface Config {
  id: number;
  description: string;
  range: number;
  speed: number;
  price: number;
}
