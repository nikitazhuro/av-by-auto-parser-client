import { useAppDispatch } from './../../../hooks/useAppDispatch';
import { bindActionCreators, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  brandUUID: string | null;
  modelUUID: string | null;
  generationUUIDs: Array<string>;
  filterConfig: Object | null;
  triggerToRefetchCars: boolean;
}

const initialState: IInitialState = {
  brandUUID: null,
  modelUUID: null,
  generationUUIDs: [],
  filterConfig: null,
  triggerToRefetchCars: false,
}

const autoFilterSlice = createSlice({
  name: 'autoFilterSlice',
  initialState,
  reducers: {
    setBrandUUID: (state, action) => {
      state.brandUUID = action.payload;
    },
    clearBrandUUID: (state) => {
      state.brandUUID = null;
    },

    setModelUUID: (state, action) => {
      state.modelUUID = action.payload;
    },
    clearModelUUID: (state) => {
      state.modelUUID = null;
    },
  
    setGenerationUUIDs: (state, action) => {
      state.generationUUIDs = action.payload;
    },
    clearGenerationUUIDs: (state) => {
      state.generationUUIDs = [];
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
      state.generationUUIDs = [];
      state.modelUUID = null;
    },
    clearAllForNewModel: (state) => {
      state.generationUUIDs = [];
    }
  }
})

export const autoFilterSliceActions = autoFilterSlice.actions;

export const useGetCarsFilterActions = () => {
  const dispatch = useAppDispatch();

  return bindActionCreators(autoFilterSlice.actions, dispatch);
}

export default autoFilterSlice.reducer;