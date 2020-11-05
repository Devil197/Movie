import {REDUX} from '../store/types';
import {axiosConfig} from '../../utils/api';

// <==== add keyword ne`

export const addKeywordActionRedux = (dispatch, keyword) => {
  dispatch({
    type: REDUX.ADD_KEYWORD,
    payload: keyword,
  });
};

// ====>

//<==== update keyword ne`
export const updateKeywordRedux = (dispatch, keyword) => {
  dispatch({
    type: REDUX.UPDATE_KEYWORD_LIST,
    payload: keyword,
  });
};
//====>

export const deleteKeywordRedux = (dispatch, keyword) => {
  dispatch({
    type: REDUX.REMOVE_KEYWORD,
    payload: keyword,
  });
};

// api viết dưới này lúc mà search xong á thì cho nó lưu vào redux.
export const searchAPI = (keyword) =>
  new Promise((resolve, reject) => {
    axiosConfig
      .get(`/v6/movie/query/${keyword}`)
      .then((response) => {
        if (response.data.result) {
          resolve(response.data);
        } else {
          console.log('get data failed');
        }
      })
      .catch((err) => reject('Search API: ' + err));
  });

export const hotContentsAPI = (keyword) =>
  new Promise((resolve, reject) => {
    axiosConfig
      .get('/v3/movie/get/score')
      .then((response) => {
        if (response.data.result) {
          resolve(response.data);
        } else {
          console.log('get data failed');
        }
      })
      .catch((err) => reject('GET HOT MOVIE: ' + err));
  });
