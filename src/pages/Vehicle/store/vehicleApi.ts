import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const vehicleApi = createApi({
  reducerPath: 'vehicleApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  endpoints: builder => ({
    getVehicle: builder.query<Array<any>, string | undefined>({
      query: (uuid) => `mileage-cars/${uuid}`,
    }),
  })
})

export const { useGetVehicleQuery } = vehicleApi;