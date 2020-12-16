import { axiosConfig } from '../../utils/api';

export const _getCount_comment_follow_rating = (movie_id) =>
    new Promise((resolve, reject) => {
        axiosConfig
            .get(`/v3/statictical/count/${movie_id}`)
            .then((response) => {
                resolve(response.data)
            })
            .catch((err) => reject("STATICTICAL: ", err));
    });
