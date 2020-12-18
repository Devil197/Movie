import { axiosConfig } from '../../utils/api';

export const _likeComment = async (user_id, chat_id) => {
    const json = JSON.stringify({
        user_id: user_id,
        chat_id: chat_id,
    });
    try {
        let data = await axiosConfig.post(`/v1/like/addLike`, json, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return data.data;
    } catch (error) {
        console.log("LIKE API: ", err);
        return { data: [] }
    }
}



export const _countLike = (chat_id) =>
    new Promise((resolve, reject) => {
        axiosConfig
            .get(`/v3/like/countLike/${chat_id}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => reject(err));
    });

export const _checkLikeComment = (user_id) =>
    new Promise((resolve, reject) => {
        axiosConfig
            .get(`/v3/like/isLikeComment/${user_id}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => reject(err));
    });
