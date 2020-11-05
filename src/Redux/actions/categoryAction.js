import { Alert } from 'react-native';
import { axiosConfig } from '../../utils/api';




export const getCategory = () =>
    new Promise((resolve, reject) => {
        axiosConfig
            .get('/v3/category/getAll')
            .then((response) => {
                if (response.data.result) {
                    resolve(response.data);
                } else {
                    Alert.alert('get category failed');
                }
            })
            .catch((err) => reject(err));
    });


