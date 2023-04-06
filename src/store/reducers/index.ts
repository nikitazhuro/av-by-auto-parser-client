import autoFilterSlice from "../../pages/Transport/store/autoFilterSlice";
import { transportApi } from "../../pages/Transport/store/transportApi";

const reducers = {
  [transportApi.reducerPath]: transportApi.reducer,
  autoFilter: autoFilterSlice,
}

export default reducers;
