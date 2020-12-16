import { axiosConfig } from '../../utils/api';

export const _addOneMessage = async (movie_id, user_id, message) => {
    const json = JSON.stringify({
        user_id: user_id,
        movie_id: movie_id,
        message: message,
    });
    try {
        let data = await axiosConfig.post(`/v1/chat/create`, json, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return data.data;
    } catch (error) {
        console.log("New chat API ERROR: ", err);
        return { data: [] }
    }
}

export const _getAllChat = (movie_id) =>
    new Promise((resolve, reject) => {
        axiosConfig
            .get(`/v3/chat/getAll/${movie_id}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => reject(err));
    });