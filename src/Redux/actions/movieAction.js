import { Alert } from 'react-native';
import { axiosConfig } from '../../utils/api';

export const getAllMovie = () =>
  new Promise((resolve, reject) => {
    axiosConfig
      .get('/v3/movie/get/all')
      .then((response) => {
        // console.log('data : ',response.data.result);
        if (response.data.result) {
          resolve(response.data);
        } else {
          Alert.alert('get movie fail');
        }
      })
      .catch((err) => reject(err));
  });




export const getCartoon = () =>
  new Promise((resolve, reject) => {
    axiosConfig
      .get('/v3/movie/get/category/5fb3769cea40192e0c866b8a')
      .then((response) => {
        if (response.data.result) {
          resolve(response.data);
        } else {
          Alert.alert('get movie failed');
        }
      })
      .catch((err) => reject(err));
  });

export const getCast = () =>
  new Promise((resolve, reject) => {
    axiosConfig
      .get('/v3/cast/getAll')
      .then((response) => {
        if (response.data.result) {
          resolve(response.data);
        } else {
          Alert.alert('get cast failed');
        }
      })
      .catch((err) => reject(err));
  });

export const getFullMovie = (_id) =>
  new Promise((resolve, reject) => {
    axiosConfig
      .get(`/v3/movie/get/full/${_id}`)
      .then((response) => {
        if (response.data.result) {
          resolve(response.data);
        } else {
          Alert.alert('get cast failed');
        }
      })
      .catch((err) => reject(err));
  });

export const getVideoByMovie = (_id) =>
  new Promise((resolve, reject) => {
    axiosConfig
      .get(`/v3/video/get/all/movie/id/${_id}`)
      .then((response) => {
        if (response.data.result) {
          resolve(response.data);
        } else {
          Alert.alert('get cast failed');
        }
      })
      .catch((err) => reject(err));
  });


export const getMovieById = (_id) =>
  new Promise((resolve, reject) => {
    axiosConfig
      .get(`/v3/movie/get/id/${_id}`)
      .then((response) => {
        if (response.data.result) {
          resolve(response.data);
        } else {
          Alert.alert('get movie failed');
        }
      })
      .catch((err) => reject(err));
  });

export const getMovieByCreatAt = (limit) =>
  new Promise((resolve, reject) => {
    axiosConfig
      .get(`/v3/movie/get/create_at?limit=${limit}`)
      .then((response) => {
        if (response.data.result) {
          resolve(response.data);
        } else {
          Alert.alert('get movie failed');
        }
      })
      .catch((err) => reject(err));
  });

export const getMovieByScore = () =>
  new Promise((resolve, reject) => {
    axiosConfig
      .get('/v3/movie/get/score')
      .then((response) => {
        if (response.data.result) {
          resolve(response.data);
        } else {
          Alert.alert('get movie failed');
        }
      })
      .catch((err) => reject(err));
  });

export const getMovieByCategories = (_id) =>
  new Promise((resolve, reject) => {
    axiosConfig
      .get(`/v3/movie/get/category/${_id}`)
      .then((response) => {
        if (response.data.result) {
          resolve(response.data);
        } else {
          Alert.alert('get movie by category failed');
        }
      })
      .catch((err) => reject(err));
  });

