import { configureStore } from '@reduxjs/toolkit'

import reducers from './reducers'
import { transportApi } from '../pages/Transport/store/transportApi'

export const store = configureStore({
  reducer: reducers,
  middleware: (gDM) => gDM().concat(transportApi.middleware) 
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch