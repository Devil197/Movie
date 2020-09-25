import AsyncStorage from '@react-native-community/async-storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
// import
import userAuthReducer from './userAuthReducer';
const reducers = combineReducers({
  userAuthReducer: persistReducer(
    {
      key: 'userAuthReducer',
      storage: AsyncStorage,
    },
    userAuthReducer,
  ),
});
// Exports
export default reducers;