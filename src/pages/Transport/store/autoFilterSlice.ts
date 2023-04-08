import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  brandId: number | null;
  modelId: number | null;
  generationId: number | null;
  year: number | null;
  yearFrom: number | null;
  yearTo: number | null;
  triggerToRefetchCars: boolean;
}

const initialState: IInitialState = {
  brandId: null,
  modelId: null,
  generationId: null,
  year: null,
  yearFrom: null,
  yearTo: null,
  triggerToRefetchCars: false,
}

const autoFilterSlice = createSlice({
  name: 'autoFilterSlice',
  initialState,
  reducers: {
    setBrandId: (state, action) => {
      state.brandId = action.payload;
    },
    clearBrandId: (state) => {
      state.brandId = null;
    },

    setModelId: (state, action) => {
      state.modelId = action.payload;
    },
    clearModelId: (state) => {
      state.modelId = null;
    },
  
    setGenerationId: (state, action) => {
      state.generationId = action.payload;
    },
    clearGenerationId: (state) => {
      state.generationId = null;
    },

    setYear: (state, action) => {
      state.year = action.payload;
    },
    clearYear: (state) => {
      state.year = null;
    },

    setYearFrom: (state, action) => {
      state.yearFrom = action.payload;
    },
    clearYearFrom: (state) => {
      state.yearFrom = null;
    },

    setYearTo: (state, action) => {
      state.yearTo = action.payload;
    },
    clearYearTo: (state) => {
      state.yearTo = null;
    },

    setTriggerToRefetchCars: (state, action) => {
      state.triggerToRefetchCars = action.payload;
    },
  }
})

export const autoFilterSliceActions = autoFilterSlice.actions;

export default autoFilterSlice.reducer;