// @@ -0, 0 + 1, 18 @@
import { Alert } from 'react-native';
import { axiosConfig } from '../../utils/api';

export const getActorById = (_id) =>
    new Promise((resolve, reject) => {
        axiosConfig
            .get(`/v3/cast/get/${_id}`)
            .then((response) => {
                if (response.data.result) {
                    resolve(response.data);
                } else {
                    Alert.alert('get actor with API failed');
                }
            })
            .catch((err) => reject(err));
    });

