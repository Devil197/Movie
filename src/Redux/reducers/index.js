import AsyncStorage from '@react-native-community/async-storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
// import
import userReducer from './userReducer';

const reducers = combineReducers({
  userReducer: persistReducer(
    {
      key: 'userReducer',
      storage: AsyncStorage,
    },
    userReducer,
  ),
});
// Exports
export default reducers;