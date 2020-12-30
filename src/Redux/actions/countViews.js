import { axiosConfig } from '../../utils/api';

export const _getMovieViewsAPI = (movie_id) =>
    new Promise((resolve, reject) => {
        axiosConfig
            .get(`/v1/getViews/${movie_id}`)
            .then((response) => {
                if (response.data.result) {
                    resolve(response.data);
                } else {
                    Alert.alert('get evaluate with API failed');
                }
            })
            .catch((err) => reject(err));
    });

export const _setMovieViewsAPI = (movie_id) =>
    new Promise((resolve, reject) => {
        axiosConfig
            .get(`/v1/countview/${movie_id}`)
            .then((response) => {
                if (response.data.result) {
                    resolve(response.data);
                } else {
                    Alert.alert('SET VIEWS');
                }
            })
            .catch((err) => reject(err));
    });