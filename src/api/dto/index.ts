export interface IMileageCarsData {
  lastSoldCars: Array<any>;
  mediumPrice: any;
  title: any;
}

export interface IMileageCars {
  uuid: string;
  brand: number;
  generation: number;
  model: number;
  data: IMileageCarsData;
  year: number;
  createdAt: string;
  updatedAt: string;
}

export interface IFetchMileageCarsOnBackendQuery {
  withPhotos: number;
  brand?: number | null;
  model?: number | null;
  generations?: number[];
}