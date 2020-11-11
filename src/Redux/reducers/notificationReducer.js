import { REDUX } from '../store/types';
import update from 'react-addons-update';
const initialState = {
    listMovie: []
};

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case REDUX.CLEAR_DATA: {
            return initialState;
        }
        case REDUX.ADD_MOVIE_NOTIFICATION: {
            const tmp = update(state?.listMovie, { $push: [action.payload] });
            return {
                ...state,
                listMovie: tmp,
            };
        }

        case REDUX.UPDATE_NOTIFICATION: {
            const newNoti = state?.listMovie.map((val) => {
                return val.movie_id === action.payload.movie_id ? action.payload : val;
            });
            return {
                ...state,
                listMovie: newNoti,
            };
        }

        case REDUX.REMOVE_SCHEDULE: {

            return {
                ...state,
                listMovie: [...state.listMovie.filter((e) => e.movie_id !== action.payload.movie_id)],
            };
        }

        // case REDUX.SET_ALL_NOTIFICATION:{
        //     return{
        //         ...state,
        //     }
        // }

        default: {
            return state;
        }
    }
};
export default notificationReducer;
