import { useAppDispatch } from './../../../hooks/useAppDispatch';
import { bindActionCreators, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  brandId: number | null;
  modelId: number | null;
  generationIds: Array<number>;
  year: number | null;
  yearFrom: number | null;
  yearTo: number | null;
  filterConfig: Object | null;
  triggerToRefetchCars: boolean;
}

const initialState: IInitialState = {
  brandId: null,
  modelId: null,
  generationIds: [],
  year: null,
  yearFrom: null,
  yearTo: null,
  filterConfig: null,
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
  
    setGenerationIds: (state, action) => {
      state.generationIds = action.payload;
    },
    clearGenerationIds: (state) => {
      state.generationIds = [];
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

    setFilterConfig: (state, action) => {
      state.filterConfig = action.payload;
    },
    clearFilterConfig: (state) => {
      state.filterConfig = null
    },

    setTriggerToRefetchCars: (state, action) => {
      state.triggerToRefetchCars = action.payload;
    },

    clearAllForNewBrand: (state) => {
      state.generationIds = [];
      state.modelId = null;
      state.year = null;
      state.yearFrom = null;
      state.yearTo = null;
    },
    clearAllForNewModel: (state) => {
      state.generationIds = [];
      state.year = null;
      state.yearFrom = null;
      state.yearTo = null;
    }
  }
})

export const autoFilterSliceActions = autoFilterSlice.actions;

export const useGetCarsFilterActions = () => {
  const dispatch = useAppDispatch();

  return bindActionCreators(autoFilterSlice.actions, dispatch);
}

export default autoFilterSlice.reducer;