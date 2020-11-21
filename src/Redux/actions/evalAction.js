// @@ -0, 0 + 1, 18 @@
import { Alert } from 'react-native';
import { axiosConfig } from '../../utils/api';

export const ratingAPI = async (user_id, movie_id, score) => {
    const json = JSON.stringify({
        user_id: user_id,
        movie_id: movie_id,
        score: score,
    });
    try {
        let data = await axiosConfig.post(`/v1/evaluate/create`, json, {
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

export const getEvalByMovieId = (_id) =>
    new Promise((resolve, reject) => {
        axiosConfig
            .get(`/v3/evaluate/average/value/${_id}`)
            .then((response) => {
                if (response.data.result) {
                    resolve(response.data);
                } else {
                    Alert.alert('get evaluate with API failed');
                }
            })
            .catch((err) => reject(err));
    });

