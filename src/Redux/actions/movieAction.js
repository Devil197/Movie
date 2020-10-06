import { Alert } from 'react-native';
import { axiosConfig } from '../../utils/api';



export const getAllMovie = () =>
    new Promise((resolve, reject) =>{
        axiosConfig.get('/v3/movie//get/all').then((response) =>{
            // console.log('data : ',response.data.result);
            if (response.data.result) {
                resolve(response.data)
            }else{
                Alert.alert('get movie fail')
            }

        }).catch(err => reject(err))
    })

export const getCartoon = () => 
    new Promise((resolve, reject) => {
        axiosConfig.get('/v3/movie/get/category/5f7c1a72ed32570004cf5f65').then((response) =>{
            if(response.data.result){
                resolve(response.data)
            } else {
                Alert.alert('get movie failed')
            }
        }).catch(err => reject(err))
    })

    export const getCast = () => 
    new Promise((resolve, reject) => {
        axiosConfig.get('/v3/cast/getAll').then((response) =>{
            if(response.data.result){
                resolve(response.data)
            } else {
                Alert.alert('get cast failed')
            }
        }).catch(err => reject(err))
    })
