import { Alert } from 'react-native';
import { axiosConfig } from '../../utils/api';



export const getAllMovie = () =>
    new Promise((resolve, reject) =>{
        axiosConfig.get('/v3/movie//get/all').then((response) =>{
            console.log('data : ',response.data.result);
            if (response.data.result) {
                resolve(response.data)
            }else{
                Alert.alert('get movie fail')
            }

        }).catch(err => reject(err))
    })