
import { Alert } from 'react-native';
import { axiosConfig } from '../../utils/api';

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