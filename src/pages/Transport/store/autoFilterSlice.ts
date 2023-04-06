import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  brandId: number | null;
  modelId: number | null;
  generationId: number | null;
  year: number | null;
}

const initialState: IInitialState = {
  brandId: null,
  modelId: null,
  generationId: null,
  year: null,
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
  }
})

export const autoFilterSliceActions = autoFilterSlice.actions;

export default autoFilterSlice.reducer;