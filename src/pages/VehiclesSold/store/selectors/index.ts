import { RootState } from "../../../../store";

export const getAutoFilter = (state: RootState) => state.autoFilter;

export const getTriggerToRefetchCars = (state: RootState) => state.autoFilter.triggerToRefetchCars;
export const getFilterState = (state: RootState) => state.autoFilter.filterConfig;
export const getBrandId = (state: RootState) => state.autoFilter.brandId;
export const getGenerationIds = (state: RootState) => state.autoFilter.generationIds;
export const getModelId = (state: RootState) => state.autoFilter.modelId;