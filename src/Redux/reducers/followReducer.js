import { REDUX } from '../store/types';
import update from 'react-addons-update';
const initialState = {
    first: true,
    list: [],
    listCast: []
};

const followReducer = (state = initialState, action) => {
    switch (action.type) {
        case REDUX.CLEAR_DATA: {
            return initialState;
        }
        case REDUX.ADD_FOLLOW: {
            const tmp = update(state?.list, { $push: [action.payload] });
            return {
                ...state,
                list: tmp
            }
        }

        case REDUX.ADD_FOLLOW_CAST: {
            const tmp = update(state?.listCast, { $push: [action.payload] });
            return {
                ...state,
                listCast: tmp
            }
        }


        case REDUX.UPDATE_FOLLOW: {
            const newFollow = state?.list.map((val) => {
                return val._id === action.payload._id ? action.payload : val;
            });
            return {
                ...state,
                list: newFollow,
            };
        }

        case REDUX.UPDATE_FOLLOW_CAST: {
            const newFollow = state?.listCast.map((val) => {
                return val._id === action.payload._id ? action.payload : val;
            });
            return {
                ...state,
                listCast: newFollow,
            };
        }



        case REDUX.SET_FOLLOW: {
            return {
                ...state,
                list: action.payload
            }
        }

        case REDUX.SET_FOLLOW_CAST: {
            return {
                ...state,
                listCast: action.payload
            }
        }

        case REDUX.FIRST_FOLLOW: {
            return {
                ...state,
                first: false
            }
        }

        case REDUX.DELETE_FOLLOW: {

            return {
                ...state,
                list: [...state.list.filter((e) => e.movie_id !== action.payload.movie_id)],
            };
        }

        case REDUX.DELETE_FOLLOW_CATS: {

            return {
                ...state,
                listCast: [...state.listCast.filter((e) => e.cast_id !== action.payload.cast_id)],
            };
        }


        default: {
            return state;
        }
    }
};
export default followReducer;
