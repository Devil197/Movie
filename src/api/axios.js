import axios from 'axios';

// export const apiKey = 'cfb5e7441170e569be1265dadbb2df82';

export const axiosConfig = axios.create({
  baseURL: 'https://movie-music.herokuapp.com',
  // baseURL: 'https://ttruyen.herokuapp.com/',
});

export default axiosConfig;
