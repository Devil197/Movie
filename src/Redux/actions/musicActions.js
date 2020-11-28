import { Alert } from 'react-native';
import { axiosConfig } from '../../utils/api';

export const getAllMusicByChannelId = (channel_id) =>
    new Promise((resolve, reject) => {
        axiosConfig
            .get(`/v3/music/get/channel/${channel_id}`)
            .then((response) => {
                // console.log('data : ',response.data.result);
                if (response.data.result) {
                    resolve(response.data);
                } else {
                    Alert.alert('GET MUSIC FAILED!');
                }
            })
            .catch((err) => reject(err));
    });
