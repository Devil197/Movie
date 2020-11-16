import { REDUX } from '../store/types';
import update from 'react-addons-update';
import moment from 'moment'
const initialState = {
    list: []
};

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case REDUX.CLEAR_DATA: {
            return initialState;
        }
        case REDUX.CLEAR_NOTIFICATION: {
            return initialState;
        }
        case REDUX.ADD_MOVIE_NOTIFICATION: {
            const tmp = update(state?.list, { $push: [action.payload] });
            return {
                ...state,
                list: tmp,
            };
        }

        case REDUX.UPDATE_NOTIFICATION: {
            const newNoti = state?.list.map((val) => {
                return val.movie_id === action.payload.movie_id ? action.payload : val;
            });
            return {
                ...state,
                list: newNoti,
            };
        }

        case REDUX.REMOVE_NOTIFICATION: {

            return {
                ...state,
                list: [...state.list.filter((e) => e.movie_id !== action.payload.movie_id)],
            };
        }

        case REDUX.VIEW_ALL_NOTIFICATION: {
            return {
                ...state,
                list: action.payload
            }
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
