import { RootState } from "../../../../store";

export const getAutoFilter = (state: RootState) => state.autoFilter;

export const getTriggerToRefetchCars = (state: RootState) => state.autoFilter.triggerToRefetchCars;
