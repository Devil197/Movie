
import { Alert } from 'react-native';
import { axiosConfig } from '../../utils/api';

export const addHistoryByMovieId = async (movie_id, video_id, duration, user_id) => {
    const json = JSON.stringify({
        movie_id: movie_id,
        video_id: video_id,
        duration: duration,
        user_id: user_id
    });
    await axiosConfig
        .post(`/v1/history/add`, json, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (response.data.result) {
                console.log(response.data);
            } else {
                console.log(response.data.message);
            }
        })
        .catch((err) => {
            console.log("ADD HISTORY IN historyAction ERROR: ", err);
        });
}

export const getHistoryByIdUser = (_id) =>
    new Promise((resolve, reject) => {
        axiosConfig
            .get(`/v3/history/get/${_id}`)
            .then((response) => {
                if (response.data.result) {
                    resolve(response.data);
                } else {
                    Alert.alert('get history failed');
                }
            })
            .catch((err) => reject(err));
    });

export const deleteHistoryByInvite_ID = (invite_id) =>
    new Promise((resolve, reject) => {
        axiosConfig
            .get(`/v5/history/delete/all/${invite_id}`)
            .then((response) => {
                if (response.data.result) {
                    resolve(response.data);
                } else {
                    Alert.alert('get history failed');
                }
            })
            .catch((err) => reject(err));
    })

export const deleteHistoryByID = (_id) =>
    new Promise((resolve, reject) => {
        axiosConfig
            .get(`/v5/history/delete/${_id}`)
            .then((response) => {
                if (response.data.result) {
                    resolve(response.data);
                } else {
                    Alert.alert('get history failed');
                }
            })
            .catch((err) => reject(err));
    })