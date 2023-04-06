import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IGeneration {
  id: number;
  name: string;
  yearFrom: number;
  yearTo: number
}

interface ILastSoldParams {
  brandId: number | null;
  modelId: number | null;
  generationId: number | null;
  year: number | null;
}

interface ISoldAutoPrice {
  usd: { amount: number }
  byn: { amount: number }
}

export interface ISoldAuto {
  publishedAt: string;
  removedAt: string;
  photos: Array<any>;
  price: ISoldAutoPrice;
  publicUrl: string;
}

export interface ISoldAutoMediumPrice {
  minPriceUsd: number;
  maxPriceUsd: number;
  priceUsd: number;
}

interface ILastSold {
  lastSoldAdverts?: Array<ISoldAuto>;
  mediumPrice?: ISoldAutoMediumPrice;
}

export const transportApi = createApi({
  reducerPath: 'transportApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.av.by' }),
  endpoints: builder => ({
    getBrands: builder.query<Array<{ id: number, name: string }>, void>({
      query: () => '/offer-types/cars/catalog/brand-items',
    }),
    getModels: builder.query<Array<{ id: number, name: string }>, number | null>({
      query: (brandId: number) => `/offer-types/cars/catalog/brand-items/${brandId}/models`,
    }),
    getGenerations: builder.query<Array<IGeneration>, { brandId: number | null, modelId: number | null}>({
      query: ({ brandId, modelId }) => `/offer-types/cars/catalog/brand-items/${brandId}/models/${modelId}/generations`,
    }),
    getLastSoldCars: builder.query<ILastSold, ILastSoldParams>({
      query: ({
        brandId,
        modelId,
        generationId,
        year,
      }) => `/offer-types/cars/price-statistics?brand=${brandId}&generation=${generationId}&model=${modelId}&year=${year}`,
    }),
  })
})

export const {
  useGetBrandsQuery,
  useGetModelsQuery,
  useGetGenerationsQuery,
  useGetLastSoldCarsQuery,
} = transportApi;