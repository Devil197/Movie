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


        default: {
            return state;
        }
    }
};
export default historyReducer;
