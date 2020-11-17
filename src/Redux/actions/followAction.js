import {axiosConfig} from '../../utils/api';

export const getItemsFollowByUserId = (userId) =>
  new Promise((resolve, reject) => {
    axiosConfig
      .get(`/v3/follow/get/${userId}`)
      .then((response) => {
        if (response.data.result) {
          resolve(response.data);
        } else {
          Alert.alert('get items follow failed');
        }
      })
      .catch((err) => reject(err));
  });
