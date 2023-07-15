import { $localhost } from "./index"

export const getBrands = async () => {
  const response = await $localhost.get('/brands');
  return response.data;
}