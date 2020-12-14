// @@ -0, 0 + 1, 18 @@
import { Alert } from 'react-native';
import { axiosConfig } from '../../utils/api';

export const ratingAPI = async (user_id, movie_id, score) => {
    const json = JSON.stringify({
        user_id: user_id,
        movie_id: movie_id,
        score: score,
    });
    try {
        let data = await axiosConfig.post(`/v1/evaluate/create`, json, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return data;
    } catch (error) {
        console.log("RatingStar API ERROR: ", err);
        return { data: [] }
    }
}

export const getOneEval = (user_id, movie_id) =>
    new Promise((resolve, reject) => {
        axiosConfig.get(`/v3/evaluate/getby/${user_id}/${movie_id}`)
            .then((response) => {
                resolve(response.data);
            }).catch((err) => reject("API Get eval: " + err))
    })

export const getAllEval = (movie_id) =>
    new Promise((resolve, reject) => {
        axiosConfig.get(`/v3/evaluate/get/${movie_id}`)
            .then((response) => {
                resolve(response.data);
            }).catch((err) => reject("API Get ALL Eval: " + err))
    })


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

export const newComment = async (user_id, movie_id, message) => {
    const json = JSON.stringify({
        user_id: user_id,
        movie_id: movie_id,
        message: message,
    });
    try {
        let data = await axiosConfig.post(`/v1/comment/create`, json, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return data.data;
    } catch (error) {
        console.log("New comment API ERROR: ", err);
        return { data: [] }
    }
}

export const getOneComment = (user_id, movie_id) =>
    new Promise((resolve, reject) => {
        axiosConfig
            .get(`/v3/comment/getOne/${user_id}/${movie_id}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => reject("GET ONE COMMENT: ", err));
    });

export const getAllComment = (movie_id) =>
    new Promise((resolve, reject) => {
        axiosConfig
            .get(`/v3/comment/get/${movie_id}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => reject("GET ALL COMMENT: ", err));
    });