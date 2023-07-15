import { RootState } from "../../../../store";

export const getAutoFilter = (state: RootState) => state.autoFilter;

export const getTriggerToRefetchCars = (state: RootState) => state.autoFilter.triggerToRefetchCars;
export const getFilterState = (state: RootState) => state.autoFilter.filterConfig;
export const getBrandUUID = (state: RootState) => state.autoFilter.brandUUID;
export const getGenerationUUIDs = (state: RootState) => state.autoFilter.generationUUIDs;
export const getModelUUID = (state: RootState) => state.autoFilter.modelUUID;