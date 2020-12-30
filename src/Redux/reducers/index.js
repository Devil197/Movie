import AsyncStorage from '@react-native-community/async-storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
// import
import userReducer from './userReducer';
import keywordReducer from './keywordReducer'
import notificationReducer from './notificationReducer'
import followReducer from './followReducer'
import historyReducer from './historyReducer'
import likeReducer from './likeReducer';

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
  historyReducer: persistReducer(
    {
      key: 'historyReducer',
      storage: AsyncStorage,
    },
    historyReducer,
  ),
  likeReducer: persistReducer(
    {
      key: 'likeReducer',
      storage: AsyncStorage,
    },
    likeReducer,
  )

});
// Exports
export default reducers;