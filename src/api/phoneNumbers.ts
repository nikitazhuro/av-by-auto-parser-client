import { $localhost } from ".";

export const fetchPhoneNumbers = async () => {
  const response = await $localhost.get('/phone-numbers/phone-cars');

  return response.data;
};