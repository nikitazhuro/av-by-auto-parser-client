import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IBrand, IGeneration, IModel } from '../types';

export const vehiclesSoldApi = createApi({
  reducerPath: 'vehiclesSoldApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  endpoints: builder => ({
    getBrands: builder.query<Array<IBrand>, void>({
      query: () => 'brands',
    }),
    getModels: builder.query<Array<IModel>, string | null>({
      query: (brandUUID: string) => `/models?brand=${brandUUID}`,
    }),
    getGenerations: builder.query<Array<IGeneration>, string | null>({
      query: (modelUUID: string) => `/generations/model-generations?model=${modelUUID}`,
    }),
  })
})

export const {
  useGetBrandsQuery,
  useGetModelsQuery,
  useGetGenerationsQuery,
} = vehiclesSoldApi;