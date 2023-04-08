import axios from 'axios';

const $localhost = axios.create({
  baseURL: 'http://localhost:5000',
});

const $avByApi = axios.create({
  baseURL: 'https://api.av.by',
});

export {
  $localhost,
  $avByApi,
};