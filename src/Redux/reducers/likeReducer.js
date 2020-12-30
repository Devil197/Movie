import { REDUX } from '../store/types';
import update from 'react-addons-update';
const initialState = {
    list: {},
};

const likeReducer = (state = initialState, action) => {
    switch (action.type) {
        case REDUX.CLEAR_DATA: {
            return initialState;
        }

        case REDUX.LIKE_LIST_SET: {
            return {
                list: action.payload
            }
        }

        case REDUX.LIKE_LIST_ADD: {
            const tmp = update(state?.list, { $push: [action.payload] });
            return {
                ...state,
                list: tmp,
            };

        }

        case REDUX.LIKE_LIST_REMOVE: {
            return {
                ...state,
                list: [...state.list.filter((e, i) => e.chat_id !== action.payload.chat_id)],
            };
        }

        case REDUX.LIKE_LIST_CLEAR: {
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
export default likeReducer;
