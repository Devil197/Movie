import { REDUX } from '../store/types';
import update from 'react-addons-update';
const initialState = {
    list: {},
};

const historyReducer = (state = initialState, action) => {
    switch (action.type) {
        case REDUX.CLEAR_DATA: {
            return initialState;
        }

        case REDUX.ADD_HISTORY: {
            const tmp = update(state?.list, { $push: [action.payload] });
            return {
                ...state,
                list: tmp,
            };

        }

        case REDUX.UPDATE_HISTORY: {
            const history = state?.list.map((val) => {
                return val.movie_id === action.payload.movie_id ? action.payload : val;
            });

            return {
                ...state,
                list: history,
            };
        }

        case REDUX.SET_HISTORY: {
            return {
                list: action.payload
            }
        }

        case REDUX.REMOVE_HISTORY: {
            return {
                ...state,
                list: [...state.list.filter((e, i) => e.movie_id !== action.payload.movie_id)],
            };
        }

        case REDUX.CLEAR_HISTORY: {
            return {
                ...state,
                list: []
            }
        }


        default: {
            return state;
        }
    }
};
export default historyReducer;
