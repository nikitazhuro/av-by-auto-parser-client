export interface IMileageCarsData {
  lastSoldCars: Array<any>;
  mediumPrice: any;
  title: any;
}

export interface IMileageCars {
  brand: number;
  generation: number;
  model: number;
  data: IMileageCarsData;
  year: number;
  createdAt: string;
  updatedAt: string;
}