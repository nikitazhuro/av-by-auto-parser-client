import { vehicleApi } from "../../pages/Vehicle/store/vehicleApi";
import autoFilterSlice from "../../pages/VehiclesSold/store/autoFilterSlice";
import { vehiclesSoldApi } from "../../pages/VehiclesSold/store/vehiclesSoldApi";

const reducers = {
  [vehiclesSoldApi.reducerPath]: vehiclesSoldApi.reducer,
  [vehicleApi.reducerPath]: vehicleApi.reducer,
  autoFilter: autoFilterSlice,
}

export default reducers;
