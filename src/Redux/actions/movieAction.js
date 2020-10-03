import {axiosConfig} from '../../utils/api'

import { Alert } from 'react-native'


export const getAllMovie = () =>
    new Promise((resolve, reject) =>{
        axiosConfig.get('/api/movie/v3/all').then((response) =>{
            console.log('data : ',response.data.result);
            if (response.data.result) {
                resolve(response.data)
            }else{
                Alert.alert('get movie fail')
            }

        }).catch(err => reject(err))
    })