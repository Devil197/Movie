// @@ -0, 0 + 1, 18 @@
import { Alert } from 'react-native';
import { axiosConfig } from '../../utils/api';

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

