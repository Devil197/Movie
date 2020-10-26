import {REDUX} from '../store/types';
import update from 'react-addons-update';
const initialState = {
  keyword: [],
};

const keywordReducer = (state = initialState, action) => {
  switch (action.type) {
    case REDUX.CLEAR_DATA: {
      return initialState;
    }
    case REDUX.CLEAR_ALL_KEYWORD: {
      return {
        ...state,
        keyword: [],
      };
    }
    case REDUX.UPDATE_KEYWORD_LIST: {
      return {
        ...state,
        keyword: action.payload,
      };
    }
    case REDUX.UPDATE_SCHEDULE: {
      const newKeyword = state?.keyword.map((val) => {
        return val === action.payload.keyword ? action.payload : val;
      });

      return {
        ...state,
        keyword: newKeyword,
      };
    }
    case REDUX.REMOVE_KEYWORD: {
      return {
        ...state,
        keyword: [...state.keyword.filter((keyword, index) => index !== action.payload)],
      };
    }
    case REDUX.ADD_KEYWORD: {
      const tmp = update(state?.keyword, {$push: [action.payload]});
      return {
        ...state,
        keyword: tmp,
      };
    }
    default:
      return state;
  }
};
export default keywordReducer;
