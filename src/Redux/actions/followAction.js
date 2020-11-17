import { axiosConfig } from '../../utils/api';

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
