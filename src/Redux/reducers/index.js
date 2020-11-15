import AsyncStorage from '@react-native-community/async-storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
// import
import userReducer from './userReducer';
import keywordReducer from './keywordReducer'
import notificationReducer from './notificationReducer'
import followReducer from './followReducer'
const reducers = combineReducers({
  userReducer: persistReducer(
    {
      key: 'userReducer',
      storage: AsyncStorage,
    },
    userReducer,
  ),
  keywordReducer: persistReducer(
    {
      key: 'keywordReducer',
      storage: AsyncStorage,
    },
    keywordReducer,
  ),
  notificationReducer: persistReducer(
    {
      key: 'notificationReducer',
      storage: AsyncStorage,
    },
    notificationReducer,
  ),
  followReducer: persistReducer(
    {
      key: 'followReducer',
      storage: AsyncStorage,
    },
    followReducer,
  ),
});

// Exports
export default reducers;