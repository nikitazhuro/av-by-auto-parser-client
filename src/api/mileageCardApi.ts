import { IFetchMileageCarsOnBackendQuery, IMileageCars } from './dto';
import { $localhost } from './index';

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

export const fetchMileageCarsOnBackend = async ({
  brand,
  model,
  generation,
  withPhotos,
}: IFetchMileageCarsOnBackendQuery) => {
  let url = '/mileage-cars/fetch-all?';

  url = url + (withPhotos ? 'withPhotos=1' : 'withPhotos=0')
  url = url + (brand || brand === 0 ? `&brand=${brand}` : '')
  url = url + (model || model === 0 ? `&model=${model}` : '')
  url = url + (generation || generation === 0 ? `&generation=${generation}` : '')
  
  const response = await $localhost.get(url);

  return response.data;
}