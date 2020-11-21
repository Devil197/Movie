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

export const followMovie = async (movie_id, user_id) => {
  const json = JSON.stringify({
    movie_id: movie_id,
    user_id: user_id
  });
  try {
    let data = await axiosConfig.post(`/v1/follow/create`, json, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (error) {
    console.log("Follow API ERROR: ", err);
    return { data: [] }
  }
}

export const deleteFollowAPI = async (user_id, follow_id, type) => {
  await axiosConfig.get(`/v5/follow/delete/${type}/${user_id}/${follow_id}`)
    .then(res => {
      if (!res.data.result) {
        return res
      }
      console.log('1000 delete follow ', res);
    })
    .catch(e => {
      console.log('1001 delete follow fail ', e)
      return e
    })
}
