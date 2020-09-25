import { REDUX } from '../store/types';
const initialState = {
    loggedIn: false,
    googleInfo: {},
    facebookInfo:{}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REDUX.LOGGED_IN: {
      return {
        ...state,
        loggedIn: true,
      };
    }
    case REDUX.GOOGLE_UPDATE_INFO:{
        return{
            ...state,
            googleInfo:action.payload,
        };
    }
    case REDUX.FACEBOOK_UPDATE_INFO: {
     return {
        ...state,
        facebookInfo: action.payload,
      };
    }
    case REDUX.DELETE_USER_INFO: {
        return {
          ...state,
          loggedIn: false,
          facebookInfo: {},
          googleInfo:{}
        };
      }
    default: {
      return state;
    }
  }
};
export default userReducer;
