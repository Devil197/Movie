import { axiosConfig } from '../../utils/api';
import React from 'react'
import { View, Text, Alert, ToastAndroid } from 'react-native'
import { REDUX } from '../../Redux/store/types'

export const getItemsFollowByUserId = (type, userId) =>
  new Promise((resolve, reject) => {
    axiosConfig
      .get(`/v3/follow/get/${type}/${userId}`)
      .then((response) => {
        if (response.data.result) {
          resolve(response.data);
        } else {
          Alert.alert('get items follow failed');
        }
      })
      .catch((err) => reject(err));
  });

export const followMovie = async (movie_id, user_id, type) => {
  const json = JSON.stringify({
    movie_id: movie_id,
    user_id: user_id
  });
  try {
    let data = await axiosConfig.post(`/v1/follow/create/${type}`, json, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (error) {
    console.log("Follow API ERROR: ", error);
    return { data: [] }
  }
}

export const deleteFollowAPI = async (user_id, _id, type) => {
  try {
    let data = await axiosConfig.get(`/v5/follow/delete/${type}/${user_id}/${_id}`);
    return data.data;
  } catch (error) {
    console.log("ERROR IN DELETE FOLLOW API: ", error);
  }
}

export const isFollowAPI = async (type, user_id) => {
  try {
    let data = await axiosConfig.get(`/v3/follow/get/${type}/${user_id}`)
    return data.data;
  } catch (error) {
    console.log("Follow API ERROR: ", err);
    return { data: [] }
  }
}
