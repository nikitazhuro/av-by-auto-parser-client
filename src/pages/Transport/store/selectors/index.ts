import { RootState } from "../../../../store";

export const getAutoFilter = (state: RootState) => state.autoFilter;

export const getTriggerToRefetchCars = (state: RootState) => state.autoFilter.triggerToRefetchCars;
export const getFilterState = (state: RootState) => state.autoFilter.filterConfig;
export const getBrandId = (state: RootState) => state.autoFilter.brandId;
export const getGenerationId = (state: RootState) => state.autoFilter.generationId;
export const getModelId = (state: RootState) => state.autoFilter.modelId;
export const getYear = (state: RootState) => state.autoFilter.year;
export const getYearFrom = (state: RootState) => state.autoFilter.yearFrom;
export const getYearTo = (state: RootState) => state.autoFilter.yearTo;
