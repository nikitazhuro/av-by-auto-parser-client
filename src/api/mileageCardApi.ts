import { IMileageCars } from './dto';
import { $localhost, $avByApi } from './index';

export const getBrandsFromAVApi = async() => {
  const response = await $avByApi.get<Array<any>>('/offer-types/cars/catalog/brand-items');

  return response.data;
};

export const getModelsFromAVApi = async (brandId: number) => {
  const response = await $avByApi.get<Array<any>>(`/offer-types/cars/catalog/brand-items/${brandId}/models`);

  return response.data;
};

export const getGenerationsFromAVApi = async (brandId: number, modelId: number) => {
  const response = await $avByApi.get<Array<any>>(`/offer-types/cars/catalog/brand-items/${brandId}/models/${modelId}/generations`);

  return response.data;
};

export const getMileageCarsFromAVApi = async (
  brandId: number | null,
  modelId: number | null,
  generationId: number | null,
  year: number | string | null,
) => {  
  const response = await $avByApi.get(`/offer-types/cars/price-statistics?brand=${brandId}&generation=${generationId}&model=${modelId}&year=${year}`);

  return response.data;
};

export const createMileageCarsToLocalhost = async (data: any) => {
  const response = await $localhost.post('/mileage-cars/create', data);

  return response.data;
};

export const getMileageCarsFromLocalhost = async (data: any) => {
  const response = await $localhost.post<Array<IMileageCars>>('/mileage-cars', data);

  return response.data;
};

export const deleteCarFromDatabase = async (uuid: string) => {
  const response = await $localhost.post<Array<IMileageCars>>(`/mileage-cars/delete`, uuid);

  return response.data;
};

export const fetchMileageCarsOnBackend = async () => {
  const response = await $localhost.get(`/mileage-cars/fetch-all?withPhotos=0`);

  return response.data;
}

export const fetchMileageCarsOnBackendWithPhotos = async () => {
  const response = await $localhost.get(`/mileage-cars/fetch-all?withPhotos=1`);

  return response.data;
}