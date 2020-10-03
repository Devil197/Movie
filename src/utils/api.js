import axios from 'axios';
import {URL} from '../constants/constants'
// export const apiKey = 'cfb5e7441170e569be1265dadbb2df82';

export const axiosConfig = axios.create({
  baseURL: URL,
  timeout: 3000,
});


