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
  generations,
  withPhotos,
}: IFetchMileageCarsOnBackendQuery) => {
  let url = '/mileage-cars/fetch-all?';

  url = url + (withPhotos ? 'withPhotos=1' : 'withPhotos=0')
  url = url + (brand ? `&brand=${brand}` : '')
  url = url + (model ? `&model=${model}` : '')
  url = url + (generations && generations.length ? `&generations=${generations}` : '')
  
  const response = await $localhost.get(url);

  return response.data;
}

export const fetchPhoneNumberOnBackend = async () => {
  const response = await $localhost.get('/phone-numbers/fetch-all');

  return response.data;
}

export const comparePhoneNumberWithCarsOnBackend = async () => {
  const response = await $localhost.get('/mileage-cars/compare-numbers');

  return response.data;
}