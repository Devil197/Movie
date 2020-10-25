import { REDUX } from '../store/types';
const initialState = {
    loggedIn: false,
    userInfo:{},
    googleInfo: {},
    facebookInfo:'',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REDUX.LOGGED_IN: {
      return {
        ...state,
        loggedIn: true,
      };
    }
    case REDUX.GOOGLE_LOGGED_IN:{
        return{
            ...state,
            googleInfo:action.payload,
        };
    }
    case REDUX.FACEBOOK_LOGGED_IN: {
     return {
        ...state,
        facebookInfo: action.payload,
      };
    }
    case REDUX.DELETE_USER_INFO: {
        return {
          ...state,
          loggedIn: false,
          facebookInfo: '',
          googleInfo:{},
          userInfo:{},
        };
      }
    case REDUX.ADD_USER_INFO:{
      return{
        ...state,
        userInfo:action.payload
      }
    }
    default: {
      return state;
    }
  }
};
export default userReducer;
